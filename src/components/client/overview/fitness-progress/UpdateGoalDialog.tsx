
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ProgressItem } from "./types";
import { formatDate } from "./utils";

interface UpdateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  selectedGoal: ProgressItem | null;
}

export function UpdateGoalDialog({ open, onOpenChange, onSubmit, selectedGoal }: UpdateGoalDialogProps) {
  const updateForm = useForm({
    defaultValues: {
      current: 0,
      date: new Date().toISOString().split('T')[0],
      note: ''
    }
  });

  useEffect(() => {
    if (selectedGoal && open) {
      updateForm.setValue('current', selectedGoal.current);
    }
  }, [selectedGoal, open, updateForm]);

  const handleSubmit = (data: any) => {
    onSubmit(data);
    updateForm.reset();
  };

  if (!selectedGoal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Goal Progress</DialogTitle>
          <DialogDescription>
            Update your progress for "{selectedGoal.goal}" (Target: {selectedGoal.target} {selectedGoal.unit})
            {selectedGoal.createdAt && (
              <div className="mt-2 text-xs text-muted-foreground">
                Goal created: {formatDate(selectedGoal.createdAt)}
              </div>
            )}
            {selectedGoal.lastUpdated && (
              <div className="text-xs text-muted-foreground">
                Last updated: {formatDate(selectedGoal.lastUpdated)}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...updateForm}>
          <form onSubmit={updateForm.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={updateForm.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={updateForm.control}
              name="current"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Value ({selectedGoal.unit})</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={updateForm.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any notes about this update..." 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedGoal.logs && selectedGoal.logs.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Recent Logs</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {selectedGoal.logs.slice(-3).reverse().map((log, index) => (
                    <div key={log.id} className="text-xs p-2 bg-muted rounded text-muted-foreground">
                      <div className="flex justify-between">
                        <span>{formatDate(log.date)}</span>
                        <span>{log.value} {selectedGoal.unit}</span>
                      </div>
                      {log.note && <div className="mt-1">{log.note}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Goal</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
