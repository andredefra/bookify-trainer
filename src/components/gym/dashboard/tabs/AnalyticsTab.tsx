import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Activity, 
  Target,
  BarChart3,
  Download,
  RefreshCw,
  CalendarRange,
  Filter,
  TrendingDown,
  ArrowUpIcon,
  ArrowDownIcon
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useGymAnalytics } from "@/hooks/gym/useGymAnalytics";

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
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your gym's performance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" onClick={refetch} className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <CalendarRange className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${financialAnalytics?.totalRevenue.toLocaleString() || '0'}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <ArrowUpIcon className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberAnalytics?.activeMembers || 0}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <ArrowUpIcon className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+{memberAnalytics?.newMembersThisMonth || 0}</span>
              <span className="text-muted-foreground">new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
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

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Retention</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {100 - (memberAnalytics?.churnRate || 0)}%
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <ArrowDownIcon className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">{memberAnalytics?.churnRate || 0}%</span>
              <span className="text-muted-foreground">churn rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 h-auto md:h-10 p-1">
          <TabsTrigger value="sessions" className="text-sm md:text-base py-3 md:py-1.5">
            Session Analytics
          </TabsTrigger>
          <TabsTrigger value="members" className="text-sm md:text-base py-3 md:py-1.5">
            Member Analytics
          </TabsTrigger>
          <TabsTrigger value="financial" className="text-sm md:text-base py-3 md:py-1.5">
            Financial Analytics
          </TabsTrigger>
        </TabsList>

        {/* Session Analytics Tab */}
        <TabsContent value="sessions" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                {sessionAnalytics?.packageUtilization?.length ? (
                  sessionAnalytics.packageUtilization.map((pkg) => (
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No package utilization data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Weekly Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {sessionAnalytics?.weeklyAttendance?.length ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sessionAnalytics.weeklyAttendance}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                        className="text-xs"
                      />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        formatter={(value) => [value, 'Attendance']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                      <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No attendance data available</p>
                    <p className="text-sm text-muted-foreground">Check back after more sessions are completed</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Member Analytics Tab */}
        <TabsContent value="members" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {memberAnalytics?.memberRetention.map((period) => (
                  <div key={period.period} className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow">
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
              <CardTitle>Monthly Revenue & Member Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financialAnalytics?.monthlyTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="month" 
                      className="text-xs"
                    />
                    <YAxis yAxisId="revenue" orientation="left" className="text-xs" />
                    <YAxis yAxisId="members" orientation="right" className="text-xs" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `$${value.toLocaleString()}` : value,
                        name === 'revenue' ? 'Revenue' : 'Members'
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Line 
                      yAxisId="revenue"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                    <Line 
                      yAxisId="members"
                      type="monotone" 
                      dataKey="members" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: 'hsl(var(--secondary))' }}
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}