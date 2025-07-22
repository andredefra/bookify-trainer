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

  // Demo data functions
  const getDemoReviews = (): GymReview[] => [
    {
      id: '1',
      trainer_id: '22222222-2222-2222-2222-222222222221',
      client_id: '00000000-0000-0000-0000-000000000001',
      rating: 5,
      comment: 'Excellent trainer! Very professional and helpful.',
      session_date: '2025-01-20',
      is_verified: true,
      created_at: '2025-01-20T10:00:00Z',
      trainer_name: 'Marco Rossi',
      client_name: 'Alice Bianchi'
    },
    {
      id: '2',
      trainer_id: '22222222-2222-2222-2222-222222222222',
      client_id: '00000000-0000-0000-0000-000000000002',
      rating: 4,
      comment: 'Great yoga session, very calming and focused.',
      session_date: '2025-01-19',
      is_verified: true,
      created_at: '2025-01-19T15:30:00Z',
      trainer_name: 'Sofia Verdi',
      client_name: 'Luca Rosso'
    },
    {
      id: '3',
      trainer_id: '22222222-2222-2222-2222-222222222221',
      client_id: '00000000-0000-0000-0000-000000000001',
      rating: 5,
      comment: 'Perfect form corrections and great motivation!',
      session_date: '2025-01-18',
      is_verified: true,
      created_at: '2025-01-18T08:00:00Z',
      trainer_name: 'Marco Rossi',
      client_name: 'Alice Bianchi'
    }
  ];

  const getDemoTrainerPerformance = (): TrainerPerformance[] => [
    {
      trainer_id: '22222222-2222-2222-2222-222222222221',
      trainer_name: 'Marco Rossi',
      average_rating: 5.0,
      total_reviews: 2,
      recent_reviews: 1,
      verified_reviews: 2
    },
    {
      trainer_id: '22222222-2222-2222-2222-222222222222',
      trainer_name: 'Sofia Verdi',
      average_rating: 4.0,
      total_reviews: 1,
      recent_reviews: 1,
      verified_reviews: 1
    }
  ];

  const getDemoStats = () => ({
    averageRating: 4.7,
    totalReviews: 3,
    activeReviews: 2,
    clientSatisfaction: 100,
    topTrainer: { name: "Marco Rossi", rating: 5.0 }
  });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Get current gym ID
      const gymId = '11111111-1111-1111-1111-111111111111'; // Demo gym ID

      // First, get trainers associated with this gym through gym_trainer_assignments
      const { data: gymTrainersData, error: gymTrainersError } = await supabase
        .from('gym_trainer_assignments')
        .select('trainer_id')
        .eq('gym_id', gymId)
        .eq('status', 'active');

      if (gymTrainersError) {
        console.warn('Gym trainers error:', gymTrainersError);
        // Use demo data if query fails
        setReviews(getDemoReviews());
        setTrainerPerformance(getDemoTrainerPerformance());
        setStats(getDemoStats());
        setLoading(false);
        return;
      }

      const trainerIds = gymTrainersData?.map(t => t.trainer_id) || [];

      // If no trainers, use demo data
      if (trainerIds.length === 0) {
        setReviews(getDemoReviews());
        setTrainerPerformance(getDemoTrainerPerformance());
        setStats(getDemoStats());
        setLoading(false);
        return;
      }

      // Fetch reviews for these trainers
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('trainer_reviews')
        .select('*')
        .in('trainer_id', trainerIds)
        .order('created_at', { ascending: false });

      if (reviewsError) {
        console.warn('Reviews error:', reviewsError);
        setReviews(getDemoReviews());
        setTrainerPerformance(getDemoTrainerPerformance());
        setStats(getDemoStats());
        setLoading(false);
        return;
      }

      // If no reviews, use demo data
      if (!reviewsData || reviewsData.length === 0) {
        setReviews(getDemoReviews());
        setTrainerPerformance(getDemoTrainerPerformance());
        setStats(getDemoStats());
        setLoading(false);
        return;
      }

      // Process reviews data
      const processedReviews = reviewsData.map(review => ({
        ...review,
        trainer_name: `Trainer ${review.trainer_id.slice(0, 8)}`,
        client_name: `Client ${review.client_id.slice(0, 8)}`
      }));

      setReviews(processedReviews);

      // Calculate trainer performance
      const performance = trainerIds.map(trainerId => {
        const trainerReviews = processedReviews.filter(r => r.trainer_id === trainerId);
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
          trainer_id: trainerId,
          trainer_name: `Trainer ${trainerId.slice(0, 8)}`,
          average_rating: Math.round(avgRating * 10) / 10,
          total_reviews: trainerReviews.length,
          recent_reviews: recentReviews,
          verified_reviews: trainerReviews.filter(r => r.is_verified).length
        };
      });

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
      // Use demo data as fallback
      setReviews(getDemoReviews());
      setTrainerPerformance(getDemoTrainerPerformance());
      setStats(getDemoStats());
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