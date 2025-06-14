
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  performanceData, 
  goalAchievementData, 
  COLORS 
} from "./data/performanceData";
import { mockClients } from "./data/clientMockData";
import { 
  generateClientPerformanceData,
  calculateGoalAchievementData,
  calculateSingleClientGoals
} from "./utils/metricsCalculator";
import { PerformanceLineChart } from "./charts/PerformanceLineChart";
import { ExerciseMaxChart } from "./charts/ExerciseMaxChart";
import { getClientExerciseData } from "./data/exerciseMaxData";

// Sample client list for the filter (using real mock data)
const clients = [
  { id: "all", name: "All Clients" },
  ...mockClients.map(client => ({ id: client.id, name: client.name }))
];

interface ClientPerformanceProps {
  initialClientFilter?: string;
}

export function ClientPerformance({ initialClientFilter = "all" }: ClientPerformanceProps) {
  const [timeframe, setTimeframe] = useState("weekly");
  const [selectedClient, setSelectedClient] = useState(initialClientFilter);
  
  // Update selected client when prop changes
  useEffect(() => {
    setSelectedClient(initialClientFilter);
  }, [initialClientFilter]);
  
  // Generate performance data based on selected client and timeframe
  const getPerformanceData = () => {
    console.log("Getting performance data for client:", selectedClient, "timeframe:", timeframe);
    
    if (selectedClient === "all") {
      // Return aggregated data or default data
      return performanceData;
    } else {
      // Return data for specific client
      const client = mockClients.find(c => c.id === selectedClient);
      console.log("Found client:", client);
      
      if (client) {
        const weeks = timeframe === "weekly" ? 6 : timeframe === "monthly" ? 12 : 24;
        const data = generateClientPerformanceData(client, weeks);
        console.log("Generated data:", data);
        return data;
      }
      return performanceData;
    }
  };

  // Get exercise max data based on selected client
  const getExerciseMaxData = () => {
    return getClientExerciseData(selectedClient);
  };
  
  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Select value={selectedClient} onValueChange={(value) => {
          console.log("Client selection changed to:", value);
          setSelectedClient(value);
        }}>
          <SelectTrigger className="w-full md:w-[200px] bg-white border border-gray-300 shadow-sm">
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={timeframe} onValueChange={(value) => {
          console.log("Timeframe selection changed to:", value);
          setTimeframe(value);
        }}>
          <SelectTrigger className="w-full md:w-[150px] bg-white border border-gray-300 shadow-sm">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
            <SelectItem value="weekly">6 Weeks</SelectItem>
            <SelectItem value="monthly">12 Weeks</SelectItem>
            <SelectItem value="quarterly">24 Weeks</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Performance Metrics Chart */}
      <PerformanceLineChart data={getPerformanceData()} />
      
      {/* Exercise Maxes Chart - now full width with increased height */}
      <div className="w-full">
        <ExerciseMaxChart data={getExerciseMaxData()} />
      </div>
    </div>
  );
}
