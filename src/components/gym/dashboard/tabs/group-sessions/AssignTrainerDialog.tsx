import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCog, DollarSign } from "lucide-react";

interface AssignTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionTitle: string;
  onAssignTrainer: (trainerId: string, compensationAmount?: number, compensationType?: string) => Promise<void>;
}

export function AssignTrainerDialog({ 
  open, 
  onOpenChange, 
  sessionTitle, 
  onAssignTrainer 
}: AssignTrainerDialogProps) {
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [compensationType, setCompensationType] = useState("fixed");
  const [compensationAmount, setCompensationAmount] = useState<number>(50);
  const [loading, setLoading] = useState(false);

  // Mock trainers data
  const trainers = [
    { id: "trainer-1", name: "Sarah Johnson", specialties: ["HIIT", "Strength"] },
    { id: "trainer-2", name: "Mike Chen", specialties: ["Yoga", "Pilates"] },
    { id: "trainer-3", name: "Emma Davis", specialties: ["Cardio", "Zumba"] },
    { id: "trainer-4", name: "Alex Rodriguez", specialties: ["CrossFit", "Functional"] }
  ];

  const handleAssign = async () => {
    if (!selectedTrainer) return;

    setLoading(true);
    try {
      await onAssignTrainer(selectedTrainer, compensationAmount, compensationType);
      
      // Reset form
      setSelectedTrainer("");
      setCompensationAmount(50);
      setCompensationType("fixed");
      onOpenChange(false);
    } catch (error) {
      console.error('Error assigning trainer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            Assign Trainer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted/30 p-3 rounded-lg">
            <h4 className="font-medium truncate">{sessionTitle}</h4>
            <p className="text-sm text-muted-foreground">Group Session</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainer">Select Trainer *</Label>
            <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a trainer" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg">
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    <div>
                      <div className="font-medium">{trainer.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {trainer.specialties.join(", ")}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 border-t pt-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Label>Compensation</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="compensation_type" className="text-xs">Type</Label>
                <Select value={compensationType} onValueChange={setCompensationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg">
                    <SelectItem value="fixed">Fixed Rate</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="compensation_amount" className="text-xs">
                  Amount {compensationType === "percentage" ? "(%)" : "($)"}
                </Label>
                <Input
                  id="compensation_amount"
                  type="number"
                  value={compensationAmount}
                  onChange={(e) => setCompensationAmount(Number(e.target.value))}
                  min="0"
                  max={compensationType === "percentage" ? "100" : "500"}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              disabled={loading || !selectedTrainer}
              className="flex-1"
            >
              {loading ? "Assigning..." : "Assign Trainer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}