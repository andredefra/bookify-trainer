export interface GymTrainer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  status: "online" | "in-session" | "offline";
  hourlyRate: number;
  isGymAffiliated: boolean;
  gymId: string;
  certifications: string[];
}

// Trainers affiliati a FitLife Gym (11111111-1111-1111-1111-111111111111)
export const fitLifeGymTrainers: GymTrainer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Personal Trainer",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883",
    status: "in-session",
    hourlyRate: 50,
    isGymAffiliated: true,
    gymId: "11111111-1111-1111-1111-111111111111",
    certifications: ["NASM CPT", "ACE Nutrition Specialist"]
  },
  {
    id: 3,
    name: "Marco Rossi",
    specialty: "Strength & Conditioning",
    rating: 4.8,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc",
    status: "online",
    hourlyRate: 55,
    isGymAffiliated: true,
    gymId: "11111111-1111-1111-1111-111111111111",
    certifications: ["NSCA-CSCS", "CrossFit L2"]
  },
  {
    id: 4,
    name: "Elena Bianchi",
    specialty: "Yoga & Pilates",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    status: "offline",
    hourlyRate: 40,
    isGymAffiliated: true,
    gymId: "11111111-1111-1111-1111-111111111111",
    certifications: ["RYT-500", "PMA-CPT"]
  }
];

export const getGymTrainers = (gymId: string): GymTrainer[] => {
  return fitLifeGymTrainers.filter(t => t.gymId === gymId);
};
