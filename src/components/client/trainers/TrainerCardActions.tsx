
import { Button } from "@/components/ui/button";
import { DollarSign, Star, User } from "lucide-react";

interface TrainerCardActionsProps {
  id: number;
  name: string;
  onPayClick: (trainer: string, amount: number, trainerPlan?: string) => void;
  onViewProfile: (id: number, name: string) => void;
  onLeaveReview: (id: number, name: string) => void;
  hourlyRate?: number;
  plan?: string;
}

export function TrainerCardActions({ 
  id, 
  name, 
  onPayClick,
  onViewProfile,
  onLeaveReview,
  hourlyRate,
  plan = "freemium"
}: TrainerCardActionsProps) {
  const paymentAmount = hourlyRate || (id === 1 ? 50 : 45);
  
  return (
    <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col gap-2 border-t border-gray-100 pt-3">
      {/* Primary action - simplified for web */}
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-9"
        onClick={() => onViewProfile(id, name)}
      >
        <User className="h-4 w-4 mr-2" />
        View Profile
      </Button>
      
      {/* Secondary actions - optimized layout */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center justify-center gap-1 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 h-8 text-xs"
          onClick={() => onLeaveReview(id, name)}
        >
          <Star className="h-3 w-3 shrink-0" />
          <span className="truncate">Review</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center justify-center gap-1 hover:bg-green-50 hover:border-green-200 hover:text-green-700 h-8 text-xs"
          onClick={() => onPayClick(name, paymentAmount, plan)}
        >
          <DollarSign className="h-3 w-3 shrink-0" />
          <span className="truncate">${paymentAmount}</span>
        </Button>
      </div>
    </div>
  );
}
