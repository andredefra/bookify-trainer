import React from "react";
import { TrendingUp, TrendingDown, Target, Calendar } from "lucide-react";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

interface ProgressTrendsCardProps {
  progressData: ProgressItem[];
}

export function ProgressTrendsCard({ progressData }: ProgressTrendsCardProps) {
  // Calculate overall progress trend
  const averageProgress = progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length;
  
  // Get next upcoming goal deadline
  const nextGoal = progressData
    .filter(goal => goal.targetDate)
    .sort((a, b) => new Date(a.targetDate!).getTime() - new Date(b.targetDate!).getTime())[0];
  
  // Count active goals
  const activeGoals = progressData.filter(goal => goal.progress < 100).length;
  
  // Calculate trend direction based on progress
  const getTrendIcon = () => {
    if (averageProgress >= 75) return <TrendingUp className="h-4 w-4 text-emerald-600" />;
    if (averageProgress >= 50) return <TrendingUp className="h-4 w-4 text-blue-600" />;
    return <TrendingDown className="h-4 w-4 text-amber-600" />;
  };

  const getTrendStatus = () => {
    if (averageProgress >= 75) return { label: "Excellent", color: "text-emerald-700" };
    if (averageProgress >= 50) return { label: "Good", color: "text-blue-700" };
    return { label: "Needs Focus", color: "text-amber-700" };
  };

  const trendStatus = getTrendStatus();

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-500 rounded-lg p-2">
            {getTrendIcon()}
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Progress Trends</h4>
            <p className="text-xs text-slate-600">Overall performance</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">{Math.round(averageProgress)}%</div>
          <div className="text-xs text-slate-500">Avg Progress</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target className="h-3 w-3 text-indigo-600" />
              <span className="text-lg font-bold text-indigo-700">{activeGoals}</span>
            </div>
            <div className="text-xs text-slate-600">Active Goals</div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Calendar className="h-3 w-3 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-700">
                {nextGoal ? new Date(nextGoal.targetDate!).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }) : 'None'}
              </span>
            </div>
            <div className="text-xs text-slate-600">Next Deadline</div>
          </div>
        </div>
        
        <div className="text-center">
          <span className={`text-sm font-medium ${trendStatus.color}`}>
            Status: {trendStatus.label}
          </span>
        </div>
      </div>
    </div>
  );
}