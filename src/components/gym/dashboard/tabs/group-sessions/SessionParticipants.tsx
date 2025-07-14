import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, UserCheck, UserX, Package, Clock } from 'lucide-react';
import { useSessionBooking } from '@/hooks/gym/useSessionBooking';

interface SessionParticipantsProps {
  sessionScheduleId: string;
  sessionTitle: string;
  maxParticipants: number;
}

export function SessionParticipants({
  sessionScheduleId,
  sessionTitle,
  maxParticipants
}: SessionParticipantsProps) {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { getSessionParticipants, checkIn, checkOut, cancelBooking } = useSessionBooking();

  const loadParticipants = async () => {
    setLoading(true);
    const data = await getSessionParticipants(sessionScheduleId);
    setParticipants(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadParticipants();
  }, [sessionScheduleId]);

  const handleCheckIn = async (participantId: string) => {
    const success = await checkIn(participantId, sessionScheduleId);
    if (success) await loadParticipants();
  };

  const handleCheckOut = async (participantId: string) => {
    const success = await checkOut(participantId, sessionScheduleId);
    if (success) await loadParticipants();
  };

  const handleCancelBooking = async (participantId: string) => {
    const success = await cancelBooking(participantId, sessionScheduleId);
    if (success) await loadParticipants();
  };

  const getStatusColor = (status: string) => {
    const colors = {
      registered: 'bg-blue-100 text-blue-800',
      checked_in: 'bg-green-100 text-green-800',
      checked_out: 'bg-gray-100 text-gray-800',
      no_show: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked_in':
        return <UserCheck className="w-4 h-4" />;
      case 'checked_out':
        return <UserX className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading participants...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Session Participants
          </span>
          <Badge variant="outline">
            {participants.length}/{maxParticipants} registered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {participants.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No participants registered yet</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        Client {participant.participant_id.slice(0, 8)}...
                      </span>
                      <Badge className={getStatusColor(participant.attendance_status)}>
                        {getStatusIcon(participant.attendance_status)}
                        {participant.attendance_status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    {participant.package_assignment && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="w-3 h-3" />
                        <span>
                          {participant.package_assignment.package?.title || 'Unknown Package'}
                        </span>
                        {participant.package_assignment.sessions_total && (
                          <Badge variant="secondary" className="text-xs">
                            {participant.package_assignment.sessions_used + 1}/
                            {participant.package_assignment.sessions_total} sessions
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Registered: {new Date(participant.registered_at).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {participant.attendance_status === 'registered' && (
                      <Button
                        size="sm"
                        onClick={() => handleCheckIn(participant.participant_id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Check In
                      </Button>
                    )}
                    
                    {participant.attendance_status === 'checked_in' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCheckOut(participant.participant_id)}
                      >
                        Check Out
                      </Button>
                    )}
                    
                    {participant.attendance_status === 'registered' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancelBooking(participant.participant_id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}