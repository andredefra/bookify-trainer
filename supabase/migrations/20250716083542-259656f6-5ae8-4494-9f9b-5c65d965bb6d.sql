-- Create trainer_profiles table for comprehensive profile information
CREATE TABLE public.trainer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL UNIQUE,
  slug TEXT UNIQUE,
  title TEXT,
  bio TEXT,
  location TEXT,
  hourly_rate NUMERIC,
  profile_image_url TEXT,
  specialties TEXT[],
  certifications JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  languages TEXT[] DEFAULT ARRAY['English'],
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create trainer_reviews table for client feedback
CREATE TABLE public.trainer_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  session_date DATE,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(trainer_id, client_id, session_date)
);

-- Enable Row Level Security
ALTER TABLE public.trainer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainer_reviews ENABLE ROW LEVEL SECURITY;

-- RLS policies for trainer_profiles
CREATE POLICY "Trainers can manage their own profile" 
ON public.trainer_profiles 
FOR ALL 
USING (trainer_id = auth.uid())
WITH CHECK (trainer_id = auth.uid());

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.trainer_profiles 
FOR SELECT 
USING (is_public = true);

-- RLS policies for trainer_reviews
CREATE POLICY "Clients can create reviews for their trainers" 
ON public.trainer_reviews 
FOR INSERT 
WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their own reviews" 
ON public.trainer_reviews 
FOR UPDATE 
USING (client_id = auth.uid());

CREATE POLICY "Reviews are viewable by everyone" 
ON public.trainer_reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Trainers can view their reviews" 
ON public.trainer_reviews 
FOR SELECT 
USING (trainer_id = auth.uid());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_trainer_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_trainer_profiles_updated_at
  BEFORE UPDATE ON public.trainer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_trainer_profiles_updated_at();

CREATE TRIGGER update_trainer_reviews_updated_at
  BEFORE UPDATE ON public.trainer_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate unique slug
CREATE OR REPLACE FUNCTION public.generate_trainer_slug(trainer_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 1;
BEGIN
  -- Convert name to slug format
  base_slug := lower(regexp_replace(trim(trainer_name), '[^a-zA-Z0-9\s]', '', 'g'));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  
  final_slug := base_slug;
  
  -- Check for uniqueness and add counter if needed
  WHILE EXISTS (SELECT 1 FROM public.trainer_profiles WHERE slug = final_slug) LOOP
    final_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;