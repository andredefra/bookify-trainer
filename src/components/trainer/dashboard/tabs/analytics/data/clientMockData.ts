
import { ClientData } from '../utils/metricsCalculator';

// Extended body measurement type for trainer view
export interface ExtendedBodyMeasurement {
  date: Date;
  weight: number;
  bodyFat: number;
  waist?: number;
  hips?: number;
  arms?: number;
  neck?: number;
  thighs?: number;
  shoulders?: number;
}

// Mock client data with realistic fitness metrics using new goal system
export const mockClients: ClientData[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    age: 29,
    height: 168, // cm
    gender: 'female',
    currentWeight: 62, // kg
    targetWeight: 58, // kg
    goals: [
      {
        id: 'goal1',
        target: 58,
        current: 62,
        type: 'weight_management',
        deadline: new Date('2025-07-01'),
        createdAt: new Date('2025-01-15')
      },
      {
        id: 'goal2',
        target: 75,
        current: 68,
        type: 'strength_progress',
        deadline: new Date('2025-06-01'),
        createdAt: new Date('2025-02-01')
      },
      {
        id: 'goal3',
        target: 3650000,
        current: 2850000,
        type: 'activity_level',
        deadline: new Date('2025-12-31'),
        createdAt: new Date('2025-01-01')
      }
    ],
    sessions: [
      ...generateSessionsForWeeks(6, 0.85),
    ],
    bodyMeasurements: [
      // 12 months of historical data for Emma
      { date: new Date('2024-01-15'), weight: 68, bodyFat: 28, waist: 78, hips: 100, arms: 29, neck: 34, thighs: 58, shoulders: 100 },
      { date: new Date('2024-02-15'), weight: 67.5, bodyFat: 27.5, waist: 77, hips: 99, arms: 29, neck: 34, thighs: 57, shoulders: 100 },
      { date: new Date('2024-03-15'), weight: 67, bodyFat: 27, waist: 76, hips: 98, arms: 29.5, neck: 34, thighs: 57, shoulders: 101 },
      { date: new Date('2024-04-15'), weight: 66.5, bodyFat: 26.5, waist: 75.5, hips: 98, arms: 30, neck: 34, thighs: 56, shoulders: 101 },
      { date: new Date('2024-05-15'), weight: 66, bodyFat: 26, waist: 75, hips: 97, arms: 30, neck: 34, thighs: 56, shoulders: 101 },
      { date: new Date('2024-06-15'), weight: 65.5, bodyFat: 25.5, waist: 74, hips: 97, arms: 30.5, neck: 34, thighs: 55, shoulders: 102 },
      { date: new Date('2024-07-15'), weight: 65, bodyFat: 25, waist: 73.5, hips: 96, arms: 30.5, neck: 34, thighs: 55, shoulders: 102 },
      { date: new Date('2024-08-15'), weight: 64.5, bodyFat: 24.5, waist: 73, hips: 96, arms: 31, neck: 34, thighs: 54, shoulders: 102 },
      { date: new Date('2024-09-15'), weight: 64, bodyFat: 24, waist: 72, hips: 95, arms: 31, neck: 34, thighs: 54, shoulders: 103 },
      { date: new Date('2024-10-15'), weight: 63.5, bodyFat: 23.5, waist: 71.5, hips: 95, arms: 31.5, neck: 34, thighs: 53, shoulders: 103 },
      { date: new Date('2024-11-15'), weight: 63, bodyFat: 23, waist: 71, hips: 94, arms: 31.5, neck: 34, thighs: 53, shoulders: 103 },
      { date: new Date('2024-12-15'), weight: 62.5, bodyFat: 22.5, waist: 70.5, hips: 94, arms: 32, neck: 34, thighs: 52, shoulders: 104 },
      { date: new Date('2025-01-15'), weight: 62, bodyFat: 22, waist: 70, hips: 93, arms: 32, neck: 34, thighs: 52, shoulders: 104 },
    ] as ExtendedBodyMeasurement[]
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 35,
    height: 180, // cm
    gender: 'male',
    currentWeight: 85, // kg
    targetWeight: 80, // kg
    goals: [
      {
        id: 'goal5',
        target: 80,
        current: 83,
        type: 'weight_management',
        deadline: new Date('2025-07-01'),
        createdAt: new Date('2025-02-01')
      },
      {
        id: 'goal6',
        target: 100,
        current: 92,
        type: 'strength_progress',
        deadline: new Date('2025-06-01'),
        createdAt: new Date('2025-02-15')
      },
      {
        id: 'goal7',
        target: 3650000,
        current: 3200000,
        type: 'activity_level',
        deadline: new Date('2025-12-31'),
        createdAt: new Date('2025-03-01')
      },
      {
        id: 'goal8',
        target: 5,
        current: 3.2,
        type: 'cardiovascular_endurance',
        deadline: new Date('2025-08-01'),
        createdAt: new Date('2025-03-15')
      }
    ],
    sessions: [
      ...generateSessionsForWeeks(6, 0.92),
    ],
    bodyMeasurements: [
      // 12 months of historical data for Michael
      { date: new Date('2024-02-01'), weight: 92, bodyFat: 20, waist: 96, hips: 102, arms: 36, neck: 42, thighs: 62, shoulders: 122 },
      { date: new Date('2024-03-01'), weight: 91, bodyFat: 19.5, waist: 95, hips: 101, arms: 36.5, neck: 42, thighs: 62, shoulders: 122 },
      { date: new Date('2024-04-01'), weight: 90, bodyFat: 19, waist: 94, hips: 101, arms: 37, neck: 42, thighs: 61, shoulders: 123 },
      { date: new Date('2024-05-01'), weight: 89, bodyFat: 18.5, waist: 93, hips: 100, arms: 37, neck: 42, thighs: 61, shoulders: 123 },
      { date: new Date('2024-06-01'), weight: 88.5, bodyFat: 18, waist: 92, hips: 100, arms: 37.5, neck: 42, thighs: 60, shoulders: 124 },
      { date: new Date('2024-07-01'), weight: 88, bodyFat: 17.5, waist: 91.5, hips: 99, arms: 37.5, neck: 42, thighs: 60, shoulders: 124 },
      { date: new Date('2024-08-01'), weight: 87.5, bodyFat: 17, waist: 91, hips: 99, arms: 38, neck: 42, thighs: 59, shoulders: 124 },
      { date: new Date('2024-09-01'), weight: 87, bodyFat: 16.5, waist: 90, hips: 98, arms: 38, neck: 42, thighs: 59, shoulders: 125 },
      { date: new Date('2024-10-01'), weight: 86.5, bodyFat: 16, waist: 89.5, hips: 98, arms: 38.5, neck: 42, thighs: 58, shoulders: 125 },
      { date: new Date('2024-11-01'), weight: 86, bodyFat: 15.5, waist: 89, hips: 97, arms: 38.5, neck: 42, thighs: 58, shoulders: 125 },
      { date: new Date('2024-12-01'), weight: 85.5, bodyFat: 15, waist: 88, hips: 97, arms: 39, neck: 42, thighs: 57, shoulders: 126 },
      { date: new Date('2025-01-01'), weight: 85, bodyFat: 14.8, waist: 87.5, hips: 96, arms: 39, neck: 42, thighs: 57, shoulders: 126 },
    ] as ExtendedBodyMeasurement[]
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    age: 28,
    height: 165, // cm
    gender: 'female',
    currentWeight: 68, // kg
    targetWeight: 65, // kg
    goals: [
      {
        id: 'goal9',
        target: 65,
        current: 68.5,
        type: 'weight_management',
        deadline: new Date('2025-06-01'),
        createdAt: new Date('2025-01-01')
      },
      {
        id: 'goal10',
        target: 80,
        current: 75,
        type: 'strength_progress',
        deadline: new Date('2025-05-01'),
        createdAt: new Date('2025-01-15')
      },
      {
        id: 'goal11',
        target: 3650000,
        current: 2950000,
        type: 'activity_level',
        deadline: new Date('2025-07-01'),
        createdAt: new Date('2025-02-01')
      },
      {
        id: 'goal12',
        target: 15,
        current: 22,
        type: 'body_composition',
        deadline: new Date('2025-08-01'),
        createdAt: new Date('2025-02-15')
      }
    ],
    sessions: [
      ...generateSessionsForWeeks(6, 0.85),
    ],
    bodyMeasurements: [
      // 12 months of historical data for Sarah
      { date: new Date('2024-01-01'), weight: 75, bodyFat: 28, waist: 82, hips: 102, arms: 29, neck: 35, thighs: 60, shoulders: 102 },
      { date: new Date('2024-02-01'), weight: 74.5, bodyFat: 27.5, waist: 81, hips: 101, arms: 29.5, neck: 35, thighs: 59, shoulders: 102 },
      { date: new Date('2024-03-01'), weight: 74, bodyFat: 27, waist: 80, hips: 101, arms: 30, neck: 35, thighs: 59, shoulders: 103 },
      { date: new Date('2024-04-01'), weight: 73, bodyFat: 26, waist: 79, hips: 100, arms: 30, neck: 35, thighs: 58, shoulders: 103 },
      { date: new Date('2024-05-01'), weight: 72.5, bodyFat: 25.5, waist: 78, hips: 100, arms: 30.5, neck: 35, thighs: 58, shoulders: 103 },
      { date: new Date('2024-06-01'), weight: 72, bodyFat: 25, waist: 77, hips: 99, arms: 30.5, neck: 35, thighs: 57, shoulders: 104 },
      { date: new Date('2024-07-01'), weight: 71.5, bodyFat: 24.5, waist: 76.5, hips: 99, arms: 31, neck: 35, thighs: 57, shoulders: 104 },
      { date: new Date('2024-08-01'), weight: 71, bodyFat: 24, waist: 76, hips: 98, arms: 31, neck: 35, thighs: 56, shoulders: 104 },
      { date: new Date('2024-09-01'), weight: 70.5, bodyFat: 23.5, waist: 75, hips: 98, arms: 31.5, neck: 35, thighs: 56, shoulders: 105 },
      { date: new Date('2024-10-01'), weight: 70, bodyFat: 23, waist: 74.5, hips: 97, arms: 31.5, neck: 35, thighs: 55, shoulders: 105 },
      { date: new Date('2024-11-01'), weight: 69.5, bodyFat: 22.5, waist: 74, hips: 97, arms: 32, neck: 35, thighs: 55, shoulders: 105 },
      { date: new Date('2024-12-01'), weight: 69, bodyFat: 22, waist: 73, hips: 96, arms: 32, neck: 35, thighs: 54, shoulders: 106 },
      { date: new Date('2025-01-01'), weight: 68.5, bodyFat: 21.5, waist: 72.5, hips: 96, arms: 32.5, neck: 35, thighs: 54, shoulders: 106 },
    ] as ExtendedBodyMeasurement[]
  }
];

// Helper function to generate realistic session data with some variation
function generateSessionsForWeeks(weeks: number, baseAttendanceRate: number) {
  const sessions = [];
  const now = new Date();
  
  for (let week = 0; week < weeks; week++) {
    // Vary attendance rate slightly each week (±10%)
    const weeklyVariation = (Math.random() - 0.5) * 0.2; // -0.1 to +0.1
    const weekAttendanceRate = Math.max(0.5, Math.min(1, baseAttendanceRate + weeklyVariation));
    
    // 3 sessions per week (Monday, Wednesday, Friday)
    for (let session = 0; session < 3; session++) {
      const sessionDate = new Date(now);
      sessionDate.setDate(now.getDate() - (week * 7) - (session * 2) - 1);
      
      const scheduled = true;
      const completed = Math.random() < weekAttendanceRate;
      
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
