
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface LogActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function LogActivityDialog({ open, onOpenChange, onSubmit }: LogActivityDialogProps) {
  const logForm = useForm({
    defaultValues: {
      steps: 0,
      calories: 0,
      minutes: 0,
      date: new Date().toISOString().split('T')[0]
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    logForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Daily Activity</DialogTitle>
          <DialogDescription>
            Manually log your activities to update your goals.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...logForm}>
          <form onSubmit={logForm.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={logForm.control}
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
              control={logForm.control}
              name="steps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Steps</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={logForm.control}
              name="calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories Burned (kcal)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={logForm.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Minutes</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field} 
                      onChange={e => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Log Activity</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
