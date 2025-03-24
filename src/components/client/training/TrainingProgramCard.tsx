
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Dumbbell, CheckCircle, Calendar, Download, ArrowRight, Edit } from "lucide-react";
import { useForm } from "react-hook-form";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  notes?: string;
}

interface WorkoutDay {
  id: string;
  day: string;
  exercises: Exercise[];
  completed: boolean;
}

interface TrainingProgramProps {
  program: {
    id: string;
    title: string;
    week: string;
    trainerName: string;
    days: WorkoutDay[];
  };
}

export function TrainingProgramCard({ program }: TrainingProgramProps) {
  const [activeDay, setActiveDay] = useState<string | null>(program.days[0]?.id || null);
  const [isEditing, setIsEditing] = useState<{[key: string]: boolean}>({});
  
  const form = useForm();
  
  const handleSaveWeight = (exerciseId: string, dayId: string, value: number) => {
    // Here you would update the weight in your state or database
    console.log(`Saved weight ${value} for exercise ${exerciseId} on day ${dayId}`);
    setIsEditing({...isEditing, [exerciseId]: false});
  };
  
  const handleMarkCompleted = (dayId: string) => {
    // Here you would mark the day as completed in your state or database
    console.log(`Marked day ${dayId} as completed`);
  };
  
  return (
    <Card className="border-primary/10">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Dumbbell className="mr-2 h-5 w-5 text-primary" />
              {program.title}
            </CardTitle>
            <CardDescription>
              {program.week} • Created by {program.trainerName}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-7 border-b">
          {program.days.map((day) => (
            <button
              key={day.id}
              className={`p-3 text-center border-r last:border-r-0 transition-colors ${
                activeDay === day.id ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
              } ${day.completed ? "text-emerald-600" : ""}`}
              onClick={() => setActiveDay(day.id)}
            >
              <div className="text-xs font-medium">{day.day}</div>
              {day.completed && (
                <CheckCircle className="h-3 w-3 mx-auto mt-1 text-emerald-600" />
              )}
            </button>
          ))}
        </div>

        {program.days.map((day) => (
          <div key={day.id} className={activeDay === day.id ? "block" : "hidden"}>
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                {day.day}'s Workout
              </h3>
              {!day.completed ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                  onClick={() => handleMarkCompleted(day.id)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Completed
                </Button>
              ) : (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Completed
                </Badge>
              )}
            </div>
            
            <div className="divide-y">
              {day.exercises.map((exercise) => (
                <div key={exercise.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      {isEditing[exercise.id] ? (
                        <div className="flex items-center space-x-2">
                          <Form {...form}>
                            <FormField
                              control={form.control}
                              name={`weight-${exercise.id}`}
                              defaultValue={exercise.weight || ""}
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      className="w-20 h-8"
                                      placeholder="kg"
                                    />
                                  </FormControl>
                                  <FormLabel className="text-xs font-normal mt-0">kg</FormLabel>
                                </FormItem>
                              )}
                            />
                          </Form>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleSaveWeight(exercise.id, day.id, 
                              parseFloat(form.getValues(`weight-${exercise.id}`) || "0"))}
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {exercise.weight ? (
                            <Badge variant="outline" className="mr-2">
                              {exercise.weight} kg
                            </Badge>
                          ) : null}
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => setIsEditing({...isEditing, [exercise.id]: true})}
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {exercise.notes && (
                    <div className="bg-muted/30 p-2 rounded text-sm mt-2">
                      {exercise.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="bg-muted/20 p-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
          Update your weights and mark completed workouts to track your progress.
        </div>
      </CardFooter>
    </Card>
  );
}
