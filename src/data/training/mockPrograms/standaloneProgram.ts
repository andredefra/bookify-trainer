import { TrainingProgram } from "../types";

export const standaloneEssentialProgram: TrainingProgram = {
  id: "standalone-prog-1",
  title: "8-Week Fat Loss Program",
  week: "Week 1 of 8",
  trainerName: "Sarah Johnson - Fitness Coach",
  trainerId: "trainer-sarah-001",
  trainerSubscriptionTier: 'essential',
  
  // Standalone program
  isStandalone: true,
  
  // Payment details - cash pending confirmation
  paymentStatus: 'pending',
  paymentMethod: 'cash',
  totalPrice: 120,
  amountPaid: 0,
  clientConfirmedPayment: false,
  
  // Program details
  targetFrequency: 3,
  totalSessions: 24,
  duration: 8,
  objective: "Lose body fat while maintaining muscle mass",
  description: "Personalized fat loss program combining cardio and strength training with nutrition guidance",
  isPaid: false,
  price: 120,
  
  sessions: [
    {
      id: "standalone-session-1",
      sessionNumber: 1,
      title: "Full Body Circuit",
      completed: false,
      exercises: [
        {
          id: "standalone-ex-1",
          name: "Jump Squats",
          sets: 3,
          reps: "15",
          notes: "Explosive movement",
          exerciseType: "cardio"
        },
        {
          id: "standalone-ex-2",
          name: "Push-ups",
          sets: 3,
          reps: "12-15",
          notes: "Control the descent",
          exerciseType: "strength"
        },
        {
          id: "standalone-ex-3",
          name: "Mountain Climbers",
          sets: 3,
          reps: "30 seconds",
          notes: "Keep core engaged",
          exerciseType: "cardio"
        },
        {
          id: "standalone-ex-4",
          name: "Dumbbell Rows",
          sets: 3,
          reps: "12 each arm",
          weight: 15,
          notes: "Squeeze shoulder blades",
          exerciseType: "strength"
        }
      ]
    },
    {
      id: "standalone-session-2",
      sessionNumber: 2,
      title: "Lower Body + Cardio",
      completed: false,
      exercises: [
        {
          id: "standalone-ex-5",
          name: "Goblet Squats",
          sets: 4,
          reps: "15",
          weight: 20,
          notes: "Deep squat",
          exerciseType: "strength"
        },
        {
          id: "standalone-ex-6",
          name: "Walking Lunges",
          sets: 3,
          reps: "12 each leg",
          notes: "Control the movement",
          exerciseType: "strength"
        },
        {
          id: "standalone-ex-7",
          name: "Burpees",
          sets: 3,
          reps: "10",
          notes: "Full range of motion",
          exerciseType: "cardio"
        }
      ]
    },
    {
      id: "standalone-session-3",
      sessionNumber: 3,
      title: "Upper Body + Core",
      completed: false,
      exercises: [
        {
          id: "standalone-ex-8",
          name: "Dumbbell Press",
          sets: 3,
          reps: "12",
          weight: 25,
          notes: "Full range of motion",
          exerciseType: "strength"
        },
        {
          id: "standalone-ex-9",
          name: "Plank",
          sets: 3,
          reps: "60 seconds",
          notes: "Keep body straight",
          exerciseType: "strength"
        },
        {
          id: "standalone-ex-10",
          name: "Bicycle Crunches",
          sets: 3,
          reps: "20 each side",
          notes: "Slow and controlled",
          exerciseType: "strength"
        }
      ]
    },
    // Additional sessions for 24 total
    ...Array.from({ length: 21 }, (_, i) => ({
      id: `standalone-session-${i + 4}`,
      sessionNumber: i + 4,
      title: `Fat Loss Session ${i + 4}`,
      completed: false,
      exercises: [
        {
          id: `standalone-ex-${i + 11}`,
          name: "Circuit Exercise",
          sets: 3,
          reps: "12",
          notes: "High intensity",
          exerciseType: "cardio" as const
        }
      ]
    }))
  ]
};
