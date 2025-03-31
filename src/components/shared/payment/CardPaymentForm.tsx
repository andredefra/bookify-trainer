
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CardPaymentFormProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardHolder: string;
  setCardHolder: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
}

export function CardPaymentForm({
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv
}: CardPaymentFormProps) {
  return (
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
      
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
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
  );
}
