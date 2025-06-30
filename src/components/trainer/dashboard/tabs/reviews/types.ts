
export interface TrainerReview {
  id: string;
  trainerId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number; // 1-5 stelle
  comment: string;
  sessionDate: Date; // data dell'ultima sessione con il cliente
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'pending_modification' | 'hidden';
  modificationRequest?: {
    reason: string;
    requestedAt: Date;
    status: 'pending' | 'approved' | 'denied';
    trainerMessage?: string;
  };
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  pendingModifications: number;
}

export interface ModificationRequest {
  reviewId: string;
  reason: 'inappropriate_language' | 'false_information' | 'spam' | 'off_topic' | 'other';
  customReason?: string;
  trainerMessage: string;
}
