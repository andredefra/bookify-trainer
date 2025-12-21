-- Create gyms table with branding fields
CREATE TABLE public.gyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  website TEXT,
  -- BRANDING FIELDS
  primary_color TEXT DEFAULT '#10b981',
  secondary_color TEXT DEFAULT '#1f2937',
  sidebar_bg_color TEXT DEFAULT '#ffffff',
  custom_css TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on gyms
ALTER TABLE public.gyms ENABLE ROW LEVEL SECURITY;

-- RLS policies for gyms
CREATE POLICY "Gym owners can view their own gyms"
ON public.gyms FOR SELECT
USING (auth.uid() = owner_id);

CREATE POLICY "Gym owners can create their own gyms"
ON public.gyms FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Gym owners can update their own gyms"
ON public.gyms FOR UPDATE
USING (auth.uid() = owner_id);

CREATE POLICY "Gym owners can delete their own gyms"
ON public.gyms FOR DELETE
USING (auth.uid() = owner_id);

-- Add branding fields to studios table
ALTER TABLE public.studios 
ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#10b981',
ADD COLUMN IF NOT EXISTS secondary_color TEXT DEFAULT '#1f2937',
ADD COLUMN IF NOT EXISTS sidebar_bg_color TEXT DEFAULT '#ffffff',
ADD COLUMN IF NOT EXISTS custom_css TEXT;

-- Create trigger for gyms updated_at
CREATE TRIGGER update_gyms_updated_at
BEFORE UPDATE ON public.gyms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();