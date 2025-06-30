
import { Star, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrainerCardContentProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  id: number;
  isFollowing: boolean;
  onFollowToggle: (id: number, name: string) => void;
  hourlyRate?: number;
  nextAvailability?: string;
  location?: string;
}

export function TrainerCardContent({ 
  name, 
  specialty, 
  rating, 
  reviews, 
  id,
  isFollowing,
  onFollowToggle,
  hourlyRate,
  nextAvailability,
  location
}: TrainerCardContentProps) {
  return (
    <div className="p-4 space-y-3">
      {/* Header with name and follow button */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-900 leading-tight truncate">{name}</h3>
          <p className="text-sm text-gray-600 font-medium mt-0.5 truncate">{specialty}</p>
        </div>
        <Button 
          variant={isFollowing ? "outline" : "secondary"}
          size="sm"
          onClick={() => onFollowToggle(id, name)}
          className="shrink-0 h-8 px-3"
        >
          {isFollowing ? (
            <>
              <UserMinus className="h-3 w-3 mr-1" />
              <span className="text-xs">Following</span>
            </>
          ) : (
            <>
              <UserPlus className="h-3 w-3 mr-1" />
              <span className="text-xs">Follow</span>
            </>
          )}
        </Button>
      </div>

      {/* Rating and verification */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-sm">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>
        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 px-2 py-0.5">
          Verified
        </Badge>
      </div>

      {/* Additional info - single column layout */}
      <div className="space-y-1.5 text-sm">
        {location && (
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate text-xs">{location}</span>
          </div>
        )}
        
        {hourlyRate && (
          <div className="flex items-center gap-1.5 text-gray-900 font-medium">
            <DollarSign className="h-3 w-3 shrink-0" />
            <span className="text-xs">${hourlyRate}/hour</span>
          </div>
        )}
        
        {nextAvailability && (
          <div className="flex items-center gap-1.5 text-green-600">
            <Clock className="h-3 w-3 shrink-0" />
            <span className="truncate text-xs">{nextAvailability}</span>
          </div>
        )}
      </div>
    </div>
  );
}
