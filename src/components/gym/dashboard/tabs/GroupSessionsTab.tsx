import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Plus, Calendar, Users, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useGymGroupSessions } from "@/hooks/gym/useGymGroupSessions";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { CreateSessionDialog } from "./group-sessions/CreateSessionDialog";
import { SessionsList } from "./group-sessions/SessionsList";
import { SessionCalendar } from "./group-sessions/SessionCalendar";
import { GroupSessionAnalytics } from "./group-sessions/GroupSessionAnalytics";

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
    assignTrainer,
    cancelSession 
  } = useGymGroupSessions();

  const { isMobile, isTablet } = useResponsiveLayout();

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

      {/* Stats Cards - Mobile optimized */}
      <div className={`grid gap-4 ${
        isMobile 
          ? "grid-cols-2" 
          : isTablet 
            ? "grid-cols-4" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      }`}>
        <Card>
          <CardContent className={`flex items-center ${isMobile ? "p-4" : "p-6"}`}>
            <Users className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} text-primary`} />
            <div className={`${isMobile ? "ml-2" : "ml-4"}`}>
              <p className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>
                {isMobile ? "Total" : "Total Sessions"}
              </p>
              <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>{totalSessions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={`flex items-center ${isMobile ? "p-4" : "p-6"}`}>
            <Calendar className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} text-green-600`} />
            <div className={`${isMobile ? "ml-2" : "ml-4"}`}>
              <p className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>
                {isMobile ? "Active" : "Active Sessions"}
              </p>
              <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>{activeSessions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={`flex items-center ${isMobile ? "p-4" : "p-6"}`}>
            <Clock className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} text-orange-600`} />
            <div className={`${isMobile ? "ml-2" : "ml-4"}`}>
              <p className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>Upcoming</p>
              <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>{totalUpcoming}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={`flex items-center ${isMobile ? "p-4" : "p-6"}`}>
            <Users className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} text-blue-600`} />
            <div className={`${isMobile ? "ml-2" : "ml-4"}`}>
              <p className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>
                {isMobile ? "Participants" : "Total Participants"}
              </p>
              <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>{totalParticipants}</p>
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
        
        <Button onClick={() => setShowCreateDialog(true)} className={isMobile ? "w-full" : ""}>
          <Plus className="h-4 w-4 mr-2" />
          {isMobile ? "Create" : "Create Session"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Group Sessions Management</CardTitle>
          <CardDescription>View and manage your group fitness sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`mb-6 ${isMobile ? "grid w-full grid-cols-3" : ""}`}>
              <TabsTrigger value="sessions" className={`flex items-center ${isMobile ? "gap-1" : "gap-2"}`}>
                <Users className="h-4 w-4" />
                {isMobile ? "List" : "Sessions"}
              </TabsTrigger>
              <TabsTrigger value="calendar" className={`flex items-center ${isMobile ? "gap-1" : "gap-2"}`}>
                <Calendar className="h-4 w-4" />
                {isMobile ? "Cal" : "Calendar"}
              </TabsTrigger>
              <TabsTrigger value="analytics" className={`flex items-center ${isMobile ? "gap-1" : "gap-2"}`}>
                <Clock className="h-4 w-4" />
                {isMobile ? "Stats" : "Analytics"}
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
                  onCancelSession={cancelSession}
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
              <GroupSessionAnalytics />
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