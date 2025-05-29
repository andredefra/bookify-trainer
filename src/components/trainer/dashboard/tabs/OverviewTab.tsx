
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpcomingSessionsCard } from "./overview/UpcomingSessionsCard";
import { RecentClientsCard } from "./overview/RecentClientsCard";
import { MessageRequestsCard } from "./overview/MessageRequestsCard";
import { TrainerSessionItem } from "@/types/sessions";
import { UnifiedClient } from "../types/UnifiedClient";

interface MessageRequest {
  id: number;
  from: string;
  preview: string;
  time: string;
}

interface OverviewTabProps {
  upcomingSessions: TrainerSessionItem[];
  clients: UnifiedClient[];
  messageRequests: MessageRequest[];
}

export function OverviewTab({ upcomingSessions, clients, messageRequests }: OverviewTabProps) {
  const totalClients = clients.length;
  const totalSessions = upcomingSessions.length;
  const totalRevenue = clients.reduce((sum, client) => sum + (client.value || 0), 0);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">Active clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total client value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageRequests.length}</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UpcomingSessionsCard upcomingSessions={upcomingSessions} />
        <RecentClientsCard clients={clients} />
        <MessageRequestsCard messageRequests={messageRequests} />
      </div>
    </div>
  );
}
