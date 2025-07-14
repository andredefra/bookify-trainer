import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Save, Eye, Send } from "lucide-react";
import { useMarketingAutomation, EmailTemplate } from '@/hooks/gym/useMarketingAutomation';

interface EmailTemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId?: string | null;
  onClose: () => void;
}

export function EmailTemplateEditor({ open, onOpenChange, templateId, onClose }: EmailTemplateEditorProps) {
  const { templates, createTemplate, updateTemplate, sendTestEmail } = useMarketingAutomation();
  const [formData, setFormData] = useState({
    template_type: 'welcome' as EmailTemplate['template_type'],
    name: '',
    subject: '',
    content: '',
    variables: {}
  });
  const [testEmail, setTestEmail] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const template = templateId ? templates.find(t => t.id === templateId) : null;

  useEffect(() => {
    if (template) {
      setFormData({
        template_type: template.template_type,
        name: template.name,
        subject: template.subject,
        content: template.content,
        variables: template.variables
      });
    } else {
      setFormData({
        template_type: 'welcome',
        name: '',
        subject: '',
        content: '',
        variables: {}
      });
    }
  }, [template]);

  const handleSave = async () => {
    try {
      setSaving(true);
      if (templateId) {
        await updateTemplate(templateId, formData);
      } else {
        await createTemplate(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving template:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail || !templateId) return;
    
    try {
      await sendTestEmail(templateId, testEmail);
      setTestEmail('');
    } catch (error) {
      console.error('Error sending test email:', error);
    }
  };

  const insertVariable = (variable: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      const newContent = before + `{${variable}}` + after;
      
      setFormData(prev => ({ ...prev, content: newContent }));
      
      // Set cursor position after the inserted variable
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length + 2, start + variable.length + 2);
      }, 0);
    }
  };

  const commonVariables = [
    'clientName', 'gymName', 'packageName', 'startDate', 'endDate', 
    'expiryDate', 'sessionsTotal', 'sessionsUsed', 'daysLeft', 
    'discountPercentage', 'offerExpiry'
  ];

  const renderPreview = () => {
    let preview = formData.content;
    commonVariables.forEach(variable => {
      const regex = new RegExp(`{${variable}}`, 'g');
      preview = preview.replace(regex, `<span style="background-color: #e3f2fd; padding: 2px 4px; border-radius: 3px; font-weight: bold;">[${variable}]</span>`);
    });
    return preview;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {templateId ? 'Edit Email Template' : 'Create New Email Template'}
          </DialogTitle>
          <DialogDescription>
            Create personalized email templates with dynamic variables for automated marketing campaigns.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Side */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template_type">Template Type</Label>
              <Select
                value={formData.template_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, template_type: value as EmailTemplate['template_type'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="renewal_discount">Renewal Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Welcome New Member"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="e.g., Welcome to {gymName}!"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Email Content (HTML)</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Enter your email content here. Use variables like {clientName}, {gymName}, etc."
              />
            </div>

            {/* Variables Helper */}
            <div className="space-y-2">
              <Label>Available Variables</Label>
              <div className="flex flex-wrap gap-1">
                {commonVariables.map(variable => (
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
                Click on a variable to insert it at the cursor position
              </p>
            </div>

            {/* Test Email */}
            {templateId && (
              <div className="space-y-2 border-t pt-4">
                <Label htmlFor="testEmail">Send Test Email</Label>
                <div className="flex gap-2">
                  <Input
                    id="testEmail"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                  <Button onClick={handleTestEmail} variant="outline" disabled={!testEmail}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Preview Side */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Preview</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>

            {showPreview && (
              <div className="border rounded-lg p-4 bg-background">
                <div className="space-y-2 mb-4 border-b pb-4">
                  <div className="text-sm">
                    <strong>Subject:</strong> {formData.subject}
                  </div>
                  <div className="text-sm">
                    <strong>Type:</strong> {formData.template_type}
                  </div>
                </div>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderPreview() }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !formData.name || !formData.subject}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}