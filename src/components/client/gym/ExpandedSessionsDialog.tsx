import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Info, CalendarDays, List } from "lucide-react";
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
        <DialogContent className="max-w-7xl h-[85vh] flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 p-6 pb-3 border-b">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Session Explorer</h2>
                  <p className="text-sm text-muted-foreground">Browse and book available sessions</p>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center bg-muted/50 rounded-full p-1 shadow-sm">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('list')}
                  className="h-9 px-4 rounded-full transition-all"
                >
                  <List className="h-4 w-4 mr-2" />
                  List View
                </Button>
                <Button 
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('calendar')}
                  className="h-9 px-4 rounded-full transition-all"
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Loading sessions...</p>
                </div>
              </div>
            ) : viewMode === 'calendar' ? (
              sessions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-4 bg-muted/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-8 w-8 opacity-50" />
                  </div>
                  <h3 className="font-medium mb-1">No sessions available</h3>
                  <p className="text-sm">Check back later for new sessions</p>
                </div>
              ) : (
                <div className="h-full p-6">
                  <CalendarSessionView 
                    sessions={calendarSessions}
                    onViewDetails={handleViewDetails}
                    onRegister={handleRegister}
                  />
                </div>
              )
            ) : (
              sessions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-4 bg-muted/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-8 w-8 opacity-50" />
                  </div>
                  <h3 className="font-medium mb-1">No sessions available</h3>
                  <p className="text-sm">Check back later for new sessions</p>
                </div>
              ) : (
                <div className="p-6 h-full overflow-hidden">
                  <div className="grid gap-3 h-full overflow-y-auto pr-2">
                    {sessions.map((session) => (
                      <div 
                        key={session.id} 
                        className={cn(
                          "group border rounded-xl p-4 transition-all hover:shadow-md",
                          session.is_booked 
                            ? "bg-primary/5 border-primary/30 shadow-sm" 
                            : "hover:border-primary/20"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-base truncate">{session.title}</h4>
                              <Badge 
                                variant="secondary" 
                                className={cn(
                                  "text-xs font-medium shrink-0",
                                  getDifficultyColor(session.difficulty_level)
                                )}
                              >
                                {session.difficulty_level}
                              </Badge>
                              {session.is_booked && (
                                <Badge className="bg-green-500/10 text-green-700 border-green-200 shrink-0">
                                  ✓ Booked
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {session.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-primary/70" />
                                <span className="font-medium">
                                  {format(new Date(session.start_datetime), 'MMM dd, HH:mm')}
                                </span>
                                <span className="text-xs">({session.duration_minutes}min)</span>
                              </div>
                              {session.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="h-4 w-4 text-primary/70" />
                                  <span>{session.location}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4 text-primary/70" />
                                <span className={cn(
                                  "font-medium",
                                  session.available_spots <= 3 && session.available_spots > 0 && "text-orange-600",
                                  session.available_spots === 0 && "text-red-600"
                                )}>
                                  {session.available_spots} spots left
                                </span>
                              </div>
                            </div>
                            
                            {session.assigned_trainer_name && (
                              <p className="text-sm text-muted-foreground mt-2 font-medium">
                                👨‍🏫 {session.assigned_trainer_name}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 text-xs"
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
                              <Info className="h-3.5 w-3.5 mr-1" />
                              Details
                            </Button>
                            {session.is_booked ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9 text-xs border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => handleCancelBooking(session.id, session.title)}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <Button 
                                size="sm"
                                className="h-9 text-xs"
                                disabled={session.available_spots === 0}
                                onClick={() => handleBookSession(session.id, session.title)}
                              >
                                {session.available_spots === 0 ? 'Full' : 'Book Session'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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