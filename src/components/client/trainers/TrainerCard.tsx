
import { useNavigate } from "react-router-dom";
import { Star, DollarSign, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TrainerCardProps {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
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
  onPayClick,
  isFollowing,
  onFollowToggle
}: TrainerCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-100 flex items-center justify-center">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
              <span className="ml-1 text-xs text-muted-foreground">({reviews} reviews)</span>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onFollowToggle(id, name)}
          >
            <UserMinus className="h-3.5 w-3.5 mr-1" />
            Unfollow
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => navigate(`/trainer/${id}`)}>View Profile</Button>
          <Button variant="outline" size="sm">Message</Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onPayClick(name, (id === 1) ? 45 : 50)}
          >
            <DollarSign className="h-3.5 w-3.5 mr-1" />
            Pay
          </Button>
        </div>
      </div>
    </Card>
  );
}
