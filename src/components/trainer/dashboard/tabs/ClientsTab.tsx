
import { Plus } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { ClientInviteDialog } from "./clients/ClientInviteDialog";
import { ClientGoalsDialog } from "./clients/ClientGoalsDialog";
import { ClientCard } from "./clients/ClientCard";
import { ClientProfileDialog } from "./clients/ClientProfileDialog";
import { ClientPerformance } from "./analytics/ClientPerformance";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [activeTab, setActiveTab] = useState("clients");
  const [analyticsClientFilter, setAnalyticsClientFilter] = useState<string>("all");
  
  const handleSetGoals = (clientName: string) => {
    setSelectedClient(clientName);
    setShowGoalDialog(true);
  };
  
  const handleViewProfile = (client: ClientItem) => {
    setActiveClient(client);
    setShowProfileDialog(true);
  };

  const handleViewAnalytics = (client: ClientItem) => {
    setAnalyticsClientFilter(client.id.toString());
    setActiveTab("analytics");
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
            <TabsList className="mb-6">
              <TabsTrigger value="clients">Client List</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="clients" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4 w-full">
                  {clients.map((client) => (
                    <ClientCard 
                      key={client.id}
                      client={client}
                      onSetGoals={handleSetGoals}
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
                <ClientPerformance initialClientFilter={analyticsClientFilter} />
              </div>
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
      />
      
      <ClientProfileDialog 
        client={activeClient}
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
      />
    </div>
  );
}
