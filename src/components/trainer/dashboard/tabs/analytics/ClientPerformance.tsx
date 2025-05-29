
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  performanceData, 
  retentionData, 
  goalAchievementData, 
  COLORS 
} from "./data/performanceData";
import { mockClients } from "./data/clientMockData";
import { generateClientPerformanceData } from "./utils/metricsCalculator";
import { PerformanceLineChart } from "./charts/PerformanceLineChart";
import { RetentionPieChart } from "./charts/RetentionPieChart";
import { GoalAchievementChart } from "./charts/GoalAchievementChart";

// Sample client list for the filter (using real mock data)
const clients = [
  { id: "all", name: "All Clients" },
  ...mockClients.map(client => ({ id: client.id, name: client.name }))
];

export function ClientPerformance() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [selectedClient, setSelectedClient] = useState("all");
  
  // Generate performance data based on selected client
  const getPerformanceData = () => {
    if (selectedClient === "all") {
      // Return aggregated data or default data
      return performanceData;
    } else {
      // Return data for specific client
      const client = mockClients.find(c => c.id === selectedClient);
      if (client) {
        const weeks = timeframe === "weekly" ? 6 : timeframe === "monthly" ? 12 : 24;
        return generateClientPerformanceData(client, weeks);
      }
      return performanceData;
    }
  };
  
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
            <SelectItem value="weekly">6 Weeks</SelectItem>
            <SelectItem value="monthly">12 Weeks</SelectItem>
            <SelectItem value="quarterly">24 Weeks</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Performance Metrics Chart */}
      <PerformanceLineChart data={getPerformanceData()} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Retention */}
        <RetentionPieChart data={retentionData} colors={COLORS} />
        
        {/* Goal Achievement */}
        <GoalAchievementChart data={goalAchievementData} />
      </div>
    </div>
  );
}
