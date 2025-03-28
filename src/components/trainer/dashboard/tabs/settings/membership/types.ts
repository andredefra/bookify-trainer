
import { LucideIcon } from "lucide-react";

/**
 * Represents a membership plan in the system
 */
export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  isPopular: boolean;
  icon: LucideIcon;
}
