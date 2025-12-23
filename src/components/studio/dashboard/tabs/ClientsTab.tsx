import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Users, TrendingUp, UserCheck, UserX, Bot, BarChart3 } from "lucide-react";
import { StudioClientCard, StudioClient } from "./clients/StudioClientCard";
import { StudioClientProfileDialog } from "./clients/StudioClientProfileDialog";
import { ChangeClientTrainerDialog } from "./clients/ChangeClientTrainerDialog";
import { StudioClientAIChat } from "./clients/StudioClientAIChat";
import { StudioPerformanceAnalytics } from "./clients/StudioPerformanceAnalytics";
import { ClientGoalsDialog } from "@/components/trainer/dashboard/tabs/clients/ClientGoalsDialog";

export function ClientsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trainerFilter, setTrainerFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("list");
  
  // Dialogs
  const [selectedClient, setSelectedClient] = useState<StudioClient | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showChangeTrainer, setShowChangeTrainer] = useState(false);
  const [showGoalsDialog, setShowGoalsDialog] = useState(false);
  const [selectedClientName, setSelectedClientName] = useState("");

  // Mock trainers
  const trainers = [
    { id: "t1", name: "Marco Rossi" },
    { id: "t2", name: "Laura Bianchi" },
    { id: "t3", name: "Giuseppe Verde" },
  ];

  // Mock clients with extended data
  const clients: StudioClient[] = [
    { id: "1", name: "Sarah Johnson", email: "sarah@email.com", trainerId: "t1", trainerName: "Marco Rossi", status: "active", package: "Premium 20", sessionsLeft: 12, sessions: 24, lastSession: "2024-02-15", activeGoals: 3, activePrograms: 1, activePackages: 1 },
    { id: "2", name: "Michael Brown", email: "michael@email.com", trainerId: "t2", trainerName: "Laura Bianchi", status: "active", package: "Basic 10", sessionsLeft: 4, sessions: 18, lastSession: "2024-02-14", activeGoals: 2, activePrograms: 1, activePackages: 1 },
    { id: "3", name: "Emma Wilson", email: "emma@email.com", trainerId: "t1", trainerName: "Marco Rossi", status: "active", package: "Premium 20", sessionsLeft: 18, sessions: 32, lastSession: "2024-02-16", activeGoals: 2, activePrograms: 2, activePackages: 1 },
    { id: "4", name: "James Davis", email: "james@email.com", trainerId: "t3", trainerName: "Giuseppe Verde", status: "inactive", package: "Basic 10", sessionsLeft: 0, sessions: 8, lastSession: "2023-12-01", activeGoals: 1, activePrograms: 0, activePackages: 0 },
    { id: "5", name: "Sofia Martinez", email: "sofia@email.com", trainerId: "t2", trainerName: "Laura Bianchi", status: "active", package: "Unlimited", sessionsLeft: null, sessions: 45, lastSession: "2024-02-17", activeGoals: 4, activePrograms: 1, activePackages: 1 },
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrainer = trainerFilter === "all" || client.trainerId === trainerFilter;
    return matchesSearch && matchesTrainer;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === "active").length,
    inactive: clients.filter(c => c.status === "inactive").length,
  };

  const handleViewProfile = (client: StudioClient) => {
    setSelectedClient(client);
    setShowProfileDialog(true);
  };

  const handleViewAnalytics = (client: StudioClient) => {
    setSelectedClient(client);
    setActiveTab("analytics");
  };

  const handleChangeTrainer = (client: StudioClient) => {
    setSelectedClient(client);
    setShowChangeTrainer(true);
  };

  const handleSetGoals = (clientName: string) => {
    setSelectedClientName(clientName);
    setShowGoalsDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Clients / CRM</h1>
          <p className="text-muted-foreground">Manage all studio clients and their assignments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Client List
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        {/* Client List Tab */}
        <TabsContent value="list" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 flex items-center gap-3">
                <Users className="h-8 w-8 text-muted-foreground" />
                <div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-3">
                <UserCheck className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-3">
                <UserX className="h-8 w-8 text-red-500" />
                <div>
                  <div className="text-2xl font-bold text-red-500">{stats.inactive}</div>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search clients..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={trainerFilter} onValueChange={setTrainerFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by trainer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainers</SelectItem>
                {trainers.map(trainer => (
                  <SelectItem key={trainer.id} value={trainer.id}>{trainer.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredClients.map((client) => (
              <StudioClientCard
                key={client.id}
                client={client}
                onViewProfile={handleViewProfile}
                onViewAnalytics={handleViewAnalytics}
                onChangeTrainer={handleChangeTrainer}
                onSetGoals={handleSetGoals}
              />
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <StudioPerformanceAnalytics clients={clients} trainers={trainers} />
        </TabsContent>

        {/* AI Assistant Tab */}
        <TabsContent value="ai">
          <StudioClientAIChat clients={clients} trainers={trainers} />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <StudioClientProfileDialog
        client={selectedClient}
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
      />

      {selectedClient && (
        <ChangeClientTrainerDialog
          open={showChangeTrainer}
          onOpenChange={setShowChangeTrainer}
          clientName={selectedClient.name}
          currentTrainerId={selectedClient.trainerId}
          currentTrainerName={selectedClient.trainerName}
        />
      )}

      <ClientGoalsDialog
        open={showGoalsDialog}
        onOpenChange={setShowGoalsDialog}
        selectedClient={selectedClientName}
      />
    </div>
  );
}
