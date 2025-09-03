
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, TrendingUp, Clock, MessageSquare, Package, Target } from "lucide-react";
import { ExpirationAlertsCard } from "@/components/common/ExpirationAlertsCard";
import { TrainerSessionItem } from "@/types/sessions";

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
    completedSessions: 156,
    upcomingToday: upcomingSessions.length,
    messagesUnread: messageRequests.length
  };

  const recentActivities = [
    { id: 1, type: "session", client: "Marco Rossi", action: "Session completed", time: "1h ago" },
    { id: 2, type: "program", client: "Anna Bianchi", action: "New program assigned", time: "2h ago" },
    { id: 3, type: "message", client: "Luca Verdi", action: "Message received", time: "3h ago" },
    { id: 4, type: "payment", client: "Sofia Nero", action: "Payment received", time: "1d ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">{stats.totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                <p className="text-2xl font-bold">{stats.activePrograms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">€{stats.monthlyRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Today's Sessions</p>
                <p className="text-2xl font-bold">{stats.upcomingToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiration Alerts - New Component */}
        <ExpirationAlertsCard />

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Sessions
            </CardTitle>
            <CardDescription>Your upcoming scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-6">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No sessions scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{session.name}</p>
                      <p className="text-sm text-muted-foreground">{session.participants}/{session.maxParticipants} participants</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{session.time}</Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Sessions
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activities
          </CardTitle>
          <CardDescription>Overview of recent activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div>
                    <p className="font-medium">{activity.client}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
