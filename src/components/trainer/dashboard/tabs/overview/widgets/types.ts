export interface BaseWidgetProps {
  className?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: "default" | "secondary" | "outline";
}

export interface SessionAgenda {
  id: string;
  time: string;
  clientName: string;
  clientAvatar?: string;
  type: string;
  duration: number;
  isPaid: boolean;
  status: "upcoming" | "in-progress" | "completed";
}

export interface ClientActivity {
  id: string;
  clientName: string;
  clientAvatar?: string;
  action: string;
  type: "session" | "program" | "message" | "payment" | "goal";
  timestamp: string;
  relativeTime: string;
}

export interface RevenueData {
  date: string;
  revenue: number;
}

export interface Message {
  id: string;
  from: string;
  fromAvatar?: string;
  preview: string;
  time: string;
  isRead: boolean;
  isUrgent?: boolean;
}

export interface PerformanceMetric {
  id: string;
  label: string;
  value: string | number;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface PackageSale {
  packageName: string;
  soldCount: number;
  revenue: number;
}

export interface TrainerGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}
