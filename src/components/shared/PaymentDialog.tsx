
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
import { InstallmentPlanSelector, InstallmentDetails } from "./payment/InstallmentPlanSelector";
import { PremiumFeatureCard } from "@/components/trainer/training/PremiumFeatureCard";

// Re-export InstallmentDetails for external use
export type { InstallmentDetails } from "./payment/InstallmentPlanSelector";

// Updated to accept Date objects for consistency across the application
interface PaymentItem {
  id: string | number;
  name: string;
  price: number;
  description?: string;
  date?: string | Date;
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
  isClientPayment?: boolean;
  trainerPlan?: string;
  allowInstallments?: boolean;
  onInstallmentCreate?: (installmentDetails: InstallmentDetails) => void;
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
  item, 
  onPaymentComplete,
  title = "Complete Payment",
  description = "Enter your payment details",
  isPremiumFeature = false,
  userPlan = "freemium",
  isClientPayment = false,
  trainerPlan = "freemium",
  allowInstallments = false,
  onInstallmentCreate
}: PaymentDialogProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'plan-selection' | 'payment-details'>('plan-selection');
  
  // Installment states
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState('full');
  const [installmentDetails, setInstallmentDetails] = useState<InstallmentDetails | null>(null);
  
  // Default to cash if client payment and trainer doesn't have pro plan
  const defaultPaymentMethod = (isClientPayment && trainerPlan !== "pro") ? 'cash' : 'card';
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'paypal' | 'klarna'>(defaultPaymentMethod);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentReference, setPaymentReference] = useState(item.reference || '');
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Check if direct payment is available based on plan
  // For client payments, check trainer's plan; for trainer features, check user's plan
  const isDirectPaymentAllowed = isClientPayment 
    ? trainerPlan === "pro"
    : (!isPremiumFeature || userPlan === "pro");
    
  // Show premium card only for trainers, not clients
  const showPremiumCard = !isClientPayment && isPremiumFeature && userPlan !== "pro";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For trainer premium features, check user plan
    if (!isClientPayment && isPremiumFeature && userPlan !== "pro") {
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      let message = "";
      
      // Handle installment payments
      if (installmentDetails && installmentDetails.planId !== 'full') {
        if (onInstallmentCreate) {
          onInstallmentCreate(installmentDetails);
        }
        message = `Installment plan set up successfully! First payment of €${installmentDetails.amountPerInstallment.toFixed(2)} processed.`;
        
        // Additional messaging based on payment method
        switch (paymentMethod) {
          case 'card':
            if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
              toast.error("Please fill in all card details");
              return;
            }
            break;
          case 'cash':
            message = `Installment plan created. Pay €${installmentDetails.amountPerInstallment.toFixed(2)} to your trainer in cash.`;
            break;
        }
      } else {
        // Handle full payment
        switch (paymentMethod) {
          case 'card':
            if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
              toast.error("Please fill in all card details");
              return;
            }
            message = "Payment processed successfully";
            break;
          case 'paypal':
            message = "PayPal payment completed successfully";
            break;
          case 'klarna':
            message = "Klarna payment set up successfully. First installment charged.";
            break;
          case 'cash':
            message = "Payment marked as pending. Pay your trainer in cash.";
            break;
        }
      }
      
      toast.success(message);
      
      // Reset form
      setCardNumber('');
      setCardHolder('');
      setExpiryDate('');
      setCvv('');
      setStep('plan-selection');
      setSelectedInstallmentPlan('full');
      setInstallmentDetails(null);
      
      // Close dialog and notify parent
      onOpenChange(false);
      onPaymentComplete();
    }, 1500);
  };

  const handleContinueToPayment = () => {
    if (allowInstallments && selectedInstallmentPlan !== 'full' && installmentDetails) {
      setStep('payment-details');
    } else {
      // For full payment, proceed directly to payment
      setStep('payment-details');
    }
  };

  const handleBackToPlanSelection = () => {
    setStep('plan-selection');
  };

  const getCurrentAmount = () => {
    if (installmentDetails && installmentDetails.planId !== 'full') {
      return installmentDetails.amountPerInstallment;
    }
    return item.price;
  };

  const renderStepContent = () => {
    if (step === 'plan-selection') {
      return (
        <div className="space-y-4">
          <PaymentItemDetails item={item} />
          
          {allowInstallments ? (
            <InstallmentPlanSelector
              totalAmount={item.price}
              selectedPlan={selectedInstallmentPlan}
              onPlanChange={setSelectedInstallmentPlan}
              onInstallmentDetailsChange={setInstallmentDetails}
            />
          ) : (
            <div className="text-center py-4">
              <h3 className="font-semibold">Total Amount</h3>
              <p className="text-2xl font-bold">€{item.price.toFixed(2)}</p>
            </div>
          )}
        </div>
      );
    }

    // Payment details step
    return (
      <div className={`grid gap-${isMobile ? '3' : '4'} py-${isMobile ? '3' : '4'}`}>
        <PaymentItemDetails item={item} />
        
        {installmentDetails && installmentDetails.planId !== 'full' && (
          <div className="bg-primary/5 p-3 rounded-lg">
            <h4 className="font-medium text-sm">Payment Plan Selected</h4>
            <p className="text-sm text-muted-foreground">
              {installmentDetails.installments} payments of €{installmentDetails.amountPerInstallment.toFixed(2)} each
            </p>
            <p className="text-xs text-muted-foreground">
              Today's payment: €{installmentDetails.amountPerInstallment.toFixed(2)}
            </p>
          </div>
        )}
        
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
          isClientPayment={isClientPayment}
          trainerPlan={trainerPlan}
        />
        
        {renderPaymentForm()}
      </div>
    );
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
        return <KlarnaPaymentForm amount={getCurrentAmount()} />;
      case 'cash':
        return <CashPaymentNotice />;
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95%] p-4' : 'sm:max-w-[500px]'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader className={isMobile ? "space-y-1" : ""}>
          <DialogTitle>
            {step === 'plan-selection' ? title : 'Payment Details'}
          </DialogTitle>
          <DialogDescription>
            {step === 'plan-selection' 
              ? (allowInstallments ? 'Choose your payment plan and complete your purchase' : description)
              : 'Complete your payment information'
            }
          </DialogDescription>
        </DialogHeader>
        
        {/* Show premium feature card only for trainers, not clients */}
        {showPremiumCard ? (
          <PremiumFeatureCard />
        ) : (
          <>
            {step === 'plan-selection' ? (
              <>
                {renderStepContent()}
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
                    type="button"
                    onClick={handleContinueToPayment}
                    className={isMobile ? "w-full" : ""}
                  >
                    Continue to Payment
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                {renderStepContent()}
                
                <DialogFooter className={isMobile ? "mt-4 flex-col gap-2" : ""}>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBackToPlanSelection}
                    className={isMobile ? "w-full" : ""}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className={isMobile ? "w-full" : ""}
                  >
                    {loading ? "Processing..." : `Pay €${getCurrentAmount().toFixed(2)}`}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
