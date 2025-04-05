
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";

export function AnalyticsTab() {
  // Sample data for the charts
  const membershipData = [
    { name: "Jan", premium: 32, standard: 45 },
    { name: "Feb", premium: 38, standard: 48 },
    { name: "Mar", premium: 42, standard: 50 },
    { name: "Apr", premium: 40, standard: 53 },
    { name: "May", premium: 45, standard: 55 },
    { name: "Jun", premium: 50, standard: 58 },
    { name: "Jul", premium: 55, standard: 60 }
  ];
  
  const revenueData = [
    { name: "Jan", revenue: 15400 },
    { name: "Feb", revenue: 16800 },
    { name: "Mar", revenue: 18200 },
    { name: "Apr", revenue: 17600 },
    { name: "May", revenue: 19500 },
    { name: "Jun", revenue: 21000 },
    { name: "Jul", revenue: 22500 }
  ];
  
  const pieData = [
    { name: "Membership Fees", value: 60 },
    { name: "Personal Training", value: 25 },
    { name: "Group Classes", value: 10 },
    { name: "Other", value: 5 }
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Analyze your gym's performance and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Membership Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={membershipData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="premium" name="Premium Members" stackId="a" fill="#8884d8" />
                  <Bar dataKey="standard" name="Standard Members" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value}`, 'Revenue']} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium text-muted-foreground">Average Daily Check-ins</p>
                  <h3 className="text-2xl font-bold mt-1">78</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <span className="i-lucide-trending-up mr-1"></span>
                    +12% from last month
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium text-muted-foreground">New Member Conversion</p>
                  <h3 className="text-2xl font-bold mt-1">32%</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <span className="i-lucide-trending-up mr-1"></span>
                    +5% from last month
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium text-muted-foreground">Class Attendance Rate</p>
                  <h3 className="text-2xl font-bold mt-1">68%</h3>
                  <p className="text-xs text-amber-600 flex items-center mt-1">
                    <span className="i-lucide-trending-down mr-1"></span>
                    -2% from last month
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium text-muted-foreground">Member Retention</p>
                  <h3 className="text-2xl font-bold mt-1">92%</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <span className="i-lucide-trending-up mr-1"></span>
                    +3% from last month
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
