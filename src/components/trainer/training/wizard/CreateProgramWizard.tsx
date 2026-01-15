import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { WizardStepIndicator } from "./WizardStepIndicator";
import { Step1GeneralInfo } from "./Step1GeneralInfo";
import { Step2Builder } from "./Step2Builder";
import { WorkoutSession } from "@/data/training/types";
import { toast } from "sonner";

interface CreateProgramWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  editingProgram?: any;
}

export function CreateProgramWizard({
  open,
  onOpenChange,
  onSuccess,
  editingProgram,
}: CreateProgramWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaid, setIsPaid] = useState(false);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      weekStart: new Date().toISOString().split("T")[0],
      duration: 4,
      targetFrequency: 3,
      objective: "",
      description: "",
      isPaid: false,
      price: 0,
    },
  });

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (editingProgram) {
        form.reset({
          title: editingProgram.title || "",
          weekStart: editingProgram.weekStart || new Date().toISOString().split("T")[0],
          duration: editingProgram.duration || 4,
          targetFrequency: editingProgram.targetFrequency || 3,
          objective: editingProgram.objective || "",
          description: editingProgram.description || "",
          isPaid: editingProgram.isPaid || false,
          price: editingProgram.price || 0,
        });
        setIsPaid(editingProgram.isPaid || false);
        setSessions(editingProgram.sessions || []);
      } else {
        form.reset();
        setIsPaid(false);
        setSessions([]);
      }
      setCurrentStep(1);
    }
  }, [open, editingProgram, form]);

  // Generate initial sessions when moving to step 2
  const initializeSessions = () => {
    const duration = form.getValues("duration");
    const targetFrequency = form.getValues("targetFrequency");
    const totalSessions = duration * targetFrequency;

    if (sessions.length !== totalSessions) {
      const newSessions: WorkoutSession[] = [];
      for (let i = 1; i <= totalSessions; i++) {
        const existingSession = sessions.find((s) => s.sessionNumber === i);
        newSessions.push(
          existingSession || {
            id: `session-${i}`,
            sessionNumber: i,
            title: `Session ${i}`,
            exercises: [],
            completed: false,
          }
        );
      }
      setSessions(newSessions);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      initializeSessions();
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const formData = form.getValues();

      const programData = {
        id: editingProgram?.id || `program-${Date.now()}`,
        title: formData.title,
        weekStart: formData.weekStart,
        duration: formData.duration,
        targetFrequency: formData.targetFrequency,
        objective: formData.objective,
        description: formData.description,
        isPaid: formData.isPaid,
        price: formData.isPaid ? formData.price : 0,
        sessions,
        totalSessions: sessions.length,
        week: "Week 1",
        trainerName: "Trainer",
      };

      // For now, just log the data - in real app, this would save to database
      console.log("Saving program:", programData);

      toast.success(
        editingProgram
          ? "Template updated successfully"
          : "Template created successfully"
      );

      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving program:", error);
      toast.error("Failed to save template");
    } finally {
      setIsSaving(false);
    }
  };

  const duration = form.watch("duration");
  const targetFrequency = form.watch("targetFrequency");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProgram ? "Edit Training Template" : "Create Training Template"}
          </DialogTitle>
        </DialogHeader>

        <WizardStepIndicator
          currentStep={currentStep}
          totalSteps={2}
          stepLabels={["General Info", "Build Workout"]}
        />

        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && (
              <Step1GeneralInfo
                form={form}
                isPaid={isPaid}
                setIsPaid={setIsPaid}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <Step2Builder
                duration={duration}
                sessionsPerWeek={targetFrequency}
                sessions={sessions}
                onSessionsChange={setSessions}
                onBack={handleBack}
                onSave={handleSave}
                isSaving={isSaving}
              />
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
