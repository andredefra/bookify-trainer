
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ProgramFormProps, TrainingProgram } from "./types";
import { PremiumFeatureCard } from "./PremiumFeatureCard";
import { useProgramForm } from "./hooks/useProgramForm";
import { ProgramFormHeader } from "./ProgramFormHeader";
import { ProgramInfoFields } from "./ProgramInfoFields";
import { ProgramWorkoutEditor } from "./ProgramWorkoutEditor";
import { ProgramFormFooter } from "./ProgramFormFooter";

export function ProgramCreationForm({ 
  clientId, 
  clientName, 
  onSend, 
  isPremium,
  initialData 
}: ProgramFormProps) {
  const {
    program,
    setProgram,
    activeSession,
    setActiveSession,
    handleAddExercise,
    handleUpdateExercise,
    handleRemoveExercise,
    updateProgramStructure,
  } = useProgramForm(initialData);
  
  const form = useForm({
    defaultValues: {
      title: program.title,
      weekStart: program.weekStart,
      duration: program.duration,
      targetFrequency: program.targetFrequency,
      objective: program.objective,
      description: program.description,
      isPaid: program.isPaid,
      price: program.price,
    },
  });

  // Watch form changes to update program structure
  const watchedDuration = form.watch("duration");
  const watchedTargetFrequency = form.watch("targetFrequency");

  useEffect(() => {
    if (watchedDuration && watchedTargetFrequency) {
      updateProgramStructure(watchedDuration, watchedTargetFrequency);
    }
  }, [watchedDuration, watchedTargetFrequency]);

  const onSubmit = form.handleSubmit((data) => {
    const finalProgram = {
      ...program,
      title: data.title,
      weekStart: data.weekStart,
      duration: data.duration,
      targetFrequency: data.targetFrequency,
      totalSessions: data.duration * data.targetFrequency,
      objective: data.objective,
      description: data.description,
      isPaid: data.isPaid,
      price: data.isPaid ? data.price : 0,
    };
    
    onSend(finalProgram);
  });

  if (!isPremium) {
    return <PremiumFeatureCard />;
  }

  return (
    <div className="space-y-6">
      <ProgramFormHeader clientName={clientName} />
      
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <h3 className="text-lg font-medium">Program Information</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProgramInfoFields form={form} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <h3 className="text-lg font-medium">Workout Sessions</h3>
            </CardHeader>
            <CardContent className="p-0">
              <ProgramWorkoutEditor
                sessions={program.sessions}
                activeSession={activeSession}
                setActiveSession={setActiveSession}
                onAddExercise={handleAddExercise}
                onUpdateExercise={handleUpdateExercise}
                onRemoveExercise={handleRemoveExercise}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardFooter className="bg-muted/20 border-t pt-6">
              <ProgramFormFooter clientName={clientName} />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
