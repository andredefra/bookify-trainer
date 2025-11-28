
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { bookingSchema } from "@/components/trainer/BookingForm";
import { getGymTrainers, GymTrainer } from "@/data/gymTrainersMockData";

// Define Trainer type for better type safety
export interface MarketplaceTrainer {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  availability: string;
  image: string;
}

// Mock trainer data with real images
const trainersData: MarketplaceTrainer[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    specialty: "Strength Training",
    location: "New York, NY",
    rating: 4.9,
    reviews: 124,
    price: "€50",
    availability: "Available today",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: "t2",
    name: "Michael Thompson",
    specialty: "HIIT Workouts",
    location: "Los Angeles, CA",
    rating: 4.7,
    reviews: 98,
    price: "€45",
    availability: "Available tomorrow",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "t3",
    name: "Emma Davis",
    specialty: "Yoga Instructor",
    location: "Chicago, IL",
    rating: 4.8,
    reviews: 156,
    price: "€40",
    availability: "Available today",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "t4",
    name: "James Wilson",
    specialty: "Nutrition Coach",
    location: "Austin, TX",
    rating: 4.6,
    reviews: 87,
    price: "€60",
    availability: "Available this week",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
  }
];

export function useTrainerMarketplace(
  followedTrainers: number[] = [],
  isGymFilterActive: boolean = false,
  gymId?: string
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  
  // Debug logs
  console.log("useTrainerMarketplace received followedTrainers:", followedTrainers);
  console.log("useTrainerMarketplace gym filter active:", isGymFilterActive, "gymId:", gymId);
  
  const handleBookSession = (trainerName: string) => {
    setSelectedTrainer(trainerName);
    setShowBookingDialog(true);
  };
  
  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast({
      title: "Session Booked",
      description: `Session booked successfully with ${selectedTrainer} for ${data.date.toLocaleDateString()} at ${data.time}`,
      variant: "default",
    });
    setShowBookingDialog(false);
  };
  
  // Get trainers data based on gym filter
  const getTrainersData = (): MarketplaceTrainer[] => {
    // If filter is ON, show ONLY gym trainers
    if (isGymFilterActive && gymId) {
      const gymTrainers = getGymTrainers(gymId);
      return gymTrainers.map(t => ({
        id: `gym-${t.id}`,
        name: t.name,
        specialty: t.specialty,
        location: "FitLife Gym",
        rating: t.rating,
        reviews: t.reviews,
        price: `€${t.hourlyRate}`,
        availability: t.status === "online" ? "Available now" : 
                      t.status === "in-session" ? "In session" : "Check availability",
        image: t.image
      }));
    }
    
    // If filter is OFF, show ALL trainers (gym + marketplace)
    const gymTrainers = getGymTrainers('11111111-1111-1111-1111-111111111111');
    const convertedGymTrainers: MarketplaceTrainer[] = gymTrainers.map(t => ({
      id: `gym-${t.id}`,
      name: t.name,
      specialty: t.specialty,
      location: "FitLife Gym",
      rating: t.rating,
      reviews: t.reviews,
      price: `€${t.hourlyRate}`,
      availability: t.status === "online" ? "Available now" : 
                    t.status === "in-session" ? "In session" : "Check availability",
      image: t.image
    }));
    
    // Filter out Sarah Johnson from marketplace trainers (she's already in gym trainers)
    const otherTrainers = trainersData.filter(t => 
      !gymTrainers.some(gt => gt.name.toLowerCase() === t.name.toLowerCase())
    );
    
    // Combine: gym trainers first, then other marketplace trainers
    return [...convertedGymTrainers, ...otherTrainers];
  };
  
  const currentTrainersData = getTrainersData();
  
  // Filter trainers based on search query
  const filteredTrainers = currentTrainersData.filter(trainer => 
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter by location if provided
  const locationFilteredTrainers = location 
    ? filteredTrainers.filter(trainer => 
        trainer.location.toLowerCase().includes(location.toLowerCase())
      )
    : filteredTrainers;
  
  // Show ALL trainers in marketplace - user can see follow status on cards
  return {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    trainers: locationFilteredTrainers,
    showBookingDialog,
    setShowBookingDialog,
    selectedTrainer,
    handleBookSession,
    handleBookingSubmit
  };
}
