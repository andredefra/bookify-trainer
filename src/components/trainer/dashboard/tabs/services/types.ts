
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

export interface ServiceAnalytics {
  serviceId: string;
  salesCount: number;
  totalRevenue: number;
  activeClients: ServiceClient[];
  linkedPackages: LinkedPackage[];
  lastSaleDate?: Date;
}

export interface ServiceClient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  startDate: Date;
  packageName: string;
  status: 'active' | 'expired' | 'paused';
}

export interface LinkedPackage {
  id: string;
  name: string;
  type: 'sessions_only' | 'program_only' | 'hybrid' | 'service';
  price: number;
  clientsCount: number;
}

export interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  category: AdditionalService['category'];
  icon: string;
  isActive: boolean;
}
