import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GymReview {
  id: string;
  trainer_id: string;
  client_id: string;
  rating: number;
  comment?: string;
  session_date?: string;
  is_verified: boolean;
  created_at: string;
  trainer_name?: string;
  client_name?: string;
}

export interface TrainerPerformance {
  trainer_id: string;
  trainer_name: string;
  average_rating: number;
  total_reviews: number;
  recent_reviews: number;
  verified_reviews: number;
}

export const useGymReviews = () => {
  const [reviews, setReviews] = useState<GymReview[]>([]);
  const [trainerPerformance, setTrainerPerformance] = useState<TrainerPerformance[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    activeReviews: 0,
    clientSatisfaction: 0,
    topTrainer: { name: "", rating: 0 }
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Get current gym ID
      const gymId = '11111111-1111-1111-1111-111111111111'; // Demo gym ID

      // Fetch reviews for trainers affiliated with this gym
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('trainer_reviews')
        .select(`
          *,
          trainer_profiles!inner(trainer_id, primary_gym_id)
        `)
        .eq('trainer_profiles.primary_gym_id', gymId)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      // Fetch trainer names and performance metrics
      const { data: trainersData, error: trainersError } = await supabase
        .from('trainer_profiles')
        .select('trainer_id, bio')
        .eq('primary_gym_id', gymId);

      if (trainersError) throw trainersError;

      // Process reviews data
      const processedReviews = reviewsData?.map(review => ({
        ...review,
        trainer_name: `Trainer ${review.trainer_id.slice(0, 8)}`,
        client_name: `Client ${review.client_id.slice(0, 8)}`
      })) || [];

      setReviews(processedReviews);

      // Calculate trainer performance
      const performance = trainersData?.map(trainer => {
        const trainerReviews = processedReviews.filter(r => r.trainer_id === trainer.trainer_id);
        const avgRating = trainerReviews.length > 0 
          ? trainerReviews.reduce((sum, r) => sum + r.rating, 0) / trainerReviews.length 
          : 0;
        
        const recentReviews = trainerReviews.filter(r => {
          const reviewDate = new Date(r.created_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return reviewDate >= weekAgo;
        }).length;

        return {
          trainer_id: trainer.trainer_id,
          trainer_name: `Trainer ${trainer.trainer_id.slice(0, 8)}`,
          average_rating: Math.round(avgRating * 10) / 10,
          total_reviews: trainerReviews.length,
          recent_reviews: recentReviews,
          verified_reviews: trainerReviews.filter(r => r.is_verified).length
        };
      }) || [];

      setTrainerPerformance(performance);

      // Calculate overall stats
      const totalReviews = processedReviews.length;
      const averageRating = totalReviews > 0 
        ? processedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
        : 0;

      const activeReviews = processedReviews.filter(r => {
        const reviewDate = new Date(r.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return reviewDate >= weekAgo;
      }).length;

      const highRatingCount = processedReviews.filter(r => r.rating >= 4).length;
      const clientSatisfaction = totalReviews > 0 ? (highRatingCount / totalReviews) * 100 : 0;

      const topTrainer = performance.reduce((prev, current) => 
        (current.average_rating > prev.average_rating) ? current : prev, 
        { trainer_name: "", average_rating: 0 }
      );

      setStats({
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
        activeReviews,
        clientSatisfaction: Math.round(clientSatisfaction),
        topTrainer: { 
          name: topTrainer.trainer_name || "No data", 
          rating: topTrainer.average_rating || 0 
        }
      });

    } catch (error) {
      console.error('Error fetching gym reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    trainerPerformance,
    stats,
    loading,
    refetch: fetchReviews
  };
};