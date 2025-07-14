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
import { useLanguage } from "@/context/LanguageContext";

interface SessionsListProps {
  sessions: SessionWithSchedules[];
  onUpdateSession: (sessionId: string, updates: any) => void;
  onScheduleSession: (sessionId: string, startDateTime: string, endDateTime: string, trainerId?: string) => void;
  onAssignTrainer?: (sessionId: string, trainerId: string, compensationAmount?: number, compensationType?: string) => void;
  onCancelSession?: (sessionId: string, scheduleId: string, reason: string) => void;
}

export function SessionsList({ sessions, onUpdateSession, onScheduleSession, onAssignTrainer, onCancelSession }: SessionsListProps) {
  const { t } = useLanguage();
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showParticipants, setShowParticipants] = useState<string | null>(null);
  const [selectedSessionForTrainer, setSelectedSessionForTrainer] = useState<SessionWithSchedules | null>(null);
  const [showAssignTrainerDialog, setShowAssignTrainerDialog] = useState(false);
  const [selectedSessionForCancel, setSelectedSessionForCancel] = useState<SessionWithSchedules | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
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
    return t(`groupSessions.status.${status}`) || status;
  };

  const getDifficultyText = (level: string) => {
    return t(`groupSessions.difficulty.${level}`) || level;
  };


  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold text-foreground">{t('groupSessions.noSessions')}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('groupSessions.noSessionsDesc')}
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
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        {t('groupSessions.viewDetails')}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CalendarPlus className="h-4 w-4 mr-2" />
                        {t('groupSessions.scheduleSession')}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        {t('groupSessions.editSession')}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => {
                          setSelectedSessionForCancel(session);
                          setShowCancelDialog(true);
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        {t('groupSessions.cancelSession')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              
              {!isMobile && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-50 bg-background border shadow-lg backdrop-blur-sm">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      {t('groupSessions.viewDetails')}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CalendarPlus className="h-4 w-4 mr-2" />
                      {t('groupSessions.scheduleSession')}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      {t('groupSessions.editSession')}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => {
                        setSelectedSessionForCancel(session);
                        setShowCancelDialog(true);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      {t('groupSessions.cancelSession')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{session.max_participants} {t('groupSessions.max')}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{session.duration_minutes} {t('groupSessions.min')}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 text-xs font-medium">{t('groupSessions.includedInPackage')}</span>
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
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{session.upcoming_count} {t('groupSessions.upcoming')}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{session.total_participants} {t('groupSessions.participants')}</span>
                  </span>
                  {!isMobile && (
                    <Badge variant="outline" className="text-xs">
                      {formatSessionType(session.session_type)}
                    </Badge>
                  )}
                </div>
                
                <div className={`flex ${isMobile ? "flex-col space-y-2" : isTablet ? "flex-wrap gap-2" : "space-x-2"}`}>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "sm"}
                    onClick={() => {
                      setSelectedSessionForTrainer(session);
                      setShowAssignTrainerDialog(true);
                    }}
                    className={isMobile ? "w-full justify-start" : isTablet ? "flex-1 min-w-[100px]" : ""}
                  >
                    <UserCog className="h-4 w-4 mr-1" />
                    <span className={isTablet ? "text-xs truncate" : ""}>
                      {t('groupSessions.assignTrainer')}
                    </span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "sm"}
                    onClick={() => {
                      // For demo, create a mock schedule to book against
                      const mockSchedule = {
                        id: `${session.id}-schedule-1`,
                        start_datetime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                        end_datetime: new Date(Date.now() + 24 * 60 * 60 * 1000 + session.duration_minutes * 60 * 1000).toISOString(),
                        gym_group_session_id: session.id,
                        session: session
                      };
                      setSelectedSchedule(mockSchedule);
                      setShowBookingDialog(true);
                    }}
                    className={isMobile ? "w-full justify-start" : isTablet ? "flex-1 min-w-[100px]" : ""}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    <span className={isTablet ? "text-xs truncate" : ""}>
                      {isMobile ? t('groupSessions.bookParticipant') : isTablet ? 'Book' : t('groupSessions.bookParticipant')}
                    </span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "default" : "sm"}
                    onClick={() => setShowParticipants(showParticipants === session.id ? null : session.id)}
                    className={isMobile ? "w-full justify-start" : isTablet ? "flex-1 min-w-[100px]" : ""}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    <span className={isTablet ? "text-xs truncate" : ""}>
                      {showParticipants === session.id ? 
                        (isMobile ? t('groupSessions.hideParticipants') : isTablet ? 'Hide' : t('groupSessions.hideParticipants')) : 
                        (isMobile ? t('groupSessions.showParticipants') : isTablet ? 'Show' : t('groupSessions.showParticipants'))
                      }
                    </span>
                  </Button>
                </div>
              </div>

              {session.requirements && (
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  <strong>{t('groupSessions.requirements')}:</strong> 
                  <span className="line-clamp-2">{session.requirements}</span>
                </div>
              )}

              {session.equipment_needed && (
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  <strong>{t('groupSessions.equipment')}:</strong> 
                  <span className="line-clamp-2">{session.equipment_needed}</span>
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
    </div>
  );
}