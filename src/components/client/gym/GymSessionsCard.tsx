import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import { useGymSessions } from "@/hooks/useGymSessions";
import { cn } from "@/lib/utils";
import { ExpandedSessionsDialog } from "./ExpandedSessionsDialog";
import { useState } from "react";

interface GymSessionsCardProps {
  gymId?: string;
}

export function GymSessionsCard({ gymId }: GymSessionsCardProps) {
  const { sessions, loading } = useGymSessions(gymId);
  const [expandedOpen, setExpandedOpen] = useState(false);

  // Get only upcoming sessions (today + next 3 days)
  const upcomingSessions = sessions
    .filter(session => {
      const sessionDate = new Date(session.start_datetime);
      const threeDaysFromNow = addDays(new Date(), 3);
      return sessionDate >= new Date() && sessionDate <= threeDaysFromNow;
    })
    .slice(0, 3); // Show max 3 sessions

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSessionDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM dd');
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
          <Clock className="h-6 w-6 text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setExpandedOpen(true)}
              className="text-primary hover:text-primary"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Calendar className="h-6 w-6 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No upcoming sessions</p>
              <Button 
                variant="link" 
                size="sm"
                onClick={() => setExpandedOpen(true)}
                className="mt-1 h-auto p-0 text-xs"
              >
                Browse all sessions
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div 
                  key={session.id} 
                  className={cn(
                    "flex items-center justify-between p-3 border rounded-lg transition-all hover:bg-muted/50",
                    session.is_booked && "bg-primary/5 border-primary/20"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{session.title}</h4>
                      <Badge 
                        variant="secondary" 
                        className={cn("text-xs", getDifficultyColor(session.difficulty_level))}
                      >
                        {session.difficulty_level}
                      </Badge>
                      {session.is_booked && (
                        <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                          Booked
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatSessionDate(session.start_datetime)} at {format(new Date(session.start_datetime), 'HH:mm')}
                      </div>
                      {session.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {session.available_spots} spots
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setExpandedOpen(true)}
                    className="flex-shrink-0 h-8 px-2"
                  >
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {sessions.length > 3 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setExpandedOpen(true)}
                  className="w-full mt-3"
                >
                  View All {sessions.length} Sessions
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <ExpandedSessionsDialog
        open={expandedOpen}
        onOpenChange={setExpandedOpen}
        gymId={gymId}
      />
    </>
  );
}