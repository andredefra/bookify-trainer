import { Plus, Bot } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { ClientInviteDialog } from "./clients/ClientInviteDialog";
import { ClientGoalsDialog } from "./clients/ClientGoalsDialog";
import { ClientCard } from "./clients/ClientCard";
import { ClientProfileDialog } from "./clients/ClientProfileDialog";
import { ClientPerformance } from "./analytics/ClientPerformance";
import { MessageClientDialog } from "./clients/dialogs/MessageClientDialog";
import { EnhancedScheduleSessionDialog } from "./clients/dialogs/EnhancedScheduleSessionDialog";
import { CreateEventDialog } from "../dialogs/CreateEventDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ManageGoalTypesDialog } from "@/components/client/overview/fitness-progress/ManageGoalTypesDialog";
import { TrainerClientAIChat } from "./clients/TrainerClientAIChat";
import { GoalManagerModal } from "./clients/GoalManagerModal";
import { CheckInManagerModal } from "./clients/CheckInManagerModal";

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
}

interface ClientsTabProps {
  clients: ClientItem[];
}

export function ClientsTab({ clients }: ClientsTabProps) {
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [activeClient, setActiveClient] = useState<ClientItem | null>(null);
  const [initialProfileTab, setInitialProfileTab] = useState("overview");
  const [activeTab, setActiveTab] = useState("clients");
  const [analyticsClientFilter, setAnalyticsClientFilter] = useState<string>("all");
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  const [eventPrefillClient, setEventPrefillClient] = useState("");
  const [messageClientName, setMessageClientName] = useState("");
  const [showManageGoalTypesDialog, setShowManageGoalTypesDialog] = useState(false);
  
  // Goal Manager Modal state
  const [showGoalManagerModal, setShowGoalManagerModal] = useState(false);
  const [goalManagerClient, setGoalManagerClient] = useState<ClientItem | null>(null);
  
  // Check-in Manager Modal state
  const [showCheckInManagerModal, setShowCheckInManagerModal] = useState(false);
  const [checkInManagerClient, setCheckInManagerClient] = useState<ClientItem | null>(null);
  
  // Opens the standalone Goal Manager modal (bullseye icon)
  const handleViewGoals = (client: ClientItem) => {
    setGoalManagerClient(client);
    setShowGoalManagerModal(true);
  };
  
  // Opens the standalone Check-in Manager modal (flag icon)
  const handleViewCheckIns = (client: ClientItem) => {
    setCheckInManagerClient(client);
    setShowCheckInManagerModal(true);
  };

  // Closes Goal Manager and navigates to Analytics
  const handleViewProgressFromGoals = () => {
    setShowGoalManagerModal(false);
    if (goalManagerClient) {
      setAnalyticsClientFilter(goalManagerClient.id.toString());
      setActiveTab("analytics");
    }
  };
  
  const handleViewProfile = (client: ClientItem) => {
    setActiveClient(client);
    setInitialProfileTab("overview");
    setShowProfileDialog(true);
  };

  const handleViewAnalytics = (client: ClientItem) => {
    setAnalyticsClientFilter(client.id.toString());
    setActiveTab("analytics");
  };

  const handleMessage = (clientName: string) => {
    setMessageClientName(clientName);
    setShowMessageDialog(true);
  };

  const handleScheduleSession = (clientName: string) => {
    setMessageClientName(clientName);
    setShowScheduleDialog(true);
  };

  const handleScheduleEvent = (clientName: string) => {
    setEventPrefillClient(clientName);
    setShowCreateEventDialog(true);
  };
  
  
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Client Management</CardTitle>
              <CardDescription>Manage your clients and analyze their performance</CardDescription>
            </div>
            <Button 
              className="flex items-center justify-center gap-1.5 whitespace-nowrap self-start" 
              size="sm"
              onClick={() => setShowClientDialog(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Invite Client</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto mb-6 max-w-full">
              <TabsList className="w-auto flex flex-nowrap justify-start min-w-max">
                <TabsTrigger value="clients" className="flex-1 sm:flex-none whitespace-nowrap">Client List</TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1 sm:flex-none whitespace-nowrap">Performance Analytics</TabsTrigger>
                <TabsTrigger value="ai-assistant" className="flex-1 sm:flex-none whitespace-nowrap flex items-center gap-1.5">
                  <Bot className="h-4 w-4" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="clients" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4 w-full">
                  {clients.map((client) => (
                    <ClientCard 
                      key={client.id}
                      client={client}
                      onViewGoals={handleViewGoals}
                      onViewCheckIns={handleViewCheckIns}
                      onViewProfile={handleViewProfile}
                      onViewAnalytics={handleViewAnalytics}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <div className="space-y-4">
                {analyticsClientFilter !== "all" && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-700">
                      Viewing analytics for: <strong>{clients.find(c => c.id.toString() === analyticsClientFilter)?.name}</strong>
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAnalyticsClientFilter("all")}
                    >
                      View All Clients
                    </Button>
                  </div>
                )}
                <ClientPerformance 
                  initialClientFilter={analyticsClientFilter}
                  onClientChange={setAnalyticsClientFilter}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="ai-assistant" className="mt-0">
              <TrainerClientAIChat 
                selectedClient={analyticsClientFilter}
                clientsData={clients}
                onClientChange={setAnalyticsClientFilter}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <ClientInviteDialog
        open={showClientDialog}
        onOpenChange={setShowClientDialog}
      />
      
      <ClientGoalsDialog
        open={showGoalDialog}
        onOpenChange={setShowGoalDialog}
        selectedClient={selectedClient}
        onManageGoalTypes={() => setShowManageGoalTypesDialog(true)}
      />
      
      <ClientProfileDialog 
        client={activeClient}
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        onMessage={handleMessage}
        onScheduleSession={handleScheduleSession}
        onScheduleEvent={handleScheduleEvent}
        initialTab={initialProfileTab}
      />
      
      <GoalManagerModal
        client={goalManagerClient}
        open={showGoalManagerModal}
        onOpenChange={setShowGoalManagerModal}
        onAddGoal={() => {
          setSelectedClient(goalManagerClient?.name || null);
          setShowGoalDialog(true);
        }}
        onViewProgress={handleViewProgressFromGoals}
      />
      
      <MessageClientDialog
        open={showMessageDialog}
        onOpenChange={setShowMessageDialog}
        clientName={messageClientName}
      />
      
      <EnhancedScheduleSessionDialog
        open={showScheduleDialog}
        onOpenChange={setShowScheduleDialog}
        clientName={messageClientName}
      />
      
      <ManageGoalTypesDialog
        open={showManageGoalTypesDialog}
        onOpenChange={setShowManageGoalTypesDialog}
      />
      
      <CheckInManagerModal
        client={checkInManagerClient}
        open={showCheckInManagerModal}
        onOpenChange={setShowCheckInManagerModal}
      />
    </div>
  );
}
