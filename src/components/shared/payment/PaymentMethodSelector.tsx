
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Coins } from "lucide-react";

interface PaymentMethodSelectorProps {
  selectedMethod: 'card' | 'cash';
  onMethodChange: (method: 'card' | 'cash') => void;
}

export function PaymentMethodSelector({ 
  selectedMethod, 
  onMethodChange 
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Payment Method</Label>
      <RadioGroup 
        value={selectedMethod} 
        className="flex flex-col sm:flex-row gap-2 sm:gap-4" 
        onValueChange={(value) => onMethodChange(value as 'card' | 'cash')}
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
  );
}
