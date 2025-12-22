import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PackageBuilder, PackageType } from "@/components/trainer/dashboard/tabs/packages/PackageBuilder";
import { User, Crown, Users, ChevronRight, Check } from "lucide-react";

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

export interface Trainer {
  id: string;
  name: string;
  specialization?: string;
  avatarUrl?: string;
}

export interface TrainerAssignment {
  trainerId: string;
  isPrimary: boolean;
}

interface StudioCreatePackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PackageFormData & { 
    primaryTrainerId: string;
    assignedTrainerIds: string[];
  }) => void;
  trainers: Trainer[];
}

export function StudioCreatePackageDialog({ 
  open, 
  onOpenChange, 
  onSubmit,
  trainers 
}: StudioCreatePackageDialogProps) {
  const [primaryTrainerId, setPrimaryTrainerId] = useState<string>("");
  const [additionalTrainerIds, setAdditionalTrainerIds] = useState<string[]>([]);
  const [showPackageBuilder, setShowPackageBuilder] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setPrimaryTrainerId("");
      setAdditionalTrainerIds([]);
      setShowPackageBuilder(false);
    }
    onOpenChange(isOpen);
  };

  const handlePrimaryTrainerSelect = (trainerId: string) => {
    setPrimaryTrainerId(trainerId);
    // Remove from additional if it was there
    setAdditionalTrainerIds(prev => prev.filter(id => id !== trainerId));
  };

  const handleToggleAdditionalTrainer = (trainerId: string) => {
    if (trainerId === primaryTrainerId) return; // Can't add primary to additional
    
    setAdditionalTrainerIds(prev => 
      prev.includes(trainerId) 
        ? prev.filter(id => id !== trainerId)
        : [...prev, trainerId]
    );
  };

  const handleContinue = () => {
    if (!primaryTrainerId) return;
    setShowPackageBuilder(true);
  };

  const handlePackageSubmit = (data: PackageFormData) => {
    onSubmit({ 
      ...data, 
      primaryTrainerId,
      assignedTrainerIds: [primaryTrainerId, ...additionalTrainerIds]
    });
    setPrimaryTrainerId("");
    setAdditionalTrainerIds([]);
    setShowPackageBuilder(false);
  };

  // If trainer selection complete, show the PackageBuilder
  if (showPackageBuilder && primaryTrainerId) {
    return (
      <PackageBuilder
        open={open}
        onOpenChange={handleOpenChange}
        onSubmit={handlePackageSubmit}
      />
    );
  }

  const selectedPrimaryTrainer = trainers.find(t => t.id === primaryTrainerId);
  const availableAdditionalTrainers = trainers.filter(t => t.id !== primaryTrainerId);

  // Otherwise, show trainer selection first
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Assign Trainers
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select the primary trainer and optionally add backup trainers for this package
          </p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Primary Trainer Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-primary" />
              <Label className="font-medium">Primary Trainer</Label>
              <Badge variant="secondary" className="text-xs">Required</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              This trainer will be responsible for the package and sessions by default
            </p>
            <Select value={primaryTrainerId} onValueChange={handlePrimaryTrainerSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select primary trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={trainer.avatarUrl} />
                        <AvatarFallback className="text-xs">
                          {trainer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{trainer.name}</span>
                        {trainer.specialization && (
                          <span className="text-xs text-muted-foreground">
                            {trainer.specialization}
                          </span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Trainers Selection */}
          {primaryTrainerId && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label className="font-medium">Additional Trainers</Label>
                <Badge variant="outline" className="text-xs">Optional</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                These trainers can substitute when the primary trainer is unavailable
              </p>
              
              <ScrollArea className="max-h-[200px] border rounded-lg">
                <div className="p-2 space-y-1">
                  {availableAdditionalTrainers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No other trainers available
                    </p>
                  ) : (
                    availableAdditionalTrainers.map((trainer) => {
                      const isSelected = additionalTrainerIds.includes(trainer.id);
                      return (
                        <div
                          key={trainer.id}
                          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                            isSelected 
                              ? "bg-primary/10 border border-primary/20" 
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleToggleAdditionalTrainer(trainer.id)}
                        >
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => handleToggleAdditionalTrainer(trainer.id)}
                          />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={trainer.avatarUrl} />
                            <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{trainer.name}</p>
                            {trainer.specialization && (
                              <p className="text-xs text-muted-foreground">
                                {trainer.specialization}
                              </p>
                            )}
                          </div>
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
              
              {additionalTrainerIds.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {additionalTrainerIds.length} additional trainer{additionalTrainerIds.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          )}

          {/* Summary */}
          {primaryTrainerId && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Summary</p>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-primary" />
                <span className="text-sm">Primary: {selectedPrimaryTrainer?.name}</span>
              </div>
              {additionalTrainerIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Backup: {additionalTrainerIds.map(id => 
                      trainers.find(t => t.id === id)?.name
                    ).join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleContinue} 
            disabled={!primaryTrainerId}
            className="gap-2"
          >
            Continue to Package Builder
            <ChevronRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
