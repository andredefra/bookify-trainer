import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { usePackageSessionBookings } from '@/hooks/usePackageSessionBookings';
import { ClientProposeSessionDialog } from './ClientProposeSessionDialog';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { PackageSessionBooking } from '@/types/packageSessions';

interface ClientPackageSessionsTabProps {
  packageAssignmentId: string;
  trainerId: string;
  totalSessions: number;
}

export const ClientPackageSessionsTab = ({
  packageAssignmentId,
  trainerId,
  totalSessions,
}: ClientPackageSessionsTabProps) => {
  const [clientId, setClientId] = useState<string>('');
  const [proposeDialogOpen, setProposeDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<PackageSessionBooking | null>(null);
  
  const { 
    sessions, 
    loading, 
    initializePackageSessions, 
    proposeSession,
    confirmSession,
    cancelSession
  } = usePackageSessionBookings(packageAssignmentId);

  useEffect(() => {
    const getClientId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // Use actual user ID, or fall back to demo client ID for demo mode
      setClientId(user?.id || '00000000-0000-0000-0000-000000000002');
    };
    getClientId();
  }, []);

  useEffect(() => {
    if (clientId && sessions.length === 0 && !loading) {
      initializePackageSessions(packageAssignmentId, trainerId, clientId, totalSessions);
    }
  }, [clientId, sessions.length, loading, packageAssignmentId, trainerId, totalSessions]);

  const handleProposeTime = (session: PackageSessionBooking) => {
    setSelectedSession(session);
    setProposeDialogOpen(true);
  };

  const handleConfirm = async (sessionId: string) => {
    await confirmSession(sessionId, true);
  };

  const handleDecline = async (sessionId: string) => {
    await cancelSession(sessionId);
  };

  const getStatusBadge = (session: PackageSessionBooking) => {
    switch (session.status) {
      case 'available':
        return <Badge variant="outline">Available</Badge>;
      case 'proposed':
        return session.proposedBy === 'client' ? (
          <Badge className="bg-yellow-100 text-yellow-800">Waiting Confirmation</Badge>
        ) : (
          <Badge className="bg-blue-100 text-blue-800">Trainer Proposed</Badge>
        );
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{session.status}</Badge>;
    }
  };

  if (loading && sessions.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold">Session #{session.sessionNumber}</h4>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge(session)}
                {session.sessionType && (
                  <Badge variant="secondary" className="text-xs">
                    {session.sessionType === 'in-person' ? 'In-Person' : 'Video'}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {session.proposedDatetime && (
            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(session.proposedDatetime), 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{format(new Date(session.proposedDatetime), 'p')} ({session.durationMinutes} min)</span>
              </div>
              {session.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{session.location}</span>
                </div>
              )}
              {session.notes && (
                <p className="text-muted-foreground mt-2">{session.notes}</p>
              )}
            </div>
          )}

          <div className="flex gap-2">
            {session.status === 'available' && (
              <Button 
                size="sm" 
                onClick={() => handleProposeTime(session)}
              >
                Propose Time
              </Button>
            )}

            {session.status === 'proposed' && session.proposedBy === 'trainer' && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => handleConfirm(session.id)}
                  className="gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDecline(session.id)}
                  className="gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  Decline
                </Button>
              </>
            )}

            {session.status === 'proposed' && session.proposedBy === 'client' && (
              <p className="text-sm text-muted-foreground">
                Waiting for trainer to confirm your proposed time
              </p>
            )}

            {session.status === 'confirmed' && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>Session confirmed</span>
              </div>
            )}

            {session.status === 'completed' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <span>Session completed</span>
              </div>
            )}
          </div>
        </Card>
      ))}

      <ClientProposeSessionDialog
        open={proposeDialogOpen}
        onOpenChange={setProposeDialogOpen}
        session={selectedSession}
        onPropose={proposeSession}
      />
    </div>
  );
};