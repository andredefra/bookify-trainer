import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EmailTemplate {
  id: string;
  gym_id: string;
  template_type: 'welcome' | 'expiring_soon' | 'expired' | 'renewal_discount';
  name: string;
  subject: string;
  content: string;
  variables: Record<string, string>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AutomationRule {
  id: string;
  gym_id: string;
  template_id: string;
  trigger_type: 'package_expiry' | 'package_expired' | 'welcome' | 'renewal_discount';
  days_before_expiry: number;
  discount_percentage: number;
  discount_valid_days: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  template?: EmailTemplate;
}

export interface EmailCampaign {
  id: string;
  gym_id: string;
  template_id: string;
  rule_id: string | null;
  assignment_id: string;
  recipient_email: string;
  recipient_name: string | null;
  subject: string;
  content: string;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  sent_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  bounce_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateEmailTemplateData {
  template_type: EmailTemplate['template_type'];
  name: string;
  subject: string;
  content: string;
  variables?: Record<string, string>;
}

export interface CreateAutomationRuleData {
  template_id: string;
  trigger_type: AutomationRule['trigger_type'];
  days_before_expiry?: number;
  discount_percentage?: number;
  discount_valid_days?: number;
}

export function useMarketingAutomation() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('template_type', { ascending: true });

      if (error) throw error;
      setTemplates((data || []) as EmailTemplate[]);
    } catch (err) {
      console.error('Error fetching email templates:', err);
      setError('Failed to fetch email templates');
    }
  };

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .select(`
          *,
          template:email_templates(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules((data || []) as AutomationRule[]);
    } catch (err) {
      console.error('Error fetching automation rules:', err);
      setError('Failed to fetch automation rules');
    }
  };

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setCampaigns((data || []) as EmailCampaign[]);
    } catch (err) {
      console.error('Error fetching email campaigns:', err);
      setError('Failed to fetch email campaigns');
    }
  };

  const initializeDefaultTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if templates already exist
      const { data: existingTemplates } = await supabase
        .from('email_templates')
        .select('id')
        .limit(1);

      if (existingTemplates && existingTemplates.length > 0) {
        return; // Templates already exist
      }

      // Call the function to initialize default templates
      const { error } = await supabase.rpc('initialize_default_email_templates', {
        gym_user_id: user.id
      });

      if (error) throw error;

      await fetchTemplates();
      
      toast({
        title: "Templates Initialized",
        description: "Default email templates have been created for your gym",
      });
    } catch (err) {
      console.error('Error initializing default templates:', err);
      toast({
        title: "Error",
        description: "Failed to initialize default templates",
        variant: "destructive",
      });
    }
  };

  const createTemplate = async (templateData: CreateEmailTemplateData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('email_templates')
        .insert({
          ...templateData,
          gym_id: user.id,
          variables: templateData.variables || {}
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Template Created",
        description: "Email template has been created successfully",
      });

      await fetchTemplates();
      return data;
    } catch (err) {
      console.error('Error creating template:', err);
      toast({
        title: "Error",
        description: "Failed to create email template",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateTemplate = async (id: string, templateData: Partial<CreateEmailTemplateData>) => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .update(templateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Template Updated",
        description: "Email template has been updated successfully",
      });

      await fetchTemplates();
      return data;
    } catch (err) {
      console.error('Error updating template:', err);
      toast({
        title: "Error",
        description: "Failed to update email template",
        variant: "destructive",
      });
      throw err;
    }
  };

  const createRule = async (ruleData: CreateAutomationRuleData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('automation_rules')
        .insert({
          ...ruleData,
          gym_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Rule Created",
        description: "Automation rule has been created successfully",
      });

      await fetchRules();
      return data;
    } catch (err) {
      console.error('Error creating rule:', err);
      toast({
        title: "Error",
        description: "Failed to create automation rule",
        variant: "destructive",
      });
      throw err;
    }
  };

  const toggleRuleStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('automation_rules')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Rule Updated",
        description: `Automation rule has been ${isActive ? 'activated' : 'deactivated'}`,
      });

      await fetchRules();
    } catch (err) {
      console.error('Error updating rule status:', err);
      toast({
        title: "Error",
        description: "Failed to update rule status",
        variant: "destructive",
      });
    }
  };

  const sendTestEmail = async (templateId: string, testEmail: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-marketing-email', {
        body: {
          templateId,
          testEmail,
          isTest: true
        }
      });

      if (error) throw error;

      toast({
        title: "Test Email Sent",
        description: `Test email has been sent to ${testEmail}`,
      });

      return data;
    } catch (err) {
      console.error('Error sending test email:', err);
      toast({
        title: "Error",
        description: "Failed to send test email",
        variant: "destructive",
      });
      throw err;
    }
  };

  const getEmailAnalytics = () => {
    const totalSent = campaigns.filter(c => c.status === 'sent' || c.status === 'delivered').length;
    const totalOpened = campaigns.filter(c => c.opened_at).length;
    const totalClicked = campaigns.filter(c => c.clicked_at).length;
    const totalBounced = campaigns.filter(c => c.status === 'bounced').length;

    const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
    const clickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;
    const bounceRate = totalSent > 0 ? (totalBounced / totalSent) * 100 : 0;

    return {
      totalSent,
      totalOpened,
      totalClicked,
      totalBounced,
      openRate,
      clickRate,
      bounceRate
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchTemplates(),
          fetchRules(),
          fetchCampaigns()
        ]);
      } catch (err) {
        console.error('Error fetching marketing automation data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    templates,
    rules,
    campaigns,
    loading,
    error,
    createTemplate,
    updateTemplate,
    createRule,
    toggleRuleStatus,
    sendTestEmail,
    initializeDefaultTemplates,
    getEmailAnalytics,
    refetch: () => Promise.all([fetchTemplates(), fetchRules(), fetchCampaigns()])
  };
}