
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CreditCard, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const bookingSchema = z.object({
  date: z.date().min(new Date(), { message: "Select a date in the future" }),
  time: z.string().min(1, { message: "Please select a time" }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  trainerName: string;
  onSubmit: (values: BookingFormValues) => void;
  onCancel: () => void;
  onRequest?: (values: BookingFormValues) => void;
  isMobile?: boolean;
}

// Create an array of time options from 8am to 9pm in 30 minutes intervals
const timeOptions = Array.from({ length: 26 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
});

export function BookingForm({ trainerName, onSubmit, onCancel, onRequest, isMobile = false }: BookingFormProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: undefined,
      time: "",
      notes: "",
    },
  });

  const handleRequest = () => {
    const values = form.getValues();
    if (!values.date || !values.time) {
      form.trigger();
      return;
    }
    onRequest?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Slot</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Any specific goals or needs for your session with ${trainerName}?`}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Info text for request option */}
        {onRequest && (
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 space-y-1">
            <p><strong>Book & Pay:</strong> Pay now and confirm your session immediately</p>
            <p><strong>Send Request:</strong> Request this slot - you'll pay after trainer approval</p>
          </div>
        )}

        <div className={`flex ${isMobile ? "flex-col space-y-2" : "justify-end space-x-2"} pt-4`}>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className={isMobile ? "w-full" : ""}
          >
            Cancel
          </Button>
          
          {onRequest && (
            <Button 
              type="button"
              variant="secondary"
              onClick={handleRequest}
              className={isMobile ? "w-full" : ""}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Request
            </Button>
          )}
          
          <Button 
            type="submit"
            className={isMobile ? "w-full" : ""}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Book & Pay
          </Button>
        </div>
      </form>
    </Form>
  );
}
