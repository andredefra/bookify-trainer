
import { Users } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext, useWatch } from "react-hook-form";
import { SessionFormValues } from "../SessionFormSchema";

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
