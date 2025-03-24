
// Mock trainer data for development and testing

export interface Trainer {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  specialties: string[];
  certifications: string[];
  availability: {
    [key: string]: string[];
  };
  education: string;
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  profileImage: string;
  status: "online" | "offline" | "in-session";
  nextAvailability: string;
}

export interface Testimonial {
  id: number;
  name: string;
  image: string;
  text: string;
  rating: number;
}

export interface Message {
  sender: "client" | "ai";
  message: string;
  time: string;
}

export const trainerData: Trainer = {
  id: "t1",
  name: "Sarah Johnson",
  title: "Certified Personal Trainer",
  bio: "Dedicated fitness professional with 8+ years of experience helping clients achieve their health and fitness goals. Specialized in strength training, weight loss, and nutrition coaching.",
  location: "New York, NY",
  rating: 4.9,
  reviews: 124,
  hourlyRate: 50,
  specialties: ["Strength Training", "HIIT", "Weight Loss", "Nutrition"],
  certifications: ["NASM CPT", "ACE Nutrition Specialist", "Precision Nutrition Level 1"],
  availability: {
    monday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    tuesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    wednesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    friday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    saturday: ["10:00 AM - 2:00 PM"],
    sunday: []
  },
  education: "Bachelor's in Exercise Science, University of California",
  experience: [
    {
      title: "Senior Personal Trainer",
      company: "FitLife Gym",
      period: "2019 - Present",
      description: "Working with 20+ clients weekly on personalized fitness programs."
    },
    {
      title: "Fitness Instructor",
      company: "Urban Health Club",
      period: "2016 - 2019",
      description: "Led group fitness classes and provided one-on-one training."
    }
  ],
  profileImage: "/placeholder.svg",
  status: "in-session",
  nextAvailability: "Today at 4:00 PM"
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Wilson",
    image: "/placeholder.svg",
    text: "Sarah completely transformed my approach to fitness. In just 3 months, I've lost 15 pounds and feel stronger than ever.",
    rating: 5
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    image: "/placeholder.svg",
    text: "Working with Sarah has been life-changing. She knows exactly how to push me while making workouts enjoyable.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chang",
    image: "/placeholder.svg",
    text: "Sarah's nutrition advice alongside the training program helped me finally break through my weight loss plateau.",
    rating: 4
  }
];

export const aiConversation: Message[] = [
  {
    sender: "client",
    message: "Hi, I need to reschedule my private session this week. Can I move it to Tuesday?",
    time: "10:23 AM"
  },
  {
    sender: "ai",
    message: "Hello! I see you currently have a session scheduled for Thursday at 3:00 PM. Let me check Sarah's availability for Tuesday. She has open slots at 10:00 AM and 4:00 PM on Tuesday. Would either of those work for you?",
    time: "10:24 AM"
  },
  {
    sender: "client",
    message: "4:00 PM on Tuesday works for me. Can you book that?",
    time: "10:26 AM"
  },
  {
    sender: "ai",
    message: "Perfect! I've rescheduled your session to Tuesday at 4:00 PM with Sarah. You'll receive a confirmation email shortly. Sarah has been notified of this change. Is there anything else you need help with?",
    time: "10:27 AM"
  }
];

// Helper function to get a trainer by ID
export function getTrainerById(id: string): Trainer | undefined {
  // In a real app, this would fetch from an API
  // For now, we just return our mock trainer if IDs match
  if (trainerData.id === id) {
    return trainerData;
  }
  return undefined;
}
