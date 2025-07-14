import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Users, MapPin, MoreHorizontal, Edit, Trash, CalendarPlus, Eye, UserPlus } from "lucide-react";
import { SessionWithSchedules } from "@/hooks/gym/useGymGroupSessions";
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'scheduled': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'completed': return 'outline';
      default: return 'outline';
    }
  };

  const getDifficultyVariant = (level: string) => {
    switch (level) {
      case 'beginner': return 'secondary';
      case 'intermediate': return 'default';
      case 'advanced': return 'destructive';
      case 'all_levels': return 'outline';
      default: return 'outline';
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-16 w-16 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold">No sessions available</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Create your first group session to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="overflow-hidden">
          {/* Header - Simplified */}
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg truncate mb-2">{session.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={getStatusVariant(session.status)}>
                    {session.status}
                  </Badge>
                  <Badge variant={getDifficultyVariant(session.difficulty_level)}>
                    {session.difficulty_level}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {formatSessionType(session.session_type)}
                  </Badge>
                </div>
              </div>
              
              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setShowParticipants(showParticipants === session.id ? null : session.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    {showParticipants === session.id ? 'Hide Details' : 'View Details'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setSelectedSessionForSchedule(session);
                    setShowScheduleDialog(true);
                  }}>
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Schedule Session
                  </DropdownMenuItem>
                  {onAssignTrainer && (
                    <DropdownMenuItem onClick={() => {
                      setSelectedSessionForTrainer(session);
                      setShowAssignTrainerDialog(true);
                    }}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Assign Trainer
                    </DropdownMenuItem>
                  )}
                  {session.upcoming_count > 0 && (
                    <DropdownMenuItem onClick={() => {
                      setSelectedSchedule(session.schedules?.[0]);
                      setShowBookingDialog(true);
                    }}>
                      <Users className="mr-2 h-4 w-4" />
                      Book Participant
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => onUpdateSession(session.id, { editing: true })}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Session
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      setSelectedSessionForCancel(session);
                      setShowCancelDialog(true);
                    }}
                    className="text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Cancel Session
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Description */}
            {session.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {session.description}
              </p>
            )}
            
            {/* Key Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{session.max_participants} max</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{session.duration_minutes} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{session.upcoming_count} upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{session.total_participants} enrolled</span>
              </div>
            </div>

            {/* Location */}
            {session.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{session.location}</span>
              </div>
            )}

            {/* Package Info */}
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm font-medium text-emerald-600">Included in Package</span>
              <Badge variant="outline" className="text-xs">
                Free for Members
              </Badge>
            </div>

            {/* Requirements - Only show when expanded */}
            {showParticipants === session.id && (
              <div className="space-y-3 pt-3 border-t">
                {session.requirements && (
                  <div>
                    <p className="text-sm font-medium mb-1">Requirements:</p>
                    <p className="text-sm text-muted-foreground">{session.requirements}</p>
                  </div>
                )}
                {session.equipment_needed && (
                  <div>
                    <p className="text-sm font-medium mb-1">Equipment:</p>
                    <p className="text-sm text-muted-foreground">{session.equipment_needed}</p>
                  </div>
                )}
                
                {/* Participants Component */}
                <div className="mt-4">
                  <SessionParticipants
                    sessionScheduleId={`${session.id}-schedule-1`}
                    sessionTitle={session.title}
                    maxParticipants={session.max_participants}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {/* Dialogs */}
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