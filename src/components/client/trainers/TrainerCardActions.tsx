
import { Button } from "@/components/ui/button";
import { DollarSign, MessageSquare } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface TrainerCardActionsProps {
  id: number;
  name: string;
  navigate: NavigateFunction;
  onPayClick: (trainer: string, amount: number) => void;
}

export function TrainerCardActions({ 
  id, 
  name, 
  navigate, 
  onPayClick 
}: TrainerCardActionsProps) {
  return (
    <div className="px-4 pb-4 mt-0 flex flex-wrap gap-2">
      <Button size="sm" onClick={() => navigate(`/trainer/${id}`)}>View Profile</Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate('/client-dashboard?tab=messages')}
      >
        <MessageSquare className="h-3.5 w-3.5 mr-1" />
        Message
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
