
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

// Mock data for client performance
const sessionCompletionRate = [
  { name: 'Jan', completed: 85, canceled: 15 },
  { name: 'Feb', completed: 88, canceled: 12 },
  { name: 'Mar', completed: 90, canceled: 10 },
  { name: 'Apr', completed: 92, canceled: 8 },
  { name: 'May', completed: 95, canceled: 5 },
  { name: 'Jun', completed: 93, canceled: 7 },
];

const clientProgress = [
  { name: 'Jan', weight: 2, strength: 5, cardio: 3 },
  { name: 'Feb', weight: 4, strength: 7, cardio: 6 },
  { name: 'Mar', weight: 5, strength: 8, cardio: 7 },
  { name: 'Apr', weight: 7, strength: 9, cardio: 8 },
  { name: 'May', weight: 8, strength: 10, cardio: 8 },
  { name: 'Jun', weight: 9, strength: 12, cardio: 10 },
];

const clientRetention = [
  { name: 'Active', value: 65 },
  { name: 'Inactive', value: 20 },
  { name: 'New', value: 15 },
];

// Colors for pie chart
const COLORS = ['#10b981', '#f97316', '#4f46e5'];

export function ClientPerformance() {
  // Calculate summary metrics
  const activeClients = clientRetention.find((segment) => segment.name === 'Active')?.value || 0;
  const totalClients = clientRetention.reduce((sum, segment) => sum + segment.value, 0);
  const retentionRate = (activeClients / totalClients) * 100;
  const avgCompletionRate = sessionCompletionRate.reduce((sum, month) => sum + month.completed, 0) / sessionCompletionRate.length;
  
  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Client Retention</div>
          <div className="text-xl font-bold mt-1">{retentionRate.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground mt-1">Active clients</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Session Completion</div>
          <div className="text-xl font-bold mt-1">{avgCompletionRate.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground mt-1">Average completion rate</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Client Progress</div>
          <div className="text-xl font-bold mt-1">+{clientProgress[clientProgress.length - 1].weight}</div>
          <div className="text-xs text-muted-foreground mt-1">Avg. weight loss (kg)</div>
        </div>
      </div>
      
      {/* Session Completion Chart */}
      <div className="bg-white p-3 rounded-lg border shadow-sm">
        <h3 className="text-base font-medium mb-2">Session Completion Rate</h3>
        <div className="w-full" style={{ height: "200px" }}>
          <ChartContainer
            config={{
              completed: {
                label: "Completed",
                color: "#10b981"
              },
              canceled: {
                label: "Canceled",
                color: "#f97316"
              }
            }}
          >
            <BarChart data={sessionCompletionRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value}%`} 
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`${value}%`, ""]}
                  />
                }
              />
              <Legend iconSize={8} fontSize={10} />
              <Bar dataKey="completed" fill="#10b981" stackId="a" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="canceled" fill="#f97316" stackId="a" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Client Progress Chart */}
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <h3 className="text-base font-medium mb-2">Client Progress</h3>
          <div className="w-full" style={{ height: "200px" }}>
            <ChartContainer
              config={{
                weight: {
                  label: "Weight Loss",
                  color: "#4f46e5"
                },
                strength: {
                  label: "Strength",
                  color: "#10b981"
                },
                cardio: {
                  label: "Cardio",
                  color: "#f97316"
                }
              }}
            >
              <LineChart data={clientProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
                <Legend iconSize={8} fontSize={10} />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="strength" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cardio" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
        
        {/* Client Retention Chart */}
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <h3 className="text-base font-medium mb-2">Client Retention</h3>
          <div className="flex justify-center items-center" style={{ height: "200px" }}>
            <PieChart width={200} height={200}>
              <Pie
                data={clientRetention}
                cx={100}
                cy={100}
                innerRadius={40}
                outerRadius={60}
                startAngle={90}
                endAngle={-270}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                fontSize={9}
              >
                {clientRetention.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
