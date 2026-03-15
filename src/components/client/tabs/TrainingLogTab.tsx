import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Edit3, Clock, Brain, TrendingUp, Target } from "lucide-react";
import { useWorkoutLogs } from "@/hooks/useWorkoutLogs";
import { NewWorkoutLogForm } from "@/components/client/training/workout-form/NewWorkoutLogForm";
import { WorkoutAnalysisCard } from "@/components/user/training/WorkoutAnalysisCard";
import { useIsMobile } from "@/hooks/use-mobile";

export function TrainingLogTab() {
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [selectedWorkoutForAnalysis, setSelectedWorkoutForAnalysis] = useState<any>(null);
  const [editingWorkout, setEditingWorkout] = useState<any>(null);
  const { workoutLogs } = useWorkoutLogs();
  const isMobile = useIsMobile();
  
  // Mock user profile and fitness data for AI analysis
  const userProfile = {
    weight: 75,
    height: 180,
    age: 30,
    fitnessLevel: 'intermediate',
    goals: 'Strength building and muscle gain'
  };

  const mockFitnessData = {
    steps: 8500,
    calories: 320,
    heartRate: 145,
    activeTime: 45
  };

  // Calculate weekly stats
  const weeklyStats = {
    totalWorkouts: workoutLogs.length,
    totalMinutes: workoutLogs.reduce((total, workout) => {
      const duration = parseInt(workout.duration) || 0;
      return total + duration;
    }, 0),
    totalExercises: workoutLogs.reduce((total, workout) => total + workout.exercises.length, 0),
    estimatedCalories: workoutLogs.reduce((total, workout) => {
      const duration = parseInt(workout.duration) || 0;
      return total + (duration * 8); // ~8 calories per minute
    }, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>Training Log</h1>
          <p className="text-muted-foreground text-sm">Track your workouts and monitor progress</p>
        </div>
        <Button 
          onClick={() => setShowAddWorkout(!showAddWorkout)} 
          className="flex items-center space-x-2"
          size={isMobile ? "sm" : "default"}
        >
          <Plus className="h-4 w-4" />
          <span>Log Workout</span>
        </Button>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{weeklyStats.totalWorkouts}</div>
            <p className="text-xs text-muted-foreground">Workouts This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{weeklyStats.totalMinutes}</div>
            <p className="text-xs text-muted-foreground">Minutes Trained</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{weeklyStats.estimatedCalories}</div>
            <p className="text-xs text-muted-foreground">Calories Burned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{weeklyStats.totalExercises}</div>
            <p className="text-xs text-muted-foreground">Total Exercises</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Workout Form */}
      {showAddWorkout && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Log New Workout
            </CardTitle>
            <CardDescription>
              Record your completed workout with all exercises, sets, and performance details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewWorkoutLogForm 
              onComplete={() => {
                setShowAddWorkout(false);
                setEditingWorkout(null);
              }} 
              existingWorkout={editingWorkout}
            />
          </CardContent>
        </Card>
      )}

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Workouts
          </CardTitle>
          <CardDescription>
            View your workout history and analyze performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          {workoutLogs.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No workouts logged yet</p>
              <p className="text-sm text-muted-foreground">
                Start recording your completed workouts to track your training performance and analyze your progress!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {workoutLogs.slice(0, 5).map((workout) => (
                <div key={workout.id}>
                  <div className={`border rounded-lg p-4 hover:bg-muted/30 transition-colors ${selectedWorkoutForAnalysis?.id === workout.id ? 'border-primary/50 bg-primary/5' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {new Date(workout.date).getDate()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{workout.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{workout.duration || 'Duration not specified'}</span>
                            <span>•</span>
                            <span>{workout.exercises.length} exercises</span>
                          </div>
                          {workout.notes && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {workout.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:ml-auto">
                        <Badge variant="secondary" className="hidden sm:inline-flex">Completed</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedWorkoutForAnalysis(
                            selectedWorkoutForAnalysis?.id === workout.id ? null : workout
                          )}
                          className={selectedWorkoutForAnalysis?.id === workout.id ? 'bg-primary/10' : ''}
                        >
                          <Brain className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setEditingWorkout(workout);
                            setShowAddWorkout(true);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Inline AI Analysis - appears below the selected workout */}
                  {selectedWorkoutForAnalysis?.id === workout.id && (
                    <div className="mt-2 ml-4 border-l-2 border-primary/30 pl-4">
                      <WorkoutAnalysisCard
                        workoutLog={workout}
                        fitnessData={mockFitnessData}
                        userProfile={userProfile}
                        onAnalysisComplete={(analysis) => {
                          console.log('Analysis completed:', analysis);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      {workoutLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Weekly Summary</span>
            </CardTitle>
            <CardDescription>
              Your training performance overview - data feeds into Analytics AI insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{weeklyStats.totalWorkouts}</div>
                <p className="text-sm text-muted-foreground">Workouts Completed</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{weeklyStats.totalMinutes}</div>
                <p className="text-sm text-muted-foreground">Training Minutes</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{weeklyStats.estimatedCalories}</div>
                <p className="text-sm text-muted-foreground">Estimated Calories</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{weeklyStats.totalExercises}</div>
                <p className="text-sm text-muted-foreground">Total Exercises</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}