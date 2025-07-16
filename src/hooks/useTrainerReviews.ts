import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface TrainerReview {
  id: string;
  trainer_id: string;
  client_id: string;
  rating: number;
  comment?: string;
  session_date?: string;
  is_verified: boolean;
  created_at: string;
}

export const useTrainerReviews = (trainerId?: string) => {
  const [reviews, setReviews] = useState<TrainerReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (trainerId) {
      fetchReviews();
    }
  }, [trainerId]);

  const fetchReviews = async () => {
    if (!trainerId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('trainer_reviews')
        .select('*')
        .eq('trainer_id', trainerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setReviews(data || []);
      setTotalReviews(data?.length || 0);
      
      // Calculate average rating
      if (data && data.length > 0) {
        const avg = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
      } else {
        setAverageRating(0);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    averageRating,
    totalReviews,
    refetch: fetchReviews
  };
};