import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useMessageAutomation, MessageTemplate, CreateMessageTemplateData } from '@/hooks/useMessageAutomation';
import { useTrainerPlan } from '@/context/TrainerPlanContext';

interface MessageTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: MessageTemplate | null;
  onClose: () => void;
}

export function MessageTemplateDialog({
  open,
  onOpenChange,
  template,
  onClose,
}: MessageTemplateDialogProps) {
  const { createTemplate, updateTemplate, sendTestMessage } = useMessageAutomation();
  const trainerPlan = useTrainerPlan();
  const isBasic = trainerPlan === 'basic';
  const [loading, setLoading] = useState(false);
  const [testRecipient, setTestRecipient] = useState({ name: '', email: '' });
  const [showTestSection, setShowTestSection] = useState(false);

  const [formData, setFormData] = useState<CreateMessageTemplateData & { is_active: boolean }>({
    template_type: 'custom',
    name: '',
    subject: '',
    message: '',
    variables: {},
    is_active: true,
  });

  useEffect(() => {
    if (template) {
      setFormData({
        template_type: template.template_type,
        name: template.name,
        subject: template.subject,
        message: template.message,
        variables: template.variables,
        is_active: template.is_active,
      });
    } else {
      setFormData({
        template_type: 'custom',
        name: '',
        subject: '',
        message: '',
        variables: {},
        is_active: true,
      });
    }
  }, [template]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateData = {
        template_type: formData.template_type,
        name: formData.name,
        subject: formData.subject,
        message: formData.message,
        variables: formData.variables,
      };

      if (template) {
        await updateTemplate(template.id, { ...templateData, is_active: formData.is_active } as any);
      } else {
        await createTemplate(templateData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestMessage = async () => {
    if (!template || !testRecipient.name || !testRecipient.email) return;
    
    try {
      await sendTestMessage(template.id, testRecipient);
      setShowTestSection(false);
      setTestRecipient({ name: '', email: '' });
    } catch (error) {
      console.error('Error sending test message:', error);
    }
  };

  const insertVariable = (variable: string) => {
    const textarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end);
      const newText = before + `{{${variable}}}` + after;
      
      setFormData({ ...formData, message: newText });
      
      // Focus back to textarea and set cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length + 4, start + variable.length + 4);
      }, 0);
    }
  };

  const commonVariables = [
    'clientName', 'trainerName', 'packageName', 'daysLeft', 'expiryDate',
    'sessionsUsed', 'sessionsTotal', 'remainingSessions', 'sessionDate',
    'sessionTime', 'sessionLocation', 'programName', 'endDate',
    'sessionsCompleted', 'totalSessions', 'completionPercentage',
    'startDate', 'packageDuration', 'programDuration'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {template ? 'Edit Message Template' : 'Create Message Template'}
          </DialogTitle>
          <DialogDescription>
            Create reusable message templates with dynamic variables for automated communications
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template_type">Template Type</Label>
              <Select
                value={formData.template_type}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, template_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {!isBasic && <SelectItem value="package_expiring">Package Expiring</SelectItem>}
                  {!isBasic && <SelectItem value="package_expired">Package Expired</SelectItem>}
                  {!isBasic && <SelectItem value="session_reminder">Session Reminder</SelectItem>}
                  {!isBasic && <SelectItem value="program_ending">Program Ending</SelectItem>}
                  <SelectItem value="calendar_invitation_reminder">Calendar Invitation Reminder</SelectItem>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter template name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter message subject"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message Content</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Enter your message content"
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Available Variables</Label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 border rounded-md bg-muted/50">
              {commonVariables.map((variable) => (
                <Badge
                  key={variable}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => insertVariable(variable)}
                >
                  {variable}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Click on a variable to insert it into your message. Variables are replaced with actual values when messages are sent.
            </p>
          </div>

          {template && (
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="is_active">Template is active</Label>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <div className="space-x-2">
              {template && (
                <>
                  {!showTestSection ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowTestSection(true)}
                    >
                      Test Message
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Test Name"
                        value={testRecipient.name}
                        onChange={(e) => setTestRecipient({ ...testRecipient, name: e.target.value })}
                        className="w-32"
                      />
                      <Input
                        placeholder="Test Email"
                        type="email"
                        value={testRecipient.email}
                        onChange={(e) => setTestRecipient({ ...testRecipient, email: e.target.value })}
                        className="w-48"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleTestMessage}
                        disabled={!testRecipient.name || !testRecipient.email}
                      >
                        Send Test
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowTestSection(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : template ? 'Update Template' : 'Create Template'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}