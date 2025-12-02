import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ExpirationAlertsCard } from "@/components/common/ExpirationAlertsCard";
import { useGymMemberExpirations } from "@/hooks/gym/useGymMemberExpirations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Percent, Eye, AlertTriangle, Clock } from "lucide-react";

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
  const { sessionAnalytics, memberAnalytics, financialAnalytics, loading: analyticsLoading } = useGymAnalytics();
  const { trainers, loading: trainersLoading } = useGymTrainersData();
  const { 
    expiringItems: memberExpirations, 
    getExpirationCount, 
    sendRenewalReminder,
    createRenewalOffer,
    loading: expirationsLoading 
  } = useGymMemberExpirations();

  if (analyticsLoading || trainersLoading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  const topTrainers = trainers
    .sort((a, b) => b.totalSessions - a.totalSessions)
    .slice(0, 5);

  const expirationCounts = getExpirationCount();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{gymName.replace(' Gym', '')} Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your gym performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberAnalytics?.totalMembers || 0}</div>
            <p className="text-xs text-muted-foreground">+{memberAnalytics?.newMembersThisMonth || 0} this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trainers</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainers.length || 0}</div>
            <p className="text-xs text-muted-foreground">Active now</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionAnalytics?.upcomingSessions || 0}</div>
            <p className="text-xs text-muted-foreground">Upcoming sessions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{financialAnalytics?.monthlyRevenue?.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Retention</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberAnalytics?.memberRetention?.[0]?.retentionRate || 0}%</div>
            <p className="text-xs text-muted-foreground">+3% from last quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((memberAnalytics?.activeMembers || 0) / (memberAnalytics?.totalMembers || 1) * 100)}%</div>
            <p className="text-xs text-muted-foreground">of members active this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scadenze Membri */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Scadenze Membri
                </CardTitle>
                <CardDescription>
                  {expirationCounts.total} scadenze prossime - {expirationCounts.critical} critiche
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {expirationCounts.critical > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {expirationCounts.critical} critiche
                  </Badge>
                )}
                {expirationCounts.renewable > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {expirationCounts.renewable} rinnovabili
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {expirationsLoading ? (
              <div className="text-center py-4">Caricamento scadenze...</div>
            ) : memberExpirations.length === 0 ? (
              <div className="text-center py-6">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nessuna scadenza imminente</p>
              </div>
            ) : (
              <div className="space-y-3">
                {memberExpirations.slice(0, 4).map((expiration) => (
                  <div key={expiration.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-2 h-2 rounded-full ${
                        expiration.status === 'critical' ? 'bg-red-500' :
                        expiration.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{expiration.clientName}</p>
                        <p className="text-sm text-muted-foreground truncate">{expiration.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <Badge variant={expiration.status === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                          {expiration.daysLeft}g
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        {expiration.renewalEligible && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => sendRenewalReminder(expiration)}
                              className="h-7 w-7 p-0"
                            >
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => createRenewalOffer(expiration)}
                              className="h-7 w-7 p-0"
                            >
                              <Percent className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-7 w-7 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {memberExpirations.length > 4 && (
                  <Button variant="outline" className="w-full">
                    Vedi tutte ({memberExpirations.length})
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Trainers */}
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
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Group Fitness Challenge", date: "July 15", attendees: 28 },
              { name: "Nutrition Workshop", date: "July 18", attendees: 15 },
              { name: "New Equipment Intro", date: "July 22", attendees: 12 },
              { name: "Staff Training", date: "July 25", attendees: 14 }
            ].map((event, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
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
  );
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
