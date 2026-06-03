
import { User, Calendar, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClientProfileProps {
  name: string;
  email: string;
  since: string;
  sessions: number;
  image?: string;
  onRemove?: () => void;
}

export function ClientProfile({
  name,
  email,
  since,
  sessions,
  image,
  onRemove
}: ClientProfileProps) {
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";

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
              <AvatarImage src={image || defaultImage} alt={name} />
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

        <div className="grid grid-cols-1 gap-2 mt-4">
          <div className="bg-primary/5 px-2 py-1 rounded-md flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3 text-primary/70" />
            <span className="truncate">{since}</span>
          </div>
        </div>

        {onRemove && (
          <Button
            variant="destructive"
            size="sm"
            className="w-full mt-4"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Client
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
