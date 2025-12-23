import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trainerPerformanceData, sourceColors } from './data/studioRevenueData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Users, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const StudioTrainerPerformance = () => {
  // Prepare chart data
  const chartData = trainerPerformanceData.map(t => ({
    name: t.trainerName.split(' ')[0],
    directRevenue: t.directRevenue,
    gymRevenue: t.gymRevenue,
    total: t.revenue
  }));

  // Calculate totals
  const totals = trainerPerformanceData.reduce((acc, t) => ({
    sessions: acc.sessions + t.sessionsCount,
    clients: acc.clients + t.clientsCount,
    revenue: acc.revenue + t.revenue,
    directRevenue: acc.directRevenue + t.directRevenue,
    gymRevenue: acc.gymRevenue + t.gymRevenue
  }), { sessions: 0, clients: 0, revenue: 0, directRevenue: 0, gymRevenue: 0 });

  const avgRetention = (trainerPerformanceData.reduce((s, t) => s + t.retentionRate, 0) / trainerPerformanceData.length).toFixed(0);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'up': return <Badge variant="outline" className="text-green-600 border-green-600">In crescita</Badge>;
      case 'down': return <Badge variant="outline" className="text-red-600 border-red-600">In calo</Badge>;
      default: return <Badge variant="outline">Stabile</Badge>;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium">€{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trainer Attivi</p>
                <p className="text-2xl font-bold">{trainerPerformanceData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fatturato Totale</p>
                <p className="text-2xl font-bold">€{totals.revenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sessioni Totali</p>
                <p className="text-2xl font-bold">{totals.sessions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Retention Media</p>
                <p className="text-2xl font-bold">{avgRetention}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart per Trainer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fatturato per Trainer (per Fonte)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="directRevenue" 
                  name="Vendite Dirette"
                  stackId="a" 
                  fill={sourceColors.direct} 
                />
                <Bar 
                  dataKey="gymRevenue" 
                  name="Gym Partner"
                  stackId="a" 
                  fill={sourceColors.gym} 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trainer Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dettaglio Performance Trainer</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trainer</TableHead>
                <TableHead className="text-center">Sessioni</TableHead>
                <TableHead className="text-center">Clienti</TableHead>
                <TableHead className="text-right">Diretto</TableHead>
                <TableHead className="text-right">Gym</TableHead>
                <TableHead className="text-right">Totale</TableHead>
                <TableHead className="text-center">Retention</TableHead>
                <TableHead className="text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainerPerformanceData.map((trainer) => (
                <TableRow key={trainer.trainerId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {trainer.trainerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{trainer.trainerName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{trainer.sessionsCount}</TableCell>
                  <TableCell className="text-center">{trainer.clientsCount}</TableCell>
                  <TableCell className="text-right">€{trainer.directRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{trainer.gymRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">€{trainer.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 justify-center">
                      <Progress value={trainer.retentionRate} className="h-2 w-16" />
                      <span className="text-sm">{trainer.retentionRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getTrendBadge(trainer.trend)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
