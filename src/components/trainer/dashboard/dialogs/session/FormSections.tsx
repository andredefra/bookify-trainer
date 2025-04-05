
import { CalendarIcon, Clock, DollarSign, Users, Video, MapPin } from "lucide-react";
import { format } from "date-fns";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useFormContext, useWatch } from "react-hook-form";
import { SessionFormValues } from "./SessionFormSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Basic Session Information component (name, date, time, duration)
export const BasicSessionInfo = () => {
  const { control } = useFormContext<SessionFormValues>();
  
  return (
    <>
      {/* Session name */}
      <FormField
        control={control}
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

      {/* Session Mode */}
      <FormField
        control={control}
        name="mode"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Session Mode</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="in-person" />
                  </FormControl>
                  <FormLabel className="font-normal flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    In-person
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="video" />
                  </FormControl>
                  <FormLabel className="font-normal flex items-center">
                    <Video className="w-4 h-4 mr-1" />
                    Video Lesson
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Choose whether this session will be held in-person or as a video lesson
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Date */}
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
};

// Pricing Information component (isFree, price)
export const PricingInfo = () => {
  const { control } = useFormContext<SessionFormValues>();
  const isFree = useWatch({ control, name: "isFree" });
  
  return (
    <>
      {/* Free Session Checkbox */}
      <FormField
        control={control}
        name="isFree"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-2">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange} 
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
        control={control}
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
                  disabled={isFree}
                  value={isFree ? "0" : field.value}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

// Session Settings component (isPrivate, maxParticipants, paymentTime, cancellationHours)
export const SessionSettings = () => {
  const { control } = useFormContext<SessionFormValues>();
  const isFree = useWatch({ control, name: "isFree" });
  
  return (
    <>
      {/* Private/Public */}
      <FormField
        control={control}
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
        control={control}
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
        control={control}
        name="paymentTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Collection</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isFree}>
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
        control={control}
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
    </>
  );
};

// Session Description component
export const SessionDescription = () => {
  const { control } = useFormContext<SessionFormValues>();
  
  return (
    <FormField
      control={control}
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
  );
};
