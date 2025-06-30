
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
    <div className="p-5 space-y-4">
      {/* Header with name and follow button */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-1">{name}</h3>
          <p className="text-sm text-gray-600 font-medium">{specialty}</p>
        </div>
        <Button 
          variant={isFollowing ? "outline" : "secondary"}
          size="sm"
          onClick={() => onFollowToggle(id, name)}
          className="shrink-0"
        >
          {isFollowing ? (
            <>
              <UserMinus className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">Following</span>
              <span className="sm:hidden">Follow</span>
            </>
          ) : (
            <>
              <UserPlus className="h-3.5 w-3.5 mr-1.5" />
              <span>Follow</span>
            </>
          )}
        </Button>
      </div>

      {/* Rating and verification */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-sm">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviews} reviews)</span>
        </div>
        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
          Verified
        </Badge>
      </div>

      {/* Additional info - organized in grid for better spacing */}
      <div className="grid grid-cols-1 gap-2 text-sm">
        {location && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}
        
        {hourlyRate && (
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <DollarSign className="h-3.5 w-3.5 shrink-0" />
            <span>${hourlyRate}/hour</span>
          </div>
        )}
        
        {nextAvailability && (
          <div className="flex items-center gap-2 text-green-600">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{nextAvailability}</span>
          </div>
        )}
      </div>
    </div>
  );
}
