
import React from "react";
import { Activity, ChevronUp, ChevronDown, Zap, TrendingUp, Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatisticsSummary() {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all bg-white border-slate-200">
      <CardContent className="p-5">
        <h3 className="text-base font-semibold mb-4 flex items-center text-slate-800">
          <Activity className="h-5 w-5 mr-2 text-indigo-600" />
          <span>Workout Summary</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg flex flex-col shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-700 font-medium flex items-center">
                <Dumbbell className="h-4 w-4 mr-1.5" />
                Total Workouts
              </span>
              <span className="text-xs px-2 py-1 bg-indigo-200 text-indigo-800 rounded-full">This Month</span>
            </div>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold text-indigo-900">32</span>
              <span className="ml-2 text-sm text-green-600 flex items-center">
                <ChevronUp className="h-4 w-4" /> 5
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg flex flex-col shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-teal-700 font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1.5" />
                Active Days
              </span>
              <span className="text-xs px-2 py-1 bg-teal-200 text-teal-800 rounded-full">30-day</span>
            </div>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold text-teal-900">18<span className="text-sm font-normal">/30</span></span>
              <span className="ml-2 text-sm text-green-600 flex items-center">
                <ChevronUp className="h-4 w-4" /> 2
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg flex flex-col shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700 font-medium flex items-center">
                <Zap className="h-4 w-4 mr-1.5" />
                Avg Duration
              </span>
              <span className="text-xs px-2 py-1 bg-amber-200 text-amber-800 rounded-full">Per Session</span>
            </div>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold text-amber-900">42<span className="text-sm font-normal">min</span></span>
              <span className="ml-2 text-sm text-red-500 flex items-center">
                <ChevronDown className="h-4 w-4" /> 3
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg flex flex-col shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-orange-700 font-medium flex items-center">
                <Flame className="h-4 w-4 mr-1.5" />
                Calories Burned
              </span>
              <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded-full">Weekly</span>
            </div>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold text-orange-900">4.2k</span>
              <span className="ml-2 text-sm text-green-600 flex items-center">
                <ChevronUp className="h-4 w-4" /> 8%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
