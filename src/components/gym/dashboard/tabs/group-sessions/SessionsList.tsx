import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Users, MapPin, MoreHorizontal, Edit, Trash, CalendarPlus, Eye, UserPlus, UserCog } from "lucide-react";
import { SessionWithSchedules } from "@/hooks/gym/useGymGroupSessions";
import { SessionBookingDialog } from "./SessionBookingDialog";
import { SessionParticipants } from "./SessionParticipants";
import { AssignTrainerDialog } from "./AssignTrainerDialog";

interface SessionsListProps {
  sessions: SessionWithSchedules[];
  onUpdateSession: (sessionId: string, updates: any) => void;
  onScheduleSession: (sessionId: string, startDateTime: string, endDateTime: string, trainerId?: string) => void;
  onAssignTrainer?: (sessionId: string, trainerId: string, compensationAmount?: number, compensationType?: string) => void;
}

export function SessionsList({ sessions, onUpdateSession, onScheduleSession, onAssignTrainer }: SessionsListProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showParticipants, setShowParticipants] = useState<string | null>(null);
  const [selectedSessionForTrainer, setSelectedSessionForTrainer] = useState<SessionWithSchedules | null>(null);
  const [showAssignTrainerDialog, setShowAssignTrainerDialog] = useState(false);
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

  const formatSessionType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No sessions found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by creating your first group session.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle className="text-lg">{session.title}</CardTitle>
                <Badge className={getStatusColor(session.status)}>
                  {session.status}
                </Badge>
                <Badge className={getDifficultyColor(session.difficulty_level)}>
                  {session.difficulty_level}
                </Badge>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Schedule Session
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Session
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Session
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {session.description && (
                <p className="text-sm text-muted-foreground">{session.description}</p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{session.max_participants} max</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{session.duration_minutes} min</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 text-xs font-medium">Included in package</span>
                </div>
                
                {session.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{session.location}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{session.upcoming_count} upcoming</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{session.total_participants} participants</span>
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {formatSessionType(session.session_type)}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedSessionForTrainer(session);
                      setShowAssignTrainerDialog(true);
                    }}
                  >
                    <UserCog className="h-4 w-4 mr-1" />
                    Assign Trainer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
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
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Book Participant
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowParticipants(showParticipants === session.id ? null : session.id)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    {showParticipants === session.id ? 'Hide' : 'Show'} Participants
                  </Button>
                </div>
              </div>

              {session.requirements && (
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  <strong>Requirements:</strong> {session.requirements}
                </div>
              )}

              {session.equipment_needed && (
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  <strong>Equipment:</strong> {session.equipment_needed}
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
    </div>
  );
}