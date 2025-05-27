
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Ruler } from "lucide-react";

interface BodyMeasurementsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function BodyMeasurementsDialog({ open, onOpenChange, onSubmit }: BodyMeasurementsDialogProps) {
  const measurementsForm = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      waist: 0,
      hips: 0,
      thighs: 0,
      shoulders: 0,
      arms: 0,
      neck: 0
    }
  });

  const handleSubmit = (data: any) => {
    const measurementData = {
      ...data,
      id: `measurement-${Date.now()}`,
      source: 'manual' as const
    };
    onSubmit(measurementData);
    measurementsForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Log Body Measurements
          </DialogTitle>
          <DialogDescription>
            Record your body measurements to track changes in body composition over time.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...measurementsForm}>
          <form onSubmit={measurementsForm.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={measurementsForm.control}
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
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={measurementsForm.control}
                name="waist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waist (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
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
                control={measurementsForm.control}
                name="hips"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hips (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
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
                control={measurementsForm.control}
                name="thighs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thighs (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
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
                control={measurementsForm.control}
                name="shoulders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shoulders (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
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
                control={measurementsForm.control}
                name="arms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arms (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
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
                control={measurementsForm.control}
                name="neck"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Neck (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="0" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Measurements</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
