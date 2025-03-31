
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, DollarSign, CalendarCheck } from "lucide-react";

interface TrainerActionsProps {
  onMessageClick: () => void;
  onPayClick: () => void;
  onBookClick: () => void;
}

export function TrainerActions({ onMessageClick, onPayClick, onBookClick }: TrainerActionsProps) {
  return (
    <div className="ml-auto flex gap-1">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onMessageClick}
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onPayClick}
      >
        <DollarSign className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onBookClick}
      >
        <CalendarCheck className="h-4 w-4" />
      </Button>
    </div>
  );
}
