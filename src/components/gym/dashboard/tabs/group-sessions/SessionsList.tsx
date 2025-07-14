import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Users, MapPin, MoreHorizontal, Edit, Trash, CalendarPlus, Eye, UserPlus, UserCog, X } from "lucide-react";
import { SessionWithSchedules } from "@/hooks/gym/useGymGroupSessions";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { formatSessionType } from "@/constants/sessionTypes";
import { SessionBookingDialog } from "./SessionBookingDialog";
import { SessionParticipants } from "./SessionParticipants";
import { AssignTrainerDialog } from "./AssignTrainerDialog";
import { CancelSessionDialog } from "./CancelSessionDialog";
import { ScheduleSessionDialog } from "./ScheduleSessionDialog";

interface SessionsListProps {
  sessions: SessionWithSchedules[];
  onUpdateSession: (sessionId: string, updates: any) => void;
  onScheduleSession: (
    sessionId: string,
    startDateTime: string,
    endDateTime: string,
    trainerId?: string,
    cancellationPolicy?: {
      free_cancellation_hours?: number;
      reduced_fee_hours?: number;
      reduced_fee_percentage?: number;
      full_fee_percentage?: number;
    }
  ) => void;
  onAssignTrainer?: (sessionId: string, trainerId: string, compensationAmount?: number, compensationType?: string) => void;
  onCancelSession?: (sessionId: string, scheduleId: string, reason: string) => void;
}

export function SessionsList({ sessions, onUpdateSession, onScheduleSession, onAssignTrainer, onCancelSession }: SessionsListProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showParticipants, setShowParticipants] = useState<string | null>(null);
  const [selectedSessionForTrainer, setSelectedSessionForTrainer] = useState<SessionWithSchedules | null>(null);
  const [showAssignTrainerDialog, setShowAssignTrainerDialog] = useState(false);
  const [selectedSessionForCancel, setSelectedSessionForCancel] = useState<SessionWithSchedules | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedSessionForSchedule, setSelectedSessionForSchedule] = useState<SessionWithSchedules | null>(null);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  
  const { isMobile, isTablet } = useResponsiveLayout();
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'all_levels': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getDifficultyText = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-16 w-16 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold text-foreground">No sessions available</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Create your first group session to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className={`flex items-center justify-between ${isMobile ? "flex-col space-y-2" : ""}`}>
              <div className={`flex items-center ${isMobile ? "w-full justify-between" : "space-x-3"}`}>
                <CardTitle className={`${isMobile ? "text-base" : "text-lg"} truncate flex-1`}>
                  {session.title}
                </CardTitle>
                {!isMobile && (
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(session.status)}>
                      {getStatusText(session.status)}
                    </Badge>
                    <Badge className={getDifficultyColor(session.difficulty_level)}>
                      {getDifficultyText(session.difficulty_level)}
                    </Badge>
                  </div>
                )}
              </div>
              
              {isMobile && (
                <div className="flex items-center space-x-2 w-full justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(session.status)} variant="outline">
                      {getStatusText(session.status)}
                    </Badge>
                    <Badge className={getDifficultyColor(session.difficulty_level)} variant="outline">
                      {getDifficultyText(session.difficulty_level)}
                    </Badge>
                  </div>
              
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-50 bg-background border shadow-lg backdrop-blur-sm">
                      <DropdownMenuItem onClick={() => setShowParticipants(showParticipants === session.id ? null : session.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedSessionForSchedule(session);
                        setShowScheduleDialog(true);
                      }}>
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Schedule Session
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateSession(session.id, { editing: true })}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Session
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          setSelectedSessionForCancel(session);
                          setShowCancelDialog(true);
                        }}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Cancel Session
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              
              {!isMobile && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowParticipants(showParticipants === session.id ? null : session.id)}
                      className="mr-2"
                    >
                      <Eye className="h-4 w-4" />
                      {isMobile ? "" : "View Details"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSessionForSchedule(session);
                        setShowScheduleDialog(true);
                      }}
                      className="mr-2"
                    >
                      <CalendarPlus className="h-4 w-4" />
                      {isMobile ? "" : "Schedule Session"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateSession(session.id, { editing: true })}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                      {isMobile ? "" : "Edit Session"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSessionForCancel(session);
                        setShowCancelDialog(true);
                      }}
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                      {isMobile ? "" : "Cancel Session"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {session.description && (
                <p className={`text-sm text-muted-foreground ${isMobile ? "line-clamp-2" : "line-clamp-3"}`}>
                  {session.description}
                </p>
              )}
              
              <div className={`grid gap-4 text-sm ${
                isMobile 
                  ? "grid-cols-1" 
                  : isTablet 
                    ? "grid-cols-2" 
                    : "grid-cols-2 md:grid-cols-4"
              }`}>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{session.max_participants} max</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{session.duration_minutes} min</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 text-xs font-medium">Included in Package</span>
                </div>
                
                {session.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{session.location}</span>
                  </div>
                )}
              </div>

              <div className={`${isMobile ? "space-y-3" : "flex items-center justify-between"} pt-3 border-t`}>
                <div className={`flex items-center ${isMobile ? "justify-between" : "space-x-4"} text-sm text-muted-foreground`}>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{session.upcoming_count} upcoming</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{session.total_participants} participants</span>
                  </div>
                  {!isMobile && (
                    <Badge variant="outline" className="text-xs">
                      {formatSessionType(session.session_type)}
                    </Badge>
                  )}
                </div>
                
                <div className={`flex ${isMobile ? "flex-col space-y-2" : isTablet ? "flex-wrap gap-2" : "space-x-2"}`}>
                  {onAssignTrainer && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSessionForTrainer(session);
                        setShowAssignTrainerDialog(true);
                      }}
                      className="mr-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      {isMobile ? "" : "Assign Trainer"}
                    </Button>
                  )}
                  
                  {session.upcoming_count > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSchedule(session.schedules?.[0]);
                        setShowBookingDialog(true);
                      }}
                      className="mr-2"
                    >
                      <UserCog className="h-4 w-4" />
                      {isMobile ? "Book Participant" : isTablet ? 'Book' : "Book Participant"}
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowParticipants(showParticipants === session.id ? null : session.id)}
                    className="mr-2"
                  >
                    <Eye className="h-4 w-4" />
                    {showParticipants === session.id ? 
                      (isMobile ? "Hide Participants" : isTablet ? 'Hide' : "Hide Participants") : 
                      (isMobile ? "Show Participants" : isTablet ? 'Show' : "Show Participants")
                    }
                  </Button>
                </div>
              </div>

              {session.requirements && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Requirements:</strong> 
                    {session.requirements || "None"}
                  </p>
                  {session.equipment_needed && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Equipment:</strong> 
                      {session.equipment_needed}
                    </p>
                  )}
                </div>
              )}
              
              {/* Show participants if expanded */}
              {showParticipants === session.id && (
                <div className="mt-4">
                  <SessionParticipants
                    sessionScheduleId={`${session.id}-schedule-1`}
                    sessionTitle={session.title}
                    maxParticipants={session.max_participants}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <SessionBookingDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        sessionSchedule={selectedSchedule}
      />
      
      <AssignTrainerDialog
        open={showAssignTrainerDialog}
        onOpenChange={setShowAssignTrainerDialog}
        sessionTitle={selectedSessionForTrainer?.title || ""}
        onAssignTrainer={async (trainerId, compensationAmount, compensationType) => {
          if (selectedSessionForTrainer && onAssignTrainer) {
            await onAssignTrainer(selectedSessionForTrainer.id, trainerId, compensationAmount, compensationType);
          }
        }}
      />
      
      <CancelSessionDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        sessionTitle={selectedSessionForCancel?.title || ""}
        scheduleId={`${selectedSessionForCancel?.id || ""}-schedule-1`}
        scheduledDate={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}
        participantCount={selectedSessionForCancel?.total_participants || 0}
        onCancelSession={async (scheduleId, reason) => {
          if (selectedSessionForCancel && onCancelSession) {
            await onCancelSession(selectedSessionForCancel.id, scheduleId, reason);
          }
        }}
      />
      
      <ScheduleSessionDialog
        open={showScheduleDialog}
        onOpenChange={setShowScheduleDialog}
        sessionTitle={selectedSessionForSchedule?.title || ""}
        sessionId={selectedSessionForSchedule?.id || ""}
        onScheduleSession={onScheduleSession}
      />
    </div>
  );
}