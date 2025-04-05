
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CardActionsProps {
  onAddGoal: () => void;
  onLogActivity: () => void;
}

export function CardActions({ onAddGoal, onLogActivity }: CardActionsProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
      <Button 
        variant="outline" 
        size={isMobile ? "sm" : "default"}
        className="w-full sm:w-auto"
        onClick={onLogActivity}
      >
        Log Activity
      </Button>
      <Button 
        variant="outline" 
        size={isMobile ? "sm" : "default"}
        className="w-full sm:w-auto"
        onClick={onAddGoal}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Goal
      </Button>
    </div>
  );
}
