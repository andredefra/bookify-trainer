import { TrainerSessionItem } from "@/types/sessions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Users, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { VideoSessionDialog } from "./VideoSessionDialog";
import { SessionParticipantsDialog } from "./SessionParticipantsDialog";
import { InviteLinkButton } from "./InviteLinkButton";
import { SessionDetailsDialog } from "./SessionDetailsDialog";
import { DayEventsDialog } from "./DayEventsDialog";

interface CalendarViewProps {
  sessions: TrainerSessionItem[];
  onEditSession: (session: TrainerSessionItem) => void;
  onCancelSession: (session: TrainerSessionItem) => void;
  onStartVideoSession?: (session: TrainerSessionItem) => void;
}

type ViewMode = 'month' | 'week' | 'day';

export function CalendarView({ 
  sessions, 
  onEditSession, 
  onCancelSession,
  onStartVideoSession
}: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDayEventsDialog, setShowDayEventsDialog] = useState(false);
  const [selectedVideoSession, setSelectedVideoSession] = useState<TrainerSessionItem | null>(null);
  const [selectedParticipantsSession, setSelectedParticipantsSession] = useState<TrainerSessionItem | null>(null);
  const [selectedDetailsSession, setSelectedDetailsSession] = useState<TrainerSessionItem | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<{ date: Date; sessions: TrainerSessionItem[] } | null>(null);

  const today = new Date();

  // Helper functions
  const goToToday = () => setCurrentDate(new Date());
  
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getSessionTypeColor = (session: TrainerSessionItem) => {
    if (session.mode === 'video') {
      return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
    }
    if (session.maxParticipants > 1) {
      return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
  };

  const getSessionsForDay = (day: Date): TrainerSessionItem[] => {
    const dayStr = day.toDateString();
    return sessions.filter(session => {
      const sessionDate = typeof session.date === 'string' ? new Date(session.date) : session.date;
      return sessionDate.toDateString() === dayStr;
    });
  };

  const isToday = (day: Date) => day.toDateString() === today.toDateString();
  const isCurrentMonth = (day: Date) => day.getMonth() === currentDate.getMonth();

  const handleStartVideo = (session: TrainerSessionItem) => {
    setSelectedVideoSession(session);
    setShowVideoDialog(true);
    if (onStartVideoSession) {
      onStartVideoSession(session);
    }
  };

  const handleViewParticipants = (session: TrainerSessionItem) => {
    setSelectedParticipantsSession(session);
    setShowParticipantsDialog(true);
  };

  const handleSessionClick = (session: TrainerSessionItem) => {
    setSelectedDetailsSession(session);
    setShowDetailsDialog(true);
  };

  const handleMoreEventsClick = (day: Date, daySessions: TrainerSessionItem[]) => {
    setSelectedDayEvents({ date: day, sessions: daySessions });
    setShowDayEventsDialog(true);
  };

  // Generate calendar days for month view
  const getMonthDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  // Generate week days
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Time slots for day/week view
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 6; // 6:00 AM to 10:00 PM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Get sessions at specific time
  const getSessionsAtTime = (day: Date, timeSlot: string) => {
    return getSessionsForDay(day).filter(session => {
      const sessionTime = session.time.split(' - ')[0];
      return sessionTime.startsWith(timeSlot.slice(0, 2));
    });
  };

  // Header content based on view mode
  const getHeaderText = () => {
    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (viewMode === 'week') {
      const weekDays = getWeekDays();
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Navigation & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h3 className="text-base sm:text-lg font-semibold ml-2">{getHeaderText()}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
          >
            Week
          </Button>
          <Button
            variant={viewMode === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('day')}
          >
            Day
          </Button>
        </div>
      </div>

      {/* Month View */}
      {viewMode === 'month' && (
        <div className="border rounded-lg overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-muted/30">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs sm:text-sm font-medium p-2 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {getMonthDays().map((day, index) => {
              const daySessions = getSessionsForDay(day);
              const visibleSessions = daySessions.slice(0, 2);
              const moreCount = daySessions.length - 2;
              
              return (
                <div
                  key={index}
                  className={`min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 border-r border-b last:border-r-0 ${
                    isCurrentMonth(day) ? 'bg-background' : 'bg-muted/10'
                  } ${isToday(day) ? 'ring-2 ring-primary ring-inset' : ''}`}
                >
                  <div className={`text-xs sm:text-sm font-medium mb-1 ${
                    isToday(day) ? 'text-primary font-bold' : isCurrentMonth(day) ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {visibleSessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => handleSessionClick(session)}
                        className={`text-[10px] sm:text-xs p-1 rounded border cursor-pointer transition-colors ${getSessionTypeColor(session)}`}
                      >
                        <div className="font-medium truncate flex items-center gap-1">
                          {session.mode === 'video' && <Video className="h-3 w-3 hidden sm:inline" />}
                          {session.name}
                        </div>
                        <div className="text-[9px] sm:text-[10px] opacity-80 hidden sm:block">
                          {session.time.split(' - ')[0]}
                        </div>
                      </div>
                    ))}
                    
                    {moreCount > 0 && (
                      <button
                        onClick={() => handleMoreEventsClick(day, daySessions)}
                        className="text-[10px] sm:text-xs text-primary hover:text-primary/80 font-medium w-full text-left"
                      >
                        +{moreCount} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="border rounded-lg overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Day headers */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] bg-muted/30">
              <div className="border-r p-2 text-xs font-medium">Time</div>
              {getWeekDays().map((day, index) => (
                <div key={index} className={`text-center p-2 border-r last:border-r-0 ${isToday(day) ? 'bg-primary/10' : ''}`}>
                  <div className="text-xs font-medium">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-bold ${isToday(day) ? 'text-primary' : ''}`}>
                    {day.getDate()}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Time slots */}
            {timeSlots.map((time, timeIndex) => (
              <div key={timeIndex} className="grid grid-cols-[80px_repeat(7,1fr)] border-t">
                <div className="border-r p-2 text-xs text-muted-foreground">{time}</div>
                {getWeekDays().map((day, dayIndex) => {
                  const sessionsAtTime = getSessionsAtTime(day, time);
                  return (
                    <div key={dayIndex} className={`border-r last:border-r-0 p-1 min-h-[60px] ${isToday(day) ? 'bg-primary/5' : ''}`}>
                      {sessionsAtTime.map((session) => (
                        <div
                          key={session.id}
                          onClick={() => handleSessionClick(session)}
                          className={`text-xs p-1.5 rounded border mb-1 cursor-pointer ${getSessionTypeColor(session)}`}
                        >
                          <div className="font-medium truncate">{session.name}</div>
                          <div className="text-[10px] opacity-80">{session.time}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day View */}
      {viewMode === 'day' && (
        <div className="space-y-2">
          {timeSlots.map((time) => {
            const sessionsAtTime = getSessionsAtTime(currentDate, time);
            return (
              <div key={time} className="flex gap-4 border rounded-lg p-3 min-h-[60px]">
                <div className="w-20 text-sm font-medium text-muted-foreground">{time}</div>
                <div className="flex-1 space-y-2">
                  {sessionsAtTime.length > 0 ? (
                    sessionsAtTime.map((session) => (
                      <div
                        key={session.id}
                        className={`p-3 rounded-lg border ${getSessionTypeColor(session)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold flex items-center gap-2">
                              {session.mode === 'video' && <Video className="h-4 w-4" />}
                              {session.name}
                            </h4>
                            <p className="text-sm opacity-80">{session.time}</p>
                          </div>
                          <Badge variant="outline" className="bg-background">
                            {session.participants}/{session.maxParticipants}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <InviteLinkButton session={session} />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewParticipants(session)}
                          >
                            <Users className="h-4 w-4 mr-1" /> Participants
                          </Button>
                          {session.mode === 'video' && session.status === 'scheduled' && onStartVideoSession ? (
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => handleStartVideo(session)}
                            >
                              <Video className="h-4 w-4 mr-1" /> Start Video
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onEditSession(session)}
                            >
                              Edit
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onCancelSession(session)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground italic">No sessions scheduled</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state for all views */}
      {sessions.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 bg-muted/20 rounded-lg border border-dashed">
          <CalendarIcon className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No sessions scheduled</p>
        </div>
      )}

      {/* Dialogs */}
      <VideoSessionDialog 
        open={showVideoDialog} 
        onOpenChange={setShowVideoDialog} 
        session={selectedVideoSession} 
      />

      <SessionParticipantsDialog 
        open={showParticipantsDialog} 
        onOpenChange={setShowParticipantsDialog} 
        session={selectedParticipantsSession} 
      />

      <SessionDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        session={selectedDetailsSession}
        onEdit={onEditSession}
        onCancel={onCancelSession}
        onStartVideo={onStartVideoSession ? handleStartVideo : undefined}
        onViewParticipants={handleViewParticipants}
      />

      <DayEventsDialog
        open={showDayEventsDialog}
        onOpenChange={setShowDayEventsDialog}
        date={selectedDayEvents?.date || new Date()}
        sessions={selectedDayEvents?.sessions || []}
        onSessionClick={handleSessionClick}
      />
    </div>
  );
}
