
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Clock, DollarSign, Users } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Form schema validation using zod
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Session name must be at least 3 characters.",
  }),
  date: z.date({
    required_error: "A date is required",
  }),
  time: z.string({
    required_error: "A time is required",
  }),
  duration: z.string().min(1, {
    message: "Duration is required",
  }),
  isFree: z.boolean().default(false),
  price: z.string().refine((val) => {
    return !isNaN(Number(val)) && Number(val) >= 0;
  }, {
    message: "Price must be a valid number greater than or equal to 0.",
  }),
  isPrivate: z.boolean().default(false),
  maxParticipants: z.string().refine((val) => {
    return !isNaN(Number(val)) && Number(val) > 0;
  }, {
    message: "Maximum participants must be a valid number greater than 0.",
  }),
  paymentTime: z.enum(["before", "after"]),
  cancellationHours: z.string().refine((val) => {
    return !isNaN(Number(val)) && Number(val) >= 0;
  }, {
    message: "Cancellation hours must be a valid number greater than or equal to 0.",
  }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: FormValues) => void;
}

export function CreateSessionDialog({ 
  open, 
  onOpenChange, 
  onSubmit 
}: CreateSessionDialogProps) {
  const [isFree, setIsFree] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      time: "18:00",
      duration: "60",
      isFree: false,
      price: "50",
      isPrivate: false,
      maxParticipants: "10",
      paymentTime: "before",
      cancellationHours: "2",
      description: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    // If session is free, ensure price is set to 0
    const finalValues = {
      ...values,
      price: values.isFree ? "0" : values.price
    };
    
    if (onSubmit) {
      onSubmit(finalValues);
    } else {
      // Default handling if no onSubmit is provided
      console.log("Form values:", finalValues);
      toast.success("Session created successfully!");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Training Session</DialogTitle>
          <DialogDescription>
            Set up a new training session for your clients.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Session name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Session Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., HIIT Workout" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full flex justify-between pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="time" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duration */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Free Session Checkbox */}
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          setIsFree(!!checked);
                        }} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Free Session</FormLabel>
                      <FormDescription>
                        Mark this session as free for clients
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (€)</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          {...field} 
                          disabled={form.watch("isFree")}
                          value={form.watch("isFree") ? "0" : field.value}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Private/Public */}
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Private Session</FormLabel>
                      <FormDescription>
                        Private sessions won't appear in public listings
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Max Participants */}
              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Participants</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="number" min="1" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment Time */}
              <FormField
                control={form.control}
                name="paymentTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Collection</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={form.watch("isFree")}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select when to collect payment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="before">Before Session</SelectItem>
                        <SelectItem value="after">After Session</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      When to collect payment from clients
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cancellation Policy */}
              <FormField
                control={form.control}
                name="cancellationHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cancellation Policy (hours)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        placeholder="2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Clients must cancel this many hours before session or be charged
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what clients should expect in this session..." 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Session</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
