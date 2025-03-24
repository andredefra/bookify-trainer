
import React from "react";
import { Trophy, Flame, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Achievements() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-3">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Trophy className="h-4 w-4 mr-1.5 text-yellow-600" />
          <span>Recent Achievements</span>
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center bg-yellow-50 p-2 rounded">
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
              <Flame className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-yellow-800">Perfect Week</p>
              <p className="text-xs text-yellow-600">Completed all planned workouts</p>
            </div>
          </div>
          
          <div className="flex items-center bg-yellow-50 p-2 rounded">
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-yellow-800">Personal Best</p>
              <p className="text-xs text-yellow-600">Bench Press: 80kg × 6 reps</p>
            </div>
          </div>
          
          <div className="flex items-center bg-yellow-50 p-2 rounded">
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
              <Activity className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-yellow-800">30-Day Streak</p>
              <p className="text-xs text-yellow-600">Consistent workout tracking</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
