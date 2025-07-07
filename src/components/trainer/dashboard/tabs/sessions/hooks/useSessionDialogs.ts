import { useState } from "react";
import { TrainerSessionItem } from "@/types/sessions";

export function useSessionDialogs() {
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [selectedVideoSession, setSelectedVideoSession] = useState<TrainerSessionItem | null>(null);
  const [selectedParticipantsSession, setSelectedParticipantsSession] = useState<TrainerSessionItem | null>(null);

  const handleStartVideo = (session: TrainerSessionItem, onStartVideoSession?: (session: TrainerSessionItem) => void) => {
    setSelectedVideoSession(session);
    setShowVideoDialog(true);
    if (onStartVideoSession) {
      onStartVideoSession(session);
    }
  };

  const handleViewParticipants = (session: TrainerSessionItem) => {
    setSelectedParticipantsSession(session);
    setShowParticipantsDialog(true);
  };

  return {
    showVideoDialog,
    setShowVideoDialog,
    showParticipantsDialog,
    setShowParticipantsDialog,
    selectedVideoSession,
    selectedParticipantsSession,
    handleStartVideo,
    handleViewParticipants
  };
}