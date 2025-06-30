
import { Button } from "@/components/ui/button";
import { DollarSign, MessageSquare, Star, User } from "lucide-react";

interface TrainerCardActionsProps {
  id: number;
  name: string;
  onPayClick: (trainer: string, amount: number) => void;
  onViewProfile: (id: number, name: string) => void;
  onLeaveReview: (id: number, name: string) => void;
  hourlyRate?: number;
}

export function TrainerCardActions({ 
  id, 
  name, 
  onPayClick,
  onViewProfile,
  onLeaveReview,
  hourlyRate
}: TrainerCardActionsProps) {
  const paymentAmount = hourlyRate || (id === 1 ? 50 : 45);
  
  return (
    <div className="px-4 pb-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
      {/* Primary action */}
      <Button 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm"
        onClick={() => onViewProfile(id, name)}
      >
        <User className="h-4 w-4 mr-2" />
        View Profile
      </Button>
      
      {/* Secondary actions - improved layout */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 min-w-0"
          onClick={() => onLeaveReview(id, name)}
        >
          <Star className="h-3.5 w-3.5 mr-1 shrink-0" />
          <span className="truncate text-xs">Review</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 hover:bg-green-50 hover:border-green-200 hover:text-green-700 min-w-0"
          onClick={() => onPayClick(name, paymentAmount)}
        >
          <DollarSign className="h-3.5 w-3.5 mr-1 shrink-0" />
          <span className="truncate text-xs">${paymentAmount}</span>
        </Button>
      </div>
    </div>
  );
}
