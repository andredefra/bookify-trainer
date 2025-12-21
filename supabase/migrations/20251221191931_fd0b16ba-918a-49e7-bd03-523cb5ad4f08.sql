-- Phase 1: Database Schema Updates for Gym/Studio Separation

-- 1.1 Create enum for app roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('client', 'trainer', 'gym', 'studio', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 1.2 Create user_roles table (secure role management)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin') OR auth.uid() = user_id);

-- 1.3 Create studios table
CREATE TABLE IF NOT EXISTS public.studios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on studios
ALTER TABLE public.studios ENABLE ROW LEVEL SECURITY;

-- RLS policies for studios
CREATE POLICY "Studio owners can view their studio" 
ON public.studios 
FOR SELECT 
USING (auth.uid() = owner_id);

CREATE POLICY "Studio owners can update their studio" 
ON public.studios 
FOR UPDATE 
USING (auth.uid() = owner_id);

CREATE POLICY "Users can create their own studio" 
ON public.studios 
FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

-- 1.4 Create studio_trainer_assignments table (for linking PTs to Studios)
CREATE TABLE IF NOT EXISTS public.studio_trainer_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  trainer_id UUID NOT NULL,
  status TEXT DEFAULT 'active', -- active, inactive, pending
  commission_rate DECIMAL(5,2) DEFAULT 0, -- Studio takes 0% by default (pays PT externally)
  contract_details JSONB,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(studio_id, trainer_id)
);

-- Enable RLS
ALTER TABLE public.studio_trainer_assignments ENABLE ROW LEVEL SECURITY;

-- RLS policies for studio_trainer_assignments
CREATE POLICY "Studio owners can manage their trainer assignments" 
ON public.studio_trainer_assignments 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.studios 
    WHERE id = studio_trainer_assignments.studio_id 
    AND owner_id = auth.uid()
  )
);

CREATE POLICY "Trainers can view their own assignments" 
ON public.studio_trainer_assignments 
FOR SELECT 
USING (trainer_id = auth.uid());

-- 1.5 Create gym_service_requests table (Gym -> PT requests)
CREATE TABLE IF NOT EXISTS public.gym_service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  request_type TEXT NOT NULL, -- 'program' | 'package' | 'service'
  status TEXT DEFAULT 'pending', -- 'pending' | 'accepted' | 'declined' | 'completed'
  details JSONB, -- Additional request details
  commission_rate DECIMAL(5,2), -- Commission rate for this request
  notes TEXT, -- Notes from gym to trainer
  trainer_response TEXT, -- Response from trainer
  created_at TIMESTAMPTZ DEFAULT now(),
  responded_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gym_service_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for gym_service_requests
CREATE POLICY "Gyms can manage their service requests" 
ON public.gym_service_requests 
FOR ALL 
USING (gym_id = auth.uid() OR trainer_id = auth.uid());

-- 1.6 Add tracking fields to program_assignments
ALTER TABLE public.program_assignments 
ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT 'direct', -- 'direct' | 'gym' | 'studio'
ADD COLUMN IF NOT EXISTS source_id UUID, -- ID of gym/studio if applicable
ADD COLUMN IF NOT EXISTS gym_commission_rate DECIMAL(5,2);

-- 1.7 Add tracking fields to client_package_assignments  
ALTER TABLE public.client_package_assignments
ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT 'direct', -- 'direct' | 'gym' | 'studio'
ADD COLUMN IF NOT EXISTS source_id UUID,
ADD COLUMN IF NOT EXISTS gym_commission_rate DECIMAL(5,2);

-- 1.8 Add tracking fields to trainer_notifications
ALTER TABLE public.trainer_notifications
ADD COLUMN IF NOT EXISTS related_package_assignment_id UUID,
ADD COLUMN IF NOT EXISTS source_type TEXT, -- 'gym' | 'studio' | 'direct'
ADD COLUMN IF NOT EXISTS source_id UUID,
ADD COLUMN IF NOT EXISTS request_id UUID; -- Reference to gym_service_requests if applicable

-- 1.9 Create studio_client_relationships table
CREATE TABLE IF NOT EXISTS public.studio_client_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  client_id UUID NOT NULL,
  status TEXT DEFAULT 'active', -- active, inactive
  assigned_trainer_id UUID, -- Current assigned trainer
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(studio_id, client_id)
);

-- Enable RLS
ALTER TABLE public.studio_client_relationships ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Studio owners can manage client relationships" 
ON public.studio_client_relationships 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.studios 
    WHERE id = studio_client_relationships.studio_id 
    AND owner_id = auth.uid()
  )
);

CREATE POLICY "Clients can view their own relationships" 
ON public.studio_client_relationships 
FOR SELECT 
USING (client_id = auth.uid());

-- 1.10 Add creator tracking to packages table for gym/studio created packages
ALTER TABLE public.packages
ADD COLUMN IF NOT EXISTS creator_type TEXT DEFAULT 'trainer', -- 'trainer' | 'studio'
ADD COLUMN IF NOT EXISTS creator_id UUID; -- ID of studio if created by studio

-- 1.11 Create timestamp trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply trigger to new tables
DROP TRIGGER IF EXISTS update_studios_updated_at ON public.studios;
CREATE TRIGGER update_studios_updated_at
    BEFORE UPDATE ON public.studios
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_studio_trainer_assignments_updated_at ON public.studio_trainer_assignments;
CREATE TRIGGER update_studio_trainer_assignments_updated_at
    BEFORE UPDATE ON public.studio_trainer_assignments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_gym_service_requests_updated_at ON public.gym_service_requests;
CREATE TRIGGER update_gym_service_requests_updated_at
    BEFORE UPDATE ON public.gym_service_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_studio_client_relationships_updated_at ON public.studio_client_relationships;
CREATE TRIGGER update_studio_client_relationships_updated_at
    BEFORE UPDATE ON public.studio_client_relationships
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();