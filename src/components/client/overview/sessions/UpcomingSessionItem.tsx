
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarCheck, CreditCard } from "lucide-react";

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
  price?: number;
  attendees?: number;
  maxAttendees?: number;
  description?: string;
}

interface UpcomingSessionItemProps {
  session: SessionItem;
  onRegister: (session: SessionItem) => void;
  featured?: boolean;
}

export function UpcomingSessionItem({ session, onRegister, featured = false }: UpcomingSessionItemProps) {
  const bgClass = featured 
    ? "bg-blue-50 border border-blue-100" 
    : "bg-gray-50";
  
  return (
    <div className={`flex items-center justify-between p-4 ${bgClass} rounded-lg`}>
      <div>
        <h3 className="font-medium">{session.name}</h3>
        <div className="text-sm text-muted-foreground">
          With {session.trainer} • {session.date} • {session.time}
        </div>
        {session.price && (
          <div className="text-sm font-medium mt-1">
            €{session.price}
          </div>
        )}
        {session.attendees !== undefined && session.maxAttendees && (
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{session.attendees}/{session.maxAttendees} attending</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {session.status === 'registered' ? (
          <>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Registered
            </Badge>
            <Button variant="outline" size="sm" className="flex items-center">
              <CalendarCheck className="h-3.5 w-3.5 mr-1" />
              Add to Calendar
            </Button>
          </>
        ) : (
          <>
            <Badge variant="outline" className={featured 
              ? "bg-blue-50 text-blue-700 border-blue-200" 
              : session.status === 'pending' 
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : ""
            }>
              {session.status === 'pending' ? 'Payment Required' : featured ? 'Premium' : 'Available'}
            </Badge>
            <Button 
              variant={featured ? "default" : "secondary"}
              size="sm" 
              className="flex items-center" 
              onClick={() => onRegister(session)}
            >
              <CreditCard className="h-3.5 w-3.5 mr-1" />
              Register
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
