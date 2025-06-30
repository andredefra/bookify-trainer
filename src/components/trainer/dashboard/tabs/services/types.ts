
import { LucideIcon } from "lucide-react";

export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'consultation' | 'nutrition' | 'support' | 'wellness' | 'other';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  category: AdditionalService['category'];
  icon: string;
  isActive: boolean;
}
