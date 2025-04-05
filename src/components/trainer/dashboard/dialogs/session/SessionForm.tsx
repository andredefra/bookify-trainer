
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { sessionFormSchema, SessionFormValues } from "./SessionFormSchema";
import { 
  BasicSessionInfo, 
  PricingInfo, 
  SessionSettings, 
  SessionDescription 
} from "./form-sections";

interface SessionFormProps {
  onSubmit: (data: SessionFormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<SessionFormValues>;
}

export function SessionForm({ onSubmit, onCancel, defaultValues }: SessionFormProps) {
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionFormSchema),
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
      mode: "in-person",
      ...defaultValues,
    },
  });

  const handleSubmit = (values: SessionFormValues) => {
    // If session is free, ensure price is set to 0
    const finalValues = {
      ...values,
      price: values.isFree ? "0" : values.price
    };
    
    onSubmit(finalValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicSessionInfo />
          <PricingInfo />
          <SessionSettings />
          <SessionDescription />
        </div>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {defaultValues ? "Update Session" : "Create Session"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
