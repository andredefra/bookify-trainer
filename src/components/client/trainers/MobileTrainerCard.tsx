
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileTrainerHeader } from "./MobileTrainerHeader";
import { MobileTrainerActions } from "./MobileTrainerActions";
import { MobileTrainerDropdown } from "./MobileTrainerDropdown";

interface MobileTrainerCardProps {
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

export function MobileTrainerCard({ 
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
}: MobileTrainerCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center p-3">
        <MobileTrainerHeader 
          image={image}
          name={name}
          specialty={specialty}
          rating={rating}
          reviews={reviews}
          status={status}
        />
        <MobileTrainerDropdown 
          id={id}
          name={name}
          navigate={navigate}
          isFollowing={isFollowing}
          onFollowToggle={onFollowToggle}
          onPayClick={onPayClick}
        />
      </div>
      
      <MobileTrainerActions 
        id={id}
        name={name}
        navigate={navigate}
        onPayClick={onPayClick}
      />
    </Card>
  );
}
