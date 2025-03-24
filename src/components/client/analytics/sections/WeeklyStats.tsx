
import React from "react";
import { Calendar, Dumbbell, Activity, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WeeklyStats() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1.5 text-teal-600" />
            <span>Weekly Stats</span>
          </h3>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Last 7 days</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-teal-50 p-2 rounded flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Dumbbell className="h-3.5 w-3.5 text-teal-500 mr-1" />
              <span className="text-xs text-teal-700">Workouts</span>
            </div>
            <span className="text-xl font-bold text-teal-800">8</span>
          </div>
          
          <div className="bg-teal-50 p-2 rounded flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Activity className="h-3.5 w-3.5 text-teal-500 mr-1" />
              <span className="text-xs text-teal-700">Hours</span>
            </div>
            <span className="text-xl font-bold text-teal-800">4.7</span>
          </div>
          
          <div className="bg-teal-50 p-2 rounded flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Flame className="h-3.5 w-3.5 text-teal-500 mr-1" />
              <span className="text-xs text-teal-700">Calories</span>
            </div>
            <span className="text-xl font-bold text-teal-800">2.7k</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
