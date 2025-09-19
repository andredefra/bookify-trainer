import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { ClientPackage } from "@/hooks/useClientPackages";
import { EnhancedPaymentMethodSelector } from "./payment/EnhancedPaymentMethodSelector";
import { PaymentFormRenderer } from "./payment/PaymentForms";
import { PaymentItemDetails } from "@/components/shared/payment/PaymentItemDetails";
import { InstallmentPlanSelector, InstallmentDetails } from "@/components/shared/payment/InstallmentPlanSelector";
import { usePackagePayment } from "./payment/usePackagePayment";

interface PackagePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageData: ClientPackage | null;
  trainerName: string;
  onPaymentComplete: () => void;
}

export function PackagePaymentDialog({ 
  open, 
  onOpenChange, 
  packageData, 
  trainerName,
  onPaymentComplete 
}: PackagePaymentDialogProps) {
  const [step, setStep] = useState<'plan-selection' | 'payment-details'>('plan-selection');
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState('full');
  const [installmentDetails, setInstallmentDetails] = useState<InstallmentDetails | null>(null);
  
  const {
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
  } = usePackagePayment();

  if (!packageData) return null;

  const allowInstallments = packageData.price >= 100; // Allow installments for packages over €100

  const paymentItem = {
    id: packageData.id,
    name: packageData.title,
    price: packageData.price,
    description: packageData.description,
    trainer: trainerName
  };

  const handleInstallmentCreate = (installmentDetails: InstallmentDetails) => {
    console.log('Package installment plan created:', installmentDetails);
    // TODO: Create installment transactions for the package
  };

  const handleContinueToPayment = () => {
    setStep('payment-details');
  };

  const handleBackToPlanSelection = () => {
    setStep('plan-selection');
  };

  const getCurrentAmount = () => {
    if (installmentDetails && installmentDetails.planId !== 'full') {
      return installmentDetails.amountPerInstallment;
    }
    return packageData.price;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (installmentDetails && installmentDetails.planId !== 'full') {
      handleInstallmentCreate(installmentDetails);
    }
    
    handleSubmit(e, onPaymentComplete, () => onOpenChange(false), getCurrentAmount());
  };

  const renderStepContent = () => {
    if (step === 'plan-selection') {
      return (
        <div className="space-y-4">
          <PaymentItemDetails item={paymentItem} />
          
          {allowInstallments ? (
            <InstallmentPlanSelector
              totalAmount={packageData.price}
              selectedPlan={selectedInstallmentPlan}
              onPlanChange={setSelectedInstallmentPlan}
              onInstallmentDetailsChange={setInstallmentDetails}
            />
          ) : (
            <div className="text-center py-4">
              <h3 className="font-semibold">Total Amount</h3>
              <p className="text-2xl font-bold">€{packageData.price.toFixed(2)}</p>
            </div>
          )}
        </div>
      );
    }

    // Payment details step
    return (
      <div className="space-y-4">
        <PaymentItemDetails item={paymentItem} />
        
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
        
        <EnhancedPaymentMethodSelector 
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
        />
        
        <div className="space-y-4">
          <PaymentFormRenderer
            paymentMethod={paymentMethod}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardHolder={cardHolder}
            setCardHolder={setCardHolder}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            cvv={cvv}
            setCvv={setCvv}
          />
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {step === 'plan-selection' ? 'Purchase Package' : 'Payment Details'}
          </DialogTitle>
          <DialogDescription>
            {step === 'plan-selection' 
              ? (allowInstallments ? `Choose your payment plan for ${packageData.title}` : `Complete your purchase of ${packageData.title}`)
              : 'Complete your payment information'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'plan-selection' ? (
          <div className="space-y-6">
            {renderStepContent()}
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
                onClick={handleContinueToPayment}
                className="sm:flex-1 w-full"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            {renderStepContent()}
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBackToPlanSelection}
                className="sm:w-auto w-full"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="sm:flex-1 w-full"
              >
                {loading ? "Processing..." : `Pay €${getCurrentAmount().toFixed(2)}`}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}