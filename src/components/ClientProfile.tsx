
import { User } from "lucide-react";
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
      <CardHeader className="bg-muted pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-4 w-4" />
          Client Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="text-lg">{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Client since:</span>
                <p className="font-medium">{since}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Sessions completed:</span>
                <p className="font-medium">{sessions}</p>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground block mb-2">Fitness goals:</span>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <Badge key={goal} variant="secondary">{goal}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
