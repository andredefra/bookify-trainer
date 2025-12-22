import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserCog, History, Package, Dumbbell, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Trainer {
  id: string;
  name: string;
  activeClients: number;
  specialties: string[];
}

interface ChangeClientTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName: string;
  currentTrainerId: string;
  currentTrainerName: string;
}

export function ChangeClientTrainerDialog({
  open,
  onOpenChange,
  clientName,
  currentTrainerId,
  currentTrainerName
}: ChangeClientTrainerDialogProps) {
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [transferPrograms, setTransferPrograms] = useState(true);
  const [transferPackages, setTransferPackages] = useState(true);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  // Mock trainers data
  const trainers: Trainer[] = [
    { id: "t1", name: "Marco Rossi", activeClients: 12, specialties: ["Strength", "Bodybuilding"] },
    { id: "t2", name: "Laura Bianchi", activeClients: 8, specialties: ["Cardio", "Weight Loss"] },
    { id: "t3", name: "Giuseppe Verde", activeClients: 15, specialties: ["Functional", "CrossFit"] },
    { id: "t4", name: "Anna Neri", activeClients: 10, specialties: ["Yoga", "Pilates"] },
  ].filter(t => t.id !== currentTrainerId);

  // Mock assignment history
  const assignmentHistory = [
    { date: "2024-01-15", fromTrainer: "Initial Assignment", toTrainer: currentTrainerName, reason: "Client onboarding" },
    { date: "2023-11-01", fromTrainer: "Laura Bianchi", toTrainer: currentTrainerName, reason: "Trainer request" },
  ];

  const handleSave = () => {
    if (!selectedTrainer) {
      toast({
        title: "Error",
        description: "Please select a new trainer",
        variant: "destructive"
      });
      return;
    }

    const newTrainer = trainers.find(t => t.id === selectedTrainer);
    
    toast({
      title: "Trainer Changed",
      description: `${clientName} has been reassigned to ${newTrainer?.name}`,
    });
    
    onOpenChange(false);
    setSelectedTrainer("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            Change Trainer for {clientName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Trainer */}
          <Card className="bg-muted/30">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">Current Trainer</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {currentTrainerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentTrainerName}</p>
                  <p className="text-sm text-muted-foreground">Primary Trainer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Select New Trainer */}
          <div className="space-y-2">
            <Label>Select New Trainer</Label>
            <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a trainer..." />
              </SelectTrigger>
              <SelectContent>
                {trainers.map(trainer => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{trainer.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {trainer.activeClients} clients
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedTrainer && (
              <Card className="bg-primary/5 border-primary/20 mt-2">
                <CardContent className="pt-4">
                  {(() => {
                    const trainer = trainers.find(t => t.id === selectedTrainer);
                    return trainer ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {trainer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{trainer.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {trainer.activeClients} active clients
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {trainer.specialties.map(s => (
                            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Transfer Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Transfer Active Programs</p>
                  <p className="text-xs text-muted-foreground">Assign all active programs to new trainer</p>
                </div>
              </div>
              <Switch checked={transferPrograms} onCheckedChange={setTransferPrograms} />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Transfer Active Packages</p>
                  <p className="text-xs text-muted-foreground">Assign all active packages to new trainer</p>
                </div>
              </div>
              <Switch checked={transferPackages} onCheckedChange={setTransferPackages} />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              placeholder="Reason for reassignment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          {/* Assignment History */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <History className="h-4 w-4" />
              Assignment History
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {assignmentHistory.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                  <div>
                    <span className="text-muted-foreground">{entry.fromTrainer}</span>
                    <span className="mx-2">→</span>
                    <span className="font-medium">{entry.toTrainer}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          {selectedTrainer && (
            <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-700 dark:text-amber-400">Confirm Change</p>
                <p className="text-muted-foreground">
                  This will reassign {clientName} to a new trainer. The client and both trainers will be notified.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedTrainer}>
            Confirm Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
