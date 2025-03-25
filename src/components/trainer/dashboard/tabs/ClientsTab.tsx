
import { Plus } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ClientInviteDialog } from "./clients/ClientInviteDialog";
import { ClientGoalsDialog } from "./clients/ClientGoalsDialog";
import { ClientCard } from "./clients/ClientCard";
import { ClientProfileDialog } from "./clients/ClientProfileDialog";

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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Client Management</CardTitle>
              <CardDescription>Manage your client list and track progress</CardDescription>
            </div>
            <Button className="flex items-center" onClick={() => setShowClientDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Invite Client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <ClientCard 
                key={client.id}
                client={client}
                onSetGoals={handleSetGoals}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>
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
