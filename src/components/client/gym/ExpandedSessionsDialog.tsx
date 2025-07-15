import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Info, CalendarDays, List, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useGymSessions } from "@/hooks/useGymSessions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { SessionDetailsDialog } from "./SessionDetailsDialog";
import { CalendarSessionView } from "../tabs/sessions/CalendarSessionView";
import { SessionStatus } from "@/types/sessions";

interface ExpandedSessionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gymId?: string;
}

export function ExpandedSessionsDialog({ open, onOpenChange, gymId }: ExpandedSessionsDialogProps) {
  const { sessions, loading, bookSession, cancelBooking } = useGymSessions(gymId);
  const { toast } = useToast();
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

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

  // Convert gym sessions to SessionItem format for calendar view
  const calendarSessions = sessions.map((session, index) => ({
    id: index + 1,
    name: session.title,
    trainer: session.assigned_trainer_name || 'TBD',
    time: format(new Date(session.start_datetime), 'HH:mm'),
    date: format(new Date(session.start_datetime), 'yyyy-MM-dd'),
    status: (session.is_booked ? 'confirmed' : 'available') as SessionStatus,
    gymSessionId: session.id
  }));

  const handleViewDetails = (calendarSession: any) => {
    const originalSession = sessions.find(s => s.id === calendarSession.gymSessionId);
    if (originalSession) {
      setSelectedSession({
        ...originalSession,
        requirements: ['Suitable for all fitness levels', 'Bring water bottle'],
        equipment_needed: ['Yoga mat provided', 'Comfortable clothing'],
        benefits: ['Improved flexibility', 'Stress reduction', 'Better posture'],
        trainer_bio: originalSession.assigned_trainer_name ? 'Certified trainer with 5+ years experience' : undefined,
        trainer_rating: 4.8,
        cancellation_policy: 'Free cancellation up to 2 hours before the session'
      });
      setDetailsOpen(true);
    }
  };

  const handleRegister = (calendarSession: any) => {
    const originalSession = sessions.find(s => s.id === calendarSession.gymSessionId);
    if (originalSession) {
      handleBookSession(originalSession.id, originalSession.title);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl h-[80vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                All Available Sessions
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('list')}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
                <Button 
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('calendar')}
                  className="h-8 px-3"
                >
                  <CalendarDays className="h-4 w-4 mr-1" />
                  Calendar
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : viewMode === 'calendar' ? (
              sessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No upcoming sessions</p>
                  <p className="text-xs">Check back later for new sessions</p>
                </div>
              ) : (
                <CalendarSessionView 
                  sessions={calendarSessions}
                  onViewDetails={handleViewDetails}
                  onRegister={handleRegister}
                />
              )
            ) : (
              sessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No upcoming sessions</p>
                  <p className="text-xs">Check back later for new sessions</p>
                </div>
              ) : (
                <div className="space-y-3 h-full overflow-y-auto pr-2">
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedSession({
                                ...session,
                                requirements: ['Suitable for all fitness levels', 'Bring water bottle'],
                                equipment_needed: ['Yoga mat provided', 'Comfortable clothing'],
                                benefits: ['Improved flexibility', 'Stress reduction', 'Better posture'],
                                trainer_bio: session.assigned_trainer_name ? 'Certified trainer with 5+ years experience' : undefined,
                                trainer_rating: 4.8,
                                cancellation_policy: 'Free cancellation up to 2 hours before the session'
                              });
                              setDetailsOpen(true);
                            }}
                          >
                            <Info className="h-4 w-4 mr-1" />
                            Details
                          </Button>
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
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <SessionDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        session={selectedSession}
        onBookSession={async (sessionId) => {
          await handleBookSession(sessionId, selectedSession?.title || '');
          setDetailsOpen(false);
        }}
        onCancelBooking={async (sessionId) => {
          await handleCancelBooking(sessionId, selectedSession?.title || '');
          setDetailsOpen(false);
        }}
      />
    </>
  );
}