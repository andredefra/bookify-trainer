
import { useState } from "react";
import { UpcomingSessionsCard } from "./overview/UpcomingSessionsCard";
import { RecentClientsCard } from "./overview/RecentClientsCard";
import { MessageRequestsCard } from "./overview/MessageRequestsCard";
import { CreateSessionDialog } from "../dialogs/CreateSessionDialog";
import { EditSessionDialog } from "../tabs/sessions/EditSessionDialog";
import { toast } from "sonner";
import { TrainerSessionItem } from "@/types/sessions";

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
}

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
}

interface OverviewTabProps {
  upcomingSessions: TrainerSessionItem[];
  clients: ClientItem[];
  messageRequests: MessageItem[];
}

export function OverviewTab({ upcomingSessions, clients, messageRequests }: OverviewTabProps) {
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false);
  const [showEditSessionDialog, setShowEditSessionDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TrainerSessionItem | null>(null);
  
  // Add payment status and waiting list to mock data if not available
  const sessionsWithPaymentInfo = upcomingSessions.map(session => ({
    ...session,
    waitingList: session.waitingList || 0,
    paymentStatus: session.paymentStatus || {
      paid: Math.floor(Math.random() * session.participants),
      pending: Math.floor(Math.random() * session.participants),
      get total() { return this.paid + this.pending; }
    }
  }));
  
  const handleViewSessionDetails = (session: TrainerSessionItem) => {
    setSelectedSession(session);
    setShowEditSessionDialog(true);
  };
  
  const handleUpdateSession = (data: any, sessionId: number) => {
    toast.success("Session updated successfully!");
    setShowEditSessionDialog(false);
  };
  
  return (
    <div className="space-y-6">
      <UpcomingSessionsCard 
        sessions={sessionsWithPaymentInfo} 
        onNewSession={() => setShowCreateSessionDialog(true)}
        onViewDetails={handleViewSessionDetails}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentClientsCard clients={clients} />
        <MessageRequestsCard messages={messageRequests} />
      </div>
      
      <CreateSessionDialog 
        open={showCreateSessionDialog} 
        onOpenChange={setShowCreateSessionDialog}
        onSubmit={(data) => {
          // Here you would typically save the session to your database
          console.log("New session data:", data);
          toast.success("Session created successfully!");
          setShowCreateSessionDialog(false);
        }}
      />
      
      <EditSessionDialog
        open={showEditSessionDialog}
        onOpenChange={setShowEditSessionDialog}
        session={selectedSession}
        onSubmit={handleUpdateSession}
      />
    </div>
  );
}
