
import { Target, Dumbbell, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
}

interface ClientCardProps {
  client: ClientItem;
  onSetGoals: (clientName: string) => void;
  onViewProfile: (client: ClientItem) => void;
}

export function ClientCard({ client, onSetGoals, onViewProfile }: ClientCardProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{client.name}</h3>
          <div className="text-sm text-muted-foreground">
            {client.sessions} sessions • Last: {client.lastSession}
          </div>
          
          {/* Sample goals and programs for demo */}
          <div className="flex flex-wrap gap-1 mt-2">
            {client.id === 1 && (
              <>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Target className="h-3 w-3 mr-1" />
                  Lose 5kg
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Dumbbell className="h-3 w-3 mr-1" />
                  Strength Program
                </Badge>
              </>
            )}
            {client.id === 2 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Target className="h-3 w-3 mr-1" />
                Run 10K
              </Badge>
            )}
          </div>
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
