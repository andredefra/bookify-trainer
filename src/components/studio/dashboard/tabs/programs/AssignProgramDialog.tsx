import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Program {
  id: string;
  name: string;
}

interface AssignProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: Program | null;
  clients: { id: string; name: string }[];
  trainers: { id: string; name: string }[];
  onAssign: (programId: string, clientId: string, trainerId: string, startDate: Date) => void;
}

export function AssignProgramDialog({
  open,
  onOpenChange,
  program,
  clients,
  trainers,
  onAssign,
}: AssignProgramDialogProps) {
  const [clientId, setClientId] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleSubmit = () => {
    if (!program || !clientId || !trainerId) return;
    onAssign(program.id, clientId, trainerId, startDate);
    setClientId("");
    setTrainerId("");
    setStartDate(new Date());
    onOpenChange(false);
  };

  if (!program) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Assign Program</DialogTitle>
          <DialogDescription>
            Assign "{program.name}" to a client
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Client</Label>
            <Select value={clientId} onValueChange={setClientId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Assign Trainer</Label>
            <Select value={trainerId} onValueChange={setTrainerId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose responsible trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!clientId || !trainerId}>
            <UserPlus className="h-4 w-4 mr-2" />
            Assign Program
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
