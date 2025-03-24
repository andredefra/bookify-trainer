
import { User, Calendar, Medal, Target } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-4 w-4" />
          Client Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">{name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              <span>{sessions}</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-sm">
              <div className="bg-primary/5 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary/70" />
                <span>{since}</span>
              </div>
              
              <div className="bg-green-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Medal className="h-4 w-4 text-green-500" />
                <span>{sessions} sessions</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-1 mb-2">
                <Target className="h-4 w-4 text-primary/70" />
                <span className="text-sm font-medium">Goals</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <Badge key={goal} variant="secondary" className="bg-secondary/50">{goal}</Badge>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
