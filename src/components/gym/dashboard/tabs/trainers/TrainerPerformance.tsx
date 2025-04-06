
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

// Sample performance data for trainers
const clientRetentionData = [
  { name: "Marco Rossi", retention: 92, newClients: 8, rating: 4.9 },
  { name: "Laura Bianchi", retention: 88, newClients: 12, rating: 4.7 },
  { name: "Giovanni Verdi", retention: 82, newClients: 6, rating: 4.5 },
];

const monthlySessionsData = [
  { month: "Jan", "Marco Rossi": 45, "Laura Bianchi": 52, "Giovanni Verdi": 38 },
  { month: "Feb", "Marco Rossi": 50, "Laura Bianchi": 48, "Giovanni Verdi": 42 },
  { month: "Mar", "Marco Rossi": 55, "Laura Bianchi": 52, "Giovanni Verdi": 45 },
  { month: "Apr", "Marco Rossi": 58, "Laura Bianchi": 50, "Giovanni Verdi": 47 },
  { month: "May", "Marco Rossi": 62, "Laura Bianchi": 58, "Giovanni Verdi": 50 },
  { month: "Jun", "Marco Rossi": 65, "Laura Bianchi": 60, "Giovanni Verdi": 52 }
];

const clientProgressData = [
  { month: "Jan", progress: 68 },
  { month: "Feb", progress: 72 },
  { month: "Mar", progress: 78 },
  { month: "Apr", progress: 82 },
  { month: "May", progress: 85 },
  { month: "Jun", progress: 89 }
];

export function TrainerPerformance() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Client Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.7/5.0</div>
            <p className="text-xs text-muted-foreground mt-1">Based on 245 client reviews</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Client Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground mt-1">3% increase from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Goal Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground mt-1">Clients reaching fitness goals</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Retention by Trainer</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] w-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={clientRetentionData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="retention" name="Retention %" fill="#8884d8" />
                  <Bar dataKey="newClients" name="New Clients" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Sessions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] w-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlySessionsData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Marco Rossi" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Laura Bianchi" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Giovanni Verdi" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Client Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={clientProgressData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" name="Client Goal Progress %" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
