
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Send, Dumbbell } from "lucide-react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { ProgramFormProps, TrainingProgram, WorkoutDay } from "./types";
import { PremiumFeatureCard } from "./PremiumFeatureCard";
import { DayTabs } from "./DayTabs";
import { WorkoutDayPanel } from "./WorkoutDayPanel";

export function ProgramCreationForm({ clientId, clientName, onSend, isPremium }: ProgramFormProps) {
  const [program, setProgram] = useState<TrainingProgram>({
    title: "Weekly Training Program",
    weekStart: "",
    days: [
      {
        id: "1",
        day: "Monday",
        exercises: [],
      },
      {
        id: "2",
        day: "Tuesday",
        exercises: [],
      },
      {
        id: "3",
        day: "Wednesday",
        exercises: [],
      },
      {
        id: "4",
        day: "Thursday",
        exercises: [],
      },
      {
        id: "5",
        day: "Friday",
        exercises: [],
      },
      {
        id: "6",
        day: "Saturday",
        exercises: [],
      },
      {
        id: "7",
        day: "Sunday",
        exercises: [],
      },
    ],
  });

  const [activeDay, setActiveDay] = useState<string>("1");
  
  const form = useForm({
    defaultValues: {
      title: program.title,
      weekStart: program.weekStart,
    },
  });

  const handleAddExercise = (dayId: string) => {
    const updatedDays = program.days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: [
            ...day.exercises,
            {
              id: Math.random().toString(36).substring(2, 9),
              name: "",
              sets: 3,
              reps: "8-12",
            },
          ],
        };
      }
      return day;
    });

    setProgram({ ...program, days: updatedDays });
  };

  const handleUpdateExercise = (dayId: string, exerciseId: string, field: string, value: any) => {
    const updatedDays = program.days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: day.exercises.map((ex) => {
            if (ex.id === exerciseId) {
              return {
                ...ex,
                [field]: value,
              };
            }
            return ex;
          }),
        };
      }
      return day;
    });

    setProgram({ ...program, days: updatedDays });
  };

  const handleRemoveExercise = (dayId: string, exerciseId: string) => {
    const updatedDays = program.days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: day.exercises.filter((ex) => ex.id !== exerciseId),
        };
      }
      return day;
    });

    setProgram({ ...program, days: updatedDays });
  };

  const onSubmit = form.handleSubmit((data) => {
    const finalProgram = {
      ...program,
      title: data.title,
      weekStart: data.weekStart,
    };
    
    onSend(finalProgram);
  });

  if (!isPremium) {
    return <PremiumFeatureCard />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Dumbbell className="mr-2 h-5 w-5 text-primary" />
              Create Training Program
            </CardTitle>
            <CardDescription>
              Create and share a customized training program for {clientName}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Premium Feature
          </Badge>
        </div>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weekStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Week Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="border rounded-md">
              <DayTabs 
                days={program.days} 
                activeDay={activeDay} 
                setActiveDay={setActiveDay} 
              />

              {program.days.map((day) => (
                <WorkoutDayPanel
                  key={day.id}
                  day={day}
                  activeDay={activeDay}
                  onAddExercise={handleAddExercise}
                  onUpdateExercise={handleUpdateExercise}
                  onRemoveExercise={handleRemoveExercise}
                />
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="border-t bg-muted/20 justify-between">
            <FormDescription>
              This program will be shared with {clientName} and they'll be able to log their workouts.
            </FormDescription>
            <Button type="submit" className="gap-1">
              <Send className="h-4 w-4 mr-1" />
              Send Program
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
