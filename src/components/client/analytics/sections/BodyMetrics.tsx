
import React from "react";
import { User, Scale, Heart, Activity, ChevronDown, ChevronUp, Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function BodyMetrics() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-3">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <User className="h-4 w-4 mr-1.5 text-purple-600" />
          <span>Current Body Metrics</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between bg-purple-50 p-2 rounded">
            <div className="flex items-center">
              <Scale className="h-3.5 w-3.5 text-purple-500 mr-1.5" />
              <span className="text-xs text-purple-700">Weight</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-purple-900">68 kg</span>
              <ChevronDown className="h-3 w-3 ml-1 text-green-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-purple-50 p-2 rounded">
            <div className="flex items-center">
              <Heart className="h-3.5 w-3.5 text-purple-500 mr-1.5" />
              <span className="text-xs text-purple-700">Body Fat</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-purple-900">18%</span>
              <ChevronDown className="h-3 w-3 ml-1 text-green-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-purple-50 p-2 rounded">
            <div className="flex items-center">
              <Dumbbell className="h-3.5 w-3.5 text-purple-500 mr-1.5" />
              <span className="text-xs text-purple-700">Muscle</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-purple-900">31%</span>
              <ChevronUp className="h-3 w-3 ml-1 text-blue-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-purple-50 p-2 rounded">
            <div className="flex items-center">
              <Activity className="h-3.5 w-3.5 text-purple-500 mr-1.5" />
              <span className="text-xs text-purple-700">BMI</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-purple-900">23.1</span>
              <span className="text-xs ml-1 text-blue-600">Normal</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
