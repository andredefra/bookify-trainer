-- Create table for Trainer AI Subscriptions
CREATE TABLE public.trainer_ai_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  subscription_plan TEXT NOT NULL DEFAULT 'none' CHECK (subscription_plan IN ('none', 'ai_plus')),
  subscription_status TEXT NOT NULL DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'trialing')),
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.trainer_ai_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own AI subscription
CREATE POLICY "Users can view their own AI subscription"
ON public.trainer_ai_subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can insert their own AI subscription
CREATE POLICY "Users can insert their own AI subscription"
ON public.trainer_ai_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: System can update AI subscriptions (for webhooks)
CREATE POLICY "System can update AI subscriptions"
ON public.trainer_ai_subscriptions
FOR UPDATE
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_trainer_ai_subscriptions_updated_at
BEFORE UPDATE ON public.trainer_ai_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();