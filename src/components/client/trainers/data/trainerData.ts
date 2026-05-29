
export type TrainerPlanTier = "basic" | "essential" | "pro";

export interface TrainerData {
  name: string;
  title: string;
  image: string;
  specialty: string;
  location: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  experience: string;
  certifications: string[];
  specialties: string[];
  bio: string;
  education: string;
  professionalExp: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  highlights: string[];
  stats: {
    clientsHelped: string;
    successRate: string;
    avgResult: string;
    specializations: number;
  };
  availability: {
    [key: string]: string[];
  };
  /** Subscription tier. Determines whether the trainer can receive session bookings from the marketplace. */
  plan?: TrainerPlanTier;
}

export const trainerData: Record<number, TrainerData> = {
  1: {
    name: "Sarah Johnson",
    title: "Certified Personal Trainer",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop",
    specialty: "Personal Trainer",
    location: "New York, NY",
    hourlyRate: 50,
    rating: 4.9,
    reviews: 124,
    experience: "8+ years",
    certifications: ["NASM CPT", "ACE Nutrition Specialist", "Precision Nutrition Level 1"],
    specialties: ["Strength Training", "HIIT", "Weight Loss", "Nutrition"],
    bio: "Dedicated fitness professional with 8+ years of experience helping clients achieve their health and fitness goals. Specialized in strength training, weight loss, and nutrition coaching. My approach combines scientific methods with personalized attention to ensure every client reaches their potential.",
    education: "Bachelor's in Exercise Science, University of California",
    professionalExp: [
      {
        title: "Senior Personal Trainer",
        company: "FitLife Gym",
        period: "2019 - Present",
        description: "Working with 20+ clients weekly on personalized fitness programs. Achieved 95% client retention rate and helped over 150 clients reach their fitness goals."
      },
      {
        title: "Fitness Instructor",
        company: "Urban Health Club",
        period: "2016 - 2019",
        description: "Led group fitness classes and provided one-on-one training. Developed innovative HIIT programs that increased class attendance by 40%."
      }
    ],
    highlights: ["Certified", "Verified", "Top Rated", "Nutrition Expert"],
    stats: {
      clientsHelped: "200+",
      successRate: "95%",
      avgResult: "12 lbs lost",
      specializations: 4
    },
    availability: {
      monday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      tuesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"], 
      wednesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      friday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      saturday: ["10:00 AM - 2:00 PM"],
      sunday: ["Closed"]
    },
    plan: "essential"
  },
  2: {
    name: "Alex Thompson",
    title: "HIIT Specialist & CrossFit Coach",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
    specialty: "HIIT Specialist",
    location: "Los Angeles, CA",
    hourlyRate: 45,
    rating: 4.7,
    reviews: 98,
    experience: "6+ years",
    certifications: ["CrossFit Level 2", "HIIT Certified", "First Aid CPR", "Functional Movement Screen"],
    specialties: ["HIIT", "CrossFit", "Cardio", "Agility Training"],
    bio: "High-energy trainer focused on HIIT and cardiovascular fitness. I believe in pushing limits while maintaining proper form and safety. Specialized in helping clients break through plateaus and achieve peak performance through structured, intense workouts.",
    education: "Master's in Kinesiology, UCLA",
    professionalExp: [
      {
        title: "HIIT Specialist",
        company: "Elite Fitness Center",
        period: "2020 - Present",
        description: "Leading high-intensity interval training classes and personal sessions. Developed signature HIIT programs with 98% client satisfaction rate."
      },
      {
        title: "CrossFit Coach",
        company: "CrossFit Downtown", 
        period: "2018 - 2020",
        description: "Coached athletes in Olympic lifting and functional movements. Prepared 15+ athletes for regional competitions."
      }
    ],
    highlights: ["Certified", "CrossFit Expert", "HIIT Specialist", "Competition Coach"],
    stats: {
      clientsHelped: "150+",
      successRate: "92%",
      avgResult: "35% fitness gain",
      specializations: 4
    },
    availability: {
      monday: ["5:00 AM - 7:00 PM"],
      tuesday: ["5:00 AM - 7:00 PM"],
      wednesday: ["6:00 AM - 8:00 PM"],
      thursday: ["5:00 AM - 7:00 PM"],
      friday: ["5:00 AM - 6:00 PM"],
      saturday: ["8:00 AM - 4:00 PM"],
      sunday: ["9:00 AM - 3:00 PM"]
    }
  }
};
