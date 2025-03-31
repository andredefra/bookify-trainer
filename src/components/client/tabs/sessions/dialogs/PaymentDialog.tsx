
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SessionItem } from "@/types/sessions";
import { Button } from "@/components/ui/button";
import { PaymentMethodSelector } from "@/components/shared/payment/PaymentMethodSelector";
import { PaymentItemDetails } from "@/components/shared/payment/PaymentItemDetails";
import { CardPaymentForm } from "@/components/shared/payment/CardPaymentForm";
import { CashPaymentNotice } from "@/components/shared/payment/CashPaymentNotice";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionItem | null;
  onPaymentComplete: () => void;
  isMobile?: boolean;
}

export function PaymentDialog({
  open,
  onOpenChange,
  session,
  onPaymentComplete,
  isMobile = false
}: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  if (!session) return null;
  
  const handlePaymentMethodChange = (method: 'card' | 'cash') => {
    setPaymentMethod(method);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPaymentComplete();
    onOpenChange(false);
  };
  
  const paymentItem = {
    id: session.id,
    name: session.name,
    price: session.price || 50,
    description: `Training session with ${session.trainer}`,
    date: session.date,
    time: session.time,
    trainer: session.trainer,
    attendees: session.attendees,
    maxAttendees: session.maxAttendees
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "sm:max-w-[425px] p-4 sm:p-6" : "sm:max-w-[500px]"}>
        <DialogHeader>
          <DialogTitle>Complete Your Registration</DialogTitle>
          <DialogDescription>
            Complete payment to register for this session
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <PaymentItemDetails item={paymentItem} />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={handlePaymentMethodChange}
            />
            
            <div className="border-t pt-4">
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
            
            <div className="flex justify-end mt-6 space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className={isMobile ? "flex-1" : ""}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className={isMobile ? "flex-1" : ""}
              >
                {paymentMethod === 'card' ? 'Pay Now' : 'Confirm'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
