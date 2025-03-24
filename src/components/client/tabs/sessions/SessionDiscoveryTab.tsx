
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SessionCard } from "./SessionCard";

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
  price?: number;
  attendees?: number;
  maxAttendees?: number;
  description?: string;
}

interface SessionDiscoveryTabProps {
  availableSessions: SessionItem[];
  onViewDetails: (session: SessionItem) => void;
  onRegister: (session: SessionItem) => void;
}

export function SessionDiscoveryTab({
  availableSessions,
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
