
import { Exercise, WorkoutSession, TrainingProgram } from "@/data/training/types";

export type { Exercise, WorkoutSession, TrainingProgram };

export interface ProgramFormProps {
  clientId: string;
  clientName: string;
  onSend: (program: any) => void;
  isPremium: boolean;
  initialData?: {
    id: string;
    title: string;
    weekStart: string;
    duration: number;
    objective: string;
    description: string;
    isPaid: boolean;
    price: number;
    sessions?: WorkoutSession[];
  };
}

export interface PaymentMethod {
  id: string;
  type: 'creditCard' | 'paypal' | 'googlePay';
  isDefault: boolean;
  lastFour?: string;
  expiryDate?: string;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  date: string;
  programId?: string;
  sessionId?: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
}

export interface BusinessInfo {
  type: 'individual' | 'business';
  businessName?: string;
  vatNumber?: string;
  taxId?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
