import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface MessageTemplate {
  id: string;
  user_id: string;
  template_type: 'package_expiring' | 'package_expired' | 'session_reminder' | 'program_ending' | 'welcome' | 'custom';
  name: string;
  subject: string;
  message: string;
  variables: Record<string, string>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MessageAutomationRule {
  id: string;
  user_id: string;
  template_id: string;
  trigger_type: 'package_expiry' | 'session_upcoming' | 'program_ending' | 'welcome' | 'custom';
  days_before_trigger: number;
  target_type: 'packages' | 'sessions' | 'programs' | 'all';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  template?: MessageTemplate;
}

export interface AutomatedMessage {
  id: string;
  user_id: string;
  template_id: string;
  rule_id: string | null;
  recipient_id: string;
  recipient_name: string;
  recipient_email: string;
  subject: string;
  message: string;
  status: 'scheduled' | 'sent' | 'failed';
  scheduled_for: string;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateMessageTemplateData {
  template_type: MessageTemplate['template_type'];
  name: string;
  subject: string;
  message: string;
  variables?: Record<string, string>;
}

export interface CreateMessageRuleData {
  template_id: string;
  trigger_type: MessageAutomationRule['trigger_type'];
  days_before_trigger: number;
  target_type: MessageAutomationRule['target_type'];
}

// Pre-built templates for common scenarios
export const DEFAULT_MESSAGE_TEMPLATES: Omit<CreateMessageTemplateData, 'variables'>[] = [
  {
    template_type: 'package_expiring',
    name: 'Package Expiring Soon',
    subject: 'Your {{packageName}} package expires in {{daysLeft}} days',
    message: `Hi {{clientName}},

Just a friendly reminder that your {{packageName}} package will expire in {{daysLeft}} days on {{expiryDate}}.

Package Details:
• Sessions Used: {{sessionsUsed}} out of {{sessionsTotal}}
• Remaining Sessions: {{remainingSessions}}

Don't let your fitness journey stop here! Contact us to renew your package and continue achieving your goals.

Best regards,
{{trainerName}}`
  },
  {
    template_type: 'package_expired',
    name: 'Package Expired',
    subject: 'Your {{packageName}} package has expired',
    message: `Hi {{clientName}},

Your {{packageName}} package expired on {{expiryDate}}. We hope you enjoyed your training sessions with us!

Final Package Summary:
• Sessions Completed: {{sessionsUsed}} out of {{sessionsTotal}}
• Package Duration: {{packageDuration}}

Ready to continue your fitness journey? We'd love to help you choose a new package that fits your goals.

Best regards,
{{trainerName}}`
  },
  {
    template_type: 'session_reminder',
    name: 'Upcoming Session Reminder',
    subject: 'Session reminder: {{sessionDate}} at {{sessionTime}}',
    message: `Hi {{clientName}},

This is a friendly reminder about your upcoming training session:

📅 Date: {{sessionDate}}
🕒 Time: {{sessionTime}}
📍 Location: {{sessionLocation}}
👨‍🏋️ Trainer: {{trainerName}}

Please arrive 5-10 minutes early to get warmed up. If you need to reschedule, please let us know at least 24 hours in advance.

Looking forward to seeing you!

Best regards,
{{trainerName}}`
  },
  {
    template_type: 'program_ending',
    name: 'Training Program Ending',
    subject: 'Your {{programName}} program is ending soon',
    message: `Hi {{clientName}},

Your {{programName}} training program will be completed in {{daysLeft}} days on {{endDate}}.

Program Progress:
• Sessions Completed: {{sessionsCompleted}} out of {{totalSessions}}
• Program Duration: {{programDuration}}
• Progress: {{completionPercentage}}%

Congratulations on your dedication! Let's discuss your next steps and how we can continue supporting your fitness goals.

Best regards,
{{trainerName}}`
  },
  {
    template_type: 'welcome',
    name: 'Welcome New Client',
    subject: 'Welcome to your fitness journey, {{clientName}}!',
    message: `Hi {{clientName}},

Welcome to our fitness family! We're thrilled to have you start this exciting journey with us.

Your {{packageName}} package is now active:
• Start Date: {{startDate}}
• Sessions Included: {{sessionsTotal}}
• Package Expires: {{expiryDate}}

Here's what happens next:
1. Book your first session through our platform
2. Meet your trainer and discuss your goals
3. Start your personalized training routine

We're here to support you every step of the way. Don't hesitate to reach out if you have any questions!

Welcome aboard!
{{trainerName}}`
  }
];

export function useMessageAutomation() {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [rules, setRules] = useState<MessageAutomationRule[]>([]);
  const [messages, setMessages] = useState<AutomatedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const initializeDefaultTemplates = async () => {
    try {
      // Create default templates with mock data for demo
      const templatesWithVariables = DEFAULT_MESSAGE_TEMPLATES.map((template, index) => ({
        ...template,
        id: `template-${index}`,
        user_id: 'mock-user',
        variables: {
          clientName: 'Client Name',
          trainerName: 'Trainer Name',
          packageName: 'Package Name',
          daysLeft: 'Days Left',
          expiryDate: 'Expiry Date',
          sessionsUsed: 'Sessions Used',
          sessionsTotal: 'Total Sessions',
          remainingSessions: 'Remaining Sessions',
          sessionDate: 'Session Date',
          sessionTime: 'Session Time',
          sessionLocation: 'Session Location',
          programName: 'Program Name',
          endDate: 'End Date',
          sessionsCompleted: 'Sessions Completed',
          totalSessions: 'Total Sessions',
          completionPercentage: 'Completion Percentage',
          startDate: 'Start Date',
          packageDuration: 'Package Duration',
          programDuration: 'Program Duration'
        },
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      setTemplates(templatesWithVariables as MessageTemplate[]);
      
      toast({
        title: "Templates Initialized",
        description: "Default message templates have been created",
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

  const fetchTemplates = async () => {
    try {
      // Mock fetch - in real implementation would fetch from database
      if (templates.length === 0) {
        await initializeDefaultTemplates();
      }
    } catch (err) {
      console.error('Error fetching message templates:', err);
      setError('Failed to fetch message templates');
    }
  };

  const fetchRules = async () => {
    try {
      // Mock fetch - in real implementation would fetch from database
      setRules([]);
    } catch (err) {
      console.error('Error fetching automation rules:', err);
      setError('Failed to fetch automation rules');
    }
  };

  const fetchMessages = async () => {
    try {
      // Mock fetch - in real implementation would fetch from database
      setMessages([]);
    } catch (err) {
      console.error('Error fetching automated messages:', err);
      setError('Failed to fetch automated messages');
    }
  };

  const createTemplate = async (templateData: CreateMessageTemplateData) => {
    try {
      const newTemplate: MessageTemplate = {
        ...templateData,
        id: `template-${Date.now()}`,
        user_id: 'mock-user',
        variables: templateData.variables || {},
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setTemplates(prev => [newTemplate, ...prev]);

      toast({
        title: "Template Created",
        description: "Message template has been created successfully",
      });

      return newTemplate;
    } catch (err) {
      console.error('Error creating template:', err);
      toast({
        title: "Error",
        description: "Failed to create message template",
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateTemplate = async (id: string, templateData: Partial<CreateMessageTemplateData>) => {
    try {
      const updatedTemplate = templates.find(t => t.id === id);
      if (!updatedTemplate) throw new Error('Template not found');

      const updated = {
        ...updatedTemplate,
        ...templateData,
        updated_at: new Date().toISOString()
      };

      setTemplates(prev => prev.map(t => t.id === id ? updated : t));

      toast({
        title: "Template Updated",
        description: "Message template has been updated successfully",
      });

      return updated;
    } catch (err) {
      console.error('Error updating template:', err);
      toast({
        title: "Error",
        description: "Failed to update message template",
        variant: "destructive",
      });
      throw err;
    }
  };

  const createRule = async (ruleData: CreateMessageRuleData) => {
    try {
      const newRule: MessageAutomationRule = {
        ...ruleData,
        id: `rule-${Date.now()}`,
        user_id: 'mock-user',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        template: templates.find(t => t.id === ruleData.template_id)
      };

      setRules(prev => [newRule, ...prev]);

      toast({
        title: "Rule Created",
        description: "Automation rule has been created successfully",
      });

      return newRule;
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
      setRules(prev => prev.map(r => 
        r.id === id 
          ? { ...r, is_active: isActive, updated_at: new Date().toISOString() }
          : r
      ));

      toast({
        title: "Rule Updated",
        description: `Automation rule has been ${isActive ? 'activated' : 'deactivated'}`,
      });
    } catch (err) {
      console.error('Error updating rule status:', err);
      toast({
        title: "Error",
        description: "Failed to update rule status",
        variant: "destructive",
      });
    }
  };

  const sendTestMessage = async (templateId: string, testRecipient: { name: string; email: string }) => {
    try {
      const template = templates.find(t => t.id === templateId);
      if (!template) throw new Error('Template not found');

      // For demo purposes, we'll just show a success message
      // In a real implementation, this would send the actual message
      toast({
        title: "Test Message Sent",
        description: `Test message has been sent to ${testRecipient.name}`,
      });

      return { success: true };
    } catch (err) {
      console.error('Error sending test message:', err);
      toast({
        title: "Error",
        description: "Failed to send test message",
        variant: "destructive",
      });
      throw err;
    }
  };

  const getMessageAnalytics = () => {
    const totalScheduled = messages.filter(m => m.status === 'scheduled').length;
    const totalSent = messages.filter(m => m.status === 'sent').length;
    const totalFailed = messages.filter(m => m.status === 'failed').length;
    const total = messages.length;

    const successRate = total > 0 ? (totalSent / total) * 100 : 0;
    const failureRate = total > 0 ? (totalFailed / total) * 100 : 0;

    return {
      totalScheduled,
      totalSent,
      totalFailed,
      total,
      successRate,
      failureRate
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
          fetchMessages()
        ]);
      } catch (err) {
        console.error('Error fetching message automation data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    templates,
    rules,
    messages,
    loading,
    error,
    createTemplate,
    updateTemplate,
    createRule,
    toggleRuleStatus,
    sendTestMessage,
    initializeDefaultTemplates,
    getMessageAnalytics,
    refetch: () => Promise.all([fetchTemplates(), fetchRules(), fetchMessages()])
  };
}