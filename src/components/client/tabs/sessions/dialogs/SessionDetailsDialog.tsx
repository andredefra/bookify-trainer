
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SessionItem } from "@/types/sessions";

interface SessionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionItem | null;
  onRegister: (session: SessionItem) => void;
  isMobile?: boolean;
}

export function SessionDetailsDialog({ 
  open, 
  onOpenChange, 
  session, 
  onRegister,
  isMobile = false
}: SessionDetailsDialogProps) {
  if (!session) return null;
  
  const handleRegisterClick = () => {
    onRegister(session);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "sm:max-w-[425px] p-4 sm:p-6" : "sm:max-w-[500px]"}>
        <DialogHeader>
          <DialogTitle>{session.name}</DialogTitle>
          <DialogDescription>
            With {session.trainer}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{session.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{session.time}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>
              {session.attendees !== undefined && session.maxAttendees ? (
                `${session.attendees}/${session.maxAttendees} participants`
              ) : (
                "Private session"
              )}
            </span>
          </div>
          
          {session.price && (
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>€{session.price}</span>
            </div>
          )}
          
          <div className="pt-2">
            <h4 className="font-medium mb-1">Session Description</h4>
            <p className="text-sm text-muted-foreground">
              {session.description || `Join ${session.trainer} for an exciting ${session.name.toLowerCase()} session designed to improve your fitness and well-being.`}
            </p>
          </div>
        </div>
        
        <DialogFooter className={`${isMobile ? "flex-col space-y-2" : "sm:space-x-2"}`}>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className={isMobile ? "w-full" : ""}
          >
            Cancel
          </Button>
          {session.status !== 'registered' && session.status !== 'confirmed' && (
            <Button 
              type="button" 
              onClick={handleRegisterClick}
              className={isMobile ? "w-full" : ""}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Register for €{session.price || "50"}
            </Button>
          )}
          {(session.status === 'registered' || session.status === 'confirmed') && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Already Registered
            </Badge>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
