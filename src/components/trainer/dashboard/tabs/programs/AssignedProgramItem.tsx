
import { Button } from "@/components/ui/button";
import { Mail, Calendar, DollarSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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
  // Mock data to simulate program details
  const programDetails = {
    paid: client.id % 2 === 0,
    price: client.id % 2 === 0 ? 49.99 : 0,
    startDate: "2023-06-15",
    endDate: "2023-08-10",
    objective: client.id % 2 === 0 ? "Strength & Conditioning" : "Weight Loss"
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
      <div className="overflow-hidden">
        <h3 className="font-medium truncate">{client.name}</h3>
        <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
          Current program: <span className="font-medium">{currentProgram}</span>
        </div>
        <div className="flex flex-wrap mt-2 gap-2">
          <Badge variant="outline" className="whitespace-nowrap">
            <Calendar className="h-3 w-3 mr-1 shrink-0" />
            {programDetails.startDate}
          </Badge>
          
          {programDetails.objective && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap">
              {programDetails.objective}
            </Badge>
          )}
          
          {programDetails.paid ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 whitespace-nowrap">
              <DollarSign className="h-3 w-3 mr-1 shrink-0" />
              {programDetails.price} €
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 whitespace-nowrap">
              Free
            </Badge>
          )}
        </div>
        <div className="text-sm text-muted-foreground flex items-center mt-1 truncate">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={`mailto:${client.email}`}
                  className="flex items-center hover:text-primary transition-colors truncate"
                >
                  <Mail className="h-3.5 w-3.5 mr-1 shrink-0" />
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
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2 sm:mt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onChangeProgram(client.name)}
          className="flex-1 sm:flex-auto"
        >
          Change Program
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex-1 sm:flex-auto"
        >
          View Progress
        </Button>
      </div>
    </div>
  );
}
