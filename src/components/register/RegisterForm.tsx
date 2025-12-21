
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserTypePlans } from "./UserTypePlans";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(["client", "trainer", "gym", "studio"]),
  plan: z.string().optional()
});

interface RegisterFormProps {
  onSubmit: (data: z.infer<typeof registerSchema>) => void;
  onCancel?: () => void;
  hideUserTypeSelection?: boolean;
}

export const RegisterForm = ({ onSubmit, onCancel, hideUserTypeSelection = false }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      userType: "client",
      plan: "freemium"
    }
  });

  const userType = form.watch("userType");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!hideUserTypeSelection && (
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I am a:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="client" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-sm">Client</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="trainer" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-sm">Trainer</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="gym" />
                      </FormControl>
                      <div className="flex flex-col">
                        <FormLabel className="font-normal cursor-pointer text-sm">Gym</FormLabel>
                        <span className="text-xs text-muted-foreground">Facility</span>
                      </div>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="studio" />
                      </FormControl>
                      <div className="flex flex-col">
                        <FormLabel className="font-normal cursor-pointer text-sm">Studio</FormLabel>
                        <span className="text-xs text-muted-foreground">Coaching</span>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {(userType === "trainer" || userType === "gym" || userType === "studio") && (
          <UserTypePlans userType={userType} control={form.control} />
        )}
        
        <div className="flex justify-end gap-3 pt-3">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">Create Account</Button>
        </div>
      </form>
    </Form>
  );
};
