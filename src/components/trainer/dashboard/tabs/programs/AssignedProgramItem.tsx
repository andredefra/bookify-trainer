
import { Button } from "@/components/ui/button";
import { Mail, Calendar, DollarSign, Timer } from "lucide-react";
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
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <h3 className="font-medium">{client.name}</h3>
        <div className="text-sm text-muted-foreground flex items-center">
          Current program: {currentProgram}
        </div>
        <div className="flex mt-2 gap-2">
          <Badge variant="outline">
            <Calendar className="h-3 w-3 mr-1" />
            {programDetails.startDate}
          </Badge>
          
          {programDetails.objective && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {programDetails.objective}
            </Badge>
          )}
          
          {programDetails.paid ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <DollarSign className="h-3 w-3 mr-1" />
              {programDetails.price} €
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              Free
            </Badge>
          )}
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
