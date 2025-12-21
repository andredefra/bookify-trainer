import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Calendar, ArrowUp, ArrowDown } from "lucide-react";

export function AnalyticsTab() {
  const stats = [
    { label: "Total Revenue", value: "€24,350", change: "+18%", up: true, icon: DollarSign },
    { label: "Active Clients", value: "47", change: "+12%", up: true, icon: Users },
    { label: "Sessions Completed", value: "312", change: "+25%", up: true, icon: Calendar },
    { label: "Client Retention", value: "94%", change: "+3%", up: true, icon: TrendingUp },
  ];

  const trainerPerformance = [
    { name: "Marco Rossi", sessions: 48, revenue: 2400, clients: 12, trend: "+15%" },
    { name: "Laura Bianchi", sessions: 42, revenue: 2100, clients: 10, trend: "+8%" },
    { name: "Giuseppe Verde", sessions: 36, revenue: 1800, clients: 8, trend: "+12%" },
  ];

  const revenueBreakdown = [
    { source: "Session Packages", amount: 15200, percentage: 62 },
    { source: "Individual Services", amount: 6150, percentage: 25 },
    { source: "Group Classes", amount: 3000, percentage: 13 },
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
              <div className="flex items-center gap-1">
                {stat.up ? <ArrowUp className="h-3 w-3 text-green-600" /> : <ArrowDown className="h-3 w-3 text-red-600" />}
                <p className={`text-xs ${stat.up ? 'text-green-600' : 'text-red-600'}`}>{stat.change} from last month</p>
              </div>
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
                  <th className="text-right py-3 px-4 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {trainerPerformance.map((trainer, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary text-sm font-medium">{trainer.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{trainer.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4">{trainer.sessions}</td>
                    <td className="text-right py-3 px-4 font-medium text-green-600">€{trainer.revenue.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{trainer.clients}</td>
                    <td className="text-right py-3 px-4 text-green-600">{trainer.trend}</td>
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
          <CardContent className="space-y-4">
            {revenueBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{item.source}</span>
                  <span className="font-bold">€{item.amount.toLocaleString()} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
