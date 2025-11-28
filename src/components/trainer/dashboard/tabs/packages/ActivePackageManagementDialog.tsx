import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { usePackageSessionBookings } from '@/hooks/usePackageSessionBookings';
import { SessionStatusBadge } from './SessionStatusBadge';
import { BookSessionDialog } from './BookSessionDialog';
import { format } from 'date-fns';
import { Calendar, CheckCircle2, XCircle, Clock, UserX, CreditCard } from 'lucide-react';
import { PackageSessionBooking } from '@/types/packageSessions';
import { PackagePaymentsTab } from './PackagePaymentsTab';
import { usePackagePayments } from '@/hooks/usePackagePayments';

interface ActivePackageManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageAssignment: {
    id: string;
    clientId: string;
    clientName: string;
    packageTitle: string;
    sessionsTotal: number;
    sessionsUsed: number;
    status: string;
    purchaseDate: string;
    expiryDate?: string;
    totalPaid: number;
    trainerId: string;
  };
}

export const ActivePackageManagementDialog = ({
  open,
  onOpenChange,
  packageAssignment,
}: ActivePackageManagementDialogProps) => {
  const { sessions, loading, proposeSession, confirmSession, completeSession, cancelSession, markNoShow, initializePackageSessions } =
    usePackageSessionBookings(open ? packageAssignment.id : undefined);
  
  const { payments } = usePackagePayments(open ? packageAssignment.id : undefined);
  
  const [bookSessionOpen, setBookSessionOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<PackageSessionBooking | null>(null);

  // Auto-initialize sessions if none exist
  useEffect(() => {
    if (open && !loading && sessions.length === 0 && packageAssignment.sessionsTotal > 0) {
      initializePackageSessions(
        packageAssignment.id,
        packageAssignment.trainerId,
        packageAssignment.clientId,
        packageAssignment.sessionsTotal
      );
    }
  }, [open, loading, sessions.length, packageAssignment.sessionsTotal]);

  const handleBookSession = (session: PackageSessionBooking) => {
    setSelectedSession(session);
    setBookSessionOpen(true);
  };

  const handleProposeSession = async (
    sessionId: string,
    datetime: Date,
    sessionType: 'in-person' | 'video',
    location: string,
    notes: string,
    durationMinutes: number
  ) => {
    await proposeSession(sessionId, datetime, sessionType, location, notes, durationMinutes);
  };

  const getSessionActions = (session: PackageSessionBooking) => {
    switch (session.status) {
      case 'available':
        return (
          <Button size="sm" onClick={() => handleBookSession(session)}>
            Propose Session
          </Button>
        );
      case 'proposed':
        return (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => confirmSession(session.id)}>
              Confirm
            </Button>
            <Button size="sm" variant="outline" onClick={() => cancelSession(session.id)}>
              Cancel
            </Button>
          </div>
        );
      case 'confirmed':
        return (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => completeSession(session.id)}>
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Complete
            </Button>
            <Button size="sm" variant="outline" onClick={() => markNoShow(session.id)}>
              <UserX className="w-4 h-4 mr-1" />
              No-Show
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const getSessionDateTime = (session: PackageSessionBooking) => {
    if (session.completedDatetime) {
      return format(new Date(session.completedDatetime), 'PPp');
    }
    if (session.confirmedDatetime && session.proposedDatetime) {
      return format(new Date(session.proposedDatetime), 'PPp');
    }
    if (session.proposedDatetime) {
      return format(new Date(session.proposedDatetime), 'PPp');
    }
    return null;
  };

  const sessionStats = {
    completed: sessions.filter((s) => s.status === 'completed').length,
    confirmed: sessions.filter((s) => s.status === 'confirmed').length,
    proposed: sessions.filter((s) => s.status === 'proposed').length,
    available: sessions.filter((s) => s.status === 'available').length,
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Manage Package - {packageAssignment.clientName}</DialogTitle>
            <DialogDescription>{packageAssignment.packageTitle}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="sessions" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sessions">
                Sessions
                {sessionStats.proposed > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    {sessionStats.proposed}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="payments">
                Payments
                {payments.filter(p => p.paymentStatus === 'pending').length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-orange-100 text-orange-800 rounded-full">
                    {payments.filter(p => p.paymentStatus === 'pending').length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 overflow-auto">
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Package Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client:</span>
                      <p className="font-medium">{packageAssignment.clientName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p className="font-medium capitalize">{packageAssignment.status}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sessions:</span>
                      <p className="font-medium">
                        {packageAssignment.sessionsUsed} / {packageAssignment.sessionsTotal}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Paid:</span>
                      <p className="font-medium">€{packageAssignment.totalPaid}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Purchase Date:</span>
                      <p className="font-medium">
                        {format(new Date(packageAssignment.purchaseDate), 'PP')}
                      </p>
                    </div>
                    {packageAssignment.expiryDate && (
                      <div>
                        <span className="text-muted-foreground">Expiry Date:</span>
                        <p className="font-medium">
                          {format(new Date(packageAssignment.expiryDate), 'PP')}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Session Statistics</h3>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{sessionStats.completed}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{sessionStats.confirmed}</div>
                      <div className="text-xs text-muted-foreground">Scheduled</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{sessionStats.proposed}</div>
                      <div className="text-xs text-muted-foreground">Proposed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-600">{sessionStats.available}</div>
                      <div className="text-xs text-muted-foreground">Available</div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="flex-1 overflow-hidden">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {loading ? (
                    <p className="text-center text-muted-foreground py-8">Loading sessions...</p>
                  ) : sessions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No sessions found</p>
                  ) : (
                    sessions.map((session) => {
                      const dateTime = getSessionDateTime(session);
                      return (
                        <Card key={session.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold">Session #{session.sessionNumber}</span>
                                <SessionStatusBadge status={session.status} />
                                {session.sessionType === 'video' && (
                                  <span className="text-xs text-muted-foreground">🎥 Video</span>
                                )}
                              </div>
                              {dateTime && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                  <Calendar className="w-4 h-4" />
                                  {dateTime}
                                </div>
                              )}
                              {session.location && (
                                <div className="text-sm text-muted-foreground">📍 {session.location}</div>
                              )}
                              {session.notes && (
                                <div className="text-sm text-muted-foreground mt-2">{session.notes}</div>
                              )}
                              {session.status === 'proposed' && session.proposedBy && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Proposed by {session.proposedBy}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">{getSessionActions(session)}</div>
                          </div>
                        </Card>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="payments" className="flex-1 overflow-hidden">
              <PackagePaymentsTab 
                packageAssignmentId={packageAssignment.id} 
                clientName={packageAssignment.clientName}
              />
            </TabsContent>

            <TabsContent value="history" className="flex-1 overflow-auto">
              <p className="text-center text-muted-foreground py-8">
                Session history and activity log coming soon
              </p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {selectedSession && (
        <BookSessionDialog
          open={bookSessionOpen}
          onOpenChange={setBookSessionOpen}
          session={selectedSession}
          clientName={packageAssignment.clientName}
          packageTitle={packageAssignment.packageTitle}
          onBookSession={handleProposeSession}
        />
      )}
    </>
  );
};
