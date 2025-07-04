export interface ContactFormData {
  subject: string;
  firstName: string;
  lastName: string;
  email: string;
  gym: string;
  city: string;
  message: string;
}

export interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}