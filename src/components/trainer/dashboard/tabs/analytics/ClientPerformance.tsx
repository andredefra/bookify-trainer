
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

// Sample client list for the filter
const clients = [
  { id: "all", name: "All Clients" },
  { id: "client1", name: "Sarah Johnson" },
  { id: "client2", name: "Mike Peterson" },
  { id: "client3", name: "Lisa Garcia" },
  { id: "client4", name: "David Kim" },
  { id: "client5", name: "Emma Thompson" },
];

export function ClientPerformance() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [selectedClient, setSelectedClient] = useState("all");
  
  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-full md:w-[150px]">
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
