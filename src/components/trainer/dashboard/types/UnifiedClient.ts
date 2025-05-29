
import { SalesContact } from "../tabs/sales/types";

// Unified client interface that combines ClientItem and SalesContact data
export interface UnifiedClient extends SalesContact {
  // Additional fields for the Clients tab
  sessions: number;
  lastSession: string;
  goals?: Array<{
    id: string;
    type: string;
    description: string;
    progress: number;
  }>;
  programs?: Array<{
    name: string;
    type: string;
  }>;
}

// Helper function to convert SalesContact to UnifiedClient
export function createUnifiedClient(contact: SalesContact): UnifiedClient {
  // Generate realistic session data based on client tenure
  const clientSince = contact.clientSince ? new Date(contact.clientSince) : new Date();
  const monthsAsClient = Math.max(1, Math.floor((Date.now() - clientSince.getTime()) / (1000 * 60 * 60 * 24 * 30)));
  const sessions = Math.floor(monthsAsClient * (2 + Math.random() * 2)); // 2-4 sessions per month
  
  // Generate last session date (within last 2 weeks)
  const lastSessionDate = new Date();
  lastSessionDate.setDate(lastSessionDate.getDate() - Math.floor(Math.random() * 14));
  
  return {
    ...contact,
    sessions,
    lastSession: lastSessionDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    goals: generateGoalsForClient(contact.name),
    programs: generateProgramsForClient(contact.name)
  };
}

function generateGoalsForClient(clientName: string): Array<{
  id: string;
  type: string;
  description: string;
  progress: number;
}> {
  const goalTypes = [
    { type: "weight", description: "Lose 5kg" },
    { type: "strength", description: "Bench press 80kg" },
    { type: "endurance", description: "Run 10K" },
    { type: "flexibility", description: "Touch toes" }
  ];
  
  // Generate 1-3 goals per client
  const numGoals = 1 + Math.floor(Math.random() * 3);
  const selectedGoals = goalTypes.slice(0, numGoals);
  
  return selectedGoals.map((goal, index) => ({
    id: `goal-${clientName.replace(/\s+/g, '-').toLowerCase()}-${index}`,
    type: goal.type,
    description: goal.description,
    progress: Math.floor(Math.random() * 100)
  }));
}

function generateProgramsForClient(clientName: string): Array<{
  name: string;
  type: string;
}> {
  const programs = [
    { name: "Strength & Conditioning", type: "strength" },
    { name: "Weight Loss Program", type: "weight-loss" },
    { name: "Endurance Training", type: "endurance" },
    { name: "Flexibility & Mobility", type: "flexibility" }
  ];
  
  // Most clients have 1 program, some have 2
  const numPrograms = Math.random() > 0.7 ? 2 : 1;
  return programs.slice(0, numPrograms);
}
