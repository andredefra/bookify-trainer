import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useGymSessions } from "@/hooks/useGymSessions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface GymSessionsCardProps {
  gymId?: string;
}

export function GymSessionsCard({ gymId }: GymSessionsCardProps) {
  console.log('🔍 GymSessionsCard START - gymId:', gymId);
  
  const { sessions, loading, bookSession, cancelBooking } = useGymSessions(gymId);
  const { toast } = useToast();
  
  console.log('🔍 GymSessionsCard DATA:', {
    sessions: sessions?.length || 0,
    loading,
    gymId
  });

  const handleBookSession = async (sessionId: string, sessionTitle: string) => {
    try {
      await bookSession(sessionId);
      toast({
        title: "Session Booked",
        description: `Successfully booked ${sessionTitle}`,
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to book session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelBooking = async (sessionId: string, sessionTitle: string) => {
    try {
      await cancelBooking(sessionId);
      toast({
        title: "Booking Cancelled",
        description: `Cancelled booking for ${sessionTitle}`,
      });
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: "Unable to cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Available Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Available Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No upcoming sessions</p>
            <p className="text-xs">Check back later for new sessions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div 
                key={session.id} 
                className={cn(
                  "border rounded-lg p-4 space-y-3 transition-all",
                  session.is_booked && "bg-primary/5 border-primary/20"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{session.title}</h4>
                      <Badge 
                        variant="secondary" 
                        className={getDifficultyColor(session.difficulty_level)}
                      >
                        {session.difficulty_level}
                      </Badge>
                      {session.is_booked && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Booked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {session.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(session.start_datetime), 'MMM dd, HH:mm')} 
                        ({session.duration_minutes}min)
                      </div>
                      {session.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {session.available_spots} spots left
                      </div>
                    </div>
                    
                    {session.assigned_trainer_name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Trainer: {session.assigned_trainer_name}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {session.is_booked ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelBooking(session.id, session.title)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        disabled={session.available_spots === 0}
                        onClick={() => handleBookSession(session.id, session.title)}
                      >
                        {session.available_spots === 0 ? 'Full' : 'Book'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}