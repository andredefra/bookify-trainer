
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Package, User, Clock, Check, CreditCard, Coins, Smartphone, Calendar } from "lucide-react";
import { PaymentMethodSelector } from "@/components/shared/payment/PaymentMethodSelector";
import { CardPaymentForm } from "@/components/shared/payment/CardPaymentForm";
import { CashPaymentNotice } from "@/components/shared/payment/CashPaymentNotice";
import { toast } from "@/hooks/use-toast";
import { ClientPackage } from "@/hooks/useClientPackages";

interface PackagePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageData: ClientPackage | null;
  trainerName: string;
  onPaymentComplete: () => void;
}

// Enhanced payment method selector with more options
const EnhancedPaymentMethodSelector = ({ 
  selectedMethod, 
  onMethodChange 
}: { 
  selectedMethod: string; 
  onMethodChange: (method: string) => void 
}) => {
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
};

// Klarna payment form mockup
const KlarnaPaymentForm = () => (
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
          <div className="text-gray-600">€{(25).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">2 weeks</div>
          <div className="text-gray-600">€{(25).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">4 weeks</div>
          <div className="text-gray-600">€{(25).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">6 weeks</div>
          <div className="text-gray-600">€{(25).toFixed(2)}</div>
        </div>
      </div>
    </div>
  </div>
);

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

export function PackagePaymentDialog({ 
  open, 
  onOpenChange, 
  packageData, 
  trainerName,
  onPaymentComplete 
}: PackagePaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  if (!packageData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
      
      onOpenChange(false);
      onPaymentComplete();
    }, 2000);
  };

  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case 'sessions_only': return 'bg-blue-100 text-blue-800';
      case 'program_only': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
      case 'klarna':
        return <KlarnaPaymentForm />;
      case 'paypal':
        return <PayPalPaymentForm />;
      case 'cash':
        return <CashPaymentNotice />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Purchase Package
          </DialogTitle>
          <DialogDescription>
            Complete your purchase of {packageData.title} by {trainerName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <Badge className={getPackageTypeColor(packageData.package_type)}>
                    {packageData.package_type.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">€{packageData.price}</div>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2">{packageData.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{packageData.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>by {trainerName}</span>
                </div>
                {packageData.sessions_count > 0 && (
                  <div>{packageData.sessions_count} sessions</div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {packageData.validity_days} days validity
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <EnhancedPaymentMethodSelector 
            selectedMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
          />

          {/* Payment Form */}
          <div className="space-y-4">
            {renderPaymentForm()}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="sm:w-auto w-full"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="sm:flex-1 w-full"
            >
              {loading ? "Processing..." : `Pay €${packageData.price}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
