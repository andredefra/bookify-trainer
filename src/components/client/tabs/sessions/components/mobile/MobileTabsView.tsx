
import { useState } from "react";
import { SessionItem } from "@/types/sessions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MobileSessionCard } from "./MobileSessionCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MobileTabsViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  upcomingSessions: SessionItem[];
  availableSessions: SessionItem[];
  pastSessions: any[];
  featuredSession: SessionItem;
  onViewDetails: (session: SessionItem) => void;
  onRegister: (session: SessionItem) => void;
  onAddToCalendar: (session: SessionItem) => void;
  onCancel: (session: SessionItem) => void;
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
  onCancel
}: MobileTabsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredAvailableSessions = availableSessions.filter(session => 
    session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.trainer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      {/* Custom mobile tab selector */}
      <div className="flex w-full border rounded-md p-1 bg-muted/30 mb-4 sticky top-0 z-10">
        <Button
          variant={activeTab === "upcoming" ? "default" : "ghost"}
          className="flex-1 rounded-sm text-xs h-9"
          onClick={() => setActiveTab("upcoming")}
        >
          My Sessions
        </Button>
        <Button
          variant={activeTab === "discover" ? "default" : "ghost"}
          className="flex-1 rounded-sm text-xs h-9"
          onClick={() => setActiveTab("discover")}
        >
          Discover
        </Button>
        <Button
          variant={activeTab === "past" ? "default" : "ghost"}
          className="flex-1 rounded-sm text-xs h-9"
          onClick={() => setActiveTab("past")}
        >
          Past
        </Button>
      </div>
      
      {/* Search bar for discover tab */}
      {activeTab === "discover" && (
        <div className="mb-4 sticky top-14 z-10 bg-background pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sessions or trainers..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <ScrollArea className="pr-2">
        <div className="space-y-3 pb-20">
          {activeTab === "upcoming" && (
            upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <MobileSessionCard
                  key={session.id}
                  session={session}
                  onViewDetails={onViewDetails}
                  onRegister={onRegister}
                  onAddToCalendar={onAddToCalendar}
                  onCancel={onCancel}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                You have no upcoming sessions
              </div>
            )
          )}
          
          {activeTab === "discover" && (
            <>
              <MobileSessionCard
                session={featuredSession}
                onViewDetails={onViewDetails}
                onRegister={onRegister}
                featured={true}
              />
              
              {filteredAvailableSessions.length > 0 ? (
                filteredAvailableSessions.map((session) => (
                  <MobileSessionCard
                    key={session.id}
                    session={session}
                    onViewDetails={onViewDetails}
                    onRegister={onRegister}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No sessions found matching your search
                </div>
              )}
            </>
          )}
          
          {activeTab === "past" && (
            pastSessions.length > 0 ? (
              pastSessions.map((session) => (
                <MobileSessionCard
                  key={session.id}
                  session={{
                    ...session,
                    status: "completed"
                  }}
                  isPast={true}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                You have no past sessions
              </div>
            )
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
