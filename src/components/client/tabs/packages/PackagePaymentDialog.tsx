
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { ClientPackage } from "@/hooks/useClientPackages";
import { EnhancedPaymentMethodSelector } from "./payment/EnhancedPaymentMethodSelector";
import { PaymentFormRenderer } from "./payment/PaymentForms";
import { PackageSummaryCard } from "./payment/PackageSummaryCard";
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

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, onPaymentComplete, () => onOpenChange(false), packageData.price);
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

        <form onSubmit={onSubmit} className="space-y-6">
          <PackageSummaryCard packageData={packageData} trainerName={trainerName} />

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
