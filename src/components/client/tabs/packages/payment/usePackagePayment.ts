
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function usePackagePayment() {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (
    e: React.FormEvent, 
    onComplete: () => void, 
    onClose: () => void,
    packagePrice: number
  ) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      let message = "";
      switch (paymentMethod) {
        case 'card':
          message = "Payment processed successfully with credit card";
          break;
        case 'klarna':
          message = "Klarna payment set up successfully. First installment charged.";
          break;
        case 'paypal':
          message = "PayPal payment completed successfully";
          break;
        case 'cash':
          message = "Cash payment arranged. Pay your trainer directly.";
          break;
      }
      
      toast({
        title: "Payment Successful",
        description: message,
      });
      
      onClose();
      onComplete();
    }, 2000);
  };

  return {
    paymentMethod,
    setPaymentMethod,
    loading,
    cardNumber,
    setCardNumber,
    cardHolder,
    setCardHolder,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    handleSubmit
  };
}
