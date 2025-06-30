
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Coins, Smartphone, Calendar } from "lucide-react";

interface PaymentMethodSelectorProps {
  selectedMethod: 'card' | 'cash' | 'paypal' | 'klarna';
  onMethodChange: (method: 'card' | 'cash' | 'paypal' | 'klarna') => void;
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
        className="grid grid-cols-1 sm:grid-cols-2 gap-2" 
        onValueChange={(value) => onMethodChange(value as 'card' | 'cash' | 'paypal' | 'klarna')}
      >
        <div className="flex items-center space-x-2 border rounded-md p-3 w-full">
          <RadioGroupItem value="card" id="payment-card" />
          <Label htmlFor="payment-card" className="flex items-center cursor-pointer flex-1">
            <CreditCard className="mr-2 h-4 w-4" />
            <div>
              <div className="font-medium">Credit/Debit Card</div>
              <div className="text-xs text-gray-500">Visa, MasterCard, Amex</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 border rounded-md p-3 w-full">
          <RadioGroupItem value="klarna" id="payment-klarna" />
          <Label htmlFor="payment-klarna" className="flex items-center cursor-pointer flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            <div>
              <div className="font-medium">Buy Now, Pay Later</div>
              <div className="text-xs text-gray-500">4 interest-free payments</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 border rounded-md p-3 w-full">
          <RadioGroupItem value="paypal" id="payment-paypal" />
          <Label htmlFor="payment-paypal" className="flex items-center cursor-pointer flex-1">
            <Smartphone className="mr-2 h-4 w-4" />
            <div>
              <div className="font-medium">PayPal</div>
              <div className="text-xs text-gray-500">Pay with PayPal account</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 border rounded-md p-3 w-full">
          <RadioGroupItem value="cash" id="payment-cash" />
          <Label htmlFor="payment-cash" className="flex items-center cursor-pointer flex-1">
            <Coins className="mr-2 h-4 w-4" />
            <div>
              <div className="font-medium">Cash Payment</div>
              <div className="text-xs text-gray-500">Pay trainer directly</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
