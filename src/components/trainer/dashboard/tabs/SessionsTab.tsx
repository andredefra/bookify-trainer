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
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { sampleSessions } from "./sessions/data/sampleSessionData";
import { useSessionManagement } from "./sessions/hooks/useSessionManagement";
import { useSubscription } from "@/hooks/useSubscription";
import { useSessionSales } from "@/hooks/useSessionSales";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";

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
  const { pendingPayments } = useSessionSales(currentUserId);
  const pendingCount = pendingPayments.length;

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
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}
