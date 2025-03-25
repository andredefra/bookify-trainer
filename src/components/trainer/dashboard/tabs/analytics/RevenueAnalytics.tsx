
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

// Mock data for revenue analytics
const monthlyRevenue = [
  { name: 'Jan', programs: 720, sessions: 480, total: 1200 },
  { name: 'Feb', programs: 840, sessions: 560, total: 1400 },
  { name: 'Mar', programs: 900, sessions: 600, total: 1500 },
  { name: 'Apr', programs: 1080, sessions: 720, total: 1800 },
  { name: 'May', programs: 1200, sessions: 800, total: 2000 },
  { name: 'Jun', programs: 1020, sessions: 680, total: 1700 },
];

const revenueByProduct = [
  { name: 'Strength & Conditioning', value: 4200 },
  { name: 'Weight Loss Program', value: 3800 },
  { name: 'Flexibility & Recovery', value: 2400 },
  { name: 'Personal Training', value: 5600 },
];

const clientGrowth = [
  { name: 'Jan', clients: 5 },
  { name: 'Feb', clients: 8 },
  { name: 'Mar', clients: 12 },
  { name: 'Apr', clients: 15 },
  { name: 'May', clients: 20 },
  { name: 'Jun', clients: 24 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function RevenueAnalytics() {
  // Calculate summary metrics
  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.total, 0);
  const averageMonthlyRevenue = totalRevenue / monthlyRevenue.length;
  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1].total;
  const prevMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2].total;
  const percentChange = ((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100;
  
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
          <div className="text-2xl font-bold mt-1">€{totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">All time</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Monthly Average</div>
          <div className="text-2xl font-bold mt-1">€{averageMonthlyRevenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">Per month</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Last Month</div>
          <div className="text-2xl font-bold mt-1">€{lastMonthRevenue.toLocaleString()}</div>
          <div className={`text-xs mt-1 ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(1)}% vs previous
          </div>
        </div>
      </div>
      
      {/* Monthly Revenue Chart */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-base font-medium mb-4">Monthly Revenue</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={monthlyRevenue}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                tickFormatter={(value) => `€${value}`}
                axisLine={false} 
                tickLine={false}
              />
              <Tooltip 
                formatter={(value) => [`€${value}`, ""]}
                contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
              />
              <Legend iconSize={10} />
              <Bar dataKey="programs" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="sessions" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue by Product */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-base font-medium mb-4">Revenue by Product</h3>
          <div className="flex flex-col items-center h-[300px]">
            <div className="h-[200px] w-[200px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByProduct}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {revenueByProduct.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`€${value}`, 'Revenue']}
                    contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {revenueByProduct.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div 
                    className="w-3 h-3 mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs">{entry.name} (€{entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Client Growth */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-base font-medium mb-4">Client Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={clientGrowth}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clients" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
