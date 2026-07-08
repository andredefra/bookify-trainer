
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Ruler, History } from "lucide-react";
import { MeasurementGuidePopover, type MeasurementKey } from "./MeasurementGuidePopover";

interface BodyMeasurementsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onViewHistory?: () => void;
}

export function BodyMeasurementsDialog({ open, onOpenChange, onSubmit, onViewHistory }: BodyMeasurementsDialogProps) {
  const measurementsForm = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      chest: 0,
      waist: 0,
      hips: 0,
      quadriceps: 0,
      arms: 0
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
            Record your body measurements to track changes over time. Height and gender are set in your account settings.
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
              {([
                { name: "chest", label: "Chest" },
                { name: "waist", label: "Waist" },
                { name: "hips", label: "Hips" },
                { name: "quadriceps", label: "Quadriceps" },
                { name: "arms", label: "Arms" },
              ] as { name: MeasurementKey; label: string }[]).map(({ name, label }) => (
                <FormField
                  key={name}
                  control={measurementsForm.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5">
                        {label} (cm)
                        <MeasurementGuidePopover measurement={name} />
                      </FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="0" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            
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
                <Button type="submit">Save Measurements</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
