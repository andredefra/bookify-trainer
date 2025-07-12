
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Activity,
  DollarSign
} from "lucide-react";
import { useGymAnalytics } from "@/hooks/gym/useGymAnalytics";
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";

interface OverviewTabProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
    gymName?: string;
  } | null;
}

export function OverviewTab({ user }: OverviewTabProps) {
  const gymName = user?.gymName || "Your Gym";
  const { analytics, loading: analyticsLoading } = useGymAnalytics();
  const { trainers, loading: trainersLoading } = useGymTrainersData();

  if (analyticsLoading || trainersLoading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  const topTrainers = trainers
    .sort((a, b) => b.totalSessions - a.totalSessions)
    .slice(0, 5);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{gymName} Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your gym performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalMembers || 0}</div>
            <p className="text-xs text-muted-foreground">{analytics?.growthMetrics.membersChange}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trainers</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.activeTrainers || 0}</div>
            <p className="text-xs text-muted-foreground">{analytics?.growthMetrics.trainersChange}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.sessionsBooked || 0}</div>
            <p className="text-xs text-muted-foreground">{analytics?.growthMetrics.sessionsChange}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{analytics?.monthlyRevenue?.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground">{analytics?.growthMetrics.revenueChange}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Retention</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.memberRetention || 0}%</div>
            <p className="text-xs text-muted-foreground">+3% from last quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.memberActivity || 0}%</div>
            <p className="text-xs text-muted-foreground">of members active this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTrainers.map((trainer, i) => (
                <div key={trainer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{trainer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {trainer.totalSessions} sessions • {trainer.activeClients} clients
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{trainer.rating}</span>
                    <Star className="ml-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Group Fitness Challenge", date: "July 15", attendees: 28 },
                { name: "Nutrition Workshop", date: "July 18", attendees: 15 },
                { name: "New Equipment Intro", date: "July 22", attendees: 12 },
                { name: "Staff Training", date: "July 25", attendees: 14 }
              ].map((event, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{event.name}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs">{event.attendees}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Import missing components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
