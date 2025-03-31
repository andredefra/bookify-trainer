
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-mobile";
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector";
import { CardPaymentForm } from "./payment/CardPaymentForm";
import { CashPaymentNotice } from "./payment/CashPaymentNotice";
import { PaymentItemDetails } from "./payment/PaymentItemDetails";

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
  const isMobile = useMediaQuery("(max-width: 640px)");
  
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
      <DialogContent className={`${isMobile ? 'w-[95%] p-4' : 'sm:max-w-[425px]'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader className={isMobile ? "space-y-1" : ""}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className={`grid gap-${isMobile ? '3' : '4'} py-${isMobile ? '3' : '4'}`}>
            <PaymentItemDetails item={item} />
            
            <PaymentMethodSelector 
              selectedMethod={paymentMethod} 
              onMethodChange={setPaymentMethod} 
            />
            
            {paymentMethod === 'card' ? (
              <CardPaymentForm 
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardHolder={cardHolder}
                setCardHolder={setCardHolder}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                cvv={cvv}
                setCvv={setCvv}
              />
            ) : (
              <CashPaymentNotice />
            )}
          </div>
          
          <DialogFooter className={isMobile ? "mt-4 flex-col gap-2" : ""}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className={isMobile ? "w-full" : ""}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className={isMobile ? "w-full" : ""}
            >
              {loading ? "Processing..." : paymentMethod === 'card' ? "Pay Now" : "Confirm Cash Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
