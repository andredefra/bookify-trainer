import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Plus, Calendar, Users, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useGymGroupSessions } from "@/hooks/gym/useGymGroupSessions";
import { CreateSessionDialog } from "./group-sessions/CreateSessionDialog";
import { SessionsList } from "./group-sessions/SessionsList";
import { SessionCalendar } from "./group-sessions/SessionCalendar";

export function GroupSessionsTab() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const { 
    sessions, 
    loading, 
    createSession, 
    updateSession, 
    scheduleSession,
    assignTrainer 
  } = useGymGroupSessions();

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.session_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => s.status === 'active').length;
  const totalUpcoming = sessions.reduce((sum, s) => sum + s.upcoming_count, 0);
  const totalParticipants = sessions.reduce((sum, s) => sum + s.total_participants, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Group Sessions</h1>
        <p className="text-muted-foreground">Manage your gym's group fitness sessions and classes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
              <p className="text-2xl font-bold">{totalSessions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-bold">{activeSessions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
              <p className="text-2xl font-bold">{totalUpcoming}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
              <p className="text-2xl font-bold">{totalParticipants}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full md:w-[300px]"
          />
        </div>
        
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Session
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Group Sessions Management</CardTitle>
          <CardDescription>View and manage your group fitness sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="sessions" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Sessions
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sessions">
              {loading ? (
                <div className="text-center py-8">Loading sessions...</div>
              ) : (
                <SessionsList 
                  sessions={filteredSessions}
                  onUpdateSession={updateSession}
                  onScheduleSession={scheduleSession}
                  onAssignTrainer={assignTrainer}
                />
              )}
            </TabsContent>
            
            <TabsContent value="calendar">
              <SessionCalendar 
                sessions={sessions}
                onScheduleSession={scheduleSession}
              />
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="text-center py-8 text-muted-foreground">
                Session analytics coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CreateSessionDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateSession={createSession}
      />
    </div>
  );
}