
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <div className="text-sm text-muted-foreground flex items-center">
          Current program: {currentProgram}
        </div>
        <div className="text-sm text-muted-foreground flex items-center mt-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={`mailto:${client.email}`}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  {client.email}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
