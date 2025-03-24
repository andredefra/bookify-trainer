
import { Button } from "@/components/ui/button";

interface AssignedProgramItemProps {
  client: {
    id: number;
    name: string;
    email: string;
  };
  currentProgram: string;
  onChangeProgram: (clientName: string) => void;
}

export function AssignedProgramItem({ client, currentProgram, onChangeProgram }: AssignedProgramItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <h3 className="font-medium">{client.name}</h3>
        <div className="text-sm text-muted-foreground">
          Current program: {currentProgram}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onChangeProgram(client.name)}
        >
          Change Program
        </Button>
        <Button variant="ghost" size="sm">
          View Progress
        </Button>
      </div>
    </div>
  );
}
