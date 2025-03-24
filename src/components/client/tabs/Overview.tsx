
import { FitnessProgressCard } from "@/components/client/overview/FitnessProgressCard";
import { UpcomingSessionsCard } from "@/components/client/overview/UpcomingSessionsCard";
import { TrainerCard } from "@/components/client/overview/TrainerCard";
import { MessagesCard } from "@/components/client/overview/MessagesCard";

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
  return (
    <div className="space-y-6">
      <FitnessProgressCard progressData={progressData} />
      <UpcomingSessionsCard upcomingSessions={upcomingSessions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrainerCard />
        <MessagesCard messages={trainerMessages} />
      </div>
    </div>
  );
}
