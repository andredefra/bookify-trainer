import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ClientProgressChart } from "./charts/ClientProgressChart";
import { ClientGoalsProgress } from "./charts/ClientGoalsProgress";
import { ClientWorkoutInsights } from "./charts/ClientWorkoutInsights";
import { ClientAnalyticsInsights } from "./charts/ClientAnalyticsInsights";
import { AllClientsOverview } from "./charts/AllClientsOverview";
import { AggregatedGoalStats } from "./charts/AggregatedGoalStats";
import { ClientFullAnalytics } from "./charts/ClientFullAnalytics";
import { MetricsChart } from "../clients/ClientProfileTabs/metrics/MetricsChart";
import { RecentMeasurements } from "../clients/ClientProfileTabs/metrics/RecentMeasurements";
import { GeneralStatusDashboard } from "./GeneralStatusDashboard";

// Sample client list for the filter (using real mock data)
const clients = [
  { id: "all", name: "All Clients" },
  ...mockClients.map(client => ({ id: client.id, name: client.name }))
];

interface ClientPerformanceProps {
  initialClientFilter?: string;
  onClientChange?: (clientId: string) => void;
}

export function ClientPerformance({ initialClientFilter = "all", onClientChange }: ClientPerformanceProps) {
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

  // Get selected client name for display
  const getSelectedClientName = () => {
    if (selectedClient === "all") return undefined;
    const client = mockClients.find(c => c.id === selectedClient);
    return client?.name;
  };
  
  const isAllClientsView = selectedClient === "all";
  
  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Select value={selectedClient} onValueChange={(value) => {
          console.log("Client selection changed to:", value);
          setSelectedClient(value);
          onClientChange?.(value);
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
      
      {/* Client Progress Chart - Always visible */}
      <ClientProgressChart 
        data={getPerformanceData()} 
        clientName={getSelectedClientName()}
      />
      
      {isAllClientsView ? (
        // Aggregated view for "All Clients"
        <>
          <AllClientsOverview clients={mockClients} />
          <AggregatedGoalStats clients={mockClients} />
        </>
      ) : (
        // Individual client view with full analytics
        <>
          {/* Full Client Analytics - Reuses client dashboard cards */}
          {selectedClient !== "all" && mockClients.find(c => c.id === selectedClient) && (
            <ClientFullAnalytics 
              client={mockClients.find(c => c.id === selectedClient)!}
            />
          )}
          
          {/* NEW: General Status Dashboard - Check-in Analytics */}
          {selectedClient !== "all" && mockClients.find(c => c.id === selectedClient) && (
            <GeneralStatusDashboard 
              clientId={`00000000-0000-0000-0000-${String(mockClients.findIndex(c => c.id === selectedClient) + 1).padStart(12, '0')}`}
              clientName={mockClients.find(c => c.id === selectedClient)?.name || "Client"}
            />
          )}
          
          {/* Body Metrics Section - Migrated from Client Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Body Metrics</CardTitle>
              <CardDescription>Weight, body fat, and muscle mass tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <MetricsChart />
              <RecentMeasurements 
                clientMetrics={{
                  weight: "65kg",
                  height: "168cm",
                  bodyFat: "24%"
                }}
              />
            </CardContent>
          </Card>
          
          {/* Client Goals Progress - Existing component for goal tracking */}
          <ClientGoalsProgress 
            clientName={getSelectedClientName()}
          />
          
          {/* AI Analytics Insights - Similar to client analytics */}
          <ClientAnalyticsInsights 
            clientName={getSelectedClientName()}
            fitnessScore={78}
            progressTrend="improving"
          />
          
          {/* Client Workout Insights - Replaces Exercise Maxes with personalized insights */}
          <ClientWorkoutInsights 
            clientName={getSelectedClientName()}
          />
        </>
      )}
    </div>
  );
}
