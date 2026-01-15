import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckInSubmission, CheckInMeasurements } from "./useCheckInSubmissions";

interface WeightDataPoint {
  date: string;
  weight: number;
  formattedDate: string;
}

interface WellnessDataPoint {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  formattedDate: string;
}

interface KPIs {
  avgSleep: number | null;
  avgEnergy: number | null;
  avgMood: number | null;
  weightChange: number | null;
  sleepTrend: number | null;
  energyTrend: number | null;
  moodTrend: number | null;
  startWeight: number | null;
  currentWeight: number | null;
}

export function useCheckInAnalytics(clientId: string) {
  const [submissions, setSubmissions] = useState<CheckInSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!clientId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('check_in_submissions')
          .select('*')
          .eq('client_id', clientId)
          .eq('status', 'completed')
          .order('completed_at', { ascending: true });

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
        console.error('Error fetching check-in analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [clientId]);

  const weightData: WeightDataPoint[] = useMemo(() => {
    return submissions
      .filter(s => s.weight !== null)
      .map(s => ({
        date: s.completed_at || s.due_date,
        weight: s.weight!,
        formattedDate: new Date(s.completed_at || s.due_date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
      }));
  }, [submissions]);

  const wellnessData: WellnessDataPoint[] = useMemo(() => {
    return submissions
      .filter(s => s.mood_rating !== null || s.energy_level !== null || s.sleep_quality !== null)
      .map(s => ({
        date: s.completed_at || s.due_date,
        mood: s.mood_rating || 0,
        energy: s.energy_level || 0,
        sleep: s.sleep_quality || 0,
        formattedDate: new Date(s.completed_at || s.due_date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
      }));
  }, [submissions]);

  const kpis: KPIs = useMemo(() => {
    // Get last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSubmissions = submissions.filter(s => {
      const date = new Date(s.completed_at || s.due_date);
      return date >= thirtyDaysAgo;
    });

    // Calculate averages
    const sleepValues = recentSubmissions.filter(s => s.sleep_quality).map(s => s.sleep_quality!);
    const energyValues = recentSubmissions.filter(s => s.energy_level).map(s => s.energy_level!);
    const moodValues = recentSubmissions.filter(s => s.mood_rating).map(s => s.mood_rating!);
    const weightValues = submissions.filter(s => s.weight).map(s => s.weight!);

    const avgSleep = sleepValues.length > 0 
      ? sleepValues.reduce((a, b) => a + b, 0) / sleepValues.length 
      : null;
    const avgEnergy = energyValues.length > 0 
      ? energyValues.reduce((a, b) => a + b, 0) / energyValues.length 
      : null;
    const avgMood = moodValues.length > 0 
      ? moodValues.reduce((a, b) => a + b, 0) / moodValues.length 
      : null;

    // Calculate trends (compare last 2 weeks vs previous 2 weeks)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const lastTwoWeeks = recentSubmissions.filter(s => new Date(s.completed_at || s.due_date) >= twoWeeksAgo);
    const prevTwoWeeks = recentSubmissions.filter(s => {
      const date = new Date(s.completed_at || s.due_date);
      return date >= fourWeeksAgo && date < twoWeeksAgo;
    });

    const calcTrend = (recent: number[], previous: number[]): number | null => {
      if (recent.length === 0 || previous.length === 0) return null;
      const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
      const prevAvg = previous.reduce((a, b) => a + b, 0) / previous.length;
      return recentAvg - prevAvg;
    };

    const sleepTrend = calcTrend(
      lastTwoWeeks.filter(s => s.sleep_quality).map(s => s.sleep_quality!),
      prevTwoWeeks.filter(s => s.sleep_quality).map(s => s.sleep_quality!)
    );
    const energyTrend = calcTrend(
      lastTwoWeeks.filter(s => s.energy_level).map(s => s.energy_level!),
      prevTwoWeeks.filter(s => s.energy_level).map(s => s.energy_level!)
    );
    const moodTrend = calcTrend(
      lastTwoWeeks.filter(s => s.mood_rating).map(s => s.mood_rating!),
      prevTwoWeeks.filter(s => s.mood_rating).map(s => s.mood_rating!)
    );

    // Weight change
    const startWeight = weightValues.length > 0 ? weightValues[0] : null;
    const currentWeight = weightValues.length > 0 ? weightValues[weightValues.length - 1] : null;
    const weightChange = startWeight && currentWeight ? currentWeight - startWeight : null;

    return {
      avgSleep,
      avgEnergy,
      avgMood,
      weightChange,
      sleepTrend,
      energyTrend,
      moodTrend,
      startWeight,
      currentWeight,
    };
  }, [submissions]);

  return {
    weightData,
    wellnessData,
    kpis,
    isLoading,
    hasData: submissions.length > 0,
  };
}
