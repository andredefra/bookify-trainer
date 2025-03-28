
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PaymentItem {
  id: string | number;
  name: string;
  price: number;
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
  title = "Complete Payment",
  description
}: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState("Credit Card");
  
  if (!item) return null;
  
  const handleComplete = () => {
    toast({
      title: "Payment Completed",
      description: `Payment completed using ${selectedMethod}`,
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
            {description || `Complete payment for ${item.name}`}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(85vh-180px)] pr-4">
          <div className="space-y-5 my-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{item.name}</div>
                <div className="font-bold">€{item.price}</div>
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
              <h3 className="font-medium">Payment Method</h3>
              <div className="grid grid-cols-1 gap-3">
                {["Google Pay", "PayPal", "Credit Card"].map((method) => (
                  <div 
                    key={method} 
                    className="flex items-center justify-between border p-3 rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedMethod(method)}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id={`method-${method}`} 
                        name="paymentMethod"
                        className="h-4 w-4 mr-3"
                        checked={selectedMethod === method}
                        onChange={() => setSelectedMethod(method)}
                      />
                      <label htmlFor={`method-${method}`} className="cursor-pointer">{method}</label>
                    </div>
                    {method === "Credit Card" && (
                      <span className="text-sm text-muted-foreground">ending in 4242</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4 text-sm">
              <p className="mb-2">By proceeding, you agree that:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Payment will be processed immediately upon confirmation</li>
                <li>Our refund policy applies as described in the terms of service</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleComplete}>
            Complete Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
