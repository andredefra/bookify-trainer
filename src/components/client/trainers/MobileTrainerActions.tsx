
import { Button } from "@/components/ui/button";
import { DollarSign, MessageSquare } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface MobileTrainerActionsProps {
  id: number;
  name: string;
  navigate: NavigateFunction;
  onPayClick: (trainer: string, amount: number) => void;
}

export function MobileTrainerActions({ 
  id, 
  name, 
  navigate, 
  onPayClick 
}: MobileTrainerActionsProps) {
  return (
    <div className="px-3 pb-3 grid grid-cols-3 gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full" 
        onClick={() => navigate(`/trainer/${id}`)}
      >
        Profile
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={() => navigate('/client-dashboard?tab=messages')}
      >
        <MessageSquare className="h-3.5 w-3.5 mr-1" />
        Chat
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={() => onPayClick(name, (id === 1) ? 45 : 50)}
      >
        <DollarSign className="h-3.5 w-3.5 mr-1" />
        Pay
      </Button>
    </div>
  );
}
