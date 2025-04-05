
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { SessionFormValues } from "../SessionFormSchema";

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
