
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Euro, CreditCard, Coins } from "lucide-react";
import { toast } from "sonner";

interface PaymentItem {
  id: string | number;
  name: string;
  price: number;
  description?: string;
  date?: string;
  time?: string;
  trainer?: string;
  attendees?: number;
  maxAttendees?: number;
}

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: PaymentItem;
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
  description = "Enter your payment details"
}: PaymentDialogProps) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      if (paymentMethod === 'card') {
        // Validate card details
        if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
          toast.error("Please fill in all card details");
          return;
        }
        
        // Process card payment
        toast.success("Payment processed successfully");
      } else {
        // Cash payment notification
        toast.success("Payment marked as pending. Pay your trainer in cash.");
      }
      
      // Reset form
      setCardNumber('');
      setCardHolder('');
      setExpiryDate('');
      setCvv('');
      
      // Close dialog and notify parent
      onOpenChange(false);
      onPaymentComplete();
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">{item.name}</h3>
              {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
              {item.date && <p className="text-sm">Date: {item.date} {item.time && `at ${item.time}`}</p>}
              {item.trainer && <p className="text-sm">Trainer: {item.trainer}</p>}
              {item.attendees !== undefined && item.maxAttendees !== undefined && (
                <p className="text-sm">{item.attendees}/{item.maxAttendees} participants</p>
              )}
              <div className="text-lg font-bold flex items-center mt-1">
                <Euro className="h-4 w-4 mr-1" />
                {item.price.toFixed(2)}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup 
                defaultValue="card" 
                className="flex gap-4" 
                onValueChange={(value) => setPaymentMethod(value as 'card' | 'cash')}
              >
                <div className="flex items-center space-x-2 border rounded-md p-2 w-full">
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label htmlFor="payment-card" className="flex items-center cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-2 w-full">
                  <RadioGroupItem value="cash" id="payment-cash" />
                  <Label htmlFor="payment-cash" className="flex items-center cursor-pointer">
                    <Coins className="mr-2 h-4 w-4" />
                    Cash
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {paymentMethod === 'card' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input 
                    id="card-number" 
                    placeholder="1234 5678 9012 3456" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-holder">Card Holder</Label>
                  <Input 
                    id="card-holder" 
                    placeholder="John Doe" 
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY" 
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123" 
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-blue-50 p-3 rounded-md text-sm border border-blue-200">
                <p>You've selected to pay in cash. Pay your trainer directly at your next meeting.</p>
                <p className="mt-1 text-blue-600 font-medium">Your trainer will need to confirm receipt of payment.</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : paymentMethod === 'card' ? "Pay Now" : "Confirm Cash Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
