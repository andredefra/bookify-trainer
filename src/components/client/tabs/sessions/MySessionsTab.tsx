import { useState } from "react";
import { SessionCard } from "./SessionCard";
import { InvitedSessionCard } from "./InvitedSessionCard";
import { AcceptInvitePaymentDialog } from "./AcceptInvitePaymentDialog";
import { SessionItem } from "@/types/sessions";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface MySessionsTabProps {
  upcomingSessions: SessionItem[];
  invitedSessions?: SessionItem[];
  onViewDetails: (session: SessionItem) => void;
  onRegister: (session: SessionItem) => void;
  onAddToCalendar: (session: SessionItem) => void;
  onCancel: (session: SessionItem) => void;
}

export function MySessionsTab({
  upcomingSessions,
  invitedSessions = [],
  onViewDetails,
  onRegister,
  onAddToCalendar,
  onCancel
}: MySessionsTabProps) {
  const [selectedInvite, setSelectedInvite] = useState<SessionItem | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  // Handler for joining a video session
  const handleJoinSession = (session: SessionItem) => {
    toast.success(`Joining ${session.name} session with ${session.trainer}`);
    window.open(`/video-session/${session.id}`, '_blank');
    console.log("Joining session:", session);
  };

  const handleAcceptInvite = (session: SessionItem) => {
    setSelectedInvite(session);
    setShowPaymentDialog(true);
  };

  const handleDeclineInvite = (session: SessionItem) => {
    toast.success(`Declined invitation to ${session.name}`);
    // In real app, update the session status in the database
  };

  const handleConfirmPayment = () => {
    if (selectedInvite) {
      toast.success(`Successfully registered for ${selectedInvite.name}!`);
      // In real app, move session to upcomingSessions
    }
  };

  const pendingInvites = invitedSessions.filter(s => s.inviteStatus === 'pending');
  
  return (
    <div className="space-y-6">
      {/* Invited Sessions Section */}
      {pendingInvites.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Session Invitations</h3>
            <Badge variant="default" className="bg-primary">
              {pendingInvites.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {pendingInvites.map((session) => (
              <InvitedSessionCard
                key={session.id}
                session={session}
                onAccept={handleAcceptInvite}
                onDecline={handleDeclineInvite}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Sessions */}
      {upcomingSessions.length > 0 && (
        <div className="space-y-3">
          {pendingInvites.length > 0 && (
            <h3 className="font-semibold text-lg">My Sessions</h3>
          )}
          {upcomingSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onViewDetails={onViewDetails}
              onRegister={onRegister}
              onAddToCalendar={onAddToCalendar}
              onCancel={onCancel}
              onJoinSession={handleJoinSession}
            />
          ))}
        </div>
      )}

      {/* Payment Dialog */}
      <AcceptInvitePaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        session={selectedInvite}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
}
