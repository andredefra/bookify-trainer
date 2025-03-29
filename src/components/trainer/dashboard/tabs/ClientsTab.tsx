
import { Plus } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ClientInviteDialog } from "./clients/ClientInviteDialog";
import { ClientGoalsDialog } from "./clients/ClientGoalsDialog";
import { ClientCard } from "./clients/ClientCard";
import { ClientProfileDialog } from "./clients/ClientProfileDialog";
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
  
  const handleSetGoals = (clientName: string) => {
    setSelectedClient(clientName);
    setShowGoalDialog(true);
  };
  
  const handleViewProfile = (client: ClientItem) => {
    setActiveClient(client);
    setShowProfileDialog(true);
  };
  
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Client Management</CardTitle>
              <CardDescription>Manage your client list and track progress</CardDescription>
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
          <ScrollArea className="h-[70vh] pr-4">
            <div className="space-y-4 w-full">
              {clients.map((client) => (
                <ClientCard 
                  key={client.id}
                  client={client}
                  onSetGoals={handleSetGoals}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          </ScrollArea>
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
    </>
  );
}
