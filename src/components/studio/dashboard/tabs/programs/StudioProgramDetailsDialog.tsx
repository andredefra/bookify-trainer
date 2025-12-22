import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import {
  Calendar,
  Users,
  Dumbbell,
  Clock,
  User,
  Edit,
  UserPlus,
  TrendingUp,
  DollarSign,
  ChevronDown,
  CheckCircle2,
  Target,
  BarChart3,
} from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  clients: number;
  weeks: number;
  status: "active" | "draft" | "archived";
  trainerName?: string;
  trainerId?: string;
  createdAt: string;
  exercises?: Exercise[];
}

interface StudioProgramDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: Program | null;
  onEdit: (program: Program) => void;
  onAssign: (program: Program) => void;
}

// Mock clients data for this program
const mockClients = [
  { id: "c1", name: "Sarah Johnson", progress: 33, sessionsCompleted: 8, totalSessions: 24, status: "on_track" },
  { id: "c2", name: "Michael Brown", progress: 75, sessionsCompleted: 12, totalSessions: 16, status: "ahead" },
  { id: "c3", name: "Emma Wilson", progress: 50, sessionsCompleted: 6, totalSessions: 12, status: "behind" },
];

// Mock session data
const mockSessions = [
  {
    id: "s1",
    sessionNumber: 1,
    title: "Week 1 - Day 1",
    exercises: [
      { name: "Barbell Squat", sets: 4, reps: "8-10", rest: "90s" },
      { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s" },
    ],
    avgCompletion: 100,
    avgVolume: 5600,
  },
  {
    id: "s2",
    sessionNumber: 2,
    title: "Week 1 - Day 2",
    exercises: [
      { name: "Deadlift", sets: 3, reps: "6-8", rest: "120s" },
      { name: "Rows", sets: 4, reps: "10-12", rest: "60s" },
    ],
    avgCompletion: 85,
    avgVolume: 6200,
  },
  {
    id: "s3",
    sessionNumber: 3,
    title: "Week 1 - Day 3",
    exercises: [
      { name: "Leg Press", sets: 4, reps: "12-15", rest: "60s" },
      { name: "Lunges", sets: 3, reps: "12 each", rest: "60s" },
    ],
    avgCompletion: 70,
    avgVolume: 4800,
  },
];

// Mock stats data
const mockStats = {
  totalRevenue: 1495,
  totalClients: 5,
  avgCompletion: 52,
  avgRating: 4.7,
  completionByWeek: [
    { week: "W1", completion: 95 },
    { week: "W2", completion: 88 },
    { week: "W3", completion: 82 },
    { week: "W4", completion: 75 },
    { week: "W5", completion: 68 },
    { week: "W6", completion: 60 },
  ],
  clientStatusDistribution: [
    { name: "On Track", value: 3, color: "#22c55e" },
    { name: "Ahead", value: 1, color: "#3b82f6" },
    { name: "Behind", value: 1, color: "#f97316" },
  ],
};

const sampleExercises: Exercise[] = [
  { id: "1", name: "Barbell Squat", sets: 4, reps: "8-10", rest: "90s", notes: "Focus on depth" },
  { id: "2", name: "Romanian Deadlift", sets: 3, reps: "10-12", rest: "60s" },
  { id: "3", name: "Leg Press", sets: 3, reps: "12-15", rest: "60s" },
  { id: "4", name: "Walking Lunges", sets: 3, reps: "12 each", rest: "45s" },
];

export function StudioProgramDetailsDialog({
  open,
  onOpenChange,
  program,
  onEdit,
  onAssign,
}: StudioProgramDetailsDialogProps) {
  const [openSessions, setOpenSessions] = useState<string[]>([]);

  if (!program) return null;

  const exercises = program.exercises || sampleExercises;

  const toggleSession = (sessionId: string) => {
    setOpenSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ahead":
        return <Badge className="bg-blue-100 text-blue-800">Ahead</Badge>;
      case "behind":
        return <Badge variant="destructive">Behind</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">On Track</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{program.name}</DialogTitle>
            <Badge variant={program.status === "active" ? "default" : "secondary"}>
              {program.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{program.description}</p>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[450px] mt-4 pr-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{program.weeks} weeks</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">{program.clients} clients</p>
                    <p className="text-xs text-muted-foreground">Enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Dumbbell className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">{exercises.length} exercises</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">€{mockStats.totalRevenue}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              </div>

              {program.trainerName && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created by:</span>
                  <span className="font-medium">{program.trainerName}</span>
                </div>
              )}

              <Separator />

              {/* Exercises List */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Exercises
                </h4>
                <div className="space-y-2">
                  {exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className="flex items-center justify-between p-3 bg-background border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-sm">{exercise.name}</p>
                          {exercise.notes && (
                            <p className="text-xs text-muted-foreground">{exercise.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{exercise.sets} sets</span>
                        <span>×</span>
                        <span>{exercise.reps}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {exercise.rest}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions" className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Session breakdown with average completion rates across all clients.
              </p>
              {mockSessions.map((session) => (
                <Collapsible
                  key={session.id}
                  open={openSessions.includes(session.id)}
                  onOpenChange={() => toggleSession(session.id)}
                >
                  <CollapsibleTrigger className="w-full">
                    <Card className="hover:bg-accent/50 transition-colors">
                      <CardContent className="py-3 px-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                              {session.sessionNumber}
                            </div>
                            <div className="text-left">
                              <p className="font-medium">{session.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {session.exercises.length} exercises • Avg volume: {session.avgVolume} kg
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={
                                session.avgCompletion >= 90
                                  ? "bg-green-100 text-green-800"
                                  : session.avgCompletion >= 70
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-800"
                              }
                            >
                              {session.avgCompletion}% avg completion
                            </Badge>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                openSessions.includes(session.id) ? "rotate-180" : ""
                              }`}
                            />
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
                            <div
                              key={idx}
                              className="flex items-center justify-between py-2 border-b last:border-0"
                            >
                              <div>
                                <p className="font-medium text-sm">{exercise.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {exercise.sets} sets × {exercise.reps}
                                </p>
                              </div>
                              <div className="text-right text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {exercise.rest}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Clients enrolled in this program with their progress.
              </p>
              {mockClients.map((client) => (
                <Card key={client.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-medium">
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {client.sessionsCompleted}/{client.totalSessions} sessions
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(client.status)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{client.progress}%</span>
                      </div>
                      <Progress value={client.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-muted-foreground">Revenue</span>
                    </div>
                    <p className="text-2xl font-bold">€{mockStats.totalRevenue}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-xs text-muted-foreground">Clients</span>
                    </div>
                    <p className="text-2xl font-bold">{mockStats.totalClients}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-orange-600" />
                      <span className="text-xs text-muted-foreground">Avg Completion</span>
                    </div>
                    <p className="text-2xl font-bold">{mockStats.avgCompletion}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="text-xs text-muted-foreground">Avg Rating</span>
                    </div>
                    <p className="text-2xl font-bold">{mockStats.avgRating}/5</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Completion Rate by Week
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mockStats.completionByWeek}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} unit="%" />
                      <Tooltip formatter={(value: number) => [`${value}%`, "Completion"]} />
                      <Bar dataKey="completion" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Client Status Distribution
                  </h3>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={mockStats.clientStatusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {mockStats.clientStatusDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              onAssign(program);
              onOpenChange(false);
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Assign to Client
          </Button>
          <Button
            onClick={() => {
              onEdit(program);
              onOpenChange(false);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Program
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
