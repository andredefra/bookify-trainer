
import React from "react";
import { Trophy, Flame, TrendingUp, Activity, Award, Medal, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Achievements() {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all bg-white border-slate-200">
      <CardContent className="p-5">
        <h3 className="text-base font-semibold mb-4 flex items-center text-slate-800">
          <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
          <span>Recent Achievements</span>
        </h3>
        
        <div className="space-y-3.5">
          <div className="flex items-center gap-3 p-3.5 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-100 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 flex items-center justify-center">
              <Medal className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-amber-900">Perfect Week</p>
              <p className="text-sm text-amber-700">Completed all planned workouts</p>
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span className="text-xs text-amber-600 ml-1">+150 points</span>
              </div>
            </div>
            <span className="text-xs rounded-full bg-amber-200 text-amber-800 px-2 py-1">1d ago</span>
          </div>
          
          <div className="flex items-center gap-3 p-3.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-900">Personal Best</p>
              <p className="text-sm text-blue-700">Bench Press: 80kg × 6 reps</p>
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-blue-500 fill-blue-500" />
                <Star className="h-3 w-3 text-blue-500 fill-blue-500" />
                <Star className="h-3 w-3 text-blue-500 fill-blue-500" />
                <Star className="h-3 w-3 text-blue-500 fill-blue-500" />
                <span className="text-xs text-blue-600 ml-1">+200 points</span>
              </div>
            </div>
            <span className="text-xs rounded-full bg-blue-200 text-blue-800 px-2 py-1">3d ago</span>
          </div>
          
          <div className="flex items-center gap-3 p-3.5 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-purple-900">30-Day Streak</p>
              <p className="text-sm text-purple-700">Consistent workout tracking</p>
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-purple-500 fill-purple-500" />
                <Star className="h-3 w-3 text-purple-500 fill-purple-500" />
                <Star className="h-3 w-3 text-purple-500 fill-purple-500" />
                <Star className="h-3 w-3 text-purple-500 fill-purple-500" />
                <Star className="h-3 w-3 text-purple-500 fill-purple-500" />
                <span className="text-xs text-purple-600 ml-1">+500 points</span>
              </div>
            </div>
            <span className="text-xs rounded-full bg-purple-200 text-purple-800 px-2 py-1">1w ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
