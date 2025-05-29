
import { Target, Dumbbell, Eye, Mail, Phone, Euro } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UnifiedClient } from "../../types/UnifiedClient";

interface ClientCardProps {
  client: UnifiedClient;
  onSetGoals: (clientName: string) => void;
  onViewProfile: (client: UnifiedClient) => void;
}

export function ClientCard({ client, onSetGoals, onViewProfile }: ClientCardProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium truncate">{client.name}</h3>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
              Client
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex items-center gap-4">
              <span>{client.sessions} sessions • Last: {client.lastSession}</span>
              {client.value && (
                <span className="flex items-center gap-1">
                  <Euro className="h-3 w-3" />
                  {client.value}€
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {client.email}
              </span>
              {client.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {client.phone}
                </span>
              )}
            </div>
          </div>
          
          {/* Goals */}
          {client.goals && client.goals.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {client.goals.slice(0, 2).map((goal) => (
                <Badge 
                  key={goal.id} 
                  variant="outline" 
                  className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                >
                  <Target className="h-3 w-3 mr-1" />
                  {goal.description}
                </Badge>
              ))}
              {client.goals.length > 2 && (
                <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 text-xs">
                  +{client.goals.length - 2} more
                </Badge>
              )}
            </div>
          )}
          
          {/* Programs */}
          {client.programs && client.programs.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {client.programs.map((program, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="bg-purple-50 text-purple-700 border-purple-200 text-xs"
                >
                  <Dumbbell className="h-3 w-3 mr-1" />
                  {program.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onSetGoals(client.name)}
          >
            <Target className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">Set Goals</span>
            <span className="sm:hidden">Goals</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewProfile(client)}
          >
            <Eye className="mr-1 h-4 w-4" />
            <span className="hidden sm:inline">View Profile</span>
            <span className="sm:hidden">View</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
