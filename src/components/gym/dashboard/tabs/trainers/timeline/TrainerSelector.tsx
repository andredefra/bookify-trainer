import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronDown } from "lucide-react";
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";

interface TrainerSelectorProps {
  selectedTrainers: string[];
  onTrainersChange: (trainerIds: string[]) => void;
}

export function TrainerSelector({ selectedTrainers, onTrainersChange }: TrainerSelectorProps) {
  const [open, setOpen] = useState(false);
  const { trainers, loading } = useGymTrainersData();

  const handleTrainerToggle = (trainerId: string) => {
    if (selectedTrainers.includes(trainerId)) {
      onTrainersChange(selectedTrainers.filter(id => id !== trainerId));
    } else {
      onTrainersChange([...selectedTrainers, trainerId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTrainers.length === trainers.length) {
      onTrainersChange([]);
    } else {
      onTrainersChange(trainers.map(t => t.id));
    }
  };

  if (loading) {
    return <div className="h-10 w-40 bg-muted rounded animate-pulse" />;
  }

  const selectedTrainerNames = trainers
    .filter(t => selectedTrainers.includes(t.id))
    .map(t => t.name);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 h-10">
          <Users className="h-4 w-4" />
          {selectedTrainers.length === 0 
            ? "Seleziona Trainers" 
            : selectedTrainers.length === 1 
              ? selectedTrainerNames[0]
              : `${selectedTrainers.length} trainers`
          }
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="p-3 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Seleziona Trainers</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
              className="h-auto p-1 text-xs"
            >
              {selectedTrainers.length === trainers.length ? "Deseleziona" : "Tutti"}
            </Button>
          </div>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {trainers.map(trainer => (
            <div
              key={trainer.id}
              className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer"
              onClick={() => handleTrainerToggle(trainer.id)}
            >
              <Checkbox
                checked={selectedTrainers.includes(trainer.id)}
                onChange={() => handleTrainerToggle(trainer.id)}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{trainer.name}</div>
                <div className="text-sm text-muted-foreground">
                  {trainer.activeClients} clienti attivi
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTrainers.length > 0 && (
          <div className="p-3 border-t">
            <div className="text-xs text-muted-foreground mb-2">Selezionati:</div>
            <div className="flex flex-wrap gap-1">
              {selectedTrainerNames.map(name => (
                <Badge key={name} variant="secondary" className="text-xs">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}