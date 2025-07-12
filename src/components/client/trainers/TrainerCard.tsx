
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
  plan?: string;
  onPayClick: (trainer: string, amount: number, trainerPlan?: string) => void;
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
  plan = "freemium",
  onPayClick,
  isFollowing,
  onFollowToggle,
  onViewProfile,
  onLeaveReview
}: TrainerCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50 flex flex-col h-[420px] sm:h-[450px]">
      <div className="h-[160px] sm:h-[180px]">
        <TrainerCardHeader 
          image={image} 
          name={name} 
          status={status} 
        />
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1">
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
        </div>
        <TrainerCardActions 
          id={id}
          name={name}
          onPayClick={onPayClick}
          onViewProfile={onViewProfile}
          onLeaveReview={onLeaveReview}
          hourlyRate={hourlyRate}
          plan={plan}
        />
      </div>
    </Card>
  );
}
