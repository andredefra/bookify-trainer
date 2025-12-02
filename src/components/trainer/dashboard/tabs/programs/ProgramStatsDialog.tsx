import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { ChevronDown, Dumbbell, TrendingUp, Target, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface SessionStats {
  id: string;
  sessionNumber: number;
  title: string;
  completedDate?: string;
  duration?: number;
  totalVolume: number;
  exercises: {
    name: string;
    weightUsed: number;
    maxAchieved: number;
    sets: number;
    reps: string;
  }[];
  completed: boolean;
}

interface ProgramStatsData {
  clientName: string;
  programName: string;
  totalSessions: number;
  completedSessions: number;
  progressPercentage: number;
  totalVolume: number;
  averageSessionDuration: number;
  bestLifts: { exercise: string; weight: number; date: string }[];
  weeklyVolume: { week: string; volume: number }[];
  sessions: SessionStats[];
}

interface ProgramStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statsData: ProgramStatsData | null;
}

export function ProgramStatsDialog({ open, onOpenChange, statsData }: ProgramStatsDialogProps) {
  const [openSessions, setOpenSessions] = useState<string[]>([]);

  if (!statsData) return null;

  const toggleSession = (sessionId: string) => {
    setOpenSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const kpiCards = [
    {
      title: "Sessions Completed",
      value: `${statsData.completedSessions}/${statsData.totalSessions}`,
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Progress",
      value: `${statsData.progressPercentage}%`,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Total Volume",
      value: `${(statsData.totalVolume / 1000).toFixed(1)}k kg`,
      icon: Dumbbell,
      color: "text-purple-600"
    },
    {
      title: "Avg. Duration",
      value: `${statsData.averageSessionDuration} min`,
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Program Statistics - {statsData.clientName}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{statsData.programName}</p>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions Detail</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpiCards.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                      <span className="text-xs text-muted-foreground">{kpi.title}</span>
                    </div>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Best Lifts Chart */}
            <Card>
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Best Lifts (1RM)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={statsData.bestLifts} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" unit=" kg" />
                    <YAxis dataKey="exercise" type="category" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value: number) => [`${value} kg`, 'Max Weight']}
                      labelFormatter={(label) => `Exercise: ${label}`}
                    />
                    <Bar dataKey="weight" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Volume Trend */}
            <Card>
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Weekly Volume Trend
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={statsData.weeklyVolume}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => [`${value} kg`, 'Volume']} />
                    <Line 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-3 mt-4">
            {statsData.sessions.map((session) => (
              <Collapsible 
                key={session.id}
                open={openSessions.includes(session.id)}
                onOpenChange={() => toggleSession(session.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <Card className={`hover:bg-accent/50 transition-colors ${session.completed ? 'border-green-200' : ''}`}>
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            session.completed ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                          }`}>
                            {session.sessionNumber}
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{session.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {session.exercises.length} exercises • {session.totalVolume} kg volume
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {session.completed ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {session.completedDate}
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            openSessions.includes(session.id) ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-1 ml-4 border-l-4 border-primary">
                    <CardContent className="py-3">
                      <div className="space-y-2">
                        {session.exercises.map((exercise, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                            <div>
                              <p className="font-medium text-sm">{exercise.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {exercise.sets} sets × {exercise.reps}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">{exercise.weightUsed} kg</p>
                              {exercise.maxAchieved > 0 && (
                                <p className="text-xs text-green-600">
                                  Max: {exercise.maxAchieved} kg
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {session.duration && (
                        <div className="mt-3 pt-2 border-t flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Duration: {session.duration} minutes
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
