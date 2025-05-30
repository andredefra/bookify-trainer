
import { useState } from "react";
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
  } = useProgramForm(initialData);
  
  const form = useForm({
    defaultValues: {
      title: program.title,
      weekStart: program.weekStart,
      duration: program.duration,
      objective: program.objective,
      description: program.description,
      isPaid: program.isPaid,
      price: program.price,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const finalProgram = {
      ...program,
      title: data.title,
      weekStart: data.weekStart,
      duration: data.duration,
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
    <Card>
      <CardHeader>
        <ProgramFormHeader clientName={clientName} />
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-6">
            <ProgramInfoFields form={form} />
            
            <ProgramWorkoutEditor
              sessions={program.sessions}
              activeSession={activeSession}
              setActiveSession={setActiveSession}
              onAddExercise={handleAddExercise}
              onUpdateExercise={handleUpdateExercise}
              onRemoveExercise={handleRemoveExercise}
            />
          </CardContent>
          
          <CardFooter className="border-t bg-muted/20 justify-between">
            <ProgramFormFooter clientName={clientName} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
