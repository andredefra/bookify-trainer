
import { ClientData } from '../utils/metricsCalculator';

// Mock client data with realistic fitness metrics
export const mockClients: ClientData[] = [
  {
    id: 'client1',
    name: 'Sarah Johnson',
    age: 28,
    height: 165, // cm
    currentWeight: 68, // kg
    targetWeight: 65, // kg
    goals: [
      {
        id: 'goal1',
        target: 65,
        current: 68,
        type: 'weight',
        deadline: new Date('2024-06-01'),
        createdAt: new Date('2024-01-01')
      },
      {
        id: 'goal2',
        target: 80,
        current: 70,
        type: 'strength',
        deadline: new Date('2024-05-01'),
        createdAt: new Date('2024-01-15')
      }
    ],
    sessions: [
      // Last 6 weeks of sessions
      ...generateSessionsForWeeks(6, 0.85), // 85% attendance rate
    ],
    bodyMeasurements: [
      { date: new Date('2024-01-01'), weight: 72, bodyFat: 25 },
      { date: new Date('2024-01-15'), weight: 71.5, bodyFat: 24.5 },
      { date: new Date('2024-02-01'), weight: 71, bodyFat: 24 },
      { date: new Date('2024-02-15'), weight: 70.2, bodyFat: 23.5 },
      { date: new Date('2024-03-01'), weight: 69.8, bodyFat: 23 },
      { date: new Date('2024-03-15'), weight: 69.2, bodyFat: 22.5 },
      { date: new Date('2024-04-01'), weight: 68.8, bodyFat: 22 },
      { date: new Date('2024-04-15'), weight: 68.4, bodyFat: 21.5 },
      { date: new Date('2024-05-01'), weight: 68, bodyFat: 21 }
    ]
  },
  {
    id: 'client2',
    name: 'Mike Peterson',
    age: 35,
    height: 180, // cm
    currentWeight: 85, // kg
    targetWeight: 80, // kg
    goals: [
      {
        id: 'goal3',
        target: 80,
        current: 85,
        type: 'weight',
        deadline: new Date('2024-07-01'),
        createdAt: new Date('2024-02-01')
      },
      {
        id: 'goal4',
        target: 100,
        current: 85,
        type: 'strength',
        deadline: new Date('2024-06-01'),
        createdAt: new Date('2024-02-15')
      }
    ],
    sessions: [
      ...generateSessionsForWeeks(6, 0.92), // 92% attendance rate
    ],
    bodyMeasurements: [
      { date: new Date('2024-02-01'), weight: 90, bodyFat: 18 },
      { date: new Date('2024-02-15'), weight: 89, bodyFat: 17.5 },
      { date: new Date('2024-03-01'), weight: 88.2, bodyFat: 17 },
      { date: new Date('2024-03-15'), weight: 87.5, bodyFat: 16.5 },
      { date: new Date('2024-04-01'), weight: 86.8, bodyFat: 16 },
      { date: new Date('2024-04-15'), weight: 86, bodyFat: 15.5 },
      { date: new Date('2024-05-01'), weight: 85, bodyFat: 15 }
    ]
  }
];

// Helper function to generate realistic session data
function generateSessionsForWeeks(weeks: number, attendanceRate: number) {
  const sessions = [];
  const now = new Date();
  
  for (let week = 0; week < weeks; week++) {
    // 3 sessions per week (Monday, Wednesday, Friday)
    for (let session = 0; session < 3; session++) {
      const sessionDate = new Date(now);
      sessionDate.setDate(now.getDate() - (week * 7) - (session * 2) - 1);
      
      const scheduled = true;
      const completed = Math.random() < attendanceRate;
      
      sessions.push({
        date: sessionDate,
        scheduled,
        completed
      });
    }
  }
  
  return sessions;
}

// Export client data interface for TypeScript
export type { ClientData } from '../utils/metricsCalculator';
