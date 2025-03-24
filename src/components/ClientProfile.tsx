
import { User, Calendar, Medal, Target } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClientProfileProps {
  name: string;
  email: string;
  since: string;
  sessions: number;
  goals: string[];
  image?: string;
}

export function ClientProfile({
  name,
  email,
  since,
  sessions,
  goals,
  image
}: ClientProfileProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-4 w-4" />
          Client Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary">{name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              <span>{sessions}</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold truncate">{name}</h3>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-primary/5 px-2 py-1 rounded-md flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3 text-primary/70" />
            <span className="truncate">{since}</span>
          </div>
          
          <div className="bg-green-50 px-2 py-1 rounded-md flex items-center gap-1 text-xs">
            <Medal className="h-3 w-3 text-green-500" />
            <span className="truncate">{sessions} sessions</span>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center gap-1 mb-1.5">
            <Target className="h-3 w-3 text-primary/70" />
            <span className="text-xs font-medium">Goals</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {goals.map((goal) => (
              <Badge key={goal} variant="secondary" className="bg-secondary/50 px-1.5 py-0.5 text-xs">{goal}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
