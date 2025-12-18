import { TrainerSessionItem } from "@/types/sessions";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionList } from "./sessions/components/SessionList";
import { CalendarView } from "./sessions/components/CalendarView";
import { SessionDialogs } from "./sessions/components/SessionDialogs";
import { SessionSalesContent } from "./sessions/SessionSalesContent";
import { SessionRequestCard } from "./sessions/SessionRequestCard";
import { SessionRequestDetailDialog } from "./sessions/SessionRequestDetailDialog";
import { ApproveSessionRequestDialog } from "./sessions/ApproveSessionRequestDialog";
import { DeclineRequestDialog } from "./sessions/DeclineRequestDialog";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { sampleSessions } from "./sessions/data/sampleSessionData";
import { useSessionManagement } from "./sessions/hooks/useSessionManagement";
import { useSubscription } from "@/hooks/useSubscription";
import { useSessionSales, SessionRequest } from "@/hooks/useSessionSales";
import { useSalesContacts } from "./sales/useSalesContacts";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";
import { toast } from "sonner";
import { useState } from "react";
import { AddLeadDialog } from "./sales/AddLeadDialog";
import { SalesContact } from "./sales/types";

interface SessionsTabProps {
  upcomingSessions?: TrainerSessionItem[];
}

export function SessionsTab({ upcomingSessions = [] }: SessionsTabProps) {
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

  // Get subscription data
  const { subscription_tier } = useSubscription();
  
  // Check if demo mode
  const demoUser = localStorage.getItem('demo-user');
  const isDemoTrainer = demoUser && JSON.parse(demoUser).type === 'trainer';
  
  // Show Sales Analytics for Essential, Pro, Enterprise, Early Adopter, Premium, or demo trainers
  const showSalesAnalytics = 
    subscription_tier === 'essential' || 
    subscription_tier === 'pro' ||
    subscription_tier === 'Premium' ||
    subscription_tier === 'Enterprise' ||
    subscription_tier === 'Early Adopter' ||
    isDemoTrainer;
    
  const isProTrainer = subscription_tier === 'pro' || subscription_tier === 'Premium' || subscription_tier === 'Enterprise';
  
  // Get current user ID for data isolation
  const currentUserId = getCurrentDemoUserId();
  
  // Get pending count for badge
  const { pendingCashPayments, sessionRequests, approveRequest, declineRequest } = useSessionSales(currentUserId);
  const pendingCount = pendingCashPayments.length;
  const requestsCount = sessionRequests.filter(r => r.status === 'pending').length;

  // CRM integration
  const { handleAddContact } = useSalesContacts();

  // Request dialogs state
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  
  // Add to CRM state
  const [addedToCRM, setAddedToCRM] = useState<Set<string>>(new Set());
  const [addLeadDialogOpen, setAddLeadDialogOpen] = useState(false);
  const [leadInitialData, setLeadInitialData] = useState<any>(null);
  const [pendingRequestId, setPendingRequestId] = useState<string | null>(null);

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
    approveRequest(requestId, paymentMethod, isProTrainer);
    setApproveDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleDeclineConfirm = (requestId: string, reason?: string) => {
    declineRequest(requestId, reason);
    setDeclineDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleAddToCRM = (request: SessionRequest) => {
    // Prepare initial data for the dialog
    setLeadInitialData({
      name: request.clientName,
      email: request.clientEmail,
      phone: request.clientPhone,
      source: 'Session Request',
      notes: `Session request: ${request.sessionTitle}\nMessage: ${request.message || 'No message'}`,
      value: request.price,
      nextAction: 'Follow up on session request'
    });
    setPendingRequestId(request.id);
    setAddLeadDialogOpen(true);
  };

  const handleConfirmAddLead = (newLead: Omit<SalesContact, 'id' | 'createdAt' | 'lastUpdated'>) => {
    handleAddContact(newLead);
    
    // Mark the request as added to CRM
    if (pendingRequestId) {
      setAddedToCRM(prev => new Set(prev).add(pendingRequestId));
    }
    
    toast.success(`${newLead.name} added to CRM as Lead!`);
    setAddLeadDialogOpen(false);
    setPendingRequestId(null);
    setLeadInitialData(null);
  };

  // Ensure we have data by combining props with sample data if needed
  const sessionsToDisplay = upcomingSessions.length > 0 ? upcomingSessions : sampleSessions;

  return (
    <ErrorBoundary>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Create and manage your training sessions</CardDescription>
          </div>
          <Button 
            className="flex items-center w-full sm:w-auto"
            onClick={() => setShowCreateSessionDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Session
          </Button>
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
              {showSalesAnalytics && (
                <TabsTrigger value="sales" className="flex-1 sm:flex-none">
                  Sales
                  {pendingCount > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {pendingCount}
                    </Badge>
                  )}
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="list" className="mt-0">
              <SessionList 
                sessions={sessionsToDisplay} 
                onEditSession={handleEditSession} 
                onCancelSession={handleCancelSession}
                onStartVideoSession={handleStartVideoSession}
                onPostponeSession={handlePostponeSession}
              />
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-0">
              <CalendarView 
                sessions={sessionsToDisplay}
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
                        onAddToCRM={
                          request.requesterType === 'prospect' && !addedToCRM.has(request.id)
                            ? handleAddToCRM
                            : undefined
                        }
                      />
                    ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No pending session requests</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {showSalesAnalytics && (
              <TabsContent value="sales" className="mt-0">
                <SessionSalesContent 
                  trainerId={currentUserId}
                  isProTrainer={isProTrainer}
                />
              </TabsContent>
            )}
          </Tabs>

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
            onAddToCRM={handleAddToCRM}
            isAddedToCRM={selectedRequest ? addedToCRM.has(selectedRequest.id) : false}
          />

          <ApproveSessionRequestDialog
            open={approveDialogOpen}
            onOpenChange={setApproveDialogOpen}
            request={selectedRequest}
            isProTrainer={isProTrainer}
            onConfirm={handleApproveConfirm}
          />

          <DeclineRequestDialog
            open={declineDialogOpen}
            onOpenChange={setDeclineDialogOpen}
            request={selectedRequest}
            onConfirm={handleDeclineConfirm}
          />

          {/* Add Lead Dialog */}
          <AddLeadDialog
            open={addLeadDialogOpen}
            onOpenChange={(open) => {
              setAddLeadDialogOpen(open);
              if (!open) {
                setPendingRequestId(null);
                setLeadInitialData(null);
              }
            }}
            onAdd={handleConfirmAddLead}
            initialData={leadInitialData}
          />
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}
