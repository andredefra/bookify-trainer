
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { useCustomPackageForm } from "./custom-request/useCustomPackageForm";
import { PackageDetailsSection } from "./custom-request/PackageDetailsSection";
import { GoalsRequirementsSection } from "./custom-request/GoalsRequirementsSection";
import { TrainerPreferenceSection } from "./custom-request/TrainerPreferenceSection";
import { InfoNotice } from "./custom-request/InfoNotice";

interface CustomPackageRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestSubmitted: () => void;
}

export function CustomPackageRequestDialog({ 
  open, 
  onOpenChange, 
  onRequestSubmitted 
}: CustomPackageRequestDialogProps) {
  const {
    formData,
    loading,
    handleInputChange,
    handleSubmit,
    isFormValid
  } = useCustomPackageForm();

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, onRequestSubmitted, () => onOpenChange(false));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Request Custom Package
          </DialogTitle>
          <DialogDescription>
            Tell us what you're looking for and we'll create a personalized training package just for you
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          <PackageDetailsSection 
            formData={formData}
            onInputChange={handleInputChange}
          />

          <GoalsRequirementsSection 
            formData={formData}
            onInputChange={handleInputChange}
          />

          <TrainerPreferenceSection 
            formData={formData}
            onInputChange={handleInputChange}
          />

          <InfoNotice />

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
              disabled={loading || !isFormValid}
              className="sm:flex-1 w-full"
            >
              {loading ? "Submitting Request..." : "Submit Custom Package Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
