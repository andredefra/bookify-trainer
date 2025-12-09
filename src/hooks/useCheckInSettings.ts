import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

export type CheckInFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export interface CheckInSettings {
  id: string;
  trainer_id: string;
  client_id: string;
  frequency: CheckInFrequency;
  enabled: boolean;
  reminder_time: string;
  reminder_days_before: number;
  include_weight: boolean;
  include_measurements: boolean;
  include_photos: boolean;
  include_mood: boolean;
  include_notes: boolean;
  custom_questions: CustomQuestion[];
  created_at: string;
  updated_at: string;
}

export interface CustomQuestion {
  id: string;
  question: string;
  type: 'text' | 'rating' | 'yes_no';
}

export interface CheckInSettingsInput {
  frequency: CheckInFrequency;
  enabled: boolean;
  reminder_time: string;
  reminder_days_before: number;
  include_weight: boolean;
  include_measurements: boolean;
  include_photos: boolean;
  include_mood: boolean;
  include_notes: boolean;
  custom_questions: CustomQuestion[];
}

const DEMO_TRAINER_ID = '00000000-0000-0000-0000-000000000001';

function parseCustomQuestions(data: Json | null): CustomQuestion[] {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: unknown) => {
    const q = item as Record<string, unknown>;
    return {
      id: String(q.id || ''),
      question: String(q.question || ''),
      type: (q.type as 'text' | 'rating' | 'yes_no') || 'text'
    };
  });
}

function isValidFrequency(freq: string): freq is CheckInFrequency {
  return ['daily', 'weekly', 'biweekly', 'monthly'].includes(freq);
}

export function useCheckInSettings(clientId: string | null) {
  const [settings, setSettings] = useState<CheckInSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    if (!clientId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('check_in_settings')
        .select('*')
        .eq('client_id', clientId)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        const frequency = isValidFrequency(data.frequency) ? data.frequency : 'weekly';
        setSettings({
          id: data.id,
          trainer_id: data.trainer_id,
          client_id: data.client_id,
          frequency,
          enabled: data.enabled,
          reminder_time: data.reminder_time || '09:00',
          reminder_days_before: data.reminder_days_before || 1,
          include_weight: data.include_weight,
          include_measurements: data.include_measurements,
          include_photos: data.include_photos,
          include_mood: data.include_mood,
          include_notes: data.include_notes,
          custom_questions: parseCustomQuestions(data.custom_questions),
          created_at: data.created_at,
          updated_at: data.updated_at
        });
      } else {
        setSettings(null);
      }
    } catch (error) {
      console.error('Error fetching check-in settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (input: CheckInSettingsInput, trainerId?: string) => {
    if (!clientId) return null;
    
    const trainerIdToUse = trainerId || DEMO_TRAINER_ID;
    const customQuestionsJson = input.custom_questions as unknown as Json;
    
    try {
      if (settings) {
        // Update existing settings
        const { data, error } = await supabase
          .from('check_in_settings')
          .update({
            frequency: input.frequency,
            enabled: input.enabled,
            reminder_time: input.reminder_time,
            reminder_days_before: input.reminder_days_before,
            include_weight: input.include_weight,
            include_measurements: input.include_measurements,
            include_photos: input.include_photos,
            include_mood: input.include_mood,
            include_notes: input.include_notes,
            custom_questions: customQuestionsJson,
            updated_at: new Date().toISOString()
          })
          .eq('id', settings.id)
          .select()
          .single();

        if (error) throw error;
        
        const frequency = isValidFrequency(data.frequency) ? data.frequency : 'weekly';
        const updatedSettings: CheckInSettings = {
          id: data.id,
          trainer_id: data.trainer_id,
          client_id: data.client_id,
          frequency,
          enabled: data.enabled,
          reminder_time: data.reminder_time || '09:00',
          reminder_days_before: data.reminder_days_before || 1,
          include_weight: data.include_weight,
          include_measurements: data.include_measurements,
          include_photos: data.include_photos,
          include_mood: data.include_mood,
          include_notes: data.include_notes,
          custom_questions: parseCustomQuestions(data.custom_questions),
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        
        setSettings(updatedSettings);
        
        toast({
          title: "Check-in settings updated",
          description: `${input.frequency.charAt(0).toUpperCase() + input.frequency.slice(1)} check-ins configured for this client.`
        });
        
        return data;
      } else {
        // Create new settings
        const { data, error } = await supabase
          .from('check_in_settings')
          .insert({
            trainer_id: trainerIdToUse,
            client_id: clientId,
            frequency: input.frequency,
            enabled: input.enabled,
            reminder_time: input.reminder_time,
            reminder_days_before: input.reminder_days_before,
            include_weight: input.include_weight,
            include_measurements: input.include_measurements,
            include_photos: input.include_photos,
            include_mood: input.include_mood,
            include_notes: input.include_notes,
            custom_questions: customQuestionsJson
          })
          .select()
          .single();

        if (error) throw error;
        
        const frequency = isValidFrequency(data.frequency) ? data.frequency : 'weekly';
        const newSettings: CheckInSettings = {
          id: data.id,
          trainer_id: data.trainer_id,
          client_id: data.client_id,
          frequency,
          enabled: data.enabled,
          reminder_time: data.reminder_time || '09:00',
          reminder_days_before: data.reminder_days_before || 1,
          include_weight: data.include_weight,
          include_measurements: data.include_measurements,
          include_photos: data.include_photos,
          include_mood: data.include_mood,
          include_notes: data.include_notes,
          custom_questions: parseCustomQuestions(data.custom_questions),
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        
        setSettings(newSettings);
        
        toast({
          title: "Check-ins enabled",
          description: `${input.frequency.charAt(0).toUpperCase() + input.frequency.slice(1)} check-ins are now active for this client.`
        });
        
        return data;
      }
    } catch (error) {
      console.error('Error saving check-in settings:', error);
      toast({
        title: "Error saving settings",
        description: "Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const disableCheckIns = async () => {
    if (!settings) return;
    
    try {
      const { error } = await supabase
        .from('check_in_settings')
        .update({ enabled: false, updated_at: new Date().toISOString() })
        .eq('id', settings.id);

      if (error) throw error;
      
      setSettings(prev => prev ? { ...prev, enabled: false } : null);
      
      toast({
        title: "Check-ins disabled",
        description: "The client will no longer receive check-in reminders."
      });
    } catch (error) {
      console.error('Error disabling check-ins:', error);
      toast({
        title: "Error",
        description: "Failed to disable check-ins.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [clientId]);

  return {
    settings,
    isLoading,
    saveSettings,
    disableCheckIns,
    refetch: fetchSettings
  };
}
