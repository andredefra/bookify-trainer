import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Users, MapPin, MoreHorizontal, Edit, Trash, CalendarPlus, Eye } from "lucide-react";
import { SessionWithSchedules } from "@/hooks/gym/useGymGroupSessions";

interface SessionsListProps {
  sessions: SessionWithSchedules[];
  onUpdateSession: (sessionId: string, updates: any) => void;
  onScheduleSession: (sessionId: string, startDateTime: string, endDateTime: string, trainerId?: string) => void;
}

export function SessionsList({ sessions, onUpdateSession, onScheduleSession }: SessionsListProps) {
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
                  <span className="text-muted-foreground">$</span>
                  <span>${session.price_per_participant}</span>
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
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}