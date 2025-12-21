import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

export function AnalyticsTab() {
  const stats = [
    { label: "Total Revenue", value: "€24,350", change: "+18%", icon: DollarSign },
    { label: "Active Clients", value: "47", change: "+12%", icon: Users },
    { label: "Sessions Completed", value: "312", change: "+25%", icon: Calendar },
    { label: "Client Retention", value: "94%", change: "+3%", icon: TrendingUp },
  ];

  const trainerPerformance = [
    { name: "Marco Rossi", sessions: 48, revenue: "€2,400", clients: 12 },
    { name: "Laura Bianchi", sessions: 42, revenue: "€2,100", clients: 10 },
    { name: "Giuseppe Verde", sessions: 36, revenue: "€1,800", clients: 8 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your studio's performance and growth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trainer Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Trainer</th>
                  <th className="text-right py-3 px-4 font-medium">Sessions</th>
                  <th className="text-right py-3 px-4 font-medium">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium">Clients</th>
                </tr>
              </thead>
              <tbody>
                {trainerPerformance.map((trainer, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary text-sm font-medium">{trainer.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{trainer.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4">{trainer.sessions}</td>
                    <td className="text-right py-3 px-4 font-medium text-green-600">{trainer.revenue}</td>
                    <td className="text-right py-3 px-4">{trainer.clients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Session Packages</span>
                <span className="font-bold">€15,200 (62%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "62%" }} />
              </div>
              <div className="flex items-center justify-between">
                <span>Individual Services</span>
                <span className="font-bold">€6,150 (25%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }} />
              </div>
              <div className="flex items-center justify-between">
                <span>Group Classes</span>
                <span className="font-bold">€3,000 (13%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "13%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>New Clients (This Month)</span>
                <span className="font-bold text-green-600">+8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Churned Clients</span>
                <span className="font-bold text-red-600">-2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Net Growth</span>
                <span className="font-bold text-green-600">+6</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Avg. Client Lifetime</span>
                <span className="font-bold">8.5 months</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
