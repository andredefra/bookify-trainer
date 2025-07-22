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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMessageAutomation, MessageTemplate, MessageAutomationRule, CreateMessageRuleData } from '@/hooks/useMessageAutomation';

interface MessageRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule?: MessageAutomationRule | null;
  templates: MessageTemplate[];
  onClose: () => void;
}

export function MessageRuleDialog({
  open,
  onOpenChange,
  rule,
  templates,
  onClose,
}: MessageRuleDialogProps) {
  const { createRule } = useMessageAutomation();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CreateMessageRuleData>({
    template_id: '',
    trigger_type: 'package_expiry',
    days_before_trigger: 7,
    target_type: 'packages',
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        template_id: rule.template_id,
        trigger_type: rule.trigger_type,
        days_before_trigger: rule.days_before_trigger,
        target_type: rule.target_type,
      });
    } else {
      setFormData({
        template_id: '',
        trigger_type: 'package_expiry',
        days_before_trigger: 7,
        target_type: 'packages',
      });
    }
  }, [rule]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createRule(formData);
      onClose();
    } catch (error) {
      console.error('Error saving rule:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeTemplates = templates.filter(t => t.is_active);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {rule ? 'Edit Automation Rule' : 'Create Automation Rule'}
          </DialogTitle>
          <DialogDescription>
            Set up automatic message triggers based on events and schedules
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template_id">Message Template</Label>
            <Select
              value={formData.template_id}
              onValueChange={(value) => setFormData({ ...formData, template_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {activeTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trigger_type">Trigger Type</Label>
            <Select
              value={formData.trigger_type}
              onValueChange={(value: any) =>
                setFormData({ ...formData, trigger_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="package_expiry">Package Expiry</SelectItem>
                <SelectItem value="session_upcoming">Upcoming Session</SelectItem>
                <SelectItem value="program_ending">Program Ending</SelectItem>
                <SelectItem value="welcome">New Client Welcome</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_type">Target Type</Label>
            <Select
              value={formData.target_type}
              onValueChange={(value: any) =>
                setFormData({ ...formData, target_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="packages">Packages</SelectItem>
                <SelectItem value="sessions">Sessions</SelectItem>
                <SelectItem value="programs">Programs</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="days_before_trigger">Days Before Event</Label>
            <Input
              id="days_before_trigger"
              type="number"
              min="1"
              max="365"
              value={formData.days_before_trigger}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  days_before_trigger: parseInt(e.target.value) || 1,
                })
              }
              required
            />
            <p className="text-xs text-muted-foreground">
              Number of days before the event when the message should be sent
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.template_id}
            >
              {loading ? 'Creating...' : rule ? 'Update Rule' : 'Create Rule'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}