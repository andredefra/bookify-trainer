import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, TrendingUp, Target, Award, AlertCircle, 
  BarChart3, UserCheck, Clock, Star
} from "lucide-react";
import { StudioClient } from "./StudioClientCard";

interface Trainer {
  id: string;
  name: string;
}

interface StudioPerformanceAnalyticsProps {
  clients: StudioClient[];
  trainers: Trainer[];
}

export function StudioPerformanceAnalytics({ clients, trainers }: StudioPerformanceAnalyticsProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<string>("all");
  const [timeframe, setTimeframe] = useState("weekly");

  // Filter clients by trainer
  const filteredClients = selectedTrainer === "all" 
    ? clients 
    : clients.filter(c => c.trainerId === selectedTrainer);

  // Calculate aggregated stats
  const stats = {
    totalClients: filteredClients.length,
    activeClients: filteredClients.filter(c => c.status === "active").length,
    totalSessions: filteredClients.reduce((sum, c) => sum + c.sessions, 0),
    avgSessionsPerClient: Math.round(filteredClients.reduce((sum, c) => sum + c.sessions, 0) / filteredClients.length) || 0,
    clientsWithGoals: filteredClients.filter(c => (c.activeGoals || 0) > 0).length,
    clientsNeedingAttention: filteredClients.filter(c => c.status === "inactive" || (c.sessionsLeft && c.sessionsLeft < 3)).length,
  };

  // Calculate trainer performance
  const trainerPerformance = trainers.map(t => {
    const trainerClients = clients.filter(c => c.trainerId === t.id);
    const activeClients = trainerClients.filter(c => c.status === "active").length;
    const totalSessions = trainerClients.reduce((sum, c) => sum + c.sessions, 0);
    const retentionRate = trainerClients.length > 0 
      ? Math.round((activeClients / trainerClients.length) * 100) 
      : 0;
    
    return {
      id: t.id,
      name: t.name,
      totalClients: trainerClients.length,
      activeClients,
      totalSessions,
      avgSessions: Math.round(totalSessions / trainerClients.length) || 0,
      retentionRate,
      goalsAchieved: Math.floor(Math.random() * 15) + 5, // Mock data
    };
  }).sort((a, b) => b.retentionRate - a.retentionRate);

  // Top performing clients
  const topClients = [...filteredClients]
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 5);

  // Clients needing attention
  const clientsNeedingAttention = filteredClients
    .filter(c => c.status === "inactive" || (c.sessionsLeft && c.sessionsLeft < 3))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Trainers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trainers</SelectItem>
            {trainers.map(t => (
              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Last 7 Days</SelectItem>
            <SelectItem value="monthly">Last 30 Days</SelectItem>
            <SelectItem value="quarterly">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalClients}</p>
                <p className="text-sm text-muted-foreground">Total Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.activeClients}</p>
                <p className="text-sm text-muted-foreground">Active Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.avgSessionsPerClient}</p>
                <p className="text-sm text-muted-foreground">Avg Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">{stats.clientsNeedingAttention}</p>
                <p className="text-sm text-muted-foreground">Need Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trainer Performance */}
      {selectedTrainer === "all" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trainer Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainerPerformance.map((trainer, idx) => (
                <div key={trainer.id} className="flex items-center gap-4">
                  <div className="w-6 text-center">
                    {idx === 0 && <Award className="h-5 w-5 text-yellow-500 mx-auto" />}
                    {idx === 1 && <Award className="h-5 w-5 text-gray-400 mx-auto" />}
                    {idx === 2 && <Award className="h-5 w-5 text-amber-600 mx-auto" />}
                    {idx > 2 && <span className="text-muted-foreground">{idx + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{trainer.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {trainer.totalClients} clients
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {trainer.totalSessions} sessions
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={trainer.retentionRate} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-12">
                        {trainer.retentionRate}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Retention Rate • {trainer.goalsAchieved} goals achieved
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Performing Clients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Top Performing Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClients.map((client, idx) => (
                <div key={client.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary w-6">{idx + 1}</span>
                    <div>
                      <p className="font-medium text-sm">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.trainerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{client.sessions}</p>
                    <p className="text-xs text-muted-foreground">sessions</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clients Needing Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Clients Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clientsNeedingAttention.length > 0 ? (
                clientsNeedingAttention.map(client => (
                  <div key={client.id} className="flex items-center justify-between p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                    <div>
                      <p className="font-medium text-sm">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.trainerName}</p>
                    </div>
                    <Badge variant="outline" className="text-amber-600 border-amber-500">
                      {client.status === "inactive" ? "Inactive" : `${client.sessionsLeft} sessions left`}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <UserCheck className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>All clients are on track!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goals Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-primary">{stats.clientsWithGoals}</p>
              <p className="text-sm text-muted-foreground">Clients with Goals</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-green-500">24</p>
              <p className="text-sm text-muted-foreground">Goals Achieved</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-blue-500">18</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-purple-500">76%</p>
              <p className="text-sm text-muted-foreground">Avg Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
