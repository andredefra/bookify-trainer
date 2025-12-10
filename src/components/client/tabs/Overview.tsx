import { FitnessProgressCard } from "@/components/client/overview/FitnessProgressCard";
import { UpcomingSessionsCard } from "@/components/client/overview/UpcomingSessionsCard";
import { TrainerCard } from "@/components/client/overview/TrainerCard";
import { MessagesCard } from "@/components/client/overview/MessagesCard";
import { ExpirationAlertsCard } from "@/components/common/ExpirationAlertsCard";
import { ClientCheckInCard } from "@/components/client/overview/checkin/ClientCheckInCard";
import { useEffect, useState } from "react";
import { SessionItem } from "@/types/sessions";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";
import { supabase } from "@/integrations/supabase/client";

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
  const [clientId, setClientId] = useState<string>('00000000-0000-0000-0000-000000000002');
  const [connectedApps, setConnectedApps] = useState({
    googleFit: false,
    appleHealth: false
  });

  // Fetch current user ID
  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setClientId(user.id);
      }
    };
    fetchUserId();
  }, []);

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
      <ClientCheckInCard clientId={clientId} />
      <UpcomingSessionsCard upcomingSessions={upcomingSessions} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpirationAlertsCard />
        <TrainerCard />
      </div>
      <MessagesCard messages={trainerMessages} />
    </div>
  );
}
