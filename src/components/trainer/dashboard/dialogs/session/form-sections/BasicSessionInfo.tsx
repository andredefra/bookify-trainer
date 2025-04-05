
import { CalendarIcon, Clock, MapPin, Video } from "lucide-react";
import { format } from "date-fns";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { SessionFormValues } from "../SessionFormSchema";

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
