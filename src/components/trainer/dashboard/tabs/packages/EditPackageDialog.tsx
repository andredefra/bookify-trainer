
import { PackageBuilder, PackageType } from "./PackageBuilder";

interface PackageFormData {
  title: string;
  description: string;
  objective: string;
  type: PackageType;
  isPublic: boolean;
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

interface EditPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, data: PackageFormData) => void;
  package: {
    id: number;
    title: string;
    type: string;
    sessions?: number;
    price: number;
    isPaid?: boolean;
    objective?: string;
    duration?: number;
    description?: string;
  } | null;
}

export function EditPackageDialog({ open, onOpenChange, onSubmit, package: packageData }: EditPackageDialogProps) {
  // Convert old package format to new format for editing
  const convertToNewFormat = (oldPackage: any): PackageFormData | null => {
    if (!oldPackage) return null;
    
    return {
      title: oldPackage.title || "",
      description: oldPackage.description || "",
      objective: oldPackage.objective || "",
      type: (oldPackage.type as PackageType) || "sessions_only",
      isPublic: oldPackage.isPublic || false,
      sessions: {
        individual: { count: oldPackage.sessions || 0, pricePerSession: 50 },
        group: { count: 0, pricePerSession: 30 },
        online: { count: 0, pricePerSession: 35 }
      },
      selectedPrograms: [],
      additionalServices: [],
      basePrice: oldPackage.price || 0,
      discount: 0,
      finalPrice: oldPackage.price || 0,
      calculatedDuration: oldPackage.duration || 4
    };
  };

  const handleSubmit = (data: PackageFormData) => {
    if (packageData) {
      onSubmit(packageData.id, data);
    }
  };

  return (
    <PackageBuilder
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      editData={convertToNewFormat(packageData)}
    />
  );
}
