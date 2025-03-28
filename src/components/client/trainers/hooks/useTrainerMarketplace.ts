
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { bookingSchema } from "@/components/trainer/BookingForm";

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
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1374&auto=format&fit=crop"
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

export function useTrainerMarketplace(followedTrainers: number[] = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  
  const handleBookSession = (trainerName: string) => {
    setSelectedTrainer(trainerName);
    setShowBookingDialog(true);
  };
  
  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast.success(`Session booked successfully with ${selectedTrainer} for ${data.date.toLocaleDateString()} at ${data.time}`);
    setShowBookingDialog(false);
  };
  
  // Filter trainers based on search query
  const filteredTrainers = trainersData.filter(trainer => 
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter by location if provided
  const locationFilteredTrainers = location 
    ? filteredTrainers.filter(trainer => 
        trainer.location.toLowerCase().includes(location.toLowerCase())
      )
    : filteredTrainers;
  
  // Filter out trainers that are already followed
  const nonFollowedTrainers = locationFilteredTrainers.filter(trainer => 
    !followedTrainers.includes(Number(trainer.id))
  );
  
  return {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    trainers: nonFollowedTrainers,
    showBookingDialog,
    setShowBookingDialog,
    selectedTrainer,
    handleBookSession,
    handleBookingSubmit
  };
}
