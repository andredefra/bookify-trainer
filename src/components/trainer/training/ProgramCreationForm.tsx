
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2, Send, Dumbbell } from "lucide-react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

interface WorkoutDay {
  id: string;
  day: string;
  exercises: Exercise[];
}

interface ProgramFormProps {
  clientId: string;
  clientName: string;
  onSend: (program: any) => void;
  isPremium: boolean;
}

export function ProgramCreationForm({ clientId, clientName, onSend, isPremium }: ProgramFormProps) {
  const [program, setProgram] = useState<{
    title: string;
    weekStart: string;
    days: WorkoutDay[];
  }>({
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
    return (
      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="text-amber-800">Premium Feature</CardTitle>
          <CardDescription>
            Training program creation and sharing is a premium feature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 mb-4">
            Upgrade to our Pro plan to access advanced features like custom training programs, which you can create and share with your clients.
          </p>
          <Button>Upgrade to Pro</Button>
        </CardContent>
      </Card>
    );
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
              <div className="grid grid-cols-7 border-b">
                {program.days.map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    className={`p-3 text-center border-r last:border-r-0 transition-colors ${
                      activeDay === day.id ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveDay(day.id)}
                  >
                    <div className="text-xs font-medium">{day.day}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {day.exercises.length} exercises
                    </div>
                  </button>
                ))}
              </div>

              {program.days.map((day) => (
                <div key={day.id} className={activeDay === day.id ? "block" : "hidden"}>
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">{day.day}'s Workout</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddExercise(day.id)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Exercise
                      </Button>
                    </div>

                    {day.exercises.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground">
                        No exercises added for this day yet.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {day.exercises.map((exercise) => (
                          <div key={exercise.id} className="border rounded-md p-4">
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <FormLabel>Exercise Name</FormLabel>
                                <Input
                                  value={exercise.name}
                                  onChange={(e) =>
                                    handleUpdateExercise(day.id, exercise.id, "name", e.target.value)
                                  }
                                  placeholder="e.g. Squat, Bench Press, etc."
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <FormLabel>Sets</FormLabel>
                                  <Input
                                    type="number"
                                    value={exercise.sets}
                                    onChange={(e) =>
                                      handleUpdateExercise(
                                        day.id,
                                        exercise.id,
                                        "sets",
                                        parseInt(e.target.value)
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <FormLabel>Reps</FormLabel>
                                  <Input
                                    value={exercise.reps}
                                    onChange={(e) =>
                                      handleUpdateExercise(
                                        day.id,
                                        exercise.id,
                                        "reps",
                                        e.target.value
                                      )
                                    }
                                    placeholder="e.g. 10, 8-12, etc."
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <FormLabel>Notes</FormLabel>
                              <Textarea
                                value={exercise.notes || ""}
                                onChange={(e) =>
                                  handleUpdateExercise(
                                    day.id,
                                    exercise.id,
                                    "notes",
                                    e.target.value
                                  )
                                }
                                placeholder="Instructions, tempo, rest periods, etc."
                                rows={2}
                              />
                            </div>
                            <div className="flex justify-end mt-3">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                                onClick={() => handleRemoveExercise(day.id, exercise.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
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
