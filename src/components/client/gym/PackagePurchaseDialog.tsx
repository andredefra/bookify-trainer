import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Euro, Calendar, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface GymPackage {
  id: string;
  title: string;
  description: string;
  package_type: string;
  price: number;
  duration_days: number | null;
  session_limit: number | null;
  features: string[];
}

interface PackagePurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  package: GymPackage;
  onPurchaseComplete: () => void;
}

export function PackagePurchaseDialog({ 
  open, 
  onOpenChange, 
  package: pkg, 
  onPurchaseComplete 
}: PackagePurchaseDialogProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setStep('success');
    
    toast({
      title: "Package Purchased!",
      description: `Successfully purchased ${pkg.title}`,
    });

    // Auto-close after success
    setTimeout(() => {
      onPurchaseComplete();
      setStep('details');
      setNotes('');
    }, 3000);
  };

  const formatPrice = (price: number, type: string) => {
    if (type === 'sessions') return `€${price.toFixed(2)} total`;
    if (type === 'monthly') return `€${price.toFixed(2)}/month`;
    if (type === 'weekly') return `€${price.toFixed(2)}/week`;
    if (type === 'annual') return `€${price.toFixed(2)}/year`;
    return `€${price.toFixed(2)}`;
  };

  const getStartDate = () => {
    return new Date().toLocaleDateString('it-IT');
  };

  const getEndDate = () => {
    if (!pkg.duration_days) return 'Unlimited';
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + pkg.duration_days);
    return endDate.toLocaleDateString('it-IT');
  };

  if (step === 'success') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Purchase Successful!
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Welcome to {pkg.title}!
            </h3>
            <p className="text-muted-foreground">
              Your package is now active and ready to use.
              You can start booking sessions immediately.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Purchase Package
          </DialogTitle>
        </DialogHeader>
        
        {step === 'details' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{pkg.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pkg.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(pkg.price, pkg.package_type)}
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {pkg.package_type}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Start Date: {getStartDate()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Valid Until: {getEndDate()}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Package includes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or comments..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => setStep('payment')}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{pkg.title}</span>
                <span className="text-lg font-bold">
                  {formatPrice(pkg.price, pkg.package_type)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  className="h-auto p-4 flex-col gap-2"
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard className="h-6 w-6" />
                  <span>Credit/Debit Card</span>
                </Button>
                <Button
                  variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                  className="h-auto p-4 flex-col gap-2"
                  onClick={() => setPaymentMethod('cash')}
                >
                  <Euro className="h-6 w-6" />
                  <span>Pay at Gym</span>
                </Button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input 
                      id="cardName" 
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Your package will be reserved for 24 hours. Please visit the gym reception
                  to complete the payment and activate your package.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep('details')}
                disabled={processing}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handlePurchase}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  `${paymentMethod === 'card' ? 'Pay' : 'Reserve'} ${formatPrice(pkg.price, pkg.package_type)}`
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}