
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ProgressItem } from "./types";
import { useEffect } from "react";

interface UpdateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  selectedGoal: ProgressItem | null;
}

export function UpdateGoalDialog({ open, onOpenChange, onSubmit, selectedGoal }: UpdateGoalDialogProps) {
  const updateForm = useForm({
    defaultValues: {
      current: 0
    }
  });

  // Reset form when selected goal changes
  useEffect(() => {
    if (selectedGoal) {
      updateForm.setValue('current', selectedGoal.current);
    }
  }, [selectedGoal, updateForm]);

  const handleSubmit = (data: any) => {
    onSubmit(data);
    updateForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Goal Progress</DialogTitle>
          <DialogDescription>
            Update your current progress for {selectedGoal?.goal}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...updateForm}>
          <form onSubmit={updateForm.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={updateForm.control}
              name="current"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Value</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedGoal && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Target: {selectedGoal.target} {selectedGoal.unit}</span>
              </div>
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Progress</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
