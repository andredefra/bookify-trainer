
import React from "react";
import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function GoalsProgress() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-3">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Target className="h-4 w-4 mr-1.5 text-blue-600" />
          <span>Goals Progress</span>
        </h3>
        
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Weight Goal (65kg)</span>
              <span className="font-medium">68kg</span>
            </div>
            <div className="flex items-center">
              <Progress value={70} className="h-2 flex-grow" />
              <span className="ml-2 text-xs font-medium">70%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Body Fat (15%)</span>
              <span className="font-medium">18%</span>
            </div>
            <div className="flex items-center">
              <Progress value={60} className="h-2 flex-grow" />
              <span className="ml-2 text-xs font-medium">60%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Weekly Workouts (4x)</span>
              <span className="font-medium">3x</span>
            </div>
            <div className="flex items-center">
              <Progress value={75} className="h-2 flex-grow" />
              <span className="ml-2 text-xs font-medium">75%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
