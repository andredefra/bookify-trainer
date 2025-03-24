
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CalendarCheck, Clock, Check } from "lucide-react";

export const bookingSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional()
});

interface BookingFormProps {
  trainerName: string;
  onSubmit: (data: z.infer<typeof bookingSchema>) => void;
  onCancel: () => void;
}

export const BookingForm = ({ trainerName, onSubmit, onCancel }: BookingFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof bookingSchema> | null>(null);
  
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      notes: ""
    }
  });

  const handleSubmit = (data: z.infer<typeof bookingSchema>) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    if (formData) {
      onSubmit(formData);
    }
    setShowConfirmation(false);
  };

  // Available time slots for demo
  const timeSlots = [
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "1:00 PM", available: false },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: true },
    { time: "5:00 PM", available: true },
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="mb-4">
            <FormLabel className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4" />
              Select a date
            </FormLabel>
            <div className="border rounded-md p-3 mt-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  form.setValue('date', date as Date);
                }}
                className="mx-auto pointer-events-auto"
                disabled={(date) => {
                  const day = date.getDay();
                  return day === 0 || date < new Date(new Date().setHours(0, 0, 0, 0));
                }}
                initialFocus
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Select a time
                </FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        type="button"
                        variant={field.value === slot.time ? "default" : "outline"}
                        className={`flex justify-between items-center ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={!slot.available}
                        onClick={() => field.onChange(slot.time)}
                      >
                        <span>{slot.time}</span>
                        {field.value === slot.time && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Any specific goals or concerns for this session?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Book Session</Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm your booking</AlertDialogTitle>
            <AlertDialogDescription>
              You're about to book a session with {trainerName} on{" "}
              {formData?.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at{" "}
              {formData?.time}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBooking}>Confirm Booking</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
