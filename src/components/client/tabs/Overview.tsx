
import { FitnessProgressCard } from "@/components/client/overview/FitnessProgressCard";
import { UpcomingSessionsCard } from "@/components/client/overview/UpcomingSessionsCard";
import { TrainerCard } from "@/components/client/overview/TrainerCard";
import { MessagesCard } from "@/components/client/overview/MessagesCard";
import { useEffect, useState } from "react";
import { Info, CheckCircle } from "lucide-react";
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

  // Set trainer as premium
  useEffect(() => {
    localStorage.setItem('trainerIsPremium', 'true');
  }, []);

  // Check if trainer has premium features
  const hasPremiumTrainer = localStorage.getItem('trainerIsPremium') === 'true';

  return (
    <div className="space-y-6">
      {hasPremiumTrainer && (
        <div className="bg-green-50 border border-green-100 rounded-md p-4">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-700 mb-1">Premium Training Plan</h3>
              <p className="text-sm text-green-600">
                Your trainer is on a premium plan. You have access to all advanced features including custom training programs, detailed progress tracking, and priority support.
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
