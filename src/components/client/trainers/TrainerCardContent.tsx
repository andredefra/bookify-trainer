
import { Star, MapPin, Clock } from "lucide-react";
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
    <div className="p-3 sm:p-4 space-y-2.5">
      {/* Header with name and follow button using CSS Grid */}
      <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
        <div className="min-w-0 overflow-hidden">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-tight truncate">{name}</h3>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5 truncate">{specialty}</p>
        </div>
        <Button 
          variant={isFollowing ? "outline" : "secondary"}
          size="sm"
          onClick={() => onFollowToggle(id, name)}
          className="shrink-0 h-7 px-2 text-xs min-w-[60px] sm:min-w-[70px]"
        >
          {isFollowing ? (
            <>
              <UserMinus className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Following</span>
              <span className="sm:hidden">Follow</span>
            </>
          ) : (
            <>
              <UserPlus className="h-3 w-3 mr-1" />
              <span>Follow</span>
            </>
          )}
        </Button>
      </div>

      {/* Rating and verification - compacted layout */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span className="font-semibold text-sm">{rating}</span>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>
        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 px-1.5 py-0.5 h-5">
          Verified
        </Badge>
      </div>

      {/* Additional info - compact single column */}
      <div className="space-y-1 text-sm">
        {location && (
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate text-xs">{location}</span>
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
