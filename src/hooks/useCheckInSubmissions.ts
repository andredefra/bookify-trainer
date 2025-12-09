import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CheckInMeasurements {
  waist?: number;
  hips?: number;
  thighs?: number;
  arms?: number;
  chest?: number;
  shoulders?: number;
  neck?: number;
}

export interface CheckInSubmission {
  id: string;
  settings_id: string;
  client_id: string;
  trainer_id: string;
  due_date: string;
  completed_at: string | null;
  status: 'pending' | 'completed' | 'overdue' | 'skipped';
  weight: number | null;
  measurements: CheckInMeasurements;
  photos: string[];
  mood_rating: number | null;
  energy_level: number | null;
  sleep_quality: number | null;
  notes: string | null;
  custom_answers: Record<string, string>;
  trainer_feedback: string | null;
  trainer_reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useCheckInSubmissions(clientId: string) {
  const [submissions, setSubmissions] = useState<CheckInSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    if (!clientId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('check_in_submissions')
        .select('*')
        .eq('client_id', clientId)
        .order('due_date', { ascending: false });

      if (error) throw error;

      const typedData: CheckInSubmission[] = (data || []).map(item => ({
        ...item,
        status: item.status as CheckInSubmission['status'],
        measurements: (item.measurements as CheckInMeasurements) || {},
        photos: (item.photos as string[]) || [],
        custom_answers: (item.custom_answers as Record<string, string>) || {},
      }));

      setSubmissions(typedData);
    } catch (error) {
      console.error('Error fetching check-in submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTrainerFeedback = async (submissionId: string, feedback: string) => {
    try {
      const { error } = await supabase
        .from('check_in_submissions')
        .update({
          trainer_feedback: feedback,
          trainer_reviewed_at: new Date().toISOString(),
        })
        .eq('id', submissionId);

      if (error) throw error;

      toast({
        title: "Feedback saved",
        description: "Your feedback has been sent to the client.",
      });

      await fetchSubmissions();
    } catch (error) {
      console.error('Error saving feedback:', error);
      toast({
        title: "Error",
        description: "Failed to save feedback.",
        variant: "destructive",
      });
    }
  };

  const markAsReviewed = async (submissionId: string) => {
    try {
      const { error } = await supabase
        .from('check_in_submissions')
        .update({
          trainer_reviewed_at: new Date().toISOString(),
        })
        .eq('id', submissionId);

      if (error) throw error;

      toast({
        title: "Marked as reviewed",
        description: "Check-in has been marked as reviewed.",
      });

      await fetchSubmissions();
    } catch (error) {
      console.error('Error marking as reviewed:', error);
      toast({
        title: "Error",
        description: "Failed to mark as reviewed.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [clientId]);

  const pendingReview = submissions.filter(s => s.status === 'completed' && !s.trainer_reviewed_at);
  const reviewed = submissions.filter(s => s.trainer_reviewed_at);
  const pending = submissions.filter(s => s.status === 'pending');
  const overdue = submissions.filter(s => s.status === 'overdue');

  return {
    submissions,
    pendingReview,
    reviewed,
    pending,
    overdue,
    isLoading,
    addTrainerFeedback,
    markAsReviewed,
    refetch: fetchSubmissions,
  };
}
