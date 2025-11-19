import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, DollarSign, Calendar } from "lucide-react";
import { TrainerSessionItem } from "@/types/sessions";
import { QuickActionsWidget } from "./overview/widgets/QuickActionsWidget";
import { TodaysAgendaWidget } from "./overview/widgets/TodaysAgendaWidget";
import { RevenueChartWidget } from "./overview/widgets/RevenueChartWidget";
import { ClientActivityWidget } from "./overview/widgets/ClientActivityWidget";
import { MessagesWidget } from "./overview/widgets/MessagesWidget";
import { PerformanceMetricsWidget } from "./overview/widgets/PerformanceMetricsWidget";
import { PackageSalesWidget } from "./overview/widgets/PackageSalesWidget";
import { GoalsWidget } from "./overview/widgets/GoalsWidget";
import { RecentActivitiesWidget } from "./overview/widgets/RecentActivitiesWidget";
import { ExpirationAlertsCard } from "@/components/common/ExpirationAlertsCard";

interface OverviewTabProps {
  upcomingSessions: TrainerSessionItem[];
  clients: Array<{ id: number; name: string; sessions: number; lastSession: string }>;
  messageRequests: Array<{ id: number; from: string; preview: string; time: string }>;
}

export function OverviewTab({ upcomingSessions, clients, messageRequests }: OverviewTabProps) {
  const stats = {
    totalClients: clients.length,
    activePrograms: 18,
    monthlyRevenue: 3200,
    upcomingToday: upcomingSessions.length,
  };

  return (
    <div className="space-y-6">
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">{stats.totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                <p className="text-2xl font-bold">{stats.activePrograms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">€{stats.monthlyRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-100">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Today's Sessions</p>
                <p className="text-2xl font-bold">{stats.upcomingToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modular Widget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActionsWidget />
        <TodaysAgendaWidget />
        <ClientActivityWidget />
        <MessagesWidget />
        <RevenueChartWidget />
        <PerformanceMetricsWidget />
        <PackageSalesWidget />
        <GoalsWidget />
        <ExpirationAlertsCard />
        <RecentActivitiesWidget />
      </div>
    </div>
  );
}
