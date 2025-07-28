import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Play, CheckCircle, MessageCircle } from "lucide-react";

export function UserTrainingProgram() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Training Program</h1>
          <p className="text-muted-foreground">Personalized by Trainer.ai based on your goals</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span>Adjust Program</span>
        </Button>
      </div>

      {/* Program Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Program: Beginner Strength & Weight Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Week 3</div>
              <p className="text-sm text-muted-foreground">of 12 weeks</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">workouts per week</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">45min</div>
              <p className="text-sm text-muted-foreground">average duration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* This Week's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>This Week's Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Monday */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">Monday - Upper Body Strength</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>45 minutes</span>
                  <span>•</span>
                  <span>6 exercises</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary">Completed</Badge>
          </div>

          {/* Tuesday */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">Tuesday - Cardio & Core</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>30 minutes</span>
                  <span>•</span>
                  <span>HIIT + Core</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary">Completed</Badge>
          </div>

          {/* Wednesday */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5 border-primary">
            <div className="flex items-center space-x-4">
              <Play className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">Wednesday - Lower Body Strength</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>45 minutes</span>
                  <span>•</span>
                  <span>7 exercises</span>
                </div>
              </div>
            </div>
            <Button>Start Workout</Button>
          </div>

          {/* Thursday */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="h-5 w-5 border-2 border-muted rounded-full" />
              <div>
                <h3 className="font-medium">Thursday - Active Recovery</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>20 minutes</span>
                  <span>•</span>
                  <span>Stretching & Mobility</span>
                </div>
              </div>
            </div>
            <Badge variant="outline">Scheduled</Badge>
          </div>

          {/* Friday */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="h-5 w-5 border-2 border-muted rounded-full" />
              <div>
                <h3 className="font-medium">Friday - Full Body Circuit</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>40 minutes</span>
                  <span>•</span>
                  <span>8 exercises</span>
                </div>
              </div>
            </div>
            <Badge variant="outline">Scheduled</Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Trainer.ai Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              "You're making excellent progress! Your strength has increased by 15% since starting. 
              I've adjusted your weights for next week to keep challenging you appropriately."
            </p>
            <p className="text-sm">
              "Based on your recovery patterns, I recommend adding an extra rest day next week. 
              Quality over quantity!"
            </p>
            <Button variant="outline" className="w-full mt-4">
              Ask Trainer.ai a Question
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}