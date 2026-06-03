
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTrainerPlan } from "@/context/TrainerPlanContext";

interface ProfileDialogFooterProps {
  onClose: () => void;
  onMessage: () => void;
  onScheduleSession: () => void;
  onScheduleEvent?: () => void;
}

export function ProfileDialogFooter({ onClose, onMessage, onScheduleSession, onScheduleEvent }: ProfileDialogFooterProps) {
  const plan = useTrainerPlan();
  const isBasic = plan === "basic";
  return (
    <div className="flex justify-between mt-4 flex-wrap gap-2">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onMessage}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={isBasic ? (onScheduleEvent ?? onScheduleSession) : onScheduleSession}
        >
          <Calendar className="h-4 w-4 mr-2" />
          {isBasic ? "Schedule Event" : "Schedule Session"}
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View and manage client information</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
