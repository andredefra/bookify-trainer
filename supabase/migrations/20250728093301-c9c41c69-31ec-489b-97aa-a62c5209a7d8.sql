-- Add missing columns to existing profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS weight NUMERIC;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS height NUMERIC;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS fitness_level TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS fitness_goals JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS medical_conditions TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- Add constraints to profiles table
ALTER TABLE public.profiles ADD CONSTRAINT profiles_gender_check 
CHECK (gender IS NULL OR gender IN ('male', 'female', 'other'));

ALTER TABLE public.profiles ADD CONSTRAINT profiles_fitness_level_check 
CHECK (fitness_level IS NULL OR fitness_level IN ('beginner', 'intermediate', 'advanced'));

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

-- Create indexes for better performance
CREATE INDEX idx_training_plans_user_id ON public.training_plans(user_id);
CREATE INDEX idx_training_plans_status ON public.training_plans(status);
CREATE INDEX idx_nutrition_plans_user_id ON public.nutrition_plans(user_id);
CREATE INDEX idx_nutrition_plans_status ON public.nutrition_plans(status);

-- Enable realtime for new tables
ALTER TABLE public.training_plans REPLICA IDENTITY FULL;
ALTER TABLE public.nutrition_plans REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.training_plans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.nutrition_plans;