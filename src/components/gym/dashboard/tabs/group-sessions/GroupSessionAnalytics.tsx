import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Users, TrendingUp, Calendar, AlertTriangle, 
  Clock, MapPin, Award, Target 
} from "lucide-react";
import { useGymGroupSessions } from "@/hooks/gym/useGymGroupSessions";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  totalSessions: number;
  totalParticipants: number;
  averageParticipation: number;
  cancellationRate: number;
  popularTimes: any[];
  sessionTypeStats: any[];
  participationTrends: any[];
  trainerPerformance: any[];
}

export function GroupSessionAnalytics() {
  const { sessions } = useGymGroupSessions();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalSessions: 0,
    totalParticipants: 0,
    averageParticipation: 0,
    cancellationRate: 0,
    popularTimes: [],
    sessionTypeStats: [],
    participationTrends: [],
    trainerPerformance: []
  });
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateAnalytics();
  }, [sessions, selectedPeriod]);

  const calculateAnalytics = async () => {
    setLoading(true);
    try {
      // Generate mock analytics data based on current sessions
      const totalSessions = sessions.length;
      const totalParticipants = sessions.reduce((sum, s) => sum + s.total_participants, 0);
      const averageParticipation = totalSessions > 0 ? Math.round((totalParticipants / totalSessions) * 100) / 100 : 0;
      
      // Mock cancellation data
      const cancellationRate = Math.round(Math.random() * 15 + 5); // 5-20%
      
      // Popular times (mock data)
      const popularTimes = [
        { time: '6:00', participants: 25, sessions: 3 },
        { time: '7:00', participants: 35, sessions: 4 },
        { time: '8:00', participants: 28, sessions: 3 },
        { time: '18:00', participants: 45, sessions: 5 },
        { time: '19:00', participants: 52, sessions: 6 },
        { time: '20:00', participants: 38, sessions: 4 }
      ];

      // Session type statistics
      const sessionTypeStats = sessions.reduce((acc: any[], session) => {
        const existing = acc.find(item => item.type === session.session_type);
        if (existing) {
          existing.count += 1;
          existing.participants += session.total_participants;
        } else {
          acc.push({
            type: session.session_type,
            count: 1,
            participants: session.total_participants,
            avgParticipants: session.total_participants
          });
        }
        return acc;
      }, []).map(item => ({
        ...item,
        avgParticipants: Math.round(item.participants / item.count)
      }));

      // Participation trends (mock data for last 30 days)
      const participationTrends = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        participants: Math.floor(Math.random() * 50) + 20,
        sessions: Math.floor(Math.random() * 8) + 3
      }));

      // Trainer performance (mock data)
      const trainerPerformance = [
        { name: 'Sarah Johnson', sessions: 24, avgParticipants: 18.5, rating: 4.8, cancellations: 2 },
        { name: 'Mike Chen', sessions: 18, avgParticipants: 16.2, rating: 4.6, cancellations: 1 },
        { name: 'Emma Davis', sessions: 21, avgParticipants: 19.8, rating: 4.9, cancellations: 0 },
        { name: 'Alex Rodriguez', sessions: 15, avgParticipants: 14.5, rating: 4.4, cancellations: 3 }
      ];

      setAnalyticsData({
        totalSessions,
        totalParticipants,
        averageParticipation,
        cancellationRate,
        popularTimes,
        sessionTypeStats,
        participationTrends,
        trainerPerformance
      });
    } catch (error) {
      console.error('Error calculating analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Group Session Analytics</h3>
          <p className="text-sm text-muted-foreground">Performance insights and trends</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
              <p className="text-2xl font-bold">{analyticsData.totalSessions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
              <p className="text-2xl font-bold">{analyticsData.totalParticipants}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Target className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Avg Participation</p>
              <p className="text-2xl font-bold">{analyticsData.averageParticipation}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Cancellation Rate</p>
              <p className="text-2xl font-bold">{analyticsData.cancellationRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="trainers">Trainers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Popular Session Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.popularTimes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="participants" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Session Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Session Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.sessionTypeStats}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ type, count }) => `${type}: ${count}`}
                    >
                      {analyticsData.sessionTypeStats.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Participation Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.participationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="participants" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="sessions" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Type Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.sessionTypeStats.map((session, index) => (
                  <div key={session.type} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium capitalize">{session.type.replace('_', ' ')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {session.count} sessions • {session.participants} total participants
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{session.avgParticipants} avg</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trainers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trainer Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.trainerPerformance.map((trainer, index) => (
                  <div key={trainer.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{trainer.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {trainer.sessions} sessions • {trainer.avgParticipants} avg participants
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">⭐ {trainer.rating}</Badge>
                      <Badge 
                        variant={trainer.cancellations === 0 ? "default" : trainer.cancellations <= 2 ? "secondary" : "destructive"}
                      >
                        {trainer.cancellations} cancellations
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}