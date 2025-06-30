
import { PackageBuilder, PackageType } from "./PackageBuilder";

interface PackageFormData {
  title: string;
  description: string;
  objective: string;
  type: PackageType;
  sessions: {
    individual: { count: number; pricePerSession: number; };
    group: { count: number; pricePerSession: number; };
    online: { count: number; pricePerSession: number; };
  };
  selectedPrograms: Array<{
    id: string;
    title: string;
    duration: number;
    price: number;
  }>;
  additionalServices: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  basePrice: number;
  discount: number;
  finalPrice: number;
  calculatedDuration: number;
}

interface CreatePackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PackageFormData) => void;
}

export function CreatePackageDialog({ open, onOpenChange, onSubmit }: CreatePackageDialogProps) {
  return (
    <PackageBuilder
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
    />
  );
}
