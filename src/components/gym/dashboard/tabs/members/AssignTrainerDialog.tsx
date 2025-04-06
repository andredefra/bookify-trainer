
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Member } from "./types";
import { toast } from "sonner";

// Sample trainer data - in a real app this would come from your database
const trainers = [
  { 
    id: 1, 
    name: "Marco Rossi", 
    image: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    specialties: ["Strength Training", "HIIT"]
  },
  { 
    id: 2, 
    name: "Laura Bianchi",  
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    specialties: ["Yoga", "Pilates"]
  },
  { 
    id: 3, 
    name: "Giovanni Verdi", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    specialties: ["Bodybuilding", "Nutrition"]
  }
];

interface AssignTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member;
}

export function AssignTrainerDialog({ open, onOpenChange, member }: AssignTrainerDialogProps) {
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");

  const handleAssign = () => {
    if (!selectedTrainerId) {
      toast.error("Please select a trainer");
      return;
    }

    const trainerName = trainers.find(t => t.id.toString() === selectedTrainerId)?.name;
    
    // In a real application, you would save this assignment to your database
    toast.success(`${member.name} has been assigned to ${trainerName}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Trainer to {member.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainer-select">Select Trainer</Label>
            <Select 
              value={selectedTrainerId} 
              onValueChange={setSelectedTrainerId}
            >
              <SelectTrigger id="trainer-select">
                <SelectValue placeholder="Choose a trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem 
                    key={trainer.id} 
                    value={trainer.id.toString()}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={trainer.image} alt={trainer.name} />
                        <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {trainer.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedTrainerId && (
            <div className="bg-muted p-4 rounded-md">
              <div className="font-medium">Selected Trainer</div>
              {(() => {
                const trainer = trainers.find(t => t.id.toString() === selectedTrainerId);
                return trainer ? (
                  <div className="mt-2 flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={trainer.image} alt={trainer.name} />
                      <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{trainer.name}</div>
                      <div className="text-sm flex flex-wrap gap-1 mt-1">
                        {trainer.specialties.map((specialty, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAssign}>Assign Trainer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
