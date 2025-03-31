
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-mobile";
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector";
import { CardPaymentForm } from "./payment/CardPaymentForm";
import { CashPaymentNotice } from "./payment/CashPaymentNotice";
import { PaymentItemDetails } from "./payment/PaymentItemDetails";
import { PremiumFeatureCard } from "@/components/trainer/training/PremiumFeatureCard";

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
  reference?: string;
}

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: PaymentItem;
  onPaymentComplete: () => void;
  title?: string;
  description?: string;
  isPremiumFeature?: boolean;
  userPlan?: string;
}

export function PaymentDialog({ 
  open, 
  onOpenChange, 
  item, 
  onPaymentComplete,
  title = "Complete Payment",
  description = "Enter your payment details",
  isPremiumFeature = false,
  userPlan = "freemium"
}: PaymentDialogProps) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentReference, setPaymentReference] = useState(item.reference || '');
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Check if direct payment is available based on plan
  const isDirectPaymentAllowed = !isPremiumFeature || userPlan === "pro";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isPremiumFeature && userPlan !== "pro") {
      // Premium feature check
      return;
    }
    
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
        
        {/* Show premium feature card for direct payments if not on pro plan */}
        {isPremiumFeature && userPlan !== "pro" ? (
          <PremiumFeatureCard />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={`grid gap-${isMobile ? '3' : '4'} py-${isMobile ? '3' : '4'}`}>
              <PaymentItemDetails item={item} />
              
              {/* Payment reference field */}
              <div className="space-y-2">
                <label htmlFor="payment-reference" className="text-sm font-medium">
                  Payment Reference
                </label>
                <Input
                  id="payment-reference"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder="Enter payment reference (optional)"
                />
                <p className="text-xs text-muted-foreground">
                  Add a reference for this payment (e.g., Personal Training, Consultation, etc.)
                </p>
              </div>
              
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
        )}
      </DialogContent>
    </Dialog>
  );
}
