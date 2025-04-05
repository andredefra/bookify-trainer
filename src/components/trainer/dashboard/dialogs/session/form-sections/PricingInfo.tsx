
import { DollarSign } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext, useWatch } from "react-hook-form";
import { SessionFormValues } from "../SessionFormSchema";

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
