-- Create subscription status table for users
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  subscription_status TEXT NOT NULL DEFAULT 'free' CHECK (subscription_status IN ('free', 'paid', 'early_adopter')),
  subscription_tier TEXT CHECK (subscription_tier IN ('basic', 'premium', 'pro')),
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  early_adopter_number INTEGER, -- for tracking first 100 users
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create trainer assignments table for users
CREATE TABLE public.user_trainer_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  trainer_id UUID NOT NULL,
  assignment_type TEXT NOT NULL DEFAULT 'human' CHECK (assignment_type IN ('human', 'ai')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  assigned_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_trainer_assignments ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_subscriptions
CREATE POLICY "Users can view their own subscription" 
ON public.user_subscriptions 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own subscription" 
ON public.user_subscriptions 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own subscription" 
ON public.user_subscriptions 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- RLS policies for user_trainer_assignments
CREATE POLICY "Users can view their trainer assignments" 
ON public.user_trainer_assignments 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "System can manage trainer assignments" 
ON public.user_trainer_assignments 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create triggers for updated_at
CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_trainer_assignments_updated_at
BEFORE UPDATE ON public.user_trainer_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default subscription for existing users (assuming they are early adopters)
INSERT INTO public.user_subscriptions (user_id, subscription_status, early_adopter_number)
SELECT 
  id as user_id,
  'early_adopter' as subscription_status,
  ROW_NUMBER() OVER (ORDER BY created_at) as early_adopter_number
FROM auth.users
WHERE created_at IS NOT NULL
ON CONFLICT (user_id) DO NOTHING;