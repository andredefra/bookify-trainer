
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  performanceData, 
  retentionData, 
  goalAchievementData, 
  COLORS 
} from "./data/performanceData";
import { PerformanceLineChart } from "./charts/PerformanceLineChart";
import { RetentionPieChart } from "./charts/RetentionPieChart";
import { GoalAchievementChart } from "./charts/GoalAchievementChart";

export function ClientPerformance() {
  const [timeframe, setTimeframe] = useState("weekly");
  
  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Performance Metrics Chart */}
      <PerformanceLineChart data={performanceData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Retention */}
        <RetentionPieChart data={retentionData} colors={COLORS} />
        
        {/* Goal Achievement */}
        <GoalAchievementChart data={goalAchievementData} />
      </div>
    </div>
  );
}
