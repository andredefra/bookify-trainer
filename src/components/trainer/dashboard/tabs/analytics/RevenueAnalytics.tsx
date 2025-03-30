
import React, { useState } from "react";
import { 
  monthlyRevenue, 
  revenueByProduct, 
  clientGrowth, 
  COLORS 
} from "./data/revenueData";
import { MonthlySummaryCards } from "./charts/MonthlySummaryCards";
import { MonthlyRevenueChart } from "./charts/MonthlyRevenueChart";
import { RevenueByProductChart } from "./charts/RevenueByProductChart";
import { ClientGrowthChart } from "./charts/ClientGrowthChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample client list for the filter
const clients = [
  { id: "all", name: "All Clients" },
  { id: "client1", name: "Sarah Johnson" },
  { id: "client2", name: "Mike Peterson" },
  { id: "client3", name: "Lisa Garcia" },
  { id: "client4", name: "David Kim" },
  { id: "client5", name: "Emma Thompson" },
];

export function RevenueAnalytics() {
  const [selectedClient, setSelectedClient] = useState("all");

  return (
    <div className="space-y-6">
      {/* Client Filter */}
      <div className="flex justify-end">
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger className="w-[200px]">
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
      </div>
      
      {/* Summary cards */}
      <MonthlySummaryCards data={monthlyRevenue} />
      
      {/* Monthly Revenue Chart */}
      <MonthlyRevenueChart data={monthlyRevenue} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue by Product */}
        <RevenueByProductChart data={revenueByProduct} colors={COLORS} />
        
        {/* Client Growth */}
        <ClientGrowthChart data={clientGrowth} />
      </div>
    </div>
  );
}
