
import { Star, Calendar, MapPin, UserPlus, UserMinus, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarketplaceTrainer } from "./hooks/useTrainerMarketplace";
import { useNavigate } from "react-router-dom";

interface TrainerCardProps {
  trainer: MarketplaceTrainer;
  onBookSession: (trainerName: string) => void;
  followedTrainers?: number[];
  onFollowToggle?: (id: number, name: string) => void;
  isMyTrainersView?: boolean;
}

export function MarketplaceTrainerCard({ 
  trainer, 
  onBookSession,
  followedTrainers = [],
  onFollowToggle,
  isMyTrainersView = false
}: TrainerCardProps) {
  const navigate = useNavigate();
  const isFollowing = followedTrainers.includes(Number(trainer.id));
  
  // In "My Trainers" view, we always want to show Unfollow because they're already followed
  const showUnfollow = isMyTrainersView || isFollowing;
  
  const handleFollowToggle = () => {
    if (onFollowToggle) {
      onFollowToggle(Number(trainer.id), trainer.name);
    }
  };

  const handleViewProfile = () => {
    navigate(`/trainer/${trainer.id}`);
  };

  return (
    <div className="bg-background rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div 
          className="h-48 bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${trainer.image})` }}
        >
        </div>
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{trainer.name}</h3>
              <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              {trainer.price}/session
            </Badge>
          </div>
          
          <div className="flex items-center mt-2 text-sm">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{trainer.location}</span>
          </div>
          
          <div className="flex items-center mt-2 text-sm">
            <Star className="h-4 w-4 mr-1 text-amber-500" />
            <span>{trainer.rating}</span>
            <span className="text-muted-foreground ml-1">({trainer.reviews} reviews)</span>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-emerald-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{trainer.availability}</span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="w-full"
              onClick={() => onBookSession(trainer.name)}
            >
              Book Session
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleViewProfile}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              View Profile
            </Button>
            
            {onFollowToggle && (
              <Button 
                variant={showUnfollow ? "secondary" : "outline"} 
                size="sm" 
                className="w-full col-span-2"
                onClick={handleFollowToggle}
              >
                {showUnfollow ? (
                  <>
                    <UserMinus className="h-3.5 w-3.5 mr-1" />
                    Unfollow
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3.5 w-3.5 mr-1" />
                    Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
