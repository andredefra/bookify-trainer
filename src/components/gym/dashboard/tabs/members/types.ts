
export interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: string;
  status: string;
  platformActive: boolean;
  lastPlatformLogin: string;
  joinDate: string;
  trainingSessions: number;
  lastActive: string;
  image: string;
}

export type ViewMode = "table" | "cards";
