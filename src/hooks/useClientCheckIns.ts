import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

const DEMO_CLIENT_ID = '00000000-0000-0000-0000-000000000002';
const DEMO_TRAINER_ID = '00000000-0000-0000-0000-000000000001';
const DEMO_SETTINGS_ID = 'demo-checkin-settings';

const isoDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};
const dateDaysAgo = (days: number) => isoDaysAgo(days).split('T')[0];

const getDemoSettings = (): CheckInSettings => ({
  id: DEMO_SETTINGS_ID,
  client_id: DEMO_CLIENT_ID,
  trainer_id: DEMO_TRAINER_ID,
  frequency: 'weekly',
  enabled: true,
  include_weight: true,
  include_measurements: true,
  include_mood: true,
  include_photos: true,
  include_notes: true,
  custom_questions: [],
});

const getDemoSubmissions = (): CheckInSubmission[] => [
  {
    id: 'demo-checkin-pending',
    client_id: DEMO_CLIENT_ID,
    trainer_id: DEMO_TRAINER_ID,
    settings_id: DEMO_SETTINGS_ID,
    due_date: dateDaysAgo(0),
    status: 'pending',
    created_at: isoDaysAgo(0),
    updated_at: isoDaysAgo(0),
  },
  {
    id: 'demo-checkin-awaiting',
    client_id: DEMO_CLIENT_ID,
    trainer_id: DEMO_TRAINER_ID,
    settings_id: DEMO_SETTINGS_ID,
    due_date: dateDaysAgo(3),
    status: 'completed',
    weight: 82.0,
    measurements: { waist: 84, hips: 95, quadriceps: 55, arms: 33 },
    mood_rating: 4,
    energy_level: 4,
    sleep_quality: 3,
    notes: 'Felt strong on Wednesday session, a bit tired on Friday.',
    completed_at: isoDaysAgo(3),
    created_at: isoDaysAgo(3),
    updated_at: isoDaysAgo(3),
  },
  {
    id: 'demo-checkin-reviewed-new',
    client_id: DEMO_CLIENT_ID,
    trainer_id: DEMO_TRAINER_ID,
    settings_id: DEMO_SETTINGS_ID,
    due_date: dateDaysAgo(10),
    status: 'reviewed',
    weight: 82.5,
    measurements: { waist: 85, hips: 96, quadriceps: 56, arms: 33 },
    mood_rating: 4,
    energy_level: 3,
    sleep_quality: 4,
    notes: 'Weekend was heavier on carbs, back to routine Monday.',
    trainer_feedback: 'Great job this week! Keep the protein intake up and try to hit 8k steps on rest days.',
    trainer_reviewed_at: isoDaysAgo(8),
    completed_at: isoDaysAgo(10),
    created_at: isoDaysAgo(10),
    updated_at: isoDaysAgo(8),
  },
  {
    id: 'demo-checkin-reviewed-old',
    client_id: DEMO_CLIENT_ID,
    trainer_id: DEMO_TRAINER_ID,
    settings_id: DEMO_SETTINGS_ID,
    due_date: dateDaysAgo(17),
    status: 'reviewed',
    weight: 82.7,
    measurements: { waist: 86, hips: 97, quadriceps: 56, arms: 33 },
    mood_rating: 3,
    energy_level: 3,
    sleep_quality: 3,
    notes: 'Busy work week, missed one session.',
    trainer_feedback: 'No worries about the missed session — let\'s prioritize consistency next week.',
    trainer_reviewed_at: isoDaysAgo(15),
    completed_at: isoDaysAgo(17),
    created_at: isoDaysAgo(17),
    updated_at: isoDaysAgo(15),
  },
];


export interface CheckInMeasurements {
  chest?: number;
  waist?: number;
  
  hips?: number;
  quadriceps?: number;
  /** @deprecated use `quadriceps` — legacy field */
  thighs?: number;
  arms?: number;
  shoulders?: number;
  neck?: number;
}

export interface CheckInSubmission {
  id: string;
  client_id: string;
  trainer_id: string;
  settings_id: string;
  due_date: string;
  status: string;
  weight?: number;
  measurements?: CheckInMeasurements;
  mood_rating?: number;
  energy_level?: number;
  sleep_quality?: number;
  notes?: string;
  photos?: string[];
  custom_answers?: Record<string, string>;
  trainer_feedback?: string;
  trainer_reviewed_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CheckInSettings {
  id: string;
  client_id: string;
  trainer_id: string;
  frequency: string;
  enabled: boolean;
  include_weight: boolean;
  include_measurements: boolean;
  include_mood: boolean;
  include_photos: boolean;
  include_notes: boolean;
  custom_questions?: { id: string; question: string }[];
  reminder_days_before?: number;
  reminder_time?: string;
}

export function useClientCheckIns(clientId: string, options?: { useMocks?: boolean }) {
  const [submissions, setSubmissions] = useState<CheckInSubmission[]>([]);
  const [settings, setSettings] = useState<CheckInSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const useMocks = options?.useMocks || clientId === DEMO_CLIENT_ID;

  const fetchCheckIns = async () => {
    try {
      setLoading(true);

      // Demo / mock mode: skip Supabase entirely
      if (useMocks) {
        setSettings(getDemoSettings());
        setSubmissions(getDemoSubmissions());
        return;
      }


      // Fetch settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('check_in_settings')
        .select('*')
        .eq('client_id', clientId)
        .eq('enabled', true)
        .maybeSingle();

      if (settingsError) throw settingsError;

      if (settingsData) {
        setSettings({
          ...settingsData,
          custom_questions: Array.isArray(settingsData.custom_questions) 
            ? settingsData.custom_questions as { id: string; question: string }[]
            : []
        });
      }

      // Fetch submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('check_in_submissions')
        .select('*')
        .eq('client_id', clientId)
        .order('due_date', { ascending: false });

      if (submissionsError) throw submissionsError;

      const formattedSubmissions: CheckInSubmission[] = (submissionsData || []).map(sub => ({
        ...sub,
        weight: sub.weight ? Number(sub.weight) : undefined,
        measurements: sub.measurements as CheckInMeasurements | undefined,
        photos: Array.isArray(sub.photos) ? sub.photos as string[] : undefined,
        custom_answers: sub.custom_answers as Record<string, string> | undefined
      }));

      setSubmissions(formattedSubmissions);
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchCheckIns();
    }
  }, [clientId, useMocks]);

  const submitCheckIn = async (data: {
    submissionId?: string;
    weight?: number;
    measurements?: CheckInMeasurements;
    mood_rating?: number;
    energy_level?: number;
    sleep_quality?: number;
    notes?: string;
    photos?: string[];
    custom_answers?: Record<string, string>;
  }) => {
    try {
      if (!settings) {
        toast({
          title: "Error",
          description: "No check-in settings found",
          variant: "destructive"
        });
        return false;
      }

      // Demo user: mutate local state only
      if (useMocks) {
        setSubmissions(prev => {
          const nowIso = new Date().toISOString();
          if (data.submissionId) {
            return prev.map(s => s.id === data.submissionId ? {
              ...s,
              weight: data.weight,
              measurements: data.measurements,
              mood_rating: data.mood_rating,
              energy_level: data.energy_level,
              sleep_quality: data.sleep_quality,
              notes: data.notes,
              photos: data.photos,
              custom_answers: data.custom_answers,
              status: 'completed',
              completed_at: nowIso,
              updated_at: nowIso,
            } : s);
          }
          return [{
            id: `demo-checkin-${Date.now()}`,
            client_id: clientId,
            trainer_id: settings.trainer_id,
            settings_id: settings.id,
            due_date: new Date().toISOString().split('T')[0],
            status: 'completed',
            weight: data.weight,
            measurements: data.measurements,
            mood_rating: data.mood_rating,
            energy_level: data.energy_level,
            sleep_quality: data.sleep_quality,
            notes: data.notes,
            photos: data.photos,
            custom_answers: data.custom_answers,
            completed_at: nowIso,
            created_at: nowIso,
            updated_at: nowIso,
          }, ...prev];
        });
        toast({
          title: "Check-in submitted",
          description: "Your check-in has been sent to your trainer"
        });
        return true;
      }

      const updateData = {
        weight: data.weight,
        measurements: data.measurements as Json,
        mood_rating: data.mood_rating,
        energy_level: data.energy_level,
        sleep_quality: data.sleep_quality,
        notes: data.notes,
        photos: data.photos as Json,
        custom_answers: data.custom_answers as Json,
        status: 'completed',
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (data.submissionId) {
        // Update existing submission
        const { error } = await supabase
          .from('check_in_submissions')
          .update(updateData)
          .eq('id', data.submissionId);

        if (error) throw error;
      } else {
        // Create new submission
        const { error } = await supabase
          .from('check_in_submissions')
          .insert({
            ...updateData,
            client_id: clientId,
            trainer_id: settings.trainer_id,
            settings_id: settings.id,
            due_date: new Date().toISOString().split('T')[0]
          });

        if (error) throw error;
      }

      toast({
        title: "Check-in submitted",
        description: "Your check-in has been sent to your trainer"
      });

      await fetchCheckIns();
      return true;
    } catch (error) {
      console.error('Error submitting check-in:', error);
      toast({
        title: "Error",
        description: "Failed to submit check-in",
        variant: "destructive"
      });
      return false;
    }
  };

  // Get pending check-in (due today or overdue)
  const pendingCheckIn = submissions.find(s => 
    s.status === 'pending' || s.status === 'overdue'
  );

  // Get recent completed check-ins
  const recentCheckIns = submissions
    .filter(s => s.status === 'completed' || s.status === 'reviewed')
    .slice(0, 3);

  // Check if there's new trainer feedback (reviewed but not seen)
  const hasNewFeedback = submissions.some(s => 
    s.status === 'reviewed' && s.trainer_feedback
  );

  // Get next check-in date based on frequency
  const getNextCheckInDate = (): Date | null => {
    if (!settings) return null;
    
    const lastCompleted = submissions.find(s => 
      s.status === 'completed' || s.status === 'reviewed'
    );
    
    if (!lastCompleted) return new Date();
    
    const lastDate = new Date(lastCompleted.completed_at || lastCompleted.due_date);
    const nextDate = new Date(lastDate);
    
    switch (settings.frequency) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'biweekly':
        nextDate.setDate(nextDate.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      default:
        nextDate.setDate(nextDate.getDate() + 7);
    }
    
    return nextDate;
  };

  return {
    submissions,
    settings,
    loading,
    pendingCheckIn,
    recentCheckIns,
    hasNewFeedback,
    nextCheckInDate: getNextCheckInDate(),
    submitCheckIn,
    refetch: fetchCheckIns
  };
}
