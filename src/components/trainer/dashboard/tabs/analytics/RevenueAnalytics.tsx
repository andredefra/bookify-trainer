
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
  Cell
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
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
          <div className="text-xl font-bold mt-1">€{totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">All time</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Monthly Average</div>
          <div className="text-xl font-bold mt-1">€{averageMonthlyRevenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">Per month</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Last Month</div>
          <div className="text-xl font-bold mt-1">€{lastMonthRevenue.toLocaleString()}</div>
          <div className={`text-xs mt-1 ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(1)}% vs previous
          </div>
        </div>
      </div>
      
      {/* Monthly Revenue Chart */}
      <div className="bg-white p-3 rounded-lg border shadow-sm">
        <h3 className="text-base font-medium mb-2">Monthly Revenue</h3>
        <div className="w-full" style={{ height: "200px" }}>
          <ChartContainer
            config={{
              programs: {
                label: "Programs",
                color: "#4f46e5"
              },
              sessions: {
                label: "Sessions",
                color: "#06b6d4"
              }
            }}
          >
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <YAxis
                stroke="#94a3b8"
                tickFormatter={(value) => `€${value}`}
                tick={{ fontSize: 10 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`€${value}`, ""]}
                  />
                }
              />
              <Legend iconSize={8} fontSize={10} />
              <Bar dataKey="programs" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="sessions" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revenue by Product */}
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <h3 className="text-base font-medium mb-2">Revenue by Product</h3>
          <div className="flex justify-center items-center" style={{ height: "200px" }}>
            <PieChart width={200} height={200}>
              <Pie
                data={revenueByProduct}
                cx={100}
                cy={100}
                innerRadius={40}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                fontSize={9}
              >
                {revenueByProduct.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`€${value}`, 'Revenue']} />
            </PieChart>
          </div>
        </div>
        
        {/* Client Growth */}
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <h3 className="text-base font-medium mb-2">Client Growth</h3>
          <div className="w-full" style={{ height: "200px" }}>
            <ChartContainer
              config={{
                clients: {
                  label: "Clients",
                  color: "#10b981"
                }
              }}
            >
              <LineChart data={clientGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="clients" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
