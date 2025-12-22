import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Search, UserCog, User, Target, Activity, Dumbbell, 
  Package, FileText, Calendar, TrendingUp, Scale,
  Heart, Clock, CheckCircle2, MessageSquare
} from "lucide-react";
import { ChangeClientTrainerDialog } from "./ChangeClientTrainerDialog";
import { StudioClient } from "./StudioClientCard";

interface StudioClientProfileDialogProps {
  client: StudioClient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudioClientProfileDialog({ 
  client, 
  open, 
  onOpenChange 
}: StudioClientProfileDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showChangeTrainer, setShowChangeTrainer] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  if (!client) return null;

  // Mock detailed client data
  const clientDetails = {
    since: "March 2023",
    phone: "+39 333 1234567",
    dateOfBirth: "1990-05-15",
    height: "175 cm",
    weight: "78 kg",
    bodyFat: "18%",
    goals: [
      { id: "1", name: "Lose 5kg", progress: 60, target: 100, deadline: "2024-06-01" },
      { id: "2", name: "Run 10K", progress: 40, target: 100, deadline: "2024-07-15" },
      { id: "3", name: "Bench Press 100kg", progress: 85, target: 100, deadline: "2024-05-01" },
    ],
    metrics: {
      checkIns: 24,
      avgAttendance: 85,
      lastCheckIn: "2024-02-15",
      weightHistory: [82, 80, 79, 78.5, 78],
      bodyFatHistory: [22, 21, 20, 19, 18],
    },
    programs: [
      { id: "1", name: "Strength Building", progress: 65, status: "active", startDate: "2024-01-15" },
      { id: "2", name: "Cardio Endurance", progress: 100, status: "completed", startDate: "2023-11-01" },
    ],
    packages: [
      { id: "1", name: "Premium 20", sessionsUsed: 8, sessionsTotal: 20, status: "active", expiryDate: "2024-06-15" },
    ],
    notes: [
      { id: "1", date: "2024-02-10", content: "Prefers morning sessions. Previous knee injury - avoid deep squats.", author: client.trainerName },
      { id: "2", date: "2024-01-20", content: "Increased protein intake, seeing good results.", author: client.trainerName },
    ],
    upcomingSessions: [
      { date: "2024-02-20", time: "09:00", type: "Personal Training" },
      { date: "2024-02-22", time: "10:30", type: "Personal Training" },
    ],
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Client Profile
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {client.trainerName}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => setShowChangeTrainer(true)}>
                  <UserCog className="h-4 w-4 mr-1" />
                  Change Trainer
                </Button>
              </div>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search client information..."
                className="pl-9 bg-muted/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
              {/* Sidebar - Client Summary */}
              <div className="md:col-span-1">
                <Card className="h-full">
                  <CardContent className="pt-4">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarFallback className="text-xl bg-primary/10 text-primary">
                          {client.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold">{client.name}</h3>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                      <Badge className="mt-2" variant={client.status === "active" ? "default" : "secondary"}>
                        {client.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Member since</span>
                        <span>{clientDetails.since}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sessions</span>
                        <span>{client.sessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trainer</span>
                        <span>{client.trainerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Package</span>
                        <span>{client.package || "None"}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Quick Stats</p>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-lg font-bold">{clientDetails.metrics.avgAttendance}%</p>
                          <p className="text-xs text-muted-foreground">Attendance</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-lg font-bold">{clientDetails.goals.length}</p>
                          <p className="text-xs text-muted-foreground">Active Goals</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content - Tabs */}
              <div className="md:col-span-3 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                  <TabsList className="grid grid-cols-6 w-full">
                    <TabsTrigger value="overview" className="text-xs">
                      <Activity className="h-3 w-3 mr-1" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="goals" className="text-xs">
                      <Target className="h-3 w-3 mr-1" />
                      Goals
                    </TabsTrigger>
                    <TabsTrigger value="metrics" className="text-xs">
                      <Scale className="h-3 w-3 mr-1" />
                      Metrics
                    </TabsTrigger>
                    <TabsTrigger value="programs" className="text-xs">
                      <Dumbbell className="h-3 w-3 mr-1" />
                      Programs
                    </TabsTrigger>
                    <TabsTrigger value="packages" className="text-xs">
                      <Package className="h-3 w-3 mr-1" />
                      Packages
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      Notes
                    </TabsTrigger>
                  </TabsList>

                  <ScrollArea className="flex-1 mt-4">
                    {/* Overview Tab */}
                    <TabsContent value="overview" className="m-0">
                      <div className="space-y-4">
                        {/* Upcoming Sessions */}
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Upcoming Sessions
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-2">
                            {clientDetails.upcomingSessions.map((session, idx) => (
                              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{session.type}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(session.date).toLocaleDateString()} at {session.time}
                                </span>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <TrendingUp className="h-4 w-4" />
                              Recent Progress
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-2">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-muted/30 rounded">
                                <p className="text-2xl font-bold text-green-600">-4kg</p>
                                <p className="text-xs text-muted-foreground">Weight Change</p>
                              </div>
                              <div className="text-center p-3 bg-muted/30 rounded">
                                <p className="text-2xl font-bold text-blue-600">-4%</p>
                                <p className="text-xs text-muted-foreground">Body Fat</p>
                              </div>
                              <div className="text-center p-3 bg-muted/30 rounded">
                                <p className="text-2xl font-bold text-purple-600">85%</p>
                                <p className="text-xs text-muted-foreground">Consistency</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Active Goals Summary */}
                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              Active Goals
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-2 space-y-3">
                            {clientDetails.goals.slice(0, 3).map(goal => (
                              <div key={goal.id}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>{goal.name}</span>
                                  <span className="text-muted-foreground">{goal.progress}%</span>
                                </div>
                                <Progress value={goal.progress} className="h-2" />
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* Goals Tab */}
                    <TabsContent value="goals" className="m-0">
                      <div className="space-y-3">
                        {clientDetails.goals.map(goal => (
                          <Card key={goal.id}>
                            <CardContent className="py-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Target className="h-4 w-4 text-primary" />
                                  <span className="font-medium">{goal.name}</span>
                                </div>
                                <Badge variant={goal.progress >= 100 ? "default" : "secondary"}>
                                  {goal.progress >= 100 ? "Completed" : "In Progress"}
                                </Badge>
                              </div>
                              <Progress value={goal.progress} className="h-2 mb-2" />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{goal.progress}% complete</span>
                                <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Metrics Tab */}
                    <TabsContent value="metrics" className="m-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <Card>
                            <CardContent className="py-4 text-center">
                              <Scale className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                              <p className="text-2xl font-bold">{clientDetails.weight}</p>
                              <p className="text-xs text-muted-foreground">Current Weight</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="py-4 text-center">
                              <Activity className="h-6 w-6 mx-auto mb-2 text-green-500" />
                              <p className="text-2xl font-bold">{clientDetails.bodyFat}</p>
                              <p className="text-xs text-muted-foreground">Body Fat</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="py-4 text-center">
                              <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
                              <p className="text-2xl font-bold">{clientDetails.height}</p>
                              <p className="text-xs text-muted-foreground">Height</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="py-4 text-center">
                              <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                              <p className="text-2xl font-bold">{clientDetails.metrics.checkIns}</p>
                              <p className="text-xs text-muted-foreground">Check-ins</p>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader className="py-3">
                            <CardTitle className="text-sm">Weight History</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-end gap-2 h-24">
                              {clientDetails.metrics.weightHistory.map((w, idx) => (
                                <div 
                                  key={idx} 
                                  className="flex-1 bg-primary/20 rounded-t"
                                  style={{ height: `${(w - 75) * 10}%` }}
                                />
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* Programs Tab */}
                    <TabsContent value="programs" className="m-0">
                      <div className="space-y-3">
                        {clientDetails.programs.map(program => (
                          <Card key={program.id}>
                            <CardContent className="py-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Dumbbell className="h-4 w-4 text-purple-500" />
                                  <span className="font-medium">{program.name}</span>
                                </div>
                                <Badge variant={program.status === "active" ? "default" : "secondary"}>
                                  {program.status}
                                </Badge>
                              </div>
                              <Progress value={program.progress} className="h-2 mb-2" />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{program.progress}% complete</span>
                                <span>Started: {new Date(program.startDate).toLocaleDateString()}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Packages Tab */}
                    <TabsContent value="packages" className="m-0">
                      <div className="space-y-3">
                        {clientDetails.packages.map(pkg => (
                          <Card key={pkg.id}>
                            <CardContent className="py-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Package className="h-4 w-4 text-green-500" />
                                  <span className="font-medium">{pkg.name}</span>
                                </div>
                                <Badge variant={pkg.status === "active" ? "default" : "secondary"}>
                                  {pkg.status}
                                </Badge>
                              </div>
                              <Progress 
                                value={(pkg.sessionsUsed / pkg.sessionsTotal) * 100} 
                                className="h-2 mb-2" 
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{pkg.sessionsUsed} / {pkg.sessionsTotal} sessions used</span>
                                <span>Expires: {new Date(pkg.expiryDate).toLocaleDateString()}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Notes Tab */}
                    <TabsContent value="notes" className="m-0">
                      <div className="space-y-3">
                        {clientDetails.notes.map(note => (
                          <Card key={note.id}>
                            <CardContent className="py-4">
                              <div className="flex items-start gap-3">
                                <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
                                <div className="flex-1">
                                  <p className="text-sm">{note.content}</p>
                                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                    <span>By {note.author}</span>
                                    <span>{new Date(note.date).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ChangeClientTrainerDialog
        open={showChangeTrainer}
        onOpenChange={setShowChangeTrainer}
        clientName={client.name}
        currentTrainerId={client.trainerId}
        currentTrainerName={client.trainerName}
      />
    </>
  );
}
