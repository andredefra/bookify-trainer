import { Target, Dumbbell, Eye, TrendingUp, Package, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface StudioClient {
  id: string;
  name: string;
  email: string;
  sessions: number;
  lastSession: string;
  trainerId: string;
  trainerName: string;
  status: "active" | "inactive";
  package?: string;
  sessionsLeft?: number | null;
  activeGoals?: number;
  activePrograms?: number;
  activePackages?: number;
}

interface StudioClientCardProps {
  client: StudioClient;
  onViewProfile: (client: StudioClient) => void;
  onViewAnalytics: (client: StudioClient) => void;
  onChangeTrainer: (client: StudioClient) => void;
  onSetGoals: (clientName: string) => void;
}

export function StudioClientCard({ 
  client, 
  onViewProfile, 
  onViewAnalytics, 
  onChangeTrainer,
  onSetGoals 
}: StudioClientCardProps) {
  return (
    <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors border">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Client Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {client.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h3 className="font-medium truncate">{client.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{client.email}</p>
          </div>
        </div>

        {/* Trainer Info */}
        <div className="hidden md:block text-center px-4 border-l border-r">
          <p className="text-sm font-medium">{client.trainerName}</p>
          <p className="text-xs text-muted-foreground">Trainer</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <p className="font-medium">{client.sessions}</p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
          <div className="text-center">
            <p className="font-medium">{client.sessionsLeft ?? "∞"}</p>
            <p className="text-xs text-muted-foreground">Remaining</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {client.activeGoals && client.activeGoals > 0 && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400">
              <Target className="h-3 w-3 mr-1" />
              {client.activeGoals} Goals
            </Badge>
          )}
          {client.activePrograms && client.activePrograms > 0 && (
            <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-200 dark:text-purple-400">
              <Dumbbell className="h-3 w-3 mr-1" />
              {client.activePrograms} Programs
            </Badge>
          )}
          {client.activePackages && client.activePackages > 0 && (
            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200 dark:text-green-400">
              <Package className="h-3 w-3 mr-1" />
              {client.activePackages} Packages
            </Badge>
          )}
          <Badge variant={client.status === "active" ? "default" : "secondary"}>
            {client.status}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onSetGoals(client.name)}
          >
            <Target className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Goals</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewAnalytics(client)}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Stats</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onChangeTrainer(client)}
          >
            <UserCog className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Change PT</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewProfile(client)}
          >
            <Eye className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">View</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
