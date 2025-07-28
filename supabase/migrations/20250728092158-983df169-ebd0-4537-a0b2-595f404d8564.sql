-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  age INTEGER,
  weight NUMERIC,
  height NUMERIC,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
  fitness_goals JSONB DEFAULT '[]'::jsonb,
  medical_conditions TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create training plans table
CREATE TABLE public.training_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_weeks INTEGER,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  goals JSONB DEFAULT '[]'::jsonb,
  plan_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'active', 'completed', 'cancelled')),
  created_by_ai BOOLEAN DEFAULT true,
  message_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for training plans
ALTER TABLE public.training_plans ENABLE ROW LEVEL SECURITY;

-- Create policies for training plans
CREATE POLICY "Users can view their own training plans" 
ON public.training_plans 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own training plans" 
ON public.training_plans 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert training plans" 
ON public.training_plans 
FOR INSERT 
WITH CHECK (true);

-- Create nutrition plans table
CREATE TABLE public.nutrition_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  daily_calories INTEGER,
  macros JSONB DEFAULT '{}'::jsonb,
  meal_plan JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'active', 'completed', 'cancelled')),
  created_by_ai BOOLEAN DEFAULT true,
  message_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for nutrition plans
ALTER TABLE public.nutrition_plans ENABLE ROW LEVEL SECURITY;

-- Create policies for nutrition plans
CREATE POLICY "Users can view their own nutrition plans" 
ON public.nutrition_plans 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own nutrition plans" 
ON public.nutrition_plans 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert nutrition plans" 
ON public.nutrition_plans 
FOR INSERT 
WITH CHECK (true);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    new.id, 
    new.raw_user_meta_data ->> 'first_name', 
    new.raw_user_meta_data ->> 'last_name'
  );
  RETURN new;
END;
$$;

-- Trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_training_plans_user_id ON public.training_plans(user_id);
CREATE INDEX idx_training_plans_status ON public.training_plans(status);
CREATE INDEX idx_nutrition_plans_user_id ON public.nutrition_plans(user_id);
CREATE INDEX idx_nutrition_plans_status ON public.nutrition_plans(status);

-- Enable realtime for new tables
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.training_plans REPLICA IDENTITY FULL;
ALTER TABLE public.nutrition_plans REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.training_plans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.nutrition_plans;