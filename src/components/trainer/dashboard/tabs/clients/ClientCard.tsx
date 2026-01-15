
import { Target, Dumbbell, Eye, TrendingUp, Package, Flag } from "lucide-react";
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
  onViewGoals: (client: ClientItem) => void;
  onViewProfile: (client: ClientItem) => void;
  onViewAnalytics: (client: ClientItem) => void;
  onViewCheckIns: (client: ClientItem) => void;
}

export function ClientCard({ client, onViewGoals, onViewProfile, onViewAnalytics, onViewCheckIns }: ClientCardProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{client.name}</h3>
          <div className="text-sm text-muted-foreground">
            {client.sessions} sessions • Last: {client.lastSession}
          </div>
          
          {/* Sample goals, programs and packages for demo */}
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
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Package className="h-3 w-3 mr-1" />
                  1 Active Package
                </Badge>
              </>
            )}
            {client.id === 2 && (
              <>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Target className="h-3 w-3 mr-1" />
                  Run 10K
                </Badge>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  <Package className="h-3 w-3 mr-1" />
                  1 Package
                </Badge>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-wrap">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewGoals(client)}
            className="flex-1 sm:flex-none min-w-[80px]"
          >
            <Target className="h-4 w-4 sm:mr-1" />
            <span className="hidden xs:inline ml-1">Goals</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewCheckIns(client)}
            className="flex-1 sm:flex-none min-w-[80px]"
          >
            <Flag className="h-4 w-4 sm:mr-1" />
            <span className="hidden xs:inline ml-1">Check-ins</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewAnalytics(client)}
            className="flex-1 sm:flex-none min-w-[80px]"
          >
            <TrendingUp className="h-4 w-4 sm:mr-1" />
            <span className="hidden xs:inline ml-1">Stats</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewProfile(client)}
            className="flex-1 sm:flex-none min-w-[80px]"
          >
            <Eye className="h-4 w-4 sm:mr-1" />
            <span className="hidden xs:inline ml-1">View</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
