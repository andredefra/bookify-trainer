
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";
import { SessionItem } from "@/types/sessions";

interface SessionHeaderProps {
  session: SessionItem;
  isVideoSession: boolean;
  isLive: boolean;
}

export function SessionHeader({ 
  session, 
  isVideoSession, 
  isLive 
}: SessionHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-medium text-base">{session.name}</h3>
        {isVideoSession && (
          <Badge variant="outline" className="mt-1 bg-blue-100 text-blue-700 border-blue-200">
            <Video className="h-3 w-3 mr-1" /> Video
          </Badge>
        )}
        {isLive && isVideoSession && (
          <Badge className="mt-1 ml-1 bg-red-100 text-red-700 border-red-200 animate-pulse">
            LIVE NOW
          </Badge>
        )}
      </div>
      {session.price && (
        <div className="text-sm font-medium">
          €{session.price}
        </div>
      )}
    </div>
  );
}
