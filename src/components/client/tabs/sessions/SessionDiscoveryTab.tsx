
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SessionCard } from "./SessionCard";
import { SessionItem } from "@/types/sessions";

interface SessionDiscoveryTabProps {
  availableSessions: SessionItem[];
  featuredSession: SessionItem;
  onViewDetails: (session: SessionItem) => void;
  onRegister: (session: SessionItem) => void;
}

export function SessionDiscoveryTab({
  availableSessions,
  featuredSession,
  onViewDetails,
  onRegister
}: SessionDiscoveryTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSessions = availableSessions.filter(session => 
    session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.trainer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for sessions or trainers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Featured session at the top */}
        <SessionCard
          session={featuredSession}
          onViewDetails={onViewDetails}
          onRegister={onRegister}
          variant="featured"
        />
        
        {filteredSessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onViewDetails={onViewDetails}
            onRegister={onRegister}
          />
        ))}
      </div>
    </>
  );
}
