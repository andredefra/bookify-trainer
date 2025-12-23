export interface TrainerPerformance {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  totalReviews: number;
  totalClients: number;
  activeClients: number;
  sessionsCompleted: number;
  revenue: number;
  retentionRate: number;
  responseTime: string;
  specialties: string[];
}

export interface ClientReview {
  id: string;
  trainerId: string;
  trainerName: string;
  clientName: string;
  clientAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  response?: string;
  helpful: number;
  categories: {
    expertise: number;
    communication: number;
    punctuality: number;
    results: number;
  };
}

export const mockTrainerPerformance: TrainerPerformance[] = [
  {
    id: "t1",
    name: "Marco Rossi",
    rating: 4.9,
    totalReviews: 45,
    totalClients: 28,
    activeClients: 22,
    sessionsCompleted: 456,
    revenue: 12500,
    retentionRate: 92,
    responseTime: "< 2 hours",
    specialties: ["Strength Training", "HIIT", "Body Recomposition"]
  },
  {
    id: "t2",
    name: "Giulia Bianchi",
    rating: 4.8,
    totalReviews: 38,
    totalClients: 24,
    activeClients: 18,
    sessionsCompleted: 380,
    revenue: 10200,
    retentionRate: 88,
    responseTime: "< 1 hour",
    specialties: ["Yoga", "Pilates", "Mobility"]
  },
  {
    id: "t3",
    name: "Paolo Verdi",
    rating: 4.6,
    totalReviews: 32,
    totalClients: 20,
    activeClients: 15,
    sessionsCompleted: 298,
    revenue: 8800,
    retentionRate: 82,
    responseTime: "< 4 hours",
    specialties: ["CrossFit", "Functional Training", "Endurance"]
  },
  {
    id: "t4",
    name: "Anna Ferrari",
    rating: 4.7,
    totalReviews: 28,
    totalClients: 18,
    activeClients: 14,
    sessionsCompleted: 245,
    revenue: 7500,
    retentionRate: 85,
    responseTime: "< 2 hours",
    specialties: ["Weight Loss", "Nutrition", "Wellness"]
  }
];

export const mockClientReviews: ClientReview[] = [
  {
    id: "r1",
    trainerId: "t1",
    trainerName: "Marco Rossi",
    clientName: "Emma Thompson",
    rating: 5,
    title: "Best trainer I've ever had!",
    comment: "Marco is incredibly knowledgeable and motivating. He helped me achieve my strength goals in just 3 months. His attention to form and technique is exceptional.",
    date: "2024-01-20",
    helpful: 12,
    categories: { expertise: 5, communication: 5, punctuality: 5, results: 5 }
  },
  {
    id: "r2",
    trainerId: "t2",
    trainerName: "Giulia Bianchi",
    clientName: "James Wilson",
    rating: 5,
    title: "Transformed my flexibility",
    comment: "Giulia's yoga sessions have completely changed my mobility and reduced my back pain. She's patient and adapts every session to my needs.",
    date: "2024-01-18",
    response: "Thank you James! It's been wonderful seeing your progress!",
    helpful: 8,
    categories: { expertise: 5, communication: 5, punctuality: 5, results: 5 }
  },
  {
    id: "r3",
    trainerId: "t1",
    trainerName: "Marco Rossi",
    clientName: "Sofia Martinez",
    rating: 4,
    title: "Great results, tough workouts",
    comment: "Marco pushes you hard but the results speak for themselves. Sometimes the workouts are intense but worth it.",
    date: "2024-01-15",
    helpful: 6,
    categories: { expertise: 5, communication: 4, punctuality: 4, results: 5 }
  },
  {
    id: "r4",
    trainerId: "t3",
    trainerName: "Paolo Verdi",
    clientName: "Alex Chen",
    rating: 4,
    title: "Good CrossFit coaching",
    comment: "Paolo knows his stuff when it comes to CrossFit. Sometimes scheduling can be tricky but overall a solid trainer.",
    date: "2024-01-12",
    helpful: 4,
    categories: { expertise: 5, communication: 4, punctuality: 3, results: 4 }
  },
  {
    id: "r5",
    trainerId: "t4",
    trainerName: "Anna Ferrari",
    clientName: "Maria Garcia",
    rating: 5,
    title: "Lost 15kg with Anna's help!",
    comment: "Anna's holistic approach combining training and nutrition guidance helped me lose 15kg in 6 months. She's supportive and celebrates every milestone.",
    date: "2024-01-10",
    response: "Maria, you did all the hard work! So proud of you!",
    helpful: 15,
    categories: { expertise: 5, communication: 5, punctuality: 5, results: 5 }
  },
  {
    id: "r6",
    trainerId: "t2",
    trainerName: "Giulia Bianchi",
    clientName: "David Brown",
    rating: 5,
    title: "Perfect for stress relief",
    comment: "The mindfulness aspect Giulia brings to her sessions is incredible. I leave every session feeling refreshed and centered.",
    date: "2024-01-08",
    helpful: 7,
    categories: { expertise: 5, communication: 5, punctuality: 5, results: 4 }
  }
];

export const ratingDistribution = [
  { rating: 5, count: 89, percentage: 62 },
  { rating: 4, count: 38, percentage: 27 },
  { rating: 3, count: 12, percentage: 8 },
  { rating: 2, count: 3, percentage: 2 },
  { rating: 1, count: 1, percentage: 1 }
];
