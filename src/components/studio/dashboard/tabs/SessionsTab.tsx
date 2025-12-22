import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Reuse Trainer components
import { SessionList } from "@/components/trainer/dashboard/tabs/sessions/components/SessionList";
import { CalendarView } from "@/components/trainer/dashboard/tabs/sessions/components/CalendarView";
import { SessionDialogs } from "@/components/trainer/dashboard/tabs/sessions/components/SessionDialogs";
import { SessionRequestCard } from "@/components/trainer/dashboard/tabs/sessions/SessionRequestCard";
import { SessionRequestDetailDialog } from "@/components/trainer/dashboard/tabs/sessions/SessionRequestDetailDialog";
import { ApproveSessionRequestDialog } from "@/components/trainer/dashboard/tabs/sessions/ApproveSessionRequestDialog";
import { DeclineRequestDialog } from "@/components/trainer/dashboard/tabs/sessions/DeclineRequestDialog";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { sampleSessions } from "@/components/trainer/dashboard/tabs/sessions/data/sampleSessionData";
import { useSessionManagement } from "@/components/trainer/dashboard/tabs/sessions/hooks/useSessionManagement";
import { useSessionSales, SessionRequest } from "@/hooks/useSessionSales";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";
import { toast } from "sonner";
import { TrainerSessionItem } from "@/types/sessions";

// Mock trainers for studio
const studioTrainers = [
  { id: "1", name: "Marco Rossi" },
  { id: "2", name: "Laura Bianchi" },
  { id: "3", name: "Giuseppe Verde" },
];

export function SessionsTab() {
  const [trainerFilter, setTrainerFilter] = useState<string>("all");
  
  const {
    showCreateSessionDialog,
    setShowCreateSessionDialog,
    showEditSessionDialog,
    setShowEditSessionDialog,
    showCancelSessionDialog,
    setShowCancelSessionDialog,
    showPostponeSessionDialog,
    setShowPostponeSessionDialog,
    selectedSession,
    handleEditSession,
    handleCancelSession,
    handlePostponeSession,
    confirmCancelSession,
    handleCreateSession,
    handleUpdateSession,
    handleStartVideoSession
  } = useSessionManagement();

  // Get current user ID for data isolation
  const currentUserId = getCurrentDemoUserId();
  
  // Get pending count for badge
  const { sessionRequests, approveRequest, declineRequest } = useSessionSales(currentUserId);
  const requestsCount = sessionRequests.filter(r => r.status === 'pending').length;

  // Request dialogs state
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);

  // Filter sessions by trainer for studio view
  const sessionsWithTrainer = sampleSessions.map(session => ({
    ...session,
    trainerName: studioTrainers[Math.floor(Math.random() * studioTrainers.length)]?.name || "Unknown"
  }));

  const filteredSessions = trainerFilter === "all" 
    ? sessionsWithTrainer 
    : sessionsWithTrainer.filter(s => 
        studioTrainers.find(t => t.id === trainerFilter)?.name === s.trainerName
      );

  // Request handlers
  const handleViewDetails = (request: SessionRequest) => {
    setSelectedRequest(request);
    setDetailDialogOpen(true);
  };

  const handleApproveClick = (request: SessionRequest) => {
    setSelectedRequest(request);
    setDetailDialogOpen(false);
    setApproveDialogOpen(true);
  };

  const handleDeclineClick = (request: SessionRequest) => {
    setSelectedRequest(request);
    setDetailDialogOpen(false);
    setDeclineDialogOpen(true);
  };

  const handleApproveConfirm = (requestId: string, paymentMethod?: 'online' | 'cash') => {
    approveRequest(requestId, paymentMethod, true);
    setApproveDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleDeclineConfirm = (requestId: string, reason?: string) => {
    declineRequest(requestId, reason);
    setDeclineDialogOpen(false);
    setSelectedRequest(null);
  };

  return (
    <ErrorBoundary>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Manage all studio training sessions</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            {/* Studio-specific: Trainer Filter */}
            <Select value={trainerFilter} onValueChange={setTrainerFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Trainers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainers</SelectItem>
                {studioTrainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              className="flex items-center"
              onClick={() => setShowCreateSessionDialog(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Session
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-6 w-full sm:w-auto">
              <TabsTrigger value="list" className="flex-1 sm:flex-none">List</TabsTrigger>
              <TabsTrigger value="calendar" className="flex-1 sm:flex-none">Calendar</TabsTrigger>
              <TabsTrigger value="requests" className="flex-1 sm:flex-none">
                Requests
                {requestsCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {requestsCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-0">
              <SessionList 
                sessions={filteredSessions} 
                onEditSession={handleEditSession} 
                onCancelSession={handleCancelSession}
                onStartVideoSession={handleStartVideoSession}
                onPostponeSession={handlePostponeSession}
              />
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-0">
              <CalendarView 
                sessions={filteredSessions}
                onEditSession={handleEditSession}
                onCancelSession={handleCancelSession}
                onStartVideoSession={handleStartVideoSession}
              />
            </TabsContent>

            <TabsContent value="requests" className="mt-0">
              <div className="space-y-4">
                {sessionRequests.filter(r => r.status === 'pending').length > 0 ? (
                  sessionRequests
                    .filter(r => r.status === 'pending')
                    .map((request) => (
                      <SessionRequestCard
                        key={request.id}
                        request={request}
                        onViewDetails={handleViewDetails}
                        onApprove={handleApproveClick}
                        onDecline={handleDeclineClick}
                      />
                    ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No pending session requests</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Reusing Trainer's SessionDialogs */}
          <SessionDialogs
            showCreateSessionDialog={showCreateSessionDialog}
            setShowCreateSessionDialog={setShowCreateSessionDialog}
            showEditSessionDialog={showEditSessionDialog}
            setShowEditSessionDialog={setShowEditSessionDialog}
            showCancelSessionDialog={showCancelSessionDialog}
            setShowCancelSessionDialog={setShowCancelSessionDialog}
            showPostponeSessionDialog={showPostponeSessionDialog}
            setShowPostponeSessionDialog={setShowPostponeSessionDialog}
            selectedSession={selectedSession}
            onCreateSession={handleCreateSession}
            onUpdateSession={handleUpdateSession}
            onConfirmCancel={confirmCancelSession}
          />

          {/* Request Dialogs */}
          <SessionRequestDetailDialog
            open={detailDialogOpen}
            onOpenChange={setDetailDialogOpen}
            request={selectedRequest}
            onApprove={handleApproveClick}
            onDecline={handleDeclineClick}
            onAddToCRM={() => {}}
            isAddedToCRM={false}
          />

          <ApproveSessionRequestDialog
            open={approveDialogOpen}
            onOpenChange={setApproveDialogOpen}
            request={selectedRequest}
            isProTrainer={true}
            onConfirm={handleApproveConfirm}
          />

          <DeclineRequestDialog
            open={declineDialogOpen}
            onOpenChange={setDeclineDialogOpen}
            request={selectedRequest}
            onConfirm={handleDeclineConfirm}
          />
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}
