
import { FitnessProgressCard } from "@/components/client/overview/FitnessProgressCard";
import { UpcomingSessionsCard } from "@/components/client/overview/UpcomingSessionsCard";
import { TrainerCard } from "@/components/client/overview/TrainerCard";
import { MessagesCard } from "@/components/client/overview/MessagesCard";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { SessionItem, SessionStatus } from "@/types/sessions";

interface ProgressItem {
  goal: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
}

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
  read: boolean;
}

interface OverviewProps {
  progressData: ProgressItem[];
  upcomingSessions: SessionItem[];
  trainerMessages: MessageItem[];
}

export function Overview({ progressData, upcomingSessions, trainerMessages }: OverviewProps) {
  // Get connected apps state from localStorage or default to false
  const [connectedApps, setConnectedApps] = useState({
    googleFit: false,
    appleHealth: false
  });

  // Check local storage for connected apps when component mounts
  useEffect(() => {
    const storedGoogleFit = localStorage.getItem('googleFitConnected') === 'true';
    const storedAppleHealth = localStorage.getItem('appleHealthConnected') === 'true';
    
    setConnectedApps({
      googleFit: storedGoogleFit,
      appleHealth: storedAppleHealth
    });
  }, []);

  return (
    <div className="space-y-6">
      <FitnessProgressCard 
        progressData={progressData} 
        connectedApps={connectedApps} 
      />
      <UpcomingSessionsCard upcomingSessions={upcomingSessions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrainerCard />
        <MessagesCard messages={trainerMessages} />
      </div>
    </div>
  );
}
