import { FitnessProgressCard } from "@/components/client/overview/FitnessProgressCard";
import { UpcomingSessionsCard } from "@/components/client/overview/UpcomingSessionsCard";
import { QuickAnalyticsCard } from "@/components/client/overview/QuickAnalyticsCard";
import { ExpirationAlertsCard } from "@/components/common/ExpirationAlertsCard";
import { ClientCheckInCard } from "@/components/client/overview/checkin/ClientCheckInCard";
import { useEffect, useState } from "react";
import { SessionItem } from "@/types/sessions";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";
import { supabase } from "@/integrations/supabase/client";

interface OverviewProps {
  progressData: ProgressItem[];
  upcomingSessions: SessionItem[];
}

export function Overview({ progressData, upcomingSessions }: OverviewProps) {
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
        <QuickAnalyticsCard />
      </div>
    </div>
  );
}
