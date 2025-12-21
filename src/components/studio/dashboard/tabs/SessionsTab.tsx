import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, List, Clock, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { StudioSessionList, StudioSession } from "./sessions/StudioSessionList";
import { StudioCalendarView } from "./sessions/StudioCalendarView";
import { SessionRequestsTab, SessionRequest } from "./sessions/SessionRequestsTab";
import { CreateStudioSessionDialog } from "./sessions/CreateStudioSessionDialog";
import { SessionDetailsDialog } from "./sessions/SessionDetailsDialog";

export function SessionsTab() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [trainerFilter, setTrainerFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<StudioSession | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock data
  const trainers = [
    { id: "1", name: "Marco Rossi" },
    { id: "2", name: "Laura Bianchi" },
    { id: "3", name: "Giuseppe Verde" },
  ];

  const clients = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Michael Brown" },
    { id: "3", name: "Emma Wilson" },
    { id: "4", name: "Sofia Martinez" },
  ];

  const [sessions, setSessions] = useState<StudioSession[]>([
    {
      id: "1",
      title: "Personal Training",
      clientName: "Sarah Johnson",
      clientId: "1",
      trainerName: "Marco Rossi",
      trainerId: "1",
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endTime: "10:00",
      type: "personal",
      status: "confirmed",
      location: "Studio A",
    },
    {
      id: "2",
      title: "HIIT Class",
      clientName: "Group Session",
      trainerName: "Laura Bianchi",
      trainerId: "2",
      date: new Date().toISOString().split("T")[0],
      startTime: "10:00",
      endTime: "10:45",
      type: "group",
      status: "confirmed",
      participants: 8,
      maxParticipants: 12,
      location: "Main Hall",
    },
    {
      id: "3",
      title: "Strength Training",
      clientName: "Michael Brown",
      clientId: "2",
      trainerName: "Marco Rossi",
      trainerId: "1",
      date: new Date().toISOString().split("T")[0],
      startTime: "11:00",
      endTime: "12:00",
      type: "personal",
      status: "scheduled",
    },
    {
      id: "4",
      title: "Yoga Class",
      clientName: "Group Session",
      trainerName: "Giuseppe Verde",
      trainerId: "3",
      date: new Date().toISOString().split("T")[0],
      startTime: "16:00",
      endTime: "17:00",
      type: "group",
      status: "confirmed",
      participants: 15,
      maxParticipants: 20,
      location: "Yoga Room",
    },
  ]);

  const [requests, setRequests] = useState<SessionRequest[]>([
    {
      id: "1",
      clientName: "New Client",
      clientEmail: "new@example.com",
      requestedDate: new Date().toISOString().split("T")[0],
      requestedTime: "14:00",
      preferredTrainer: "Marco Rossi",
      sessionType: "personal",
      message: "I'd like to start with personal training focusing on weight loss.",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      clientName: "Anna Smith",
      clientEmail: "anna@example.com",
      requestedDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      requestedTime: "10:00",
      sessionType: "group",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  ]);

  // Filters
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.trainerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    const matchesTrainer = trainerFilter === "all" || session.trainerId === trainerFilter;
    return matchesSearch && matchesStatus && matchesTrainer;
  });

  // Stats
  const stats = {
    today: sessions.filter((s) => s.date === new Date().toISOString().split("T")[0]).length,
    confirmed: sessions.filter((s) => s.status === "confirmed").length,
    pending: requests.filter((r) => r.status === "pending").length,
  };

  // Handlers
  const handleCreateSession = (sessionData: Omit<StudioSession, "id">) => {
    const newSession: StudioSession = {
      ...sessionData,
      id: Date.now().toString(),
    };
    setSessions([newSession, ...sessions]);
    toast({
      title: "Session Created",
      description: `${newSession.title} has been scheduled`,
    });
  };

  const handleViewSession = (session: StudioSession) => {
    setSelectedSession(session);
    setIsDetailsDialogOpen(true);
  };

  const handleEditSession = (session: StudioSession) => {
    // In a real app, this would open an edit dialog
    toast({
      title: "Edit Session",
      description: `Editing ${session.title}...`,
    });
  };

  const handleCancelSession = (session: StudioSession) => {
    setSessions(sessions.map((s) =>
      s.id === session.id ? { ...s, status: "cancelled" as const } : s
    ));
    toast({
      title: "Session Cancelled",
      description: `${session.title} has been cancelled`,
    });
  };

  const handleApproveRequest = (request: SessionRequest, trainerId: string) => {
    const trainer = trainers.find((t) => t.id === trainerId);
    
    // Create session from request
    const newSession: StudioSession = {
      id: Date.now().toString(),
      title: request.sessionType === "personal" ? "Personal Training" : "Group Session",
      clientName: request.clientName,
      trainerName: trainer?.name || "",
      trainerId,
      date: request.requestedDate,
      startTime: request.requestedTime,
      endTime: `${parseInt(request.requestedTime.split(":")[0]) + 1}:00`,
      type: request.sessionType,
      status: "confirmed",
    };
    
    setSessions([newSession, ...sessions]);
    setRequests(requests.map((r) =>
      r.id === request.id ? { ...r, status: "approved" as const } : r
    ));
    
    toast({
      title: "Request Approved",
      description: `Session with ${request.clientName} has been scheduled`,
    });
  };

  const handleDeclineRequest = (request: SessionRequest, reason: string) => {
    setRequests(requests.map((r) =>
      r.id === request.id ? { ...r, status: "declined" as const } : r
    ));
    toast({
      title: "Request Declined",
      description: `Request from ${request.clientName} has been declined`,
    });
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setIsCreateDialogOpen(true);
  };

  const handleSelectSessionFromCalendar = (session: StudioSession) => {
    setSelectedSession(session);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sessions</h1>
          <p className="text-muted-foreground">Manage all studio training sessions</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{stats.today}</div>
              <p className="text-sm text-muted-foreground">Today's Sessions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <Clock className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <div className="relative">
              <Clock className="h-8 w-8 text-yellow-600" />
              {stats.pending > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {stats.pending}
                </Badge>
              )}
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Requests
              {stats.pending > 0 && (
                <Badge variant="destructive" className="ml-1">{stats.pending}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {activeTab === "list" && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sessions..."
                  className="pl-10 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={trainerFilter} onValueChange={setTrainerFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Trainer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trainers</SelectItem>
                  {trainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <TabsContent value="list" className="mt-6">
          <StudioSessionList
            sessions={filteredSessions}
            onViewSession={handleViewSession}
            onEditSession={handleEditSession}
            onCancelSession={handleCancelSession}
          />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <StudioCalendarView
            sessions={sessions}
            trainers={trainers}
            onSelectDate={handleSelectDate}
            onSelectSession={handleSelectSessionFromCalendar}
            onCreateSession={() => setIsCreateDialogOpen(true)}
          />
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <SessionRequestsTab
            requests={requests}
            trainers={trainers}
            onApprove={handleApproveRequest}
            onDecline={handleDeclineRequest}
          />
        </TabsContent>
      </Tabs>

      <CreateStudioSessionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateSession={handleCreateSession}
        trainers={trainers}
        clients={clients}
        initialDate={selectedDate || undefined}
      />

      <SessionDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        session={selectedSession}
        onEdit={handleEditSession}
        onCancel={handleCancelSession}
      />
    </div>
  );
}
