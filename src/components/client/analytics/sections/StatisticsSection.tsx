
import React from "react";
import { Activity, TrendingUp, Flame, Target, Dumbbell, TrendingDown } from "lucide-react";
import { StatCard } from "../cards/StatCard";
import { MetricCard } from "../cards/MetricCard";

export function StatisticsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Statistiche Fitness</h3>
      
      {/* Stats row using full-width responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
      </div>

      {/* Detailed metrics cards with improved full-width layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full">
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
      </div>
    </div>
  );
}
