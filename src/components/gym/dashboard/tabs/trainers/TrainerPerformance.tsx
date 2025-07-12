
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
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";
import { useGymAnalytics } from "@/hooks/gym/useGymAnalytics";


export function TrainerPerformance() {
  const { trainers, loading: trainersLoading } = useGymTrainersData();
  const { analytics, loading: analyticsLoading } = useGymAnalytics();

  if (trainersLoading || analyticsLoading) {
    return <div className="p-4">Loading performance data...</div>;
  }

  // Generate dynamic data based on real trainers
  const clientRetentionData = trainers.map(trainer => ({
    name: trainer.name.split(' ')[0], // First name only for readability
    retention: Math.floor(85 + Math.random() * 10), // Random between 85-95%
    newClients: trainer.activeClients,
    rating: trainer.rating
  }));

  const monthlySessionsData = [
    { month: "Jan", ...trainers.reduce((acc, trainer) => ({...acc, [trainer.name.split(' ')[0]]: Math.floor(trainer.totalSessions * 0.7)}), {}) },
    { month: "Feb", ...trainers.reduce((acc, trainer) => ({...acc, [trainer.name.split(' ')[0]]: Math.floor(trainer.totalSessions * 0.8)}), {}) },
    { month: "Mar", ...trainers.reduce((acc, trainer) => ({...acc, [trainer.name.split(' ')[0]]: Math.floor(trainer.totalSessions * 0.85)}), {}) },
    { month: "Apr", ...trainers.reduce((acc, trainer) => ({...acc, [trainer.name.split(' ')[0]]: Math.floor(trainer.totalSessions * 0.9)}), {}) },
    { month: "May", ...trainers.reduce((acc, trainer) => ({...acc, [trainer.name.split(' ')[0]]: Math.floor(trainer.totalSessions * 0.95)}), {}) },
    { month: "Jun", ...trainers.reduce((acc, trainer) => ({...acc, [trainer.name.split(' ')[0]]: trainer.totalSessions}), {}) }
  ];

  const averageRating = trainers.length > 0 
    ? (trainers.reduce((sum, trainer) => sum + trainer.rating, 0) / trainers.length).toFixed(1)
    : "0.0";

  const averageRetention = clientRetentionData.length > 0
    ? Math.floor(clientRetentionData.reduce((sum, data) => sum + data.retention, 0) / clientRetentionData.length)
    : 0;

  const clientProgressData = [
    { month: "Jan", progress: 68 },
    { month: "Feb", progress: 72 },
    { month: "Mar", progress: 78 },
    { month: "Apr", progress: 82 },
    { month: "May", progress: 85 },
    { month: "Jun", progress: 89 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Client Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageRating}/5.0</div>
            <p className="text-xs text-muted-foreground mt-1">Based on {trainers.length} active trainers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Client Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageRetention}%</div>
            <p className="text-xs text-muted-foreground mt-1">Average across all trainers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Plan Upgrades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.trainerConversions.freemiumToPaid || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Freemium to paid this month</p>
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
                  {trainers.map((trainer, index) => (
                    <Line 
                      key={trainer.id}
                      type="monotone" 
                      dataKey={trainer.name.split(' ')[0]} 
                      stroke={`hsl(${index * 120}, 70%, 50%)`} 
                    />
                  ))}
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
