
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Weight, History } from "lucide-react";

interface LogWeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onViewHistory?: () => void;
}

export function LogWeightDialog({ open, onOpenChange, onSubmit, onViewHistory }: LogWeightDialogProps) {
  const weightForm = useForm({
    defaultValues: {
      weight: 0,
      date: new Date().toISOString().split('T')[0],
      note: ''
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    weightForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Weight className="h-5 w-5" />
            Log Weight
          </DialogTitle>
          <DialogDescription>
            Record your current weight. This will automatically update any weight-related goals.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...weightForm}>
          <form onSubmit={weightForm.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={weightForm.control}
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
              control={weightForm.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      placeholder="Enter your weight" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={weightForm.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any notes about this weight measurement..." 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="sm:justify-between gap-2">
              {onViewHistory ? (
                <Button type="button" variant="ghost" onClick={onViewHistory} className="gap-2">
                  <History className="h-4 w-4" />
                  View History
                </Button>
              ) : <span />}
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Weight</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
