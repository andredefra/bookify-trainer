
import { useNavigate } from "react-router-dom";
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
  onPayClick: (trainer: string, amount: number) => void;
  isFollowing: boolean;
  onFollowToggle: (id: number, name: string) => void;
}

export function TrainerCard({ 
  id, 
  name, 
  specialty, 
  rating, 
  reviews, 
  image, 
  status = "offline",
  onPayClick,
  isFollowing,
  onFollowToggle
}: TrainerCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <TrainerCardHeader 
        image={image} 
        name={name} 
        status={status} 
      />
      <TrainerCardContent 
        name={name}
        specialty={specialty}
        rating={rating}
        reviews={reviews}
        id={id}
        isFollowing={isFollowing}
        onFollowToggle={onFollowToggle}
      />
      <TrainerCardActions 
        id={id}
        name={name}
        navigate={navigate}
        onPayClick={onPayClick}
      />
    </Card>
  );
}
