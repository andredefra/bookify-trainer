import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { WizardStepIndicator } from "./WizardStepIndicator";
import { Step1GeneralInfo } from "./Step1GeneralInfo";
import { Step2Builder } from "./Step2Builder";
import { WorkoutSession } from "@/data/training/types";
import { toast } from "sonner";

export interface CreateProgramWizardProps {
  editingProgram?: {
    id?: string;
    title?: string;
    weekStart?: string;
    duration?: number;
    targetFrequency?: number;
    objective?: string;
    description?: string;
    isPaid?: boolean;
    price?: number;
    sessions?: WorkoutSession[];
  };
  onSave?: (programData: any) => void;
  onCancel?: () => void;
}

export function CreateProgramWizard({
  editingProgram,
  onSave,
  onCancel,
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

  // Initialize form with editing program data
  useEffect(() => {
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
  }, [editingProgram, form]);

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

      onSave?.(programData);
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
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b flex-shrink-0">
        <h2 className="text-lg font-semibold">
          {editingProgram?.id ? "Edit Training Template" : "Create Training Template"}
        </h2>
        <WizardStepIndicator
          currentStep={currentStep}
          totalSteps={2}
          stepLabels={["General Info", "Build Workout"]}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && (
              <Step1GeneralInfo
                form={form}
                isPaid={isPaid}
                setIsPaid={setIsPaid}
                onNext={handleNext}
                onCancel={onCancel}
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
      </div>
    </div>
  );
}
