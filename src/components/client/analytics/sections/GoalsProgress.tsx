
import React from "react";
import { Target, TrendingUp, Award, Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

export function GoalsProgress() {
  const isMobile = useIsMobile();

  return (
    <Card className="shadow-md hover:shadow-lg transition-all bg-white border-slate-200">
      <CardContent className="p-5">
        <h3 className="text-base font-semibold mb-4 flex items-center text-slate-800">
          <Target className="h-5 w-5 mr-2.5 text-blue-600" />
          <span>Goals Progress</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg min-w-0">
            <div className="flex flex-col gap-2 mb-2.5">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-blue-800 truncate">Weight Goal</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded whitespace-nowrap">
                  Current: 68kg
                </span>
                <span className="text-xs bg-blue-300 text-blue-900 px-2 py-0.5 rounded whitespace-nowrap">
                  Target: 65kg
                </span>
              </div>
            </div>
            <div className="mb-2 flex items-center">
              <Progress value={70} className="h-2.5 flex-grow bg-blue-200" 
                style={{ 
                  "--theme-primary": "rgb(37 99 235)",
                } as React.CSSProperties} 
              />
              <span className="ml-2 text-xs font-semibold text-blue-800 w-8 text-right flex-shrink-0">70%</span>
            </div>
            <p className="text-xs text-blue-700">3kg remaining to reach your goal</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg min-w-0">
            <div className="flex flex-col gap-2 mb-2.5">
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-purple-600 flex-shrink-0" />
                <span className="text-sm font-medium text-purple-800 truncate">Body Fat</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded whitespace-nowrap">
                  Current: 18%
                </span>
                <span className="text-xs bg-purple-300 text-purple-900 px-2 py-0.5 rounded whitespace-nowrap">
                  Target: 15%
                </span>
              </div>
            </div>
            <div className="mb-2 flex items-center">
              <Progress value={60} className="h-2.5 flex-grow bg-purple-200" 
                style={{ 
                  "--theme-primary": "rgb(147 51 234)",
                } as React.CSSProperties} 
              />
              <span className="ml-2 text-xs font-semibold text-purple-800 w-8 text-right flex-shrink-0">60%</span>
            </div>
            <p className="text-xs text-purple-700">3% reduction needed to reach your goal</p>
          </div>
          
          <div className="bg-teal-50 p-4 rounded-lg min-w-0">
            <div className="flex flex-col gap-2 mb-2.5">
              <div className="flex items-center">
                <Dumbbell className="h-4 w-4 mr-2 text-teal-600 flex-shrink-0" />
                <span className="text-sm font-medium text-teal-800 truncate">
                  {isMobile ? "Weekly" : "Weekly Workouts"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded whitespace-nowrap">
                  Current: 3x
                </span>
                <span className="text-xs bg-teal-300 text-teal-900 px-2 py-0.5 rounded whitespace-nowrap">
                  Target: 4x
                </span>
              </div>
            </div>
            <div className="mb-2 flex items-center">
              <Progress value={75} className="h-2.5 flex-grow bg-teal-200" 
                style={{ 
                  "--theme-primary": "rgb(20 184 166)",
                } as React.CSSProperties} 
              />
              <span className="ml-2 text-xs font-semibold text-teal-800 w-8 text-right flex-shrink-0">75%</span>
            </div>
            <p className="text-xs text-teal-700">1 more workout needed this week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
