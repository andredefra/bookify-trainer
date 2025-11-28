import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TrainingProgramContent } from "@/components/client/training/TrainingProgramContent";
import { ProgramListView } from "@/components/client/training/ProgramListView";
import { ProgramManagementDialog } from "@/components/client/training/ProgramManagementDialog";
import { ConfirmPaymentDialog } from "@/components/client/training/ConfirmPaymentDialog";
import { useTrainingPrograms } from "@/hooks/useTrainingPrograms";
import { TrainingProgram } from "@/data/training/types";
import { previousProgram, incompletePreviousProgram, standaloneEssentialProgram } from "@/data/training";
import { useToast } from "@/hooks/use-toast";

export function TrainingProgramTab() {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [showManageDialog, setShowManageDialog] = useState(false);
  const [showConfirmPaymentDialog, setShowConfirmPaymentDialog] = useState(false);
  const [programToManage, setProgramToManage] = useState<TrainingProgram | null>(null);
  const { activePrograms, previousPrograms: dbPreviousPrograms, loading } = useTrainingPrograms();
  const { toast } = useToast();

  // Combine DB programs with mock data and standalone programs
  const allActivePrograms = [...activePrograms, standaloneEssentialProgram];
  const allPreviousPrograms = [...dbPreviousPrograms, previousProgram, incompletePreviousProgram];

  const handleBackToList = () => {
    setSelectedProgram(null);
  };

  const handleManageProgram = (program: TrainingProgram) => {
    setProgramToManage(program);
    setShowManageDialog(true);
  };

  const handleViewPackage = () => {
    // Navigate to packages section or open package details
    toast({
      title: "Coming Soon",
      description: "Package details view coming soon",
    });
    setShowManageDialog(false);
  };

  const handlePayNow = (amount: number) => {
    // Open payment dialog or navigate to payment flow
    toast({
      title: "Payment Initiated",
      description: `Payment of €${amount.toFixed(2)} initiated`,
    });
    // TODO: Implement actual payment flow
  };

  const handleConfirmPaymentClick = () => {
    setShowManageDialog(false);
    setShowConfirmPaymentDialog(true);
  };

  const handleConfirmPayment = (notes?: string) => {
    console.log('Payment confirmed with notes:', notes);
    
    // In a real app, this would update the database
    // For now, we'll just show a success message
    toast({
      title: "Payment Confirmed!",
      description: "Your trainer has been notified. Thank you for confirming your payment.",
    });

    setShowConfirmPaymentDialog(false);
    setShowManageDialog(false);
    setProgramToManage(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading programs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6">
      {selectedProgram ? (
        <div className="space-y-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToList}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Programs
          </Button>
          <TrainingProgramContent 
            currentProgram={selectedProgram} 
            previousPrograms={[]}
          />
        </div>
      ) : (
        <>
          <ProgramListView
            activePrograms={allActivePrograms}
            previousPrograms={allPreviousPrograms}
            onSelectProgram={setSelectedProgram}
            onManageProgram={handleManageProgram}
          />

          <ProgramManagementDialog
            open={showManageDialog}
            onOpenChange={setShowManageDialog}
            program={programToManage}
            onConfirmPayment={handleConfirmPaymentClick}
          />

          <ConfirmPaymentDialog
            open={showConfirmPaymentDialog}
            onOpenChange={setShowConfirmPaymentDialog}
            program={programToManage}
            onConfirm={handleConfirmPayment}
          />
        </>
      )}
    </div>
  );
}
