
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from "lucide-react";

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
      </div>
      <Button variant="ghost" size="sm" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
