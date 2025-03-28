
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PaymentItem {
  id: string | number;
  name: string;
  price?: number;
  date?: string;
  time?: string;
  trainer?: string;
  attendees?: number;
  maxAttendees?: number;
  description?: string;
}

export interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: PaymentItem | null;
  onPaymentComplete: () => void;
  title?: string;
  description?: string;
}

export function PaymentDialog({ 
  open, 
  onOpenChange, 
  item, 
  onPaymentComplete,
  title = "Complete Registration",
  description
}: PaymentDialogProps) {
  if (!item) return null;
  
  const handleComplete = () => {
    toast({
      title: "Registration Completed",
      description: `You've been registered for ${item.name}`,
      variant: "default"
    });
    onPaymentComplete();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description || `Complete registration for ${item.name}`}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(85vh-180px)] pr-4">
          <div className="space-y-5 my-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{item.name}</div>
                <div className="text-green-600 font-medium">Free</div>
              </div>
              
              {item.description && (
                <div className="text-sm text-muted-foreground mb-2">
                  {item.description}
                </div>
              )}
              
              {item.date && (
                <div className="text-sm text-muted-foreground">
                  {item.date} {item.time && `at ${item.time}`}
                </div>
              )}
              
              {item.trainer && (
                <div className="text-sm text-muted-foreground">
                  Trainer: {item.trainer}
                </div>
              )}
              
              {item.attendees !== undefined && item.maxAttendees && (
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{item.attendees}/{item.maxAttendees} attending</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Registration Details</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border rounded-md bg-muted/20">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Session Information</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll add this session to your calendar and send you a reminder before it starts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 border rounded-md bg-muted/20">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Attendance Confirmed</h4>
                    <p className="text-sm text-muted-foreground">
                      Your spot will be reserved once you complete registration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 text-sm">
              <p className="mb-2">By registering, you agree that:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>You will receive email notifications about this session</li>
                <li>Cancellation policy requires 24 hours notice</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleComplete}>
            Complete Registration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
