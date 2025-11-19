-- Create client_subscriptions table for managing client-specific subscriptions
CREATE TABLE public.client_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Subscription info
  subscription_plan TEXT NOT NULL DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro')),
  subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired', 'trialing')),
  
  -- Stripe info
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  
  -- Dates
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  trial_end_date TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(user_id)
);

-- Create ai_usage_tracking table for tracking AI feature usage and costs
CREATE TABLE public.ai_usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  feature TEXT NOT NULL CHECK (feature IN ('chat', 'vision', 'image_gen', 'video_search')),
  tokens_used INTEGER,
  cost_estimate DECIMAL(10,4),
  context TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_client_subscriptions_user_id ON public.client_subscriptions(user_id);
CREATE INDEX idx_client_subscriptions_stripe_customer ON public.client_subscriptions(stripe_customer_id);
CREATE INDEX idx_client_subscriptions_status ON public.client_subscriptions(subscription_status);
CREATE INDEX idx_ai_usage_user_date ON public.ai_usage_tracking(user_id, created_at);

-- Trigger for updated_at on client_subscriptions
CREATE TRIGGER update_client_subscriptions_updated_at
  BEFORE UPDATE ON public.client_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for client_subscriptions
ALTER TABLE public.client_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own client subscription"
ON public.client_subscriptions FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own client subscription"
ON public.client_subscriptions FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "System can update client subscriptions"
ON public.client_subscriptions FOR UPDATE
USING (true);

-- RLS Policies for ai_usage_tracking
ALTER TABLE public.ai_usage_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own AI usage"
ON public.ai_usage_tracking FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "System can insert AI usage"
ON public.ai_usage_tracking FOR INSERT
WITH CHECK (true);

-- Create chat-media storage bucket for AI chat attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-media', 'chat-media', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for chat-media bucket
CREATE POLICY "Users can upload their own chat media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'chat-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own chat media"
ON storage.objects FOR SELECT
USING (bucket_id = 'chat-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own chat media"
ON storage.objects FOR DELETE
USING (bucket_id = 'chat-media' AND auth.uid()::text = (storage.foldername(name))[1]);