
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { SessionItem } from "@/types/sessions";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionItem | null;
  onPaymentComplete: () => void;
}

export function PaymentDialog({ 
  open, 
  onOpenChange, 
  session, 
  onPaymentComplete 
}: PaymentDialogProps) {
  if (!session) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Registration</DialogTitle>
          <DialogDescription>
            Register for {session.name} with {session.trainer}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 my-4">
          <div className="border rounded-md p-4">
            <div className="flex justify-between mb-2">
              <div className="font-medium">{session.name}</div>
              <div className="font-bold">€{session.price || 50}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {session.date} at {session.time}
            </div>
            {session.attendees !== undefined && session.maxAttendees && (
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>{session.attendees}/{session.maxAttendees} attending</span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Payment Method</h3>
            <div className="grid grid-cols-1 gap-3">
              {["Google Pay", "PayPal", "Credit Card"].map((method) => (
                <div key={method} className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id={`method-${method}`} 
                      name="paymentMethod"
                      className="h-4 w-4 mr-3"
                      defaultChecked={method === "Credit Card"}
                    />
                    <label htmlFor={`method-${method}`}>{method}</label>
                  </div>
                  {method === "Credit Card" && (
                    <span className="text-sm text-muted-foreground">ending in 4242</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4 text-sm">
            <p className="mb-2">By registering, you agree that:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Payment will be processed automatically when the session starts</li>
              <li>Cancellations must be made at least 24 hours in advance</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onPaymentComplete}>
            Complete Registration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
