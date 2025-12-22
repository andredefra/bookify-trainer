import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PackageBuilder, PackageType } from "@/components/trainer/dashboard/tabs/packages/PackageBuilder";
import { User } from "lucide-react";

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

interface Trainer {
  id: string;
  name: string;
  specialization?: string;
}

interface StudioCreatePackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PackageFormData & { trainerId: string }) => void;
  trainers: Trainer[];
}

export function StudioCreatePackageDialog({ 
  open, 
  onOpenChange, 
  onSubmit,
  trainers 
}: StudioCreatePackageDialogProps) {
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");
  const [showPackageBuilder, setShowPackageBuilder] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedTrainerId("");
      setShowPackageBuilder(false);
    }
    onOpenChange(isOpen);
  };

  const handleTrainerSelect = (trainerId: string) => {
    setSelectedTrainerId(trainerId);
    setShowPackageBuilder(true);
  };

  const handlePackageSubmit = (data: PackageFormData) => {
    onSubmit({ ...data, trainerId: selectedTrainerId });
    setSelectedTrainerId("");
    setShowPackageBuilder(false);
  };

  // If trainer is selected, show the PackageBuilder
  if (showPackageBuilder && selectedTrainerId) {
    return (
      <PackageBuilder
        open={open}
        onOpenChange={handleOpenChange}
        onSubmit={handlePackageSubmit}
      />
    );
  }

  // Otherwise, show trainer selection first
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Package</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="trainer-select">Select Responsible Trainer</Label>
            <p className="text-sm text-muted-foreground">
              Choose the trainer who will manage this package template
            </p>
            <Select value={selectedTrainerId} onValueChange={handleTrainerSelect}>
              <SelectTrigger id="trainer-select">
                <SelectValue placeholder="Choose a trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{trainer.name}</div>
                        {trainer.specialization && (
                          <div className="text-xs text-muted-foreground">{trainer.specialization}</div>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
