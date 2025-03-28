
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { SessionItem } from "@/types/sessions";

interface SessionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionItem | null;
  onRegister: (session: SessionItem) => void;
}

export function SessionDetailsDialog({ 
  open, 
  onOpenChange, 
  session, 
  onRegister 
}: SessionDetailsDialogProps) {
  if (!session) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{session.name}</DialogTitle>
          <DialogDescription>
            Session details and registration
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{session.date}, {session.time}</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Trainer</div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-2">
                {session.trainer.split(' ').map(n => n[0]).join('')}
              </div>
              <span>{session.trainer}</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Attendance</div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{session.attendees}/{session.maxAttendees} attending</span>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Price</div>
            <div className="text-lg font-bold">€{session.price}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Description</div>
            <p className="text-sm text-muted-foreground">
              {session.description || "No description available."}
            </p>
          </div>
          
          <div className="pt-2 flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button 
              onClick={() => onRegister(session)}
            >
              Register for Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
