-- Create gym_settings table for configurable cancellation policies
CREATE TABLE public.gym_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL,
  free_cancellation_hours INTEGER NOT NULL DEFAULT 48,
  reduced_fee_hours INTEGER NOT NULL DEFAULT 24,
  reduced_fee_percentage INTEGER NOT NULL DEFAULT 50,
  full_fee_percentage INTEGER NOT NULL DEFAULT 100,
  refund_processing_days INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(gym_id)
);

-- Enable Row Level Security
ALTER TABLE public.gym_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for gym settings
CREATE POLICY "Gyms can manage their own settings" 
ON public.gym_settings 
FOR ALL 
USING (gym_id = auth.uid())
WITH CHECK (gym_id = auth.uid());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gym_settings_updated_at
BEFORE UPDATE ON public.gym_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();