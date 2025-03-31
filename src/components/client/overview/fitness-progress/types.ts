
export interface ProgressItem {
  id?: string;
  goal: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  lastUpdated?: string;
}

export interface FitnessProgressCardProps {
  progressData: ProgressItem[];
  connectedApps?: {
    googleFit: boolean;
    appleHealth: boolean;
  };
}
