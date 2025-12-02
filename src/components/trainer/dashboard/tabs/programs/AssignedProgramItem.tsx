import { Button } from "@/components/ui/button";
import { Mail, Calendar, DollarSign, BarChart3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useProgramAssignments } from '@/hooks/useProgramAssignments';

interface AssignedProgramItemProps {
  client: {
    id: number;
    name: string;
    email: string;
  };
  currentProgram: string;
  onChangeProgram: (clientName: string) => void;
  onViewProgress: (clientId: number) => void;
  onViewStats?: (clientId: number) => void;
}

export function AssignedProgramItem({ client, currentProgram, onChangeProgram, onViewProgress, onViewStats }: AssignedProgramItemProps) {
  const { updateSessionsCompleted } = useProgramAssignments();
  
  // Enhanced mock data with progress tracking
  const programDetails = {
    paid: client.id % 2 === 0,
    price: client.id % 2 === 0 ? 49.99 : 0,
    startDate: "2023-06-15",
    endDate: "2023-08-10",
    objective: client.id % 2 === 0 ? "Strength & Conditioning" : "Weight Loss",
    // New progress fields
    sessionsCompleted: client.id % 3 === 0 ? 8 : client.id % 2 === 0 ? 12 : 6,
    totalSessions: 16,
    completionPercentage: client.id % 3 === 0 ? 50 : client.id % 2 === 0 ? 75 : 37,
    daysUntilExpiry: client.id % 4 === 0 ? 3 : client.id % 3 === 0 ? -2 : 15,
    status: client.id % 4 === 0 ? 'expiring' : client.id % 3 === 0 ? 'expired' : 'on_track'
  };

  const getStatusBadge = () => {
    if (programDetails.status === 'expired') {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (programDetails.status === 'expiring') {
      return <Badge variant="destructive" className="bg-orange-100 text-orange-800">Expires in {programDetails.daysUntilExpiry} days</Badge>;
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg gap-4 ${
      programDetails.status === 'expired' ? 'bg-red-50 border border-red-200' :
      programDetails.status === 'expiring' ? 'bg-orange-50 border border-orange-200' :
      'bg-gray-50'
    }`}>
      <div className="overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium truncate">{client.name}</h3>
          {getStatusBadge()}
        </div>
        
        <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis mb-2">
          Current program: <span className="font-medium">{currentProgram}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress: {programDetails.completionPercentage}%</span>
            <span>{programDetails.sessionsCompleted}/{programDetails.totalSessions} sessions</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                programDetails.completionPercentage >= 80 ? 'bg-green-500' :
                programDetails.completionPercentage >= 60 ? 'bg-blue-500' : 
                'bg-orange-500'
              }`}
              style={{ width: `${Math.min(programDetails.completionPercentage, 100)}%` }}
            />
          </div>
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
        
        {/* Email section */}
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
        {programDetails.status === 'expired' && (
          <Button 
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white flex-1 sm:flex-auto"
          >
            Renew Now
          </Button>
        )}
        {programDetails.status === 'expiring' && (
          <Button 
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white flex-1 sm:flex-auto"
          >
            Contact Client
          </Button>
        )}
        {onViewStats && (
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onViewStats(client.id)}
            className="flex-1 sm:flex-auto"
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            View Stats
          </Button>
        )}
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
          onClick={() => onViewProgress(client.id)}
          className="flex-1 sm:flex-auto"
        >
          Manage Program
        </Button>
      </div>
    </div>
  );
}
