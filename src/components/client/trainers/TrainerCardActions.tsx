
import { Button } from "@/components/ui/button";
import { DollarSign, MessageSquare, Star } from "lucide-react";

interface TrainerCardActionsProps {
  id: number;
  name: string;
  onPayClick: (trainer: string, amount: number) => void;
  onViewProfile: (id: number, name: string) => void;
  onLeaveReview: (id: number, name: string) => void;
}

export function TrainerCardActions({ 
  id, 
  name, 
  onPayClick,
  onViewProfile,
  onLeaveReview
}: TrainerCardActionsProps) {
  return (
    <div className="px-4 pb-4 mt-0 flex flex-wrap gap-2">
      <Button size="sm" onClick={() => onViewProfile(id, name)}>
        View Profile
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onLeaveReview(id, name)}
      >
        <Star className="h-3.5 w-3.5 mr-1" />
        Review
      </Button>
      <Button 
        variant="secondary" 
        size="sm"
        onClick={() => onPayClick(name, (id === 1) ? 45 : 50)}
      >
        <DollarSign className="h-3.5 w-3.5 mr-1" />
        Pay
      </Button>
    </div>
  );
}
