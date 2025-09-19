import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock, Bell, AlertTriangle, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PaymentSettings {
  allowInstallments: boolean;
  defaultInstallmentOptions: number[];
  maxInstallments: number;
  minAmountForInstallments: number;
  processingFeeEnabled: boolean;
  processingFeePercentage: number;
  automaticReminders: boolean;
  reminderDaysBefore: number;
  overdueGraceDays: number;
  reminderTemplate: string;
  overdueTemplate: string;
}

const DEFAULT_SETTINGS: PaymentSettings = {
  allowInstallments: true,
  defaultInstallmentOptions: [2, 3, 4, 6],
  maxInstallments: 6,
  minAmountForInstallments: 100,
  processingFeeEnabled: false,
  processingFeePercentage: 2.5,
  automaticReminders: true,
  reminderDaysBefore: 7,
  overdueGraceDays: 3,
  reminderTemplate: "Hi {client_name}, this is a friendly reminder that your payment of €{amount} is due on {due_date}. Please make your payment to avoid any service interruption.",
  overdueTemplate: "Hi {client_name}, your payment of €{amount} was due on {due_date} and is now overdue. Please contact us immediately to resolve this matter."
};

export function PaymentSettingsSection() {
  const [settings, setSettings] = useState<PaymentSettings>(() => {
    const saved = localStorage.getItem('payment-settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const handleSave = () => {
    localStorage.setItem('payment-settings', JSON.stringify(settings));
    toast({
      title: "Payment Settings Saved",
      description: "Your installment and reminder preferences have been updated.",
    });
  };

  const updateSetting = <K extends keyof PaymentSettings>(
    key: K,
    value: PaymentSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addInstallmentOption = () => {
    const newOption = prompt("Enter number of installments (e.g., 12):");
    if (newOption && !isNaN(Number(newOption))) {
      const option = Number(newOption);
      if (!settings.defaultInstallmentOptions.includes(option)) {
        updateSetting('defaultInstallmentOptions', [...settings.defaultInstallmentOptions, option].sort((a, b) => a - b));
      }
    }
  };

  const removeInstallmentOption = (option: number) => {
    updateSetting('defaultInstallmentOptions', settings.defaultInstallmentOptions.filter(opt => opt !== option));
  };

  return (
    <div className="space-y-6">
      {/* Installment Plans Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Installment Plans
          </CardTitle>
          <CardDescription>
            Configure available installment options for your clients
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Allow Installment Payments</Label>
              <p className="text-sm text-muted-foreground">
                Enable clients to pay for packages and programs in installments
              </p>
            </div>
            <Switch
              checked={settings.allowInstallments}
              onCheckedChange={(checked) => updateSetting('allowInstallments', checked)}
            />
          </div>

          {settings.allowInstallments && (
            <>
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Amount for Installments</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">€</span>
                    <Input
                      type="number"
                      className="pl-8"
                      value={settings.minAmountForInstallments}
                      onChange={(e) => updateSetting('minAmountForInstallments', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Maximum Installments</Label>
                  <Select
                    value={settings.maxInstallments.toString()}
                    onValueChange={(value) => updateSetting('maxInstallments', Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[3, 4, 6, 12, 24].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} months
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Available Installment Options</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addInstallmentOption}
                  >
                    Add Option
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {settings.defaultInstallmentOptions.map(option => (
                    <Badge
                      key={option}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeInstallmentOption(option)}
                    >
                      {option} months ×
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Click on a badge to remove it
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Processing Fees</Label>
                    <p className="text-sm text-muted-foreground">
                      Add processing fees for installment payments
                    </p>
                  </div>
                  <Switch
                    checked={settings.processingFeeEnabled}
                    onCheckedChange={(checked) => updateSetting('processingFeeEnabled', checked)}
                  />
                </div>

                {settings.processingFeeEnabled && (
                  <div className="space-y-2">
                    <Label>Processing Fee (%)</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.1"
                        max="10"
                        className="pr-8"
                        value={settings.processingFeePercentage}
                        onChange={(e) => updateSetting('processingFeePercentage', Number(e.target.value))}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Payment Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Payment Reminders
          </CardTitle>
          <CardDescription>
            Automate payment reminders for installments and overdue payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Automatic Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Send automatic payment reminders to clients
              </p>
            </div>
            <Switch
              checked={settings.automaticReminders}
              onCheckedChange={(checked) => updateSetting('automaticReminders', checked)}
            />
          </div>

          {settings.automaticReminders && (
            <>
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Reminder Days Before Due Date
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.reminderDaysBefore}
                    onChange={(e) => updateSetting('reminderDaysBefore', Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Grace Period (days after due date)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="30"
                    value={settings.overdueGraceDays}
                    onChange={(e) => updateSetting('overdueGraceDays', Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Payment Reminder Template</Label>
                <Textarea
                  placeholder="Customize your payment reminder message..."
                  value={settings.reminderTemplate}
                  onChange={(e) => updateSetting('reminderTemplate', e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: {"{client_name}"}, {"{amount}"}, {"{due_date}"}
                </p>
              </div>

              <div className="space-y-3">
                <Label>Overdue Payment Template</Label>
                <Textarea
                  placeholder="Customize your overdue payment message..."
                  value={settings.overdueTemplate}
                  onChange={(e) => updateSetting('overdueTemplate', e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Used for payments that are past due date + grace period
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="min-w-[120px]">
          <Settings className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}