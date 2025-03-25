
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ResponsiveContainer,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for client performance analytics
const goalCompletionData = [
  { name: 'Weight Loss', achieved: 18, inProgress: 7, total: 25 },
  { name: 'Strength', achieved: 12, inProgress: 8, total: 20 },
  { name: 'Endurance', achieved: 10, inProgress: 5, total: 15 },
  { name: 'Nutrition', achieved: 14, inProgress: 6, total: 20 },
  { name: 'Flexibility', achieved: 8, inProgress: 7, total: 15 },
];

const clientRetention = [
  { name: 'Retained', value: 85 },
  { name: 'Churned', value: 15 },
];

const COLORS = ['#10b981', '#ef4444'];

const topPerformingClients = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    goalsCompleted: 8, 
    attendance: '95%', 
    progress: 'Excellent', 
    retention: '12 months' 
  },
  { 
    id: 2, 
    name: 'Mike Peterson', 
    goalsCompleted: 7, 
    attendance: '90%', 
    progress: 'Good', 
    retention: '8 months' 
  },
  { 
    id: 3, 
    name: 'Lisa Garcia', 
    goalsCompleted: 6, 
    attendance: '85%', 
    progress: 'Good', 
    retention: '6 months' 
  },
  { 
    id: 4, 
    name: 'David Kim', 
    goalsCompleted: 5, 
    attendance: '80%', 
    progress: 'Moderate', 
    retention: '4 months' 
  },
];

export function ClientPerformance() {
  const calculateAchievementRate = (achieved: number, total: number) => {
    return ((achieved / total) * 100).toFixed(1);
  };
  
  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'Excellent': return 'bg-green-500/10 text-green-600 hover:bg-green-500/20';
      case 'Good': return 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20';
      case 'Moderate': return 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20';
      case 'Poor': return 'bg-red-500/10 text-red-600 hover:bg-red-500/20';
      default: return '';
    }
  };
  
  // Calculate overall goal achievement percentage
  const totalAchieved = goalCompletionData.reduce((sum, goal) => sum + goal.achieved, 0);
  const totalGoals = goalCompletionData.reduce((sum, goal) => sum + goal.total, 0);
  const overallAchievementRate = calculateAchievementRate(totalAchieved, totalGoals);
  
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Goal Achievement Rate</div>
          <div className="text-2xl font-bold mt-1">{overallAchievementRate}%</div>
          <div className="text-xs text-muted-foreground mt-1">Overall goal completion</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Client Retention</div>
          <div className="text-2xl font-bold mt-1">85%</div>
          <div className="text-xs text-muted-foreground mt-1">Average retention rate</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Active Clients</div>
          <div className="text-2xl font-bold mt-1">24</div>
          <div className="text-xs text-green-600 mt-1">↑ 4 from last month</div>
        </div>
      </div>
      
      {/* Goal Achievement Chart */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Client Goal Achievement by Category</h3>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              achieved: {
                label: "Achieved",
                color: "#10b981"
              },
              inProgress: {
                label: "In Progress",
                color: "#f59e0b"
              }
            }}
          >
            <BarChart data={goalCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <ChartTooltip
                content={
                  <ChartTooltipContent />
                }
              />
              <Bar dataKey="achieved" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Retention Chart */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Client Retention</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientRetention}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {clientRetention.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Performing Clients */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Top Performing Clients</h3>
          <div className="overflow-auto max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Goals</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformingClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.goalsCompleted}</TableCell>
                    <TableCell>{client.attendance}</TableCell>
                    <TableCell>
                      <Badge className={getProgressColor(client.progress)} variant="outline">
                        {client.progress}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
