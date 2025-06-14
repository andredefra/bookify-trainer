import { ExerciseMaxDataPoint } from "../types/exerciseTypes";
import { processExerciseData } from "../utils/exerciseCalculations";
import { mockClients } from "./clientMockData";

// Generate realistic exercise data for clients
const generateClientExerciseData = (): ExerciseMaxDataPoint[] => {
  const exercises = [
    'Squat',
    'Bench Press', 
    'Deadlift',
    'Overhead Press',
    'Barbell Row',
    'Pull-ups',
    'Front Squat',
    'Incline Press'
  ];

  const data: ExerciseMaxDataPoint[] = [];

  mockClients.forEach(client => {
    // Generate 4-6 exercises per client
    const clientExercises = exercises.slice(0, Math.floor(Math.random() * 3) + 4);
    
    clientExercises.forEach(exercise => {
      // Generate realistic weight and rep data based on exercise type
      let baseWeight = 60;
      let reps = 5;
      
      switch(exercise) {
        case 'Squat':
          baseWeight = 80 + Math.random() * 40; // 80-120kg
          reps = 3 + Math.floor(Math.random() * 5); // 3-7 reps
          break;
        case 'Bench Press':
          baseWeight = 60 + Math.random() * 30; // 60-90kg
          reps = 3 + Math.floor(Math.random() * 5); // 3-7 reps
          break;
        case 'Deadlift':
          baseWeight = 100 + Math.random() * 50; // 100-150kg
          reps = 2 + Math.floor(Math.random() * 4); // 2-5 reps
          break;
        case 'Overhead Press':
          baseWeight = 40 + Math.random() * 20; // 40-60kg
          reps = 4 + Math.floor(Math.random() * 4); // 4-7 reps
          break;
        case 'Barbell Row':
          baseWeight = 50 + Math.random() * 25; // 50-75kg
          reps = 4 + Math.floor(Math.random() * 4); // 4-7 reps
          break;
        case 'Pull-ups':
          baseWeight = client.name.includes('Laura') ? 8 : 15; // Bodyweight + additional weight
          reps = 6 + Math.floor(Math.random() * 6); // 6-11 reps
          break;
        case 'Front Squat':
          baseWeight = 60 + Math.random() * 30; // 60-90kg
          reps = 3 + Math.floor(Math.random() * 5); // 3-7 reps
          break;
        case 'Incline Press':
          baseWeight = 50 + Math.random() * 25; // 50-75kg
          reps = 4 + Math.floor(Math.random() * 4); // 4-7 reps
          break;
      }
      
      const weight = Math.round(baseWeight);
      const date = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      data.push(processExerciseData(
        exercise,
        weight,
        reps,
        date,
        client.id,
        client.name
      ));
    });
  });

  return data;
};

export const exerciseMaxData = generateClientExerciseData();

// Get unique exercises from the data
export const availableExercises = Array.from(new Set(exerciseMaxData.map(item => item.exercise))).sort();

// Helper function to get data for specific client
export const getClientExerciseData = (clientId: string): ExerciseMaxDataPoint[] => {
  if (clientId === "all") {
    // Return aggregated data - best 1RM for each exercise across all clients
    const exerciseMap = new Map<string, ExerciseMaxDataPoint>();
    
    exerciseMaxData.forEach(item => {
      const existing = exerciseMap.get(item.exercise);
      if (!existing || item.oneRM > existing.oneRM) {
        exerciseMap.set(item.exercise, item);
      }
    });
    
    return Array.from(exerciseMap.values());
  }
  
  return exerciseMaxData.filter(item => item.clientId === clientId);
};

// Helper function to get data for specific exercises
export const getExerciseData = (exercises: string[], clientId?: string): ExerciseMaxDataPoint[] => {
  let data = clientId ? getClientExerciseData(clientId) : exerciseMaxData;
  
  if (exercises.length > 0) {
    data = data.filter(item => exercises.includes(item.exercise));
  }
  
  return data;
};