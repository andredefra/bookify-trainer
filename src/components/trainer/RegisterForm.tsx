
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(["client", "trainer", "gym"]),
  plan: z.string().optional()
});

interface RegisterFormProps {
  onSubmit: (data: z.infer<typeof registerSchema>) => void;
  onCancel: () => void;
}

export const RegisterForm = ({ onSubmit, onCancel }: RegisterFormProps) => {
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
                  className="grid grid-cols-3 gap-4 mt-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="client" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Client</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="trainer" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Trainer</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="gym" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Gym</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {userType !== "client" && (
          <FormField
            control={form.control}
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
                      <FormItem className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 border-gray-800">
                        <FormControl>
                          <RadioGroupItem value="gym" />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="font-medium text-gray-800">Gym Plan</FormLabel>
                          <p className="text-sm text-muted-foreground">€119/month - Complete solution for gyms with multiple trainers</p>
                        </div>
                      </FormItem>
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className="flex justify-end gap-3 pt-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Account & Continue</Button>
        </div>
      </form>
    </Form>
  );
};
