import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContactFormData } from "@/types/contact";

export function useContactForm(onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    defaultValues: {
      subject: "",
      firstName: "",
      lastName: "",
      email: "",
      gym: "",
      city: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });

      if (error) throw error;

      toast({
        title: "Messaggio inviato!",
        description: "Grazie per averci contattato. Ti risponderemo al più presto.",
      });

      form.reset();
      onSuccess();
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore nell'invio del messaggio. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
}