
import { useState, useCallback, useMemo } from 'react';
import { TrainerReview, ReviewStats, ModificationRequest } from '../types';

// Mock data for reviews
const mockReviews: TrainerReview[] = [
  {
    id: '1',
    trainerId: 'trainer-1',
    clientId: 'client-1',
    clientName: 'Emma Thompson',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    rating: 5,
    comment: 'John è un trainer eccezionale! Mi ha aiutato a raggiungere i miei obiettivi in tempi record. Professionale e sempre disponibile.',
    sessionDate: new Date('2024-06-15'),
    createdAt: new Date('2024-06-16'),
    updatedAt: new Date('2024-06-16'),
    status: 'active'
  },
  {
    id: '2',
    trainerId: 'trainer-1',
    clientId: 'client-2',
    clientName: 'Michael Chen',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4,
    comment: 'Ottimo trainer, molto preparato. A volte un po\' severo ma i risultati si vedono. Consigliato!',
    sessionDate: new Date('2024-06-10'),
    createdAt: new Date('2024-06-11'),
    updatedAt: new Date('2024-06-11'),
    status: 'active'
  },
  {
    id: '3',
    trainerId: 'trainer-1',
    clientId: 'client-3',
    clientName: 'Sarah Johnson',
    clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 2,
    comment: 'Il trainer è ok ma potrebbe essere più puntuale agli appuntamenti.',
    sessionDate: new Date('2024-06-05'),
    createdAt: new Date('2024-06-06'),
    updatedAt: new Date('2024-06-20'),
    status: 'pending_modification',
    modificationRequest: {
      reason: 'Richiesta di chiarimento sulla puntualità',
      requestedAt: new Date('2024-06-20'),
      status: 'pending',
      trainerMessage: 'Vorrei discutere questa recensione per migliorare il servizio'
    }
  },
  {
    id: '4',
    trainerId: 'trainer-1',
    clientId: 'client-4',
    clientName: 'David Wilson',
    rating: 5,
    comment: 'Fantastico! Ho perso 10kg in 3 mesi. Metodi efficaci e supporto continuo.',
    sessionDate: new Date('2024-06-01'),
    createdAt: new Date('2024-06-02'),
    updatedAt: new Date('2024-06-02'),
    status: 'active'
  },
  {
    id: '5',
    trainerId: 'trainer-1',
    clientId: 'client-5',
    clientName: 'Lisa Rodriguez',
    clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    rating: 3,
    comment: 'Esperienza nella media. Il trainer sa il fatto suo ma la comunicazione potrebbe migliorare.',
    sessionDate: new Date('2024-05-28'),
    createdAt: new Date('2024-05-29'),
    updatedAt: new Date('2024-05-29'),
    status: 'active'
  }
];

export function useReviews() {
  const [reviews, setReviews] = useState<TrainerReview[]>(mockReviews);
  const [filter, setFilter] = useState({
    rating: 'all' as 'all' | '1' | '2' | '3' | '4' | '5',
    status: 'all' as 'all' | 'active' | 'pending_modification' | 'hidden',
    search: ''
  });

  const stats = useMemo((): ReviewStats => {
    const activeReviews = reviews.filter(r => r.status === 'active');
    const totalReviews = activeReviews.length;
    const averageRating = totalReviews > 0 
      ? activeReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
      : 0;
    
    const ratingDistribution = {
      1: activeReviews.filter(r => r.rating === 1).length,
      2: activeReviews.filter(r => r.rating === 2).length,
      3: activeReviews.filter(r => r.rating === 3).length,
      4: activeReviews.filter(r => r.rating === 4).length,
      5: activeReviews.filter(r => r.rating === 5).length,
    };

    const pendingModifications = reviews.filter(r => r.status === 'pending_modification').length;

    return {
      totalReviews,
      averageRating,
      ratingDistribution,
      pendingModifications
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      if (filter.rating !== 'all' && review.rating !== parseInt(filter.rating)) {
        return false;
      }
      if (filter.status !== 'all' && review.status !== filter.status) {
        return false;
      }
      if (filter.search && !review.clientName.toLowerCase().includes(filter.search.toLowerCase()) && 
          !review.comment.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [reviews, filter]);

  const requestModification = useCallback((request: ModificationRequest) => {
    setReviews(prev => prev.map(review => 
      review.id === request.reviewId
        ? {
            ...review,
            status: 'pending_modification' as const,
            updatedAt: new Date(),
            modificationRequest: {
              reason: request.trainerMessage,
              requestedAt: new Date(),
              status: 'pending' as const,
              trainerMessage: request.trainerMessage
            }
          }
        : review
    ));
  }, []);

  const hideReview = useCallback((reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId
        ? { ...review, status: 'hidden' as const, updatedAt: new Date() }
        : review
    ));
  }, []);

  const unhideReview = useCallback((reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId
        ? { ...review, status: 'active' as const, updatedAt: new Date() }
        : review
    ));
  }, []);

  return {
    reviews: filteredReviews,
    stats,
    filter,
    setFilter,
    requestModification,
    hideReview,
    unhideReview
  };
}
