import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useContactForm } from "@/hooks/useContactForm";
import { ContactFormFields } from "./ContactFormFields";
import { ContactFormDialogProps } from "@/types/contact";

export function ContactFormDialog({ open, onOpenChange }: ContactFormDialogProps) {
  const { form, isSubmitting, onSubmit } = useContactForm(() => onOpenChange(false));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contattaci</DialogTitle>
          <DialogDescription>
            Compila il form per ricevere informazioni sui nostri servizi per palestre.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <ContactFormFields 
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}