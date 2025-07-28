import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Trophy, Calendar, TrendingUp, MessageCircle, Zap } from "lucide-react";
import { UserFitnessProgress } from "../overview/UserFitnessProgress";

export function UserOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">Ready to continue your fitness journey with Trainer.ai?</p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-primary font-semibold">7 day streak!</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/3</div>
            <p className="text-xs text-muted-foreground">
              Goals completed this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 kg</div>
            <p className="text-xs text-muted-foreground">
              -2kg from start
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fitness Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Fitness Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Lose 5kg by summer</span>
              <Badge variant="outline">75% complete</Badge>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">2kg left to go!</p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Daily steps (10,000)</span>
              <Badge variant="outline">85% complete</Badge>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">8,500 steps today</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Training</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Upper Body Strength</span>
                <Badge>Scheduled</Badge>
              </div>
              <p className="text-sm text-muted-foreground">45 minutes • 6 exercises</p>
              <Button className="w-full">Start Workout</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Trainer.ai</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                "Great job on yesterday's workout! Ready for today's upper body session?"
              </p>
              <Button variant="outline" className="w-full">
                Chat with Trainer.ai
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fitness Progress Section */}
      <UserFitnessProgress />
    </div>
  );
}