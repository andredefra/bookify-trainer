
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionItem } from "@/types/sessions";
import { MobileSessionCard } from "./MobileSessionCard";

interface MobileTabsViewProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  upcomingSessions: SessionItem[];
  availableSessions: SessionItem[];
  pastSessions: SessionItem[];
  featuredSession: SessionItem;
  onViewDetails: (session: SessionItem) => void;
  onRegister: (session: SessionItem) => void;
  onAddToCalendar: (session: SessionItem) => void;
  onCancel: (session: SessionItem) => void;
  onJoinSession?: (session: SessionItem) => void;
}

export function MobileTabsView({
  activeTab,
  setActiveTab,
  upcomingSessions,
  availableSessions,
  pastSessions,
  featuredSession,
  onViewDetails,
  onRegister,
  onAddToCalendar,
  onCancel,
  onJoinSession
}: MobileTabsViewProps) {
  return (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="discover">Discover</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upcoming" className="mt-0 space-y-3">
        {upcomingSessions.map((session) => (
          <MobileSessionCard
            key={session.id}
            session={session}
            onViewDetails={onViewDetails}
            onRegister={onRegister}
            onAddToCalendar={onAddToCalendar}
            onCancel={onCancel}
            onJoinSession={onJoinSession}
          />
        ))}
        {upcomingSessions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No upcoming sessions. Discover new sessions to join!
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="discover" className="mt-0 space-y-3">
        <MobileSessionCard
          session={featuredSession}
          onViewDetails={onViewDetails}
          onRegister={onRegister}
          featured={true}
        />
        {availableSessions.map((session) => (
          <MobileSessionCard
            key={session.id}
            session={session}
            onViewDetails={onViewDetails}
            onRegister={onRegister}
          />
        ))}
      </TabsContent>
      
      <TabsContent value="past" className="mt-0 space-y-3">
        {pastSessions.map((session) => (
          <MobileSessionCard
            key={session.id}
            session={session}
            isPast={true}
          />
        ))}
        {pastSessions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No past sessions yet.
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
