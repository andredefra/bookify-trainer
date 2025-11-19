import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Edit3, Clock, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { useWorkoutLogs } from "@/hooks/useWorkoutLogs";
import { NewWorkoutLogForm } from "@/components/client/training/workout-form/NewWorkoutLogForm";
import { WorkoutAnalysisCard } from "../training/WorkoutAnalysisCard";

export function UserTrainingLog() {
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [selectedWorkoutForAnalysis, setSelectedWorkoutForAnalysis] = useState<any>(null);
  const { workoutLogs } = useWorkoutLogs();

  // Mock user profile and fitness data
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Training Log</h1>
          <p className="text-muted-foreground">Track your workouts and monitor progress</p>
        </div>
        <Button onClick={() => setShowAddWorkout(!showAddWorkout)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Log Workout</span>
        </Button>
      </div>

      {/* Add Workout Form */}
      {showAddWorkout && (
        <Card>
          <CardHeader>
            <CardTitle>Log New Workout</CardTitle>
          </CardHeader>
          <CardContent>
            <NewWorkoutLogForm onComplete={() => setShowAddWorkout(false)} />
          </CardContent>
        </Card>
      )}

      {/* AI Analysis Card */}
      {selectedWorkoutForAnalysis && (
        <WorkoutAnalysisCard
          workoutLog={selectedWorkoutForAnalysis}
          fitnessData={mockFitnessData}
          userProfile={userProfile}
          onAnalysisComplete={(analysis) => {
            console.log('Analysis completed:', analysis);
          }}
        />
      )}

      {/* Recent Workouts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Workouts</h2>
        
        {workoutLogs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No workouts logged yet.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start logging your workouts to track your progress!
              </p>
            </CardContent>
          </Card>
        ) : (
          workoutLogs.slice(0, 5).map((workout) => (
            <Card key={workout.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {new Date(workout.date).toLocaleDateString('it-IT', { weekday: 'short' }).toUpperCase()}
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {new Date(workout.date).getDate()}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{workout.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{workout.duration || 'Not specified'}</span>
                        <span>•</span>
                        <span>{workout.exercises.length} exercises</span>
                      </div>
                      {workout.notes && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {workout.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Completed</Badge>
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
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Weekly Summary */}
      {workoutLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Weekly Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{workoutLogs.length}</div>
                <p className="text-sm text-muted-foreground">Completed workouts</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {workoutLogs.reduce((total, workout) => {
                    const duration = parseInt(workout.duration) || 0;
                    return total + duration;
                  }, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Training minutes</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">-</div>
                <p className="text-sm text-muted-foreground">Estimated calories</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {workoutLogs.reduce((total, workout) => total + workout.exercises.length, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total exercises</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}