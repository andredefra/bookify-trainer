
import { useNavigate } from "react-router-dom";
import { Star, DollarSign, UserPlus, UserMinus, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  const getStatusColor = (status: string) => {
    switch(status) {
      case "online":
        return "bg-emerald-500";
      case "in-session":
        return "bg-amber-500";
      default:
        return "bg-slate-500";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "online":
        return "Available";
      case "in-session":
        return "In Session";
      default:
        return "Offline";
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant="secondary" 
            className={`flex items-center gap-1.5 px-2 py-1 ${getStatusColor(status)} text-white`}
          >
            <Circle className="h-2 w-2 fill-white text-white" />
            <span className="text-xs font-medium">{getStatusText(status)}</span>
          </Badge>
        </div>
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
