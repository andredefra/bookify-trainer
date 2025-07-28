
import React from "react";
import { Activity, ChevronUp, ChevronDown, Zap, TrendingUp, Dumbbell, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatisticsSummary() {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-primary" />
          Workout Summary
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Total Workouts */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-3 md:p-4 rounded-lg border border-primary/10">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between mb-2">
                <Dumbbell className="h-4 w-4 text-primary" />
                <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full hidden sm:inline">
                  Month
                </span>
              </div>
              <div className="text-xs text-muted-foreground font-medium mb-1">
                Total Workouts
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl md:text-2xl font-bold text-foreground">32</span>
                <span className="text-xs text-green-600 flex items-center">
                  <ChevronUp className="h-3 w-3" /> 5
                </span>
              </div>
            </div>
          </div>
          
          {/* Active Days */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 md:p-4 rounded-lg border border-emerald-200">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-xs px-2 py-0.5 bg-emerald-200 text-emerald-700 rounded-full hidden sm:inline">
                  30-day
                </span>
              </div>
              <div className="text-xs text-emerald-700 font-medium mb-1">
                Active Days
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl md:text-2xl font-bold text-emerald-900">
                  18<span className="text-xs font-normal text-emerald-700">/30</span>
                </span>
                <span className="text-xs text-green-600 flex items-center">
                  <ChevronUp className="h-3 w-3" /> 2
                </span>
              </div>
            </div>
          </div>
          
          {/* Average Duration */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 md:p-4 rounded-lg border border-amber-200">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-4 w-4 text-amber-600" />
                <span className="text-xs px-2 py-0.5 bg-amber-200 text-amber-700 rounded-full hidden sm:inline">
                  Session
                </span>
              </div>
              <div className="text-xs text-amber-700 font-medium mb-1">
                Avg Duration
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl md:text-2xl font-bold text-amber-900">
                  42<span className="text-xs font-normal text-amber-700">min</span>
                </span>
                <span className="text-xs text-red-500 flex items-center">
                  <ChevronDown className="h-3 w-3" /> 3
                </span>
              </div>
            </div>
          </div>
          
          {/* Calories Burned */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 md:p-4 rounded-lg border border-orange-200">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between mb-2">
                <Flame className="h-4 w-4 text-orange-600" />
                <span className="text-xs px-2 py-0.5 bg-orange-200 text-orange-700 rounded-full hidden sm:inline">
                  Weekly
                </span>
              </div>
              <div className="text-xs text-orange-700 font-medium mb-1">
                Calories Burned
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl md:text-2xl font-bold text-orange-900">4.2k</span>
                <span className="text-xs text-green-600 flex items-center">
                  <ChevronUp className="h-3 w-3" /> 8%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
