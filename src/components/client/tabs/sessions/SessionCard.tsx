
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

interface SessionCardProps {
  session: SessionItem;
  onViewDetails?: (session: SessionItem) => void;
  onRegister?: (session: SessionItem) => void;
  onAddToCalendar?: (session: SessionItem) => void;
  onCancel?: (session: SessionItem) => void;
  variant?: 'default' | 'featured';
}

export function SessionCard({ 
  session, 
  onViewDetails, 
  onRegister, 
  onAddToCalendar,
  onCancel,
  variant = 'default' 
}: SessionCardProps) {
  const bgColor = variant === 'featured' ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50';
  
  return (
    <div className={`flex items-center justify-between p-4 ${bgColor} rounded-lg`}>
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
      <div className="flex items-center space-x-2">
        {session.status === 'registered' || session.status === 'confirmed' ? (
          <>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Registered
            </Badge>
            {onAddToCalendar && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => onAddToCalendar(session)}
              >
                <CalendarCheck className="h-3.5 w-3.5 mr-1" />
                Add to Calendar
              </Button>
            )}
            {onCancel && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onCancel(session)}
              >
                Cancel
              </Button>
            )}
          </>
        ) : session.status === 'pending' ? (
          <>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Payment Required
            </Badge>
            {onRegister && (
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex items-center" 
                onClick={() => onRegister(session)}
              >
                <CreditCard className="h-3.5 w-3.5 mr-1" />
                Complete Registration
              </Button>
            )}
            {onCancel && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onCancel(session)}
              >
                Cancel
              </Button>
            )}
          </>
        ) : (
          <>
            <Badge variant={variant === 'featured' ? "default" : "outline"} 
                  className={variant === 'featured' ? "bg-blue-50 text-blue-700 border-blue-200" : ""}>
              {variant === 'featured' ? "Premium" : "Available"}
            </Badge>
            {onViewDetails && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewDetails(session)}
              >
                Details
              </Button>
            )}
            {onRegister && variant === 'featured' && (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onRegister(session)}
              >
                Register Now
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
