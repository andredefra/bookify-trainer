
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProfileDialogFooterProps {
  onClose: () => void;
}

export function ProfileDialogFooter({ onClose }: ProfileDialogFooterProps) {
  return (
    <div className="flex justify-between mt-4">
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Session
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
      <Button variant="ghost" size="sm" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
