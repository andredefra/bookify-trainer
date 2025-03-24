
import React from "react";
import { Activity, ChevronUp, ChevronDown, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatisticsSummary() {
  return (
    <div className="space-y-3">
      {/* Summary Stats */}
      <Card className="shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-3">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Activity className="h-4 w-4 mr-1.5 text-indigo-600" />
            <span>Workout Summary</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-indigo-50 p-2 rounded flex flex-col">
              <span className="text-xs text-indigo-600 font-medium">Total Workouts</span>
              <div className="flex items-baseline mt-1">
                <span className="text-xl font-bold text-indigo-700">32</span>
                <span className="ml-1.5 text-xs text-green-600 flex items-center">
                  <ChevronUp className="h-3 w-3" /> 5
                </span>
              </div>
            </div>
            
            <div className="bg-green-50 p-2 rounded flex flex-col">
              <span className="text-xs text-green-600 font-medium">Active Days</span>
              <div className="flex items-baseline mt-1">
                <span className="text-xl font-bold text-green-700">18<span className="text-sm font-normal">/30</span></span>
                <span className="ml-1.5 text-xs text-green-600 flex items-center">
                  <ChevronUp className="h-3 w-3" /> 2
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card className="shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-3">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Zap className="h-4 w-4 mr-1.5 text-amber-600" />
            <span>Performance Metrics</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-amber-50 p-2 rounded flex flex-col">
              <span className="text-xs text-amber-600 font-medium">Avg Duration</span>
              <div className="flex items-baseline mt-1">
                <span className="text-xl font-bold text-amber-700">42<span className="text-sm font-normal">min</span></span>
                <span className="ml-1.5 text-xs text-red-500 flex items-center">
                  <ChevronDown className="h-3 w-3" /> 3
                </span>
              </div>
            </div>
            
            <div className="bg-orange-50 p-2 rounded flex flex-col">
              <span className="text-xs text-orange-600 font-medium">Calories Burned</span>
              <div className="flex items-baseline mt-1">
                <span className="text-xl font-bold text-orange-700">4.2k</span>
                <span className="ml-1.5 text-xs text-green-600 flex items-center">
                  <ChevronUp className="h-3 w-3" /> 8%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
