
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { CheckCircle, Edit } from "lucide-react";
import { useForm } from "react-hook-form";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  notes?: string;
}

interface ExerciseItemProps {
  exercise: Exercise;
  dayId: string;
  onSaveWeight: (exerciseId: string, dayId: string, weight: number) => void;
}

export function ExerciseItem({ exercise, dayId, onSaveWeight }: ExerciseItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm();
  
  const handleSave = () => {
    onSaveWeight(
      exercise.id, 
      dayId, 
      parseFloat(form.getValues(`weight-${exercise.id}`) || "0")
    );
    setIsEditing(false);
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{exercise.name}</h4>
          <p className="text-sm text-muted-foreground">
            {exercise.sets} sets × {exercise.reps}
          </p>
        </div>
        
        <div className="flex items-center">
          {isEditing ? (
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
                onClick={handleSave}
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
                onClick={() => setIsEditing(true)}
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
  );
}
