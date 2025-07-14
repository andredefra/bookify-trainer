-- Create profiles table for users (clients, trainers, gym admins)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT NOT NULL DEFAULT 'client', -- 'client', 'trainer', 'gym'
  phone TEXT,
  date_of_birth DATE,
  emergency_contact TEXT,
  emergency_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles  
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Gyms can view profiles of their clients" ON public.profiles
  FOR SELECT USING (
    user_type = 'client' OR 
    EXISTS (
      SELECT 1 FROM gym_package_assignments gpa 
      WHERE gpa.client_id = profiles.id 
      AND gpa.gym_id = auth.uid()
    )
  );

-- Create gym_clients table to track clients specifically
CREATE TABLE IF NOT EXISTS public.gym_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  membership_type TEXT NOT NULL DEFAULT 'basic',
  status TEXT NOT NULL DEFAULT 'active',
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_activity_date TIMESTAMP WITH TIME ZONE,
  emergency_contact TEXT,
  emergency_phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gym_id, client_id)
);

-- Enable RLS
ALTER TABLE public.gym_clients ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Gyms can manage their clients" ON public.gym_clients
  FOR ALL USING (gym_id = auth.uid());

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gym_clients_updated_at
  BEFORE UPDATE ON public.gym_clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles  
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();