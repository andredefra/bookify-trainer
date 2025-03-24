
import React from "react";
import { Activity, TrendingUp, Flame, Target, Dumbbell, TrendingDown, Heart, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatisticsSection() {
  return (
    <div className="w-full mx-auto bg-white rounded-lg p-4">
      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Workout Summary Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-indigo-100 p-2 rounded-full mr-3">
                <Activity className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-sm">Workout Summary</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-gray-800">32</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>Completed</span>
                  <span className="ml-1 text-green-600 flex items-center text-xs">
                    +5 <TrendingUp className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-gray-800">18/30</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>Active Days</span>
                  <span className="ml-1 text-green-600 flex items-center text-xs">
                    +2 <TrendingUp className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <Flame className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-sm">Performance</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-gray-800">42 min</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>Avg Duration</span>
                  <span className="ml-1 text-red-600 flex items-center text-xs">
                    -3 <TrendingDown className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-gray-800">4.2k</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>Calories</span>
                  <span className="ml-1 text-green-600 flex items-center text-xs">
                    +8% <TrendingUp className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Goals & Progress</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-gray-800">68%</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>Goal Progress</span>
                  <span className="ml-1 text-green-600 flex items-center text-xs">
                    +12% <TrendingUp className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-gray-800">12</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>Rest Days</span>
                  <span className="ml-1 text-red-600 flex items-center text-xs">
                    -2 <TrendingDown className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Metrics */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">Weekly Stats</h3>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Last 7 days</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1 text-gray-500">
                <Dumbbell className="h-4 w-4 mr-1" />
                <span className="text-xs">Workouts</span>
              </div>
              <div className="text-xl font-bold text-gray-800">8</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1 text-gray-500">
                <Activity className="h-4 w-4 mr-1" />
                <span className="text-xs">Total Time</span>
              </div>
              <div className="text-xl font-bold text-gray-800">285 min</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1 text-gray-500">
                <Flame className="h-4 w-4 mr-1" />
                <span className="text-xs">Calories</span>
              </div>
              <div className="text-xl font-bold text-gray-800">2,730</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Body Metrics & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Body Metrics */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">Current Body Status</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Weight</span>
                  <span className="text-sm font-medium">68 kg</span>
                </div>
                <span className="text-green-500 flex items-center text-xs">
                  <TrendingDown className="h-3 w-3 mr-0.5" /> Improving
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Body Fat</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <span className="text-green-500 flex items-center text-xs">
                  <TrendingDown className="h-3 w-3 mr-0.5" /> Improving
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Muscle Mass</span>
                  <span className="text-sm font-medium">31%</span>
                </div>
                <span className="text-blue-500 flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> Increasing
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fitness Goals */}
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-rose-100 p-2 rounded-full mr-3">
                <Target className="h-5 w-5 text-rose-600" />
              </div>
              <h3 className="font-semibold text-sm">Fitness Goals</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Target Weight</span>
                  <span className="text-sm font-medium">65 kg</span>
                </div>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Body Fat Goal</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Weekly Goal</span>
                  <span className="text-sm font-medium">4x</span>
                </div>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
