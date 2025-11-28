
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";

interface TrainerCardActionsProps {
  id: number;
  name: string;
  onViewProfile: (id: number, name: string) => void;
  onLeaveReview: (id: number, name: string) => void;
}

export function TrainerCardActions({ 
  id, 
  name, 
  onViewProfile,
  onLeaveReview
}: TrainerCardActionsProps) {
  return (
    <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col gap-2 border-t border-gray-100 pt-3">
      {/* Primary action */}
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-9"
        onClick={() => onViewProfile(id, name)}
      >
        <User className="h-4 w-4 mr-2" />
        View Profile
      </Button>
      
      {/* Secondary action */}
      <Button 
        variant="outline" 
        size="sm"
        className="w-full flex items-center justify-center gap-1 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 h-8 text-xs"
        onClick={() => onLeaveReview(id, name)}
      >
        <Star className="h-3 w-3 shrink-0" />
        <span className="truncate">Review</span>
      </Button>
    </div>
  );
}
