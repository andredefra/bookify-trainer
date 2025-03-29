
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CalendarCheck, CreditCard, Video } from "lucide-react";
import { SessionItem, SessionStatus } from "@/types/sessions";

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
  const bgColor = variant === 'featured' ? 'bg-gray-50 border border-gray-100' : 'bg-gray-50';
  
  return (
    <div className={`flex flex-col p-4 ${bgColor} rounded-lg`}>
      <div className="flex items-center justify-between mb-2">
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
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Registered
            </Badge>
          ) : null}
        </div>
      </div>
      
      {/* Exercise Example Section */}
      {variant === 'featured' && (
        <div className="mt-2 mb-3 border rounded-lg overflow-hidden">
          <div className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Barbell Squat</h4>
                <div className="text-sm text-muted-foreground mb-2">4 sets × 8-10</div>
              </div>
              <div className="bg-gray-100 text-black rounded-full px-3 py-1 text-sm font-medium">
                75 kg
              </div>
            </div>
            <div className="bg-muted/30 p-2 rounded text-sm mb-3">
              Focus on depth and keep your chest up
            </div>
          </div>
          <div>
            <img 
              src="/lovable-uploads/ed7badab-bbcf-4f77-8dbf-ba11be2b73df.png" 
              alt="Barbell Squat demonstration" 
              className="w-full"
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-2 mt-auto">
        {session.status === 'registered' || session.status === 'confirmed' ? (
          <>
            {onAddToCalendar && (
              <Button variant="outline" size="sm" className="flex items-center" onClick={() => onAddToCalendar(session)}>
                <CalendarCheck className="h-3.5 w-3.5 mr-1" />
                Add to Calendar
              </Button>
            )}
            {onCancel && (
              <Button variant="ghost" size="sm" onClick={() => onCancel(session)}>
                Cancel
              </Button>
            )}
            {variant === 'featured' && (
              <Button variant="outline" size="sm" className="flex items-center ml-auto">
                <Video className="h-3.5 w-3.5 mr-1" />
                View Exercise Videos
              </Button>
            )}
          </>
        ) : (
          <>
            {onViewDetails && (
              <Button variant="outline" size="sm" onClick={() => onViewDetails(session)}>
                Register to this session
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
