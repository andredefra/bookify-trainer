
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";
import { SessionItem } from "@/types/sessions";

interface SessionBadgesProps {
  session: SessionItem;
  isVideoSession: boolean;
  isLive: boolean;
  featured?: boolean;
  isPast?: boolean;
}

export function SessionBadges({
  session,
  isVideoSession,
  isLive,
  featured,
  isPast
}: SessionBadgesProps) {
  if (session.status === 'registered' || session.status === 'confirmed') {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Registered
        </Badge>
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
    );
  } 
  
  if (isPast) {
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
        Completed
      </Badge>
    );
  }
  
  if (featured) {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        Premium
      </Badge>
    );
  }
  
  return (
    <>
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
    </>
  );
}
