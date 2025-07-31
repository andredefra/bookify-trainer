-- Create user_profiles table for additional user information
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  city TEXT,
  profile_image_url TEXT,
  allergies TEXT,
  health_conditions TEXT,
  physical_limitations TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  fitness_goals TEXT[],
  experience_level TEXT DEFAULT 'beginner',
  preferred_workout_time TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own profile
CREATE POLICY "Users can view their own profile" ON public.user_profiles
FOR SELECT
USING (user_id = auth.uid());

-- Create policy for users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.user_profiles
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Create policy for users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.user_profiles
FOR UPDATE
USING (user_id = auth.uid());

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create a function to get user age from date of birth
CREATE OR REPLACE FUNCTION public.get_user_age(birth_date DATE)
RETURNS INTEGER AS $$
BEGIN
  IF birth_date IS NULL THEN
    RETURN NULL;
  END IF;
  
  RETURN EXTRACT(YEAR FROM AGE(CURRENT_DATE, birth_date));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;