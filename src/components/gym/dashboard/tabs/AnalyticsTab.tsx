import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Activity, 
  Target,
  BarChart3,
  Download,
  RefreshCw
} from "lucide-react";
import { useGymAnalytics } from "@/hooks/gym/useGymAnalytics";
import { Progress } from "@/components/ui/progress";

export function AnalyticsTab() {
  const {
    sessionAnalytics,
    memberAnalytics,
    financialAnalytics,
    loading,
    error,
    refetch
  } = useGymAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <Activity className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">Error Loading Analytics</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <Button onClick={refetch} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your gym's performance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={refetch}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${financialAnalytics?.totalRevenue.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberAnalytics?.activeMembers || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +{memberAnalytics?.newMembersThisMonth || 0} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sessionAnalytics?.upcomingSessions || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Avg {sessionAnalytics?.averageAttendance.toFixed(1) || 0} per session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Retention</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {100 - (memberAnalytics?.churnRate || 0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {memberAnalytics?.churnRate || 0}% churn rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sessions">Session Analytics</TabsTrigger>
          <TabsTrigger value="members">Member Analytics</TabsTrigger>
          <TabsTrigger value="financial">Financial Analytics</TabsTrigger>
        </TabsList>

        {/* Session Analytics Tab */}
        <TabsContent value="sessions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Session Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Popular Session Types</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessionAnalytics?.popularSessionTypes.map((sessionType, index) => (
                  <div key={sessionType.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <span className="font-medium capitalize">
                          {sessionType.type.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {sessionType.attendance} participants
                      </div>
                    </div>
                    <Progress 
                      value={(sessionType.attendance / (sessionAnalytics?.totalParticipants || 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Package Utilization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Package Utilization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessionAnalytics?.packageUtilization.map((pkg) => (
                  <div key={pkg.packageType} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pkg.packageType}</span>
                      <span className="text-sm text-muted-foreground">
                        {pkg.utilizationRate}%
                      </span>
                    </div>
                    <Progress value={pkg.utilizationRate} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {pkg.usedSessions}/{pkg.totalSessions} sessions used
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Weekly Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end justify-between space-x-2">
                {sessionAnalytics?.weeklyAttendance.map((day, index) => (
                  <div key={day.date} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-primary rounded-t w-8"
                      style={{ 
                        height: `${(day.attendance / Math.max(...sessionAnalytics.weeklyAttendance.map(d => d.attendance))) * 160}px`,
                        minHeight: '20px'
                      }}
                    />
                    <div className="text-xs text-muted-foreground">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-xs font-medium">{day.attendance}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Member Analytics Tab */}
        <TabsContent value="members" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Membership Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Membership Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {memberAnalytics?.membershipTypes.map((type) => (
                  <div key={type.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{type.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {type.count} members
                      </span>
                    </div>
                    <Progress 
                      value={(type.count / (memberAnalytics?.totalMembers || 1)) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      ${type.revenue.toLocaleString()} revenue
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Members */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {memberAnalytics?.topMembers.map((member, index) => (
                  <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.packageType} Member
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{member.sessionsAttended}</div>
                      <div className="text-xs text-muted-foreground">sessions</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Member Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Member Retention Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {memberAnalytics?.memberRetention.map((period) => (
                  <div key={period.period} className="text-center p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">
                      {period.retentionRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">{period.period}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Analytics Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Package Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Package Sales Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {financialAnalytics?.packageSales.map((pkg) => (
                  <div key={pkg.packageType} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pkg.packageType}</span>
                      <span className="text-sm text-muted-foreground">
                        ${pkg.revenue.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(pkg.revenue / (financialAnalytics?.totalRevenue || 1)) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      {pkg.count} packages sold
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trainer Commissions */}
            <Card>
              <CardHeader>
                <CardTitle>Trainer Commission Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {financialAnalytics?.trainerCommissions.map((trainer) => (
                  <div key={trainer.trainerId} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="font-medium">{trainer.trainerName}</div>
                    <div className="text-right">
                      <div className="font-medium">${trainer.commission.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">commission</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Monthly Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end justify-between space-x-4">
                {financialAnalytics?.monthlyTrends.map((month) => (
                  <div key={month.month} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-primary rounded-t w-12"
                      style={{ 
                        height: `${(month.revenue / Math.max(...financialAnalytics.monthlyTrends.map(m => m.revenue))) * 160}px`,
                        minHeight: '20px'
                      }}
                    />
                    <div className="text-xs text-muted-foreground">{month.month}</div>
                    <div className="text-xs font-medium">${month.revenue.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{month.members} members</div>
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