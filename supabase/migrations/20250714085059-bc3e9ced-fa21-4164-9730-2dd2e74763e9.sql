-- Create marketing automation tables
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('welcome', 'expiring_soon', 'expired', 'renewal_discount')),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  variables JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for email_templates
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- RLS policies for email_templates
CREATE POLICY "Gyms can manage their email templates" 
ON public.email_templates 
FOR ALL 
USING (gym_id = auth.uid()) 
WITH CHECK (gym_id = auth.uid());

-- Create automation rules table
CREATE TABLE IF NOT EXISTS public.automation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL,
  template_id UUID NOT NULL REFERENCES public.email_templates(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('package_expiry', 'package_expired', 'welcome', 'renewal_discount')),
  days_before_expiry INTEGER DEFAULT 7,
  discount_percentage NUMERIC DEFAULT 0,
  discount_valid_days INTEGER DEFAULT 7,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for automation_rules
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

-- RLS policies for automation_rules
CREATE POLICY "Gyms can manage their automation rules" 
ON public.automation_rules 
FOR ALL 
USING (gym_id = auth.uid()) 
WITH CHECK (gym_id = auth.uid());

-- Create email campaigns table for tracking
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id UUID NOT NULL,
  template_id UUID NOT NULL REFERENCES public.email_templates(id) ON DELETE CASCADE,
  rule_id UUID REFERENCES public.automation_rules(id) ON DELETE SET NULL,
  assignment_id UUID NOT NULL REFERENCES public.gym_package_assignments(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  bounce_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for email_campaigns
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

-- RLS policies for email_campaigns
CREATE POLICY "Gyms can manage their email campaigns" 
ON public.email_campaigns 
FOR ALL 
USING (gym_id = auth.uid()) 
WITH CHECK (gym_id = auth.uid());

-- Insert default email templates for gyms
INSERT INTO public.email_templates (gym_id, template_type, name, subject, content, variables) VALUES
-- Note: We'll create a function to populate these for each gym
-- This is just the template structure

-- Create function to initialize default templates for a gym
CREATE OR REPLACE FUNCTION public.initialize_default_email_templates(gym_user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Welcome template
  INSERT INTO public.email_templates (gym_id, template_type, name, subject, content, variables)
  VALUES (
    gym_user_id,
    'welcome',
    'Welcome New Member',
    'Welcome to {gymName} - Your Fitness Journey Starts Here!',
    '<h1>Welcome {clientName}!</h1>
    <p>We''re thrilled to have you join the {gymName} family! Your {packageName} package is now active and ready to use.</p>
    <h2>Package Details:</h2>
    <ul>
      <li><strong>Package:</strong> {packageName}</li>
      <li><strong>Start Date:</strong> {startDate}</li>
      <li><strong>End Date:</strong> {endDate}</li>
      <li><strong>Sessions Included:</strong> {sessionsTotal}</li>
    </ul>
    <p>Here''s what you can expect next:</p>
    <ul>
      <li>Book your first session through our app or call us</li>
      <li>Meet your trainer and discuss your fitness goals</li>
      <li>Start your personalized workout routine</li>
    </ul>
    <p>If you have any questions, don''t hesitate to reach out. We''re here to support you every step of the way!</p>
    <p>Welcome aboard!<br>The {gymName} Team</p>',
    '{"clientName": "Client Name", "gymName": "Gym Name", "packageName": "Package Name", "startDate": "Start Date", "endDate": "End Date", "sessionsTotal": "Total Sessions"}'::jsonb
  );

  -- Expiring soon template
  INSERT INTO public.email_templates (gym_id, template_type, name, subject, content, variables)
  VALUES (
    gym_user_id,
    'expiring_soon',
    'Package Expiring Soon',
    'Your {packageName} expires in {daysLeft} days - Don''t miss out!',
    '<h1>Hi {clientName},</h1>
    <p>We wanted to remind you that your <strong>{packageName}</strong> package will expire in <strong>{daysLeft} days</strong> on {expiryDate}.</p>
    <h2>Package Summary:</h2>
    <ul>
      <li><strong>Sessions Used:</strong> {sessionsUsed} out of {sessionsTotal}</li>
      <li><strong>Expiry Date:</strong> {expiryDate}</li>
    </ul>
    <p>Don''t let your fitness momentum stop! Renew your package today to continue your progress with {gymName}.</p>
    <p><a href="#" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Renew Package</a></p>
    <p>Questions? Reply to this email or call us - we''re here to help!</p>
    <p>Best regards,<br>The {gymName} Team</p>',
    '{"clientName": "Client Name", "gymName": "Gym Name", "packageName": "Package Name", "daysLeft": "Days Left", "expiryDate": "Expiry Date", "sessionsUsed": "Sessions Used", "sessionsTotal": "Total Sessions"}'::jsonb
  );

  -- Expired template
  INSERT INTO public.email_templates (gym_id, template_type, name, subject, content, variables)
  VALUES (
    gym_user_id,
    'expired',
    'Package Expired',
    'Your {packageName} has expired - Reactivate today!',
    '<h1>Hi {clientName},</h1>
    <p>Your <strong>{packageName}</strong> package expired on {expiryDate}. We miss seeing you at {gymName}!</p>
    <h2>Your Package Summary:</h2>
    <ul>
      <li><strong>Sessions Completed:</strong> {sessionsUsed} out of {sessionsTotal}</li>
      <li><strong>Expired:</strong> {expiryDate}</li>
    </ul>
    <p>Your fitness journey doesn''t have to end here. Reactivate your membership today and get back to achieving your goals!</p>
    <p><a href="#" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reactivate Package</a></p>
    <p>We''re here whenever you''re ready to return. Your {gymName} family is waiting!</p>
    <p>Best regards,<br>The {gymName} Team</p>',
    '{"clientName": "Client Name", "gymName": "Gym Name", "packageName": "Package Name", "expiryDate": "Expiry Date", "sessionsUsed": "Sessions Used", "sessionsTotal": "Total Sessions"}'::jsonb
  );

  -- Renewal discount template
  INSERT INTO public.email_templates (gym_id, template_type, name, subject, content, variables)
  VALUES (
    gym_user_id,
    'renewal_discount',
    'Special Renewal Offer',
    'Exclusive {discountPercentage}% discount for {clientName} - Limited time!',
    '<h1>Special Offer Just for You, {clientName}!</h1>
    <p>We have an exclusive <strong>{discountPercentage}% discount</strong> waiting for you at {gymName}!</p>
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
      <h2 style="color: #28a745; margin: 0;">🎉 LIMITED TIME OFFER</h2>
      <p style="font-size: 18px; margin: 10px 0;"><strong>{discountPercentage}% OFF</strong> your next package renewal</p>
      <p style="margin: 5px 0;"><strong>Valid until:</strong> {offerExpiry}</p>
    </div>
    <p>This exclusive discount is our way of saying thank you for being part of the {gymName} community. Don''t let this opportunity slip away!</p>
    <p><a href="#" style="background-color: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">CLAIM YOUR DISCOUNT</a></p>
    <p><em>Offer expires on {offerExpiry}. Cannot be combined with other offers.</em></p>
    <p>Questions about this offer? Reply to this email or call us!</p>
    <p>Don''t wait - this deal won''t last long!</p>
    <p>The {gymName} Team</p>',
    '{"clientName": "Client Name", "gymName": "Gym Name", "discountPercentage": "Discount Percentage", "offerExpiry": "Offer Expiry Date"}'::jsonb
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON public.email_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_automation_rules_updated_at
    BEFORE UPDATE ON public.automation_rules
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at
    BEFORE UPDATE ON public.email_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();