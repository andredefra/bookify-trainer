
import { FitnessProgressCard } from "@/components/client/overview/FitnessProgressCard";
import { UpcomingSessionsCard } from "@/components/client/overview/UpcomingSessionsCard";
import { TrainerCard } from "@/components/client/overview/TrainerCard";
import { MessagesCard } from "@/components/client/overview/MessagesCard";
import { useEffect, useState } from "react";
import { InfoCircle } from "lucide-react";

interface ProgressItem {
  goal: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
}

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
  price?: number; // Adding optional price field
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

  // Check if trainer has premium features
  const hasPremiumTrainer = localStorage.getItem('trainerIsPremium') === 'true';

  return (
    <div className="space-y-6">
      {!hasPremiumTrainer && (
        <div className="bg-amber-50 border border-amber-100 rounded-md p-4">
          <div className="flex gap-3">
            <InfoCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-700 mb-1">Basic Training Plan</h3>
              <p className="text-sm text-amber-600">
                Your trainer is on a basic plan. Advanced features like custom training programs and detailed progress tracking will be available if they upgrade to a premium plan.
              </p>
            </div>
          </div>
        </div>
      )}
      
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
