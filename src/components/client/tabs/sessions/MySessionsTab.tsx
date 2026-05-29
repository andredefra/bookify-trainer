import { useEffect, useState } from "react";
import { SessionCard } from "./SessionCard";
import { InvitedSessionCard } from "./InvitedSessionCard";
import { AcceptInvitePaymentDialog } from "./AcceptInvitePaymentDialog";
import { PaymentDialog } from "./dialogs/PaymentDialog";
import {
  PendingRequestCard,
  type PendingSessionRequest,
} from "./PendingRequestCard";
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
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [sessionToPay, setSessionToPay] = useState<SessionItem | null>(null);
  const [pendingRequests, setPendingRequests] = useState<
    PendingSessionRequest[]
  >([]);

  // Load + watch session requests from localStorage
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("client-session-requests");
        const all: PendingSessionRequest[] = raw ? JSON.parse(raw) : [];
        setPendingRequests(all.filter((r) => r.status === "awaiting_trainer"));
      } catch {
        setPendingRequests([]);
      }
    };
    load();
    window.addEventListener("client-session-requests-changed", load);
    return () =>
      window.removeEventListener("client-session-requests-changed", load);
  }, []);

  const handleCancelRequest = (id: string) => {
    const raw = localStorage.getItem("client-session-requests");
    const all: PendingSessionRequest[] = raw ? JSON.parse(raw) : [];
    const updated = all.filter((r) => r.id !== id);
    localStorage.setItem("client-session-requests", JSON.stringify(updated));
    window.dispatchEvent(new Event("client-session-requests-changed"));
    toast.success("Request cancelled");
  };

  // Handler for joining a video session
  const handleJoinSession = (session: SessionItem) => {
    toast.success(`Joining ${session.name} session with ${session.trainer}`);
    window.open(`/video-session/${session.id}`, '_blank');
    console.log("Joining session:", session);
  };

  const handleAcceptInvite = (session: SessionItem) => {
    setSelectedInvite(session);
    setShowAcceptDialog(true);
  };

  const handleDeclineInvite = (session: SessionItem) => {
    toast.success(`Declined invitation to ${session.name}`);
    setSelectedInvite(null);
    // In real app, update the session status in the database
  };

  const handleConfirmInvite = () => {
    setShowAcceptDialog(false);
    
    if (selectedInvite?.paymentRequired && selectedInvite.price) {
      // If payment required, open payment dialog
      setSessionToPay(selectedInvite);
      setShowPaymentDialog(true);
    } else {
      // Free session - confirm directly
      handleCompleteRegistration(selectedInvite);
    }
  };

  const handlePaymentComplete = () => {
    handleCompleteRegistration(sessionToPay);
    setShowPaymentDialog(false);
    setSessionToPay(null);
  };

  const handleCompleteRegistration = (session: SessionItem | null) => {
    if (session) {
      toast.success(`Successfully registered for ${session.name}!`);
      setSelectedInvite(null);
      // In real app, update session status and move to upcomingSessions
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

      {/* Accept Invitation Dialog */}
      <AcceptInvitePaymentDialog
        open={showAcceptDialog}
        onOpenChange={setShowAcceptDialog}
        session={selectedInvite}
        onAccept={handleConfirmInvite}
      />

      {/* Payment Dialog */}
      {sessionToPay && (
        <PaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          session={sessionToPay}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}
