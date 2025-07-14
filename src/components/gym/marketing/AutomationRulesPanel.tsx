import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Calendar, Percent } from "lucide-react";
import { useMarketingAutomation, EmailTemplate, AutomationRule } from '@/hooks/gym/useMarketingAutomation';

interface AutomationRulesPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: EmailTemplate[];
}

export function AutomationRulesPanel({ open, onOpenChange, templates }: AutomationRulesPanelProps) {
  const { createRule } = useMarketingAutomation();
  const [formData, setFormData] = useState({
    template_id: '',
    trigger_type: 'welcome' as AutomationRule['trigger_type'],
    days_before_expiry: 7,
    discount_percentage: 0,
    discount_valid_days: 7
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.template_id) return;
    
    try {
      setSaving(true);
      await createRule({
        template_id: formData.template_id,
        trigger_type: formData.trigger_type,
        days_before_expiry: formData.trigger_type === 'package_expiry' ? formData.days_before_expiry : undefined,
        discount_percentage: formData.trigger_type === 'renewal_discount' ? formData.discount_percentage : undefined,
        discount_valid_days: formData.trigger_type === 'renewal_discount' ? formData.discount_valid_days : undefined
      });
      
      // Reset form
      setFormData({
        template_id: '',
        trigger_type: 'welcome',
        days_before_expiry: 7,
        discount_percentage: 0,
        discount_valid_days: 7
      });
    } catch (error) {
      console.error('Error saving rule:', error);
    } finally {
      setSaving(false);
    }
  };

  const getTemplatesByType = (type: string) => {
    return templates.filter(t => t.template_type === type);
  };

  const selectedTemplate = templates.find(t => t.id === formData.template_id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Automation Rules</DialogTitle>
          <DialogDescription>
            Configure when and how your email templates are automatically triggered based on customer behavior and package status.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rule Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Rule
              </CardTitle>
              <CardDescription>
                Set up a new automation rule to send emails automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trigger_type">Trigger Type</Label>
                <Select
                  value={formData.trigger_type}
                  onValueChange={(value) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      trigger_type: value as AutomationRule['trigger_type'],
                      template_id: '' // Reset template selection when trigger changes
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">New Package Purchase (Welcome)</SelectItem>
                    <SelectItem value="package_expiry">Package Expiring Soon</SelectItem>
                    <SelectItem value="package_expired">Package Expired</SelectItem>
                    <SelectItem value="renewal_discount">Renewal Discount Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template_id">Email Template</Label>
                <Select
                  value={formData.template_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, template_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTemplatesByType(formData.trigger_type).map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getTemplatesByType(formData.trigger_type).length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No templates available for this trigger type. Create a template first.
                  </p>
                )}
              </div>

              {/* Days Before Expiry - Only for package_expiry trigger */}
              {formData.trigger_type === 'package_expiry' && (
                <div className="space-y-2">
                  <Label htmlFor="days_before_expiry" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Days Before Expiry
                  </Label>
                  <Input
                    id="days_before_expiry"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.days_before_expiry}
                    onChange={(e) => setFormData(prev => ({ ...prev, days_before_expiry: parseInt(e.target.value) || 7 }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Send the email this many days before the package expires
                  </p>
                </div>
              )}

              {/* Discount Settings - Only for renewal_discount trigger */}
              {formData.trigger_type === 'renewal_discount' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount_percentage" className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Discount Percentage
                    </Label>
                    <Input
                      id="discount_percentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount_percentage}
                      onChange={(e) => setFormData(prev => ({ ...prev, discount_percentage: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount_valid_days">Valid Days</Label>
                    <Input
                      id="discount_valid_days"
                      type="number"
                      min="1"
                      max="30"
                      value={formData.discount_valid_days}
                      onChange={(e) => setFormData(prev => ({ ...prev, discount_valid_days: parseInt(e.target.value) || 7 }))}
                    />
                  </div>
                </div>
              )}

              {/* Preview */}
              {selectedTemplate && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{selectedTemplate.template_type}</Badge>
                        <span className="font-medium">{selectedTemplate.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Subject: {selectedTemplate.subject}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Rule Types Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Trigger Types Explained
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Welcome</Badge>
                  <span className="text-sm">Sent immediately when a client purchases a new package</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>
                  <span className="text-sm">Sent X days before package expires to encourage renewal</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">Expired</Badge>
                  <span className="text-sm">Sent when package has expired to win back customers</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-800">Renewal Discount</Badge>
                  <span className="text-sm">Sent with special discount offers to encourage renewals</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving || !formData.template_id}
          >
            {saving ? 'Creating...' : 'Create Rule'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}