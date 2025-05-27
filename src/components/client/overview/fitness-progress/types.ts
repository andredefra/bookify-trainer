
export interface ProgressItem {
  id?: string;
  goal: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  lastUpdated?: string;
  createdAt?: string;
  logs?: GoalLog[];
}

export interface GoalLog {
  id: string;
  date: string;
  value: number;
  source: 'manual' | 'googleFit' | 'appleHealth';
  note?: string;
}

export interface BodyMeasurements {
  id?: string;
  date: string;
  waist?: number; // vita
  hips?: number; // fianchi
  thighs?: number; // cosce
  shoulders?: number; // spalle
  arms?: number; // braccia
  neck?: number; // collo
  bodyFatPercentage?: number; // calculated
  leanMass?: number; // calculated
  source: 'manual' | 'googleFit' | 'appleHealth';
}

export interface FitnessProgressCardProps {
  progressData: ProgressItem[];
  bodyMeasurements?: BodyMeasurements[];
  connectedApps?: {
    googleFit: boolean;
    appleHealth: boolean;
  };
}
