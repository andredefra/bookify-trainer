
-- Add receipt tracking to gym_package_assignments
ALTER TABLE public.gym_package_assignments 
ADD COLUMN receipt_sent_at TIMESTAMP WITH TIME ZONE NULL,
ADD COLUMN receipt_number TEXT NULL,
ADD COLUMN receipt_url TEXT NULL;

-- Add receipt delivery template type to message templates
-- First, let's check if we need to modify the template_type check constraint
DO $$
BEGIN
    -- Drop the existing constraint if it exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.check_constraints 
        WHERE constraint_name = 'message_templates_template_type_check'
    ) THEN
        ALTER TABLE public.message_templates DROP CONSTRAINT message_templates_template_type_check;
    END IF;
    
    -- Add the new constraint with receipt_delivery included
    ALTER TABLE public.message_templates 
    ADD CONSTRAINT message_templates_template_type_check 
    CHECK (template_type IN ('package_expiring', 'package_expired', 'session_reminder', 'program_ending', 'welcome', 'custom', 'receipt_delivery'));
END $$;

-- Add receipt delivery automation rule type
DO $$
BEGIN
    -- Drop the existing constraint if it exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.check_constraints 
        WHERE constraint_name = 'message_automation_rules_trigger_type_check'
    ) THEN
        ALTER TABLE public.message_automation_rules DROP CONSTRAINT message_automation_rules_trigger_type_check;
    END IF;
    
    -- Add the new constraint with receipt_delivery included
    ALTER TABLE public.message_automation_rules 
    ADD CONSTRAINT message_automation_rules_trigger_type_check 
    CHECK (trigger_type IN ('package_expiring', 'package_expired', 'session_reminder', 'program_ending', 'custom', 'receipt_delivery'));
END $$;

-- Create index for efficient receipt tracking queries
CREATE INDEX IF NOT EXISTS idx_gym_package_assignments_receipt_sent 
ON public.gym_package_assignments(gym_id, receipt_sent_at) 
WHERE payment_status = 'paid';
