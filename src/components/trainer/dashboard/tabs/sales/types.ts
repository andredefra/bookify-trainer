
export interface SalesContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "lead" | "prospect" | "client" | "lost" | "terminated";
  notes?: string;
  company?: string;
  source?: string;
  assignedTo?: string;
  createdAt: string;
  lastUpdated: string;
  clientSince?: string;
  value?: number;
  nextAction?: string;
  nextActionDate?: string;
  gymStudio?: string;
}
