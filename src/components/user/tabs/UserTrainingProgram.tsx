import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar,
  Play,
  Pause,
  CheckCircle,
  Trophy,
  Dumbbell,
  MessageCircle,
  User,
  Star,
  ChevronDown,
  ChevronUp,
  Video,
  Info,
  RefreshCw
} from "lucide-react";
import { currentProgram } from '@/data/training/mockPrograms/currentProgram';
import { toast } from "sonner";
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary';
import { ExerciseData } from '@/data/exercises/types';
import { ExerciseVideoPlayer } from '@/components/client/training/ExerciseVideoPlayer';
import { AlternativeExercisesList } from '@/components/trainer/dashboard/tabs/programs/AlternativeExercisesList';
import { ProgramAnalysisCard } from '../training/ProgramAnalysisCard';

interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration_weeks: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  trainer: {
    name: string;
    rating: number;
  };
  progress: {
    completed: number;
    total: number;
    currentWeek: number;
  };
  plan_data: {
    weeks: Array<{
      week: number;
      days: Array<{
        day: number;
        exercises: Array<{
          name: string;
          sets: number;
          reps: string;
          rest: string;
        }>;
      }>;
    }>;
  };
  status: 'pending' | 'accepted' | 'active' | 'completed';
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

// Mock training plans based on the currentProgram structure
const mockTrainingPlans: TrainingPlan[] = [
  {
    id: "user-plan-1",
    title: "Strength & Conditioning Program",
    description: "A comprehensive 8-week program focusing on compound movements and metabolic conditioning",
    duration_weeks: 8,
    difficulty_level: 'intermediate',
    goals: ["Build Strength", "Improve Conditioning", "Muscle Building"],
    trainer: {
      name: "Sarah Johnson",
      rating: 4.9
    },
    progress: {
      completed: 8,
      total: 32,
      currentWeek: 2
    },
    plan_data: {
      weeks: [
        {
          week: 1,
          days: [
            {
              day: 1,
              exercises: [
                { name: "Bench Press", sets: 3, reps: "8-10", rest: "90s" },
                { name: "Pull-ups", sets: 3, reps: "6-8", rest: "90s" },
                { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90s" }
              ]
            },
            {
              day: 2,
              exercises: [
                { name: "Squats", sets: 4, reps: "6-8", rest: "2min" },
                { name: "Romanian Deadlifts", sets: 3, reps: "8-10", rest: "90s" },
                { name: "Bulgarian Split Squats", sets: 3, reps: "10 each", rest: "60s" }
              ]
            },
            {
              day: 3,
              exercises: [
                { name: "Push-ups", sets: 3, reps: "12-15", rest: "60s" },
                { name: "Bent-over Rows", sets: 3, reps: "10-12", rest: "90s" },
                { name: "Dips", sets: 3, reps: "8-10", rest: "90s" }
              ]
            },
            {
              day: 4,
              exercises: [
                { name: "Burpees", sets: 3, reps: "10", rest: "60s" },
                { name: "Mountain Climbers", sets: 3, reps: "20 each", rest: "45s" },
                { name: "Plank", sets: 3, reps: "45 seconds", rest: "60s" }
              ]
            }
          ]
        }
      ]
    },
    status: 'active',
    started_at: '2024-03-01T00:00:00Z',
    created_at: '2024-02-28T00:00:00Z'
  },
  {
    id: "user-plan-2",
    title: "Weight Loss Bootcamp",
    description: "High-intensity workouts designed to maximize calorie burn and fat loss",
    duration_weeks: 6,
    difficulty_level: 'beginner',
    goals: ["Weight Loss", "Cardio Improvement", "Fat Burning"],
    trainer: {
      name: "Mike Anderson",
      rating: 4.7
    },
    progress: {
      completed: 24,
      total: 24,
      currentWeek: 6
    },
    plan_data: {
      weeks: [
        {
          week: 1,
          days: [
            {
              day: 1,
              exercises: [
                { name: "Burpees", sets: 3, reps: "10", rest: "60s" },
                { name: "Mountain Climbers", sets: 3, reps: "20 each", rest: "45s" },
                { name: "Jump Squats", sets: 3, reps: "15", rest: "60s" }
              ]
            }
          ]
        }
      ]
    },
    status: 'completed',
    started_at: '2024-01-15T00:00:00Z',
    completed_at: '2024-02-26T00:00:00Z',
    created_at: '2024-01-10T00:00:00Z'
  }
];

export function UserTrainingProgram() {
  const [activeTab, setActiveTab] = useState("current");
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>(mockTrainingPlans);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingPlan | null>(null);
  const [showProgramDetail, setShowProgramDetail] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<any>(null);
  const [workoutLogs, setWorkoutLogs] = useState<any>({});
  const [sessionStarted, setSessionStarted] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [showExerciseInfo, setShowExerciseInfo] = useState<number | null>(null);
  
  const { allExercises, getExerciseByName } = useExerciseLibrary();

  // Exercise name mapping from workout program to Exercise Library
  const exerciseNameMapping: { [key: string]: string } = {
    'Push-ups': 'push-ups',
    'Standard Push-ups': 'push-ups',
    'Bent-over Rows': 'bent-over-row',
    'Pull-ups': 'pull-ups',
    'Bench Press': 'barbell-flat-press',
    'Squats': 'barbell-squat',
    'Romanian Deadlifts': 'romanian-deadlift-barbell',
    'Bulgarian Split Squats': 'bulgarian-squat',
    'Overhead Press': 'barbell-shoulder-press',
    'Dips': 'tricep-dips',
    'Burpees': 'burpees',
    'Mountain Climbers': 'mountain-climbers',
    'Plank': 'plank',
    'Jump Squats': 'jump-squat'
  };

  // Get exercise data from library
  const getExerciseData = (exerciseName: string): ExerciseData | null => {
    // First try exact match
    let exerciseData = getExerciseByName(exerciseName);
    
    // If no exact match, try mapped name
    if (!exerciseData && exerciseNameMapping[exerciseName]) {
      exerciseData = getExerciseByName(exerciseNameMapping[exerciseName]);
    }
    
    // If still no match, try searching for similar names
    if (!exerciseData) {
      const searchTerm = exerciseName.toLowerCase();
      exerciseData = allExercises.find(ex => 
        ex.name.toLowerCase().includes(searchTerm) ||
        searchTerm.includes(ex.name.toLowerCase())
      ) || null;
    }
    
    // If still no match, create a basic exercise with some default alternatives
    if (!exerciseData) {
      const category = exerciseName.toLowerCase().includes('squat') ? 'legs' : 
                     exerciseName.toLowerCase().includes('push') ? 'chest' :
                     exerciseName.toLowerCase().includes('pull') ? 'back' : 'functional';
      
      // Get some alternatives based on category
      const defaultAlternatives = allExercises
        .filter(ex => ex.category === category)
        .slice(0, 4)
        .map(ex => ex.id);
        
      exerciseData = {
        id: exerciseName.toLowerCase().replace(/\s+/g, '-'),
        name: exerciseName,
        category: category as any,
        difficulty: 'intermediate' as any,
        muscleGroup: ['Full Body'],
        equipment: ['Bodyweight'],
        notes: 'Exercise from training program',
        alternativeExercises: defaultAlternatives,
        isDeletable: false
      };
    }
    
    return exerciseData;
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'chest': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'back': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'legs': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'shoulders': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'arms': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'core': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cardio': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'accepted': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const renderPlanCard = (plan: TrainingPlan) => {
    const totalExercises = plan.plan_data.weeks.reduce((total, week) => {
      return total + week.days.reduce((dayTotal, day) => {
        return dayTotal + day.exercises.length;
      }, 0);
    }, 0);

    const progress = plan.status === 'completed' ? 100 : 
                    Math.round((plan.progress.completed / plan.progress.total) * 100);

    return (
      <Card key={plan.id} className="mb-4">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
            <div className="space-y-2 flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <span className="truncate">{plan.title}</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{plan.description}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{plan.trainer.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current shrink-0" />
                  <span>{plan.trainer.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              <Badge className={`${getDifficultyColor(plan.difficulty_level)} text-xs px-2 py-1`}>
                {plan.difficulty_level}
              </Badge>
              <Badge className={`${getStatusColor(plan.status)} text-xs px-2 py-1`}>
                {plan.status}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Bar for Active Plans */}
          {(plan.status === 'active' || plan.status === 'completed') && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{plan.progress.completed}/{plan.progress.total} sessions ({progress}%)</span>
              </div>
              <Progress value={progress} className="h-2" />
              {plan.status === 'active' && (
                <p className="text-xs text-muted-foreground">Week {plan.progress.currentWeek} of {plan.duration_weeks}</p>
              )}
            </div>
          )}

          {/* Plan Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{plan.duration_weeks} weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
              <span>{plan.progress.total} sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{Math.round(plan.progress.total / plan.duration_weeks)} per week</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>{plan.goals.length} goals</span>
            </div>
          </div>

          {/* Goals */}
          {plan.goals && plan.goals.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Goals:</h4>
              <div className="flex flex-wrap gap-1">
                {plan.goals.map((goal, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Preview of plan structure */}
          {plan.plan_data.weeks[0] && (
            <div className="border rounded-lg p-3 bg-muted/30">
              <h4 className="text-sm font-medium mb-2">Program Preview:</h4>
              <div className="space-y-1 text-xs">
                {plan.plan_data.weeks[0].days.slice(0, 2).map((day, dayIndex) => (
                  <div key={dayIndex}>
                    <span className="font-medium">Day {day.day}:</span>
                    <span className="ml-2 text-muted-foreground">
                      {day.exercises.slice(0, 3).map(ex => ex.name).join(', ')}
                      {day.exercises.length > 3 && '...'}
                    </span>
                  </div>
                ))}
                {plan.plan_data.weeks[0].days.length > 2 && (
                  <div className="text-muted-foreground">
                    ... and {plan.plan_data.weeks[0].days.length - 2} more days
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            {plan.status === 'accepted' && (
              <Button 
                onClick={() => {
                  const updatedPlans = trainingPlans.map(p => 
                    p.id === plan.id 
                      ? {...p, status: 'active' as const, started_at: new Date().toISOString()}
                      : p
                  );
                  setTrainingPlans(updatedPlans);
                  toast.success("Training plan activated!");
                }}
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Program
              </Button>
            )}
            {plan.status === 'active' && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedProgram(plan);
                  setShowProgramDetail(true);
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Continue Training
              </Button>
            )}
            {plan.status === 'completed' && (
              <Button variant="outline" className="w-full" disabled>
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const startWorkout = (day: any, dayIndex: number) => {
    console.log('Starting workout for day:', day, 'index:', dayIndex);
    const workoutData = {
      ...day,
      dayIndex,
      programId: selectedProgram?.id,
      startTime: new Date().toISOString(),
      exercises: day.exercises.map((ex: any, index: number) => ({
        ...ex,
        id: `ex-${dayIndex}-${index}`,
        completed: false,
        sets_logged: []
      }))
    };
    console.log('Setting active workout:', workoutData);
    setActiveWorkout(workoutData);
    toast.success(`Starting ${day.exercises?.length || 0} exercises for Day ${day.day}!`);
  };

  const logSet = (exerciseIndex: number, setIndex: number, weight: number, reps: number) => {
    if (!activeWorkout) return;
    
    const updatedWorkout = { ...activeWorkout };
    const exercise = updatedWorkout.exercises[exerciseIndex];
    
    if (!exercise.sets_logged) {
      exercise.sets_logged = [];
    }
    
    exercise.sets_logged[setIndex] = { weight, reps, completed: true };
    
    // Check if all sets are completed
    if (exercise.sets_logged.length === exercise.sets && exercise.sets_logged.every(set => set.completed)) {
      exercise.completed = true;
    }
    
    setActiveWorkout(updatedWorkout);
  };

  const completeWorkout = () => {
    if (!activeWorkout || !selectedProgram) return;
    
    // Save workout log
    const workoutLog = {
      ...activeWorkout,
      completedAt: new Date().toISOString(),
      duration: Math.round((new Date().getTime() - new Date(activeWorkout.startTime).getTime()) / 60000) // minutes
    };
    
    // Update workout logs
    const logs = JSON.parse(localStorage.getItem('workout-logs') || '[]');
    logs.push(workoutLog);
    localStorage.setItem('workout-logs', JSON.stringify(logs));
    
    // Update program progress
    const updatedPlans = trainingPlans.map(plan => 
      plan.id === selectedProgram.id 
        ? {
            ...plan, 
            progress: {
              ...plan.progress,
              completed: plan.progress.completed + 1
            }
          }
        : plan
    );
    setTrainingPlans(updatedPlans);
    
    setActiveWorkout(null);
    toast.success(`Workout completed! Great job!`);
  };

  // Program Detail View
  if (showProgramDetail && selectedProgram) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setShowProgramDetail(false)}
          >
            ← Back to Programs
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedProgram.title}</h1>
            <p className="text-muted-foreground">Week {selectedProgram.progress.currentWeek} of {selectedProgram.duration_weeks}</p>
          </div>
        </div>

        {/* Current Week Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week's Training
            </CardTitle>
            <CardDescription>
              Complete your scheduled workouts to track progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedProgram.plan_data.weeks[0]?.days.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Day {day.day} - {index < 2 ? 'Completed' : 'Upcoming'}</h3>
                    <Badge variant={index < 2 ? "default" : "outline"}>
                      {index < 2 ? 'Done' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {day.exercises.map((exercise, exIndex) => (
                      <div key={exIndex} className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded">
                        <span className="font-medium">{exercise.name}</span>
                        <span className="text-muted-foreground">
                          {exercise.sets} sets × {exercise.reps} reps
                        </span>
                      </div>
                    ))}
                  </div>
                  {index >= 2 && (
                    <Button 
                      className="w-full mt-3" 
                      size="sm"
                      onClick={() => {
                        console.log('=== STARTING WORKOUT ===');
                        console.log('day object:', day);
                        console.log('index:', index);
                        
                        if (day && day.exercises) {
                          const workoutData = {
                            day: day.day || (index + 1),
                            dayIndex: index,
                            programId: selectedProgram?.id,
                            startTime: new Date().toISOString(),
                            exercises: day.exercises.map((ex: any, exIndex: number) => ({
                              ...ex,
                              id: `ex-${index}-${exIndex}`,
                              completed: false,
                              sets_logged: []
                            }))
                          };
                          console.log('Setting activeWorkout to:', workoutData);
                          setActiveWorkout(workoutData);
                          setShowProgramDetail(false); // Hide program detail to show workout
                          console.log('activeWorkout state should be updated now');
                        } else {
                          console.error('Error: day or exercises not found', { day, exercises: day?.exercises });
                        }
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Workout (Day {day?.day || index + 1})
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{selectedProgram.progress.completed}/{selectedProgram.progress.total} sessions</span>
                </div>
                <Progress value={(selectedProgram.progress.completed / selectedProgram.progress.total) * 100} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current Week:</span>
                  <p className="font-medium">{selectedProgram.progress.currentWeek} of {selectedProgram.duration_weeks}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Trainer:</span>
                  <p className="font-medium">{selectedProgram.trainer.name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {selectedProgram.goals.map((goal, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Program Analysis */}
        <ProgramAnalysisCard
          programData={selectedProgram}
          workoutLogs={(() => {
            // Get real workout logs from localStorage
            const realLogs = JSON.parse(localStorage.getItem('workout-logs') || '[]')
              .filter((log: any) => log.programId === selectedProgram.id);
            
            // If no real logs exist, use mock data for demonstration
            if (realLogs.length === 0) {
              return [
                {
                  id: 'mock-workout-1',
                  date: '2024-03-05',
                  name: 'Upper Body Strength',
                  duration: 45,
                  programId: selectedProgram.id,
                  exercises: [
                    { name: 'Bench Press', sets: 3, reps: '8', weight: 80, completed: true },
                    { name: 'Pull-ups', sets: 3, reps: '6', weight: 0, completed: true },
                    { name: 'Overhead Press', sets: 3, reps: '10', weight: 50, completed: true }
                  ],
                  notes: 'Good session, felt strong on bench press'
                },
                {
                  id: 'mock-workout-2', 
                  date: '2024-03-07',
                  name: 'Lower Body Power',
                  duration: 50,
                  programId: selectedProgram.id,
                  exercises: [
                    { name: 'Squats', sets: 4, reps: '6', weight: 100, completed: true },
                    { name: 'Romanian Deadlifts', sets: 3, reps: '8', weight: 90, completed: true },
                    { name: 'Bulgarian Split Squats', sets: 3, reps: '10', weight: 25, completed: true }
                  ],
                  notes: 'Challenging but completed all sets'
                }
              ];
            }
            
            return realLogs;
          })()}
          fitnessData={{
            heartRateAverage: 142,
            caloriesBurned: 380,
            steps: 8500,
            sleepQuality: 7.5,
            restingHeartRate: 68,
            activeMinutes: 45
          }}
          userProfile={{
            age: 30,
            weight: 75,
            height: 180,
            fitnessLevel: selectedProgram.difficulty_level,
            primaryGoals: selectedProgram.goals
          }}
          onAnalysisComplete={(analysis) => {
            console.log('Program analysis completed:', analysis);
          }}
        />
      </div>
    );
  }

  // Active Workout View
  if (activeWorkout) {

    if (!sessionStarted) {
      // Pre-session view
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveWorkout(null)}
            >
              ← Exit Workout
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Session {activeWorkout.day}: Push/Pull Circuit</h1>
              <p className="text-muted-foreground">Get ready for your workout</p>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ready to start your session?</h3>
                  <p className="text-muted-foreground">
                    This session includes {activeWorkout.exercises.length} exercises. Make sure you have all equipment ready.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={() => setSessionStarted(true)}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Session
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Exercise Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Session Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeWorkout.exercises.map((exercise: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{exercise.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exercise.sets} sets × {exercise.reps} reps
                        </p>
                      </div>
                      <Badge variant="outline">
                        {exercise.exerciseType || 'strength'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Active session view
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveWorkout(null)}
              className="w-fit"
            >
              ← Exit Workout
            </Button>
            <div className="space-y-1">
              <h1 className="text-lg sm:text-2xl font-bold">Session {activeWorkout.day}: Push/Pull Circuit</h1>
              <p className="text-sm text-muted-foreground">
                Started at {new Date(activeWorkout.startTime).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <Button 
            onClick={completeWorkout}
            disabled={!activeWorkout.exercises.every((ex: any) => ex.completed)}
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Session
          </Button>
        </div>

        <div className="space-y-4">
          {activeWorkout.exercises.map((exercise: any, exerciseIndex: number) => {
            const exerciseData = getExerciseData(exercise.name);
            
            return (
              <Card key={exerciseIndex} className={exercise.completed ? 'border-green-200 bg-green-50' : ''}>
                 <CardHeader className="pb-3">
                   <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:justify-between">
                     <div className="flex-1 space-y-2">
                       <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                         <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                         <span className="line-clamp-2">
                           {exerciseData ? exerciseData.name : exercise.name}
                         </span>
                       </CardTitle>
                       
                       <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                         <span className="font-medium">{exercise.sets} sets × {exercise.reps}</span>
                         {exerciseData && (
                           <>
                             <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getDifficultyColor(exerciseData.difficulty)}`}>
                               {exerciseData.difficulty}
                             </Badge>
                             <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getCategoryColor(exerciseData.category)}`}>
                               {exerciseData.category}
                             </Badge>
                           </>
                         )}
                       </div>
                       
                       {/* Exercise details */}
                       {exerciseData && (
                         <div className="text-xs text-muted-foreground">
                           <div className="flex flex-wrap gap-1">
                             <span>Muscles: {exerciseData.muscleGroup.join(', ')}</span>
                             {exerciseData.equipment.length > 0 && (
                               <span>• Equipment: {exerciseData.equipment.join(', ')}</span>
                             )}
                           </div>
                         </div>
                       )}
                     </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                      {exercise.completed && (
                        <Badge className="bg-green-600 w-fit">Completed</Badge>
                      )}
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {/* Exercise Info Button */}
                        {exerciseData && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowExerciseInfo(
                              showExerciseInfo === exerciseIndex ? null : exerciseIndex
                            )}
                            className="shrink-0"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          onClick={() => setExpandedExercise(
                            expandedExercise === exerciseIndex ? null : exerciseIndex
                          )}
                          className="flex-1 sm:min-w-[100px] sm:flex-none text-xs sm:text-sm"
                        >
                          <span className="hidden sm:inline">
                            {expandedExercise === exerciseIndex ? 'Hide Sets' : 'Track Sets'}
                          </span>
                          <span className="sm:hidden">
                            {expandedExercise === exerciseIndex ? 'Hide' : 'Track'}
                          </span>
                          <span className="ml-1 sm:ml-2">
                            {expandedExercise === exerciseIndex ? '▲' : '▼'}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Exercise Information Panel */}
                {showExerciseInfo === exerciseIndex && exerciseData && (
                  <CardContent className="border-t">
                    <div className="space-y-4">
                      {/* Exercise Notes */}
                      {exerciseData.notes && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">Notes:</h4>
                          <p className="text-sm text-muted-foreground">{exerciseData.notes}</p>
                        </div>
                      )}
                      
                      {/* Video Player */}
                      {exerciseData.videoUrl && (
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Video className="h-4 w-4" />
                            Exercise Video
                          </h4>
                          <ExerciseVideoPlayer 
                            videoUrl={exerciseData.videoUrl}
                            exerciseName={exerciseData.name}
                          />
                        </div>
                      )}
                      
                      {/* Alternative Exercises */}
                      {exerciseData.alternativeExercises && exerciseData.alternativeExercises.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Alternative Exercises
                          </h4>
                          <AlternativeExercisesList 
                            alternativeExerciseIds={exerciseData.alternativeExercises}
                            onSelectAlternative={(altExercise) => {
                              // Update the exercise in the workout
                              const updatedWorkout = { ...activeWorkout };
                              updatedWorkout.exercises[exerciseIndex] = {
                                ...exercise,
                                name: altExercise.name
                              };
                              setActiveWorkout(updatedWorkout);
                              setShowExerciseInfo(null);
                              toast.success(`Switched to ${altExercise.name}`);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}

                {/* Sets Tracking Panel */}
                {expandedExercise === exerciseIndex && (
                  <CardContent className={showExerciseInfo === exerciseIndex ? 'border-t' : ''}>
                    <div className="space-y-3">
                      {Array.from({ length: exercise.sets }, (_, setIndex) => (
                        <div key={setIndex} className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Set {setIndex + 1}</span>
                            {exercise.sets_logged?.[setIndex]?.completed && (
                              <Badge variant="outline" className="text-green-600">
                                ✓ Done
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-xs text-muted-foreground">Weight (kg)</label>
                              <Input
                                type="number"
                                placeholder="0"
                                className="h-8"
                                value={exercise.sets_logged?.[setIndex]?.weight || ''}
                                onChange={(e) => {
                                  const weight = parseFloat(e.target.value) || 0;
                                  const reps = exercise.sets_logged?.[setIndex]?.reps || 0;
                                  if (reps > 0) logSet(exerciseIndex, setIndex, weight, reps);
                                }}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Reps</label>
                              <Input
                                type="number"
                                placeholder="0"
                                className="h-8"
                                value={exercise.sets_logged?.[setIndex]?.reps || ''}
                                onChange={(e) => {
                                  const reps = parseInt(e.target.value) || 0;
                                  const weight = exercise.sets_logged?.[setIndex]?.weight || 0;
                                  if (reps > 0) logSet(exerciseIndex, setIndex, weight, reps);
                                }}
                              />
                            </div>
                            <div className="flex items-end">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="w-full h-8"
                                onClick={() => {
                                  const weight = exercise.sets_logged?.[setIndex]?.weight || 0;
                                  const reps = exercise.sets_logged?.[setIndex]?.reps || 0;
                                  if (weight > 0 && reps > 0) {
                                    logSet(exerciseIndex, setIndex, weight, reps);
                                  }
                                }}
                                disabled={exercise.sets_logged?.[setIndex]?.completed}
                              >
                                {exercise.sets_logged?.[setIndex]?.completed ? '✓' : 'Log'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Workout Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Session Progress</span>
                <span>
                  {activeWorkout.exercises.filter((ex: any) => ex.completed).length} / {activeWorkout.exercises.length} exercises
                </span>
              </div>
              <Progress 
                value={(activeWorkout.exercises.filter((ex: any) => ex.completed).length / activeWorkout.exercises.length) * 100} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Training Programs</h1>
            <p className="text-muted-foreground">Your personalized workout plans</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading programs...</p>
        </div>
      </div>
    );
  }

  const activePlans = trainingPlans.filter(plan => plan.status === 'active');
  const acceptedPlans = trainingPlans.filter(plan => plan.status === 'accepted');
  const completedPlans = trainingPlans.filter(plan => plan.status === 'completed');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold">Training Programs</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Your personalized workout plans</p>
        </div>
        <Button variant="outline" className="flex items-center justify-center space-x-2 w-full sm:w-auto">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm sm:text-base">Request New Program</span>
        </Button>
      </div>

      {trainingPlans.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 sm:py-12 px-4">
            <Trophy className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-base sm:text-lg font-medium mb-2">No Training Programs</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Go to Messages and ask your AI trainer to create a personalized program for you!
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Example: "Create an 8-week beginner training program for weight loss"
            </p>
            <Button variant="outline" className="w-full sm:w-auto">
              <MessageCircle className="h-4 w-4 mr-2" />
              Go to Messages
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 gap-1">
            <TabsTrigger value="current" className="text-xs sm:text-sm py-2 px-2">
              <span className="hidden sm:inline">Current ({activePlans.length + acceptedPlans.length})</span>
              <span className="sm:hidden">Current ({activePlans.length + acceptedPlans.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm py-2 px-2">
              <span className="hidden sm:inline">Completed ({completedPlans.length})</span>
              <span className="sm:hidden">Done ({completedPlans.length})</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs sm:text-sm py-2 px-2">
              All ({trainingPlans.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {[...activePlans, ...acceptedPlans].length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No current programs</p>
                </CardContent>
              </Card>
            ) : (
              [...activePlans, ...acceptedPlans].map(renderPlanCard)
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedPlans.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No completed programs yet</p>
                </CardContent>
              </Card>
            ) : (
              completedPlans.map(renderPlanCard)
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {trainingPlans.map(renderPlanCard)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}