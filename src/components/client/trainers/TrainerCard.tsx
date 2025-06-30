
import { Card } from "@/components/ui/card";
import { TrainerCardHeader } from "./TrainerCardHeader";
import { TrainerCardContent } from "./TrainerCardContent";
import { TrainerCardActions } from "./TrainerCardActions";

interface TrainerCardProps {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  status?: "online" | "in-session" | "offline";
  hourlyRate?: number;
  nextAvailability?: string;
  location?: string;
  onPayClick: (trainer: string, amount: number) => void;
  isFollowing: boolean;
  onFollowToggle: (id: number, name: string) => void;
  onViewProfile: (id: number, name: string) => void;
  onLeaveReview: (id: number, name: string) => void;
}

export function TrainerCard({ 
  id, 
  name, 
  specialty, 
  rating, 
  reviews, 
  image, 
  status = "offline",
  hourlyRate,
  nextAvailability,
  location,
  onPayClick,
  isFollowing,
  onFollowToggle,
  onViewProfile,
  onLeaveReview
}: TrainerCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50 h-full flex flex-col">
      <TrainerCardHeader 
        image={image} 
        name={name} 
        status={status} 
      />
      <div className="flex-1 flex flex-col">
        <TrainerCardContent 
          name={name}
          specialty={specialty}
          rating={rating}
          reviews={reviews}
          id={id}
          isFollowing={isFollowing}
          onFollowToggle={onFollowToggle}
          hourlyRate={hourlyRate}
          nextAvailability={nextAvailability}
          location={location}
        />
        <div className="mt-auto">
          <TrainerCardActions 
            id={id}
            name={name}
            onPayClick={onPayClick}
            onViewProfile={onViewProfile}
            onLeaveReview={onLeaveReview}
            hourlyRate={hourlyRate}
          />
        </div>
      </div>
    </Card>
  );
}
