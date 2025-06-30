
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Coins, Smartphone, Calendar, Check } from "lucide-react";

interface EnhancedPaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export function EnhancedPaymentMethodSelector({ 
  selectedMethod, 
  onMethodChange 
}: EnhancedPaymentMethodSelectorProps) {
  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, MasterCard, American Express' },
    { id: 'klarna', label: 'Buy Now, Pay Later', icon: Calendar, description: 'Split into 4 interest-free payments' },
    { id: 'paypal', label: 'PayPal', icon: Smartphone, description: 'Pay with your PayPal account' },
    { id: 'cash', label: 'Cash Payment', icon: Coins, description: 'Pay your trainer directly' },
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">Choose Payment Method</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all border-2 ${
              selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onMethodChange(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <method.icon className="h-5 w-5 text-gray-600" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{method.label}</p>
                  <p className="text-xs text-gray-500 truncate">{method.description}</p>
                </div>
                {selectedMethod === method.id && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
