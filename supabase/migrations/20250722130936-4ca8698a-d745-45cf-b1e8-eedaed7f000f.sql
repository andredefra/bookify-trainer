-- Create message templates table
CREATE TABLE public.message_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('package_expiring', 'package_expired', 'session_reminder', 'program_ending', 'custom')),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  variables JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create message automation rules table
CREATE TABLE public.message_automation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  template_id UUID NOT NULL REFERENCES public.message_templates(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('package_expiring', 'package_expired', 'session_reminder', 'program_ending')),
  days_before INTEGER DEFAULT 7,
  is_active BOOLEAN DEFAULT true,
  target_audience TEXT DEFAULT 'all' CHECK (target_audience IN ('all', 'active_clients', 'specific_package')),
  specific_conditions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create automated messages table (for tracking sent messages)
CREATE TABLE public.automated_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id UUID NOT NULL REFERENCES public.message_automation_rules(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automated_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for message_templates
CREATE POLICY "Users can manage their own message templates" 
ON public.message_templates 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create RLS policies for message_automation_rules
CREATE POLICY "Users can manage their own automation rules" 
ON public.message_automation_rules 
FOR ALL 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create RLS policies for automated_messages
CREATE POLICY "Users can view their own automated messages" 
ON public.automated_messages 
FOR SELECT 
USING (rule_id IN (SELECT id FROM public.message_automation_rules WHERE user_id = auth.uid()));

CREATE POLICY "System can manage automated messages" 
ON public.automated_messages 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_message_templates_user_id ON public.message_templates(user_id);
CREATE INDEX idx_message_templates_type ON public.message_templates(template_type);
CREATE INDEX idx_automation_rules_user_id ON public.message_automation_rules(user_id);
CREATE INDEX idx_automation_rules_trigger ON public.message_automation_rules(trigger_type);
CREATE INDEX idx_automated_messages_rule_id ON public.automated_messages(rule_id);
CREATE INDEX idx_automated_messages_status ON public.automated_messages(status);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_message_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_automation_rules_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_automated_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_message_templates_updated_at
BEFORE UPDATE ON public.message_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_message_templates_updated_at();

CREATE TRIGGER update_automation_rules_updated_at
BEFORE UPDATE ON public.message_automation_rules
FOR EACH ROW
EXECUTE FUNCTION public.update_automation_rules_updated_at();

CREATE TRIGGER update_automated_messages_updated_at
BEFORE UPDATE ON public.automated_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_automated_messages_updated_at();