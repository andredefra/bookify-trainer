
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UserTypePlansProps {
  userType: "client" | "trainer" | "gym" | "studio";
  control: Control<any>;
}

export const UserTypePlans = ({ userType, control }: UserTypePlansProps) => {
  return (
    <FormField
      control={control}
      name="plan"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Choose your plan:</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-3"
            >
              {userType === "trainer" && (
                <>
                  <FormItem className="flex items-start space-x-3 space-y-0 border rounded-lg p-4">
                    <FormControl>
                      <RadioGroupItem value="standard" />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-medium text-primary">Standard</FormLabel>
                      <p className="text-sm text-muted-foreground">€5/month - Essential features for beginners without sessions</p>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-start space-x-3 space-y-0 border rounded-lg p-4">
                    <FormControl>
                      <RadioGroupItem value="freemium" />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-medium text-primary">Basic</FormLabel>
                      <p className="text-sm text-muted-foreground">€9/month - Basic tier with essential features</p>
                    </div>
                  </FormItem>
                  <FormItem className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 border-primary bg-primary/5">
                    <FormControl>
                      <RadioGroupItem value="pro" />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-medium text-primary">Pro</FormLabel>
                      <p className="text-sm text-muted-foreground">€29/month - Premium features for serious trainers</p>
                    </div>
                  </FormItem>
                </>
              )}
              
              {userType === "gym" && (
                <FormItem className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 border-primary bg-primary/5">
                  <FormControl>
                    <RadioGroupItem value="gym" />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="font-medium text-primary">Gym Plan</FormLabel>
                    <p className="text-sm text-muted-foreground">€119/month - Complete facility management with staff oversight, membership tracking, and commission-based trainer payments</p>
                  </div>
                </FormItem>
              )}

              {userType === "studio" && (
                <FormItem className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 border-primary bg-primary/5">
                  <FormControl>
                    <RadioGroupItem value="studio" />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="font-medium text-primary">Studio Plan</FormLabel>
                    <p className="text-sm text-muted-foreground">€89/month - Full coaching business with training programs, packages, and dynamic PT assignment</p>
                  </div>
                </FormItem>
              )}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
