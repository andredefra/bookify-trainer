import { TrainerSessionItem } from "@/types/sessions";
import { CreateSessionDialog } from "../../../dialogs/CreateSessionDialog";
import { EditSessionDialog } from "../EditSessionDialog";
import { CancelSessionDialog } from "./CancelSessionDialog";
import { PostponeSessionDialog } from "../../../dialogs/PostponeSessionDialog";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";
import { SessionFormValues } from "../../../dialogs/session/SessionFormSchema";

interface SessionDialogsProps {
  showCreateSessionDialog: boolean;
  setShowCreateSessionDialog: (show: boolean) => void;
  showEditSessionDialog: boolean;
  setShowEditSessionDialog: (show: boolean) => void;
  showCancelSessionDialog: boolean;
  setShowCancelSessionDialog: (show: boolean) => void;
  showPostponeSessionDialog: boolean;
  setShowPostponeSessionDialog: (show: boolean) => void;
  selectedSession: TrainerSessionItem | null;
  onCreateSession: (data: SessionFormValues) => void;
  onUpdateSession: (data: SessionFormValues, sessionId: number) => void;
  onConfirmCancel: () => void;
}

export function SessionDialogs({
  showCreateSessionDialog,
  setShowCreateSessionDialog,
  showEditSessionDialog,
  setShowEditSessionDialog,
  showCancelSessionDialog,
  setShowCancelSessionDialog,
  showPostponeSessionDialog,
  setShowPostponeSessionDialog,
  selectedSession,
  onCreateSession,
  onUpdateSession,
  onConfirmCancel
}: SessionDialogsProps) {
  return (
    <>
      <CreateSessionDialog 
        open={showCreateSessionDialog} 
        onOpenChange={setShowCreateSessionDialog}
        onSubmit={onCreateSession}
      />
      
      <EditSessionDialog
        open={showEditSessionDialog}
        onOpenChange={setShowEditSessionDialog}
        session={selectedSession}
        onSubmit={onUpdateSession}
      />

      <CancelSessionDialog
        open={showCancelSessionDialog}
        onOpenChange={setShowCancelSessionDialog}
        sessionName={selectedSession?.name || ""}
        onConfirm={onConfirmCancel}
      />

      <PostponeSessionDialog
        open={showPostponeSessionDialog}
        onOpenChange={setShowPostponeSessionDialog}
        event={selectedSession ? {
          id: selectedSession.id.toString(),
          start: new Date(`${selectedSession.date} ${selectedSession.time.split(' - ')[0]}`),
          end: new Date(`${selectedSession.date} ${selectedSession.time.split(' - ')[1]}`),
          title: selectedSession.name,
          type: 'session' as const,
          color: '#3B82F6',
          status: 'scheduled',
          trainer_id: getCurrentDemoUserId()
        } : null}
        participants={selectedSession?.participantDetails?.map(p => ({
          id: p.id,
          email: p.email,
          name: p.name,
          paid_amount: p.paymentStatus === 'paid' ? 50 : undefined // Mock amount
        })) || []}
      />
    </>
  );
}