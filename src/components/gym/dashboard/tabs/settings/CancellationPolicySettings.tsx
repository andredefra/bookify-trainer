import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/context/LanguageContext";
import { Save, Loader2 } from "lucide-react";

interface GymSettings {
  free_cancellation_hours: number;
  reduced_fee_hours: number;
  reduced_fee_percentage: number;
  full_fee_percentage: number;
  refund_processing_days: number;
}

export function CancellationPolicySettings() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<GymSettings>({
    free_cancellation_hours: 48,
    reduced_fee_hours: 24,
    reduced_fee_percentage: 50,
    full_fee_percentage: 100,
    refund_processing_days: 5,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('demo-user') || '{}');
      const { data, error } = await supabase
        .from('gym_settings')
        .select('*')
        .eq('gym_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings({
          free_cancellation_hours: data.free_cancellation_hours,
          reduced_fee_hours: data.reduced_fee_hours,
          reduced_fee_percentage: data.reduced_fee_percentage,
          full_fee_percentage: data.full_fee_percentage,
          refund_processing_days: data.refund_processing_days,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load cancellation policy settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem('demo-user') || '{}');
      const { error } = await supabase
        .from('gym_settings')
        .upsert({
          gym_id: user.id,
          ...settings,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Cancellation policy settings saved successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save cancellation policy settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof GymSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cancellation Policy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="free_hours">Free Cancellation Hours</Label>
            <Input
              id="free_hours"
              type="number"
              min="1"
              value={settings.free_cancellation_hours}
              onChange={(e) => updateSetting('free_cancellation_hours', parseInt(e.target.value) || 48)}
            />
            <p className="text-sm text-muted-foreground">
              Hours before session for free cancellation
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reduced_hours">Reduced Fee Hours</Label>
            <Input
              id="reduced_hours"
              type="number"
              min="1"
              value={settings.reduced_fee_hours}
              onChange={(e) => updateSetting('reduced_fee_hours', parseInt(e.target.value) || 24)}
            />
            <p className="text-sm text-muted-foreground">
              Hours before session for reduced fee cancellation
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reduced_percentage">Reduced Fee Percentage</Label>
            <Input
              id="reduced_percentage"
              type="number"
              min="0"
              max="100"
              value={settings.reduced_fee_percentage}
              onChange={(e) => updateSetting('reduced_fee_percentage', parseInt(e.target.value) || 50)}
            />
            <p className="text-sm text-muted-foreground">
              Percentage of session cost charged for reduced fee cancellation
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_percentage">Full Fee Percentage</Label>
            <Input
              id="full_percentage"
              type="number"
              min="0"
              max="100"
              value={settings.full_fee_percentage}
              onChange={(e) => updateSetting('full_fee_percentage', parseInt(e.target.value) || 100)}
            />
            <p className="text-sm text-muted-foreground">
              Percentage of session cost charged for late cancellation
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refund_days">Refund Processing Days</Label>
            <Input
              id="refund_days"
              type="number"
              min="1"
              value={settings.refund_processing_days}
              onChange={(e) => updateSetting('refund_processing_days', parseInt(e.target.value) || 5)}
            />
            <p className="text-sm text-muted-foreground">
              Business days for processing refunds
            </p>
          </div>
        </div>

        <Button onClick={saveSettings} disabled={saving} className="w-full md:w-auto">
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
}