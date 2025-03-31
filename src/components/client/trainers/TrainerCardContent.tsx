
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";

interface TrainerCardContentProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  id: number;
  isFollowing: boolean;
  onFollowToggle: (id: number, name: string) => void;
}

export function TrainerCardContent({ 
  name, 
  specialty, 
  rating, 
  reviews, 
  id,
  isFollowing,
  onFollowToggle
}: TrainerCardContentProps) {
  return (
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
          {isFollowing ? (
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
      </div>
    </div>
  );
}
