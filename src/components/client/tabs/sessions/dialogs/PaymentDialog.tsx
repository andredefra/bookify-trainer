
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

// PayPal payment form mockup
const PayPalPaymentForm = () => (
  <div className="space-y-4">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-blue-600 font-bold text-lg">PayPal</div>
      </div>
      <p className="text-sm text-blue-700 mb-3">
        You'll be redirected to PayPal to complete your payment securely
      </p>
      <div className="text-xs text-blue-600">
        ✓ Buyer protection included
      </div>
    </div>
  </div>
);

// Klarna payment form mockup
const KlarnaPaymentForm = ({ amount }: { amount: number }) => (
  <div className="space-y-4">
    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-pink-600 rounded text-white text-xs flex items-center justify-center font-bold">K</div>
        <span className="font-semibold text-pink-800">Klarna</span>
      </div>
      <p className="text-sm text-pink-700 mb-3">
        Split your payment into 4 interest-free installments
      </p>
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="font-medium">Today</div>
          <div className="text-gray-600">€{(amount / 4).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">2 weeks</div>
          <div className="text-gray-600">€{(amount / 4).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">4 weeks</div>
          <div className="text-gray-600">€{(amount / 4).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">6 weeks</div>
          <div className="text-gray-600">€{(amount / 4).toFixed(2)}</div>
        </div>
      </div>
    </div>
  </div>
);

export function PaymentDialog({
  open,
  onOpenChange,
  session,
  onPaymentComplete,
  isMobile = false
}: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'paypal' | 'klarna'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  if (!session) return null;
  
  const handlePaymentMethodChange = (method: 'card' | 'cash' | 'paypal' | 'klarna') => {
    setPaymentMethod(method);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPaymentComplete();
    onOpenChange(false);
  };
  
  // Format date to string if it's a Date object
  const formattedDate = session.date instanceof Date 
    ? session.date.toLocaleDateString() 
    : session.date;
  
  const paymentItem = {
    id: session.id,
    name: session.name,
    price: session.price || 50,
    description: `Training session with ${session.trainer}`,
    date: formattedDate,
    time: session.time,
    trainer: session.trainer,
    attendees: session.attendees,
    maxAttendees: session.maxAttendees
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
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
        );
      case 'paypal':
        return <PayPalPaymentForm />;
      case 'klarna':
        return <KlarnaPaymentForm amount={paymentItem.price} />;
      case 'cash':
        return <CashPaymentNotice />;
      default:
        return null;
    }
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
              {renderPaymentForm()}
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
                {paymentMethod === 'card' ? 'Pay Now' : paymentMethod === 'paypal' ? 'Pay with PayPal' : paymentMethod === 'klarna' ? 'Pay with Klarna' : 'Confirm'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
