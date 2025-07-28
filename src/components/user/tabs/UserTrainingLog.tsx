import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Plus, Edit3, Clock } from "lucide-react";
import { useState } from "react";

export function UserTrainingLog() {
  const [showAddWorkout, setShowAddWorkout] = useState(false);

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
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workout-name">Workout Name</Label>
                <Input id="workout-name" placeholder="e.g., Upper Body Strength" />
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="45" />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="How did you feel? Any observations?" />
            </div>
            <div className="flex space-x-2">
              <Button>Save Workout</Button>
              <Button variant="outline" onClick={() => setShowAddWorkout(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Workouts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Workouts</h2>
        
        {/* Workout Entry 1 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm font-medium">MON</div>
                  <div className="text-lg font-bold text-primary">18</div>
                </div>
                <div>
                  <h3 className="font-medium">Upper Body Strength</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>45 minutes</span>
                    <span>•</span>
                    <span>6 exercises</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Felt strong today, increased weights on most exercises
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Completed</Badge>
                <Button variant="ghost" size="sm">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workout Entry 2 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm font-medium">TUE</div>
                  <div className="text-lg font-bold text-primary">19</div>
                </div>
                <div>
                  <h3 className="font-medium">Cardio & Core</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>30 minutes</span>
                    <span>•</span>
                    <span>HIIT + Core</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Great HIIT session, really pushed myself
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Completed</Badge>
                <Button variant="ghost" size="sm">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workout Entry 3 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm font-medium">SUN</div>
                  <div className="text-lg font-bold text-primary">17</div>
                </div>
                <div>
                  <h3 className="font-medium">Full Body Circuit</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>40 minutes</span>
                    <span>•</span>
                    <span>8 exercises</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tough workout but felt accomplished
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Completed</Badge>
                <Button variant="ghost" size="sm">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>This Week's Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground">Workouts completed</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">115</div>
              <p className="text-sm text-muted-foreground">Minutes exercised</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">450</div>
              <p className="text-sm text-muted-foreground">Calories burned</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">7</div>
              <p className="text-sm text-muted-foreground">Day streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}