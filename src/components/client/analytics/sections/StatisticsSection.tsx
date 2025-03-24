
import React from "react";
import { 
  Activity, TrendingUp, Flame, Target, Dumbbell, TrendingDown, 
  Heart, Calendar, Zap, ChevronUp, ChevronDown, User, Scale, Trophy 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function StatisticsSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Left Column - Summary & Weekly Stats */}
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

        {/* Middle Column - Goals & Body Metrics */}
        <div className="space-y-3">
          {/* Goals Progress */}
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

          {/* Body Metrics */}
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
        </div>

        {/* Right Column - Weekly Stats & Achievements */}
        <div className="space-y-3">
          {/* Weekly Stats */}
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

          {/* Recent Achievements */}
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
        </div>
      </div>
    </div>
  );
}
