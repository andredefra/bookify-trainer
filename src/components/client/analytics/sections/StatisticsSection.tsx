
import React from "react";
import { Activity, TrendingUp, Flame, Target, Dumbbell, TrendingDown } from "lucide-react";
import { StatCard } from "../cards/StatCard";
import { MetricCard } from "../cards/MetricCard";

export function StatisticsSection() {
  return (
    <div className="space-y-1 w-full max-w-[98%] mx-auto">
      <h3 className="text-lg font-semibold">Statistiche Fitness</h3>
      
      {/* Stats row using full-width responsive layout with more columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-1 w-full">
        <StatCard 
          title="Completed Workouts" 
          value="32"
          change="+5"
          trend="up"
          period="vs last month" 
          icon={<Activity className="h-4 w-4" />}
          color="#4f46e5"
        />
        <StatCard 
          title="Active Days" 
          value="18/30"
          change="+2"
          trend="up"
          period="vs last month"
          icon={<TrendingUp className="h-4 w-4" />}
          color="#10b981"
        />
        <StatCard 
          title="Average Duration" 
          value="42 min"
          change="-3"
          trend="down"
          period="vs last month"
          icon={<Flame className="h-4 w-4" />}
          color="#f59e0b"
        />
        <StatCard 
          title="Goal Progress" 
          value="68%"
          change="+12%"
          trend="up"
          period="vs last month"
          icon={<Target className="h-4 w-4" />}
          color="#8884d8"
        />
        <StatCard 
          title="Calories Burned" 
          value="4.2k"
          change="+8%"
          trend="up"
          period="vs last month"
          icon={<Flame className="h-4 w-4" />}
          color="#ef4444"
        />
        <StatCard 
          title="Rest Days" 
          value="12"
          change="-2"
          trend="down"
          period="vs last month"
          icon={<TrendingDown className="h-4 w-4" />}
          color="#6366f1"
        />
      </div>

      {/* Detailed metrics cards with improved full-width layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-1 w-full">
        <MetricCard 
          title="Weekly Stats" 
          metrics={[
            { label: "Workouts", value: "8", icon: <Dumbbell className="h-3 w-3" /> },
            { label: "Total Time", value: "285 min", icon: <Activity className="h-3 w-3" /> },
            { label: "Calories", value: "2,730", icon: <Flame className="h-3 w-3" /> }
          ]} 
        />
        <MetricCard 
          title="Current Status" 
          metrics={[
            { label: "Weight", value: "68 kg", icon: <TrendingDown className="h-3 w-3 text-green-500" /> },
            { label: "Body Fat", value: "18%", icon: <TrendingDown className="h-3 w-3 text-green-500" /> },
            { label: "Muscle Mass", value: "31%", icon: <TrendingUp className="h-3 w-3 text-blue-500" /> }
          ]} 
        />
        <MetricCard 
          title="Fitness Goals" 
          metrics={[
            { label: "Target Weight", value: "65 kg", icon: <Target className="h-3 w-3" /> },
            { label: "Body Fat Goal", value: "15%", icon: <Target className="h-3 w-3" /> },
            { label: "Weekly Goal", value: "4x", icon: <Activity className="h-3 w-3" /> }
          ]} 
        />
      </div>
    </div>
  );
}
