import { useState } from "react";
import { TrainerSessionItem } from "@/types/sessions";
import { SessionFormValues } from "../../../dialogs/session/SessionFormSchema";
import { toast } from "sonner";

export function useSessionManagement() {
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false);
  const [showEditSessionDialog, setShowEditSessionDialog] = useState(false);
  const [showCancelSessionDialog, setShowCancelSessionDialog] = useState(false);
  const [showPostponeSessionDialog, setShowPostponeSessionDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TrainerSessionItem | null>(null);

  const handleEditSession = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowEditSessionDialog(true);
  };

  const handleCancelSession = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowCancelSessionDialog(true);
  };

  const handlePostponeSession = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowPostponeSessionDialog(true);
  };

  const confirmCancelSession = () => {
    if (!selectedSession) return;
    
    toast.success(`Session "${selectedSession.name}" cancelled successfully`);
    setShowCancelSessionDialog(false);
  };

  const handleCreateSession = (data: SessionFormValues) => {
    toast.success("Session created successfully!");
    setShowCreateSessionDialog(false);
  };

  const handleUpdateSession = (data: SessionFormValues, sessionId: number) => {
    toast.success("Session updated successfully!");
    setShowEditSessionDialog(false);
  };

  const handleStartVideoSession = (session: TrainerSessionItem) => {
    toast.success(`Video session "${session.name}" prepared - you can start it now`);
    // The actual launching of the video interface is handled by the SessionList component
  };

  return {
    // Dialog states
    showCreateSessionDialog,
    setShowCreateSessionDialog,
    showEditSessionDialog,
    setShowEditSessionDialog,
    showCancelSessionDialog,
    setShowCancelSessionDialog,
    showPostponeSessionDialog,
    setShowPostponeSessionDialog,
    selectedSession,
    
    // Event handlers
    handleEditSession,
    handleCancelSession,
    handlePostponeSession,
    confirmCancelSession,
    handleCreateSession,
    handleUpdateSession,
    handleStartVideoSession
  };
}