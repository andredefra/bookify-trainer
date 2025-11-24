import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AllClientsOverviewProps {
  clients: Array<{ id: string; name: string }>;
}

export function AllClientsOverview({ clients }: AllClientsOverviewProps) {
  const activeClients = clients.length;
  // Mock total sessions calculation
  const totalSessions = activeClients * 12; // Assume avg 12 sessions per client
  const avgSessions = Math.round(totalSessions / activeClients);
  
  // Calculate retention distribution
  const retentionData = [
    { period: "1-3 months", clients: Math.floor(activeClients * 0.25), fill: "hsl(var(--chart-1))" },
    { period: "3-6 months", clients: Math.floor(activeClients * 0.35), fill: "hsl(var(--chart-2))" },
    { period: "6-12 months", clients: Math.floor(activeClients * 0.25), fill: "hsl(var(--chart-3))" },
    { period: "12+ months", clients: Math.floor(activeClients * 0.15), fill: "hsl(var(--chart-4))" },
  ];
  
  const retentionRate = 87; // Mock retention rate
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">{activeClients}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Retention Rate</p>
                <p className="text-2xl font-bold">{retentionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Sessions/Client</p>
                <p className="text-2xl font-bold">{avgSessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Retention Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Client Retention Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="period" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="clients" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
