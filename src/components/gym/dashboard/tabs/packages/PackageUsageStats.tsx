import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Activity, TrendingUp, Calendar } from 'lucide-react';
import { GymPackageAssignment } from '@/hooks/gym/useGymPackages';

interface PackageUsageStatsProps {
  assignments: GymPackageAssignment[];
}

export function PackageUsageStats({ assignments }: PackageUsageStatsProps) {
  const activeAssignments = assignments.filter(a => a.status === 'active');
  
  const stats = {
    totalActiveClients: activeAssignments.length,
    withTrainer: activeAssignments.filter(a => a.trainer_id).length,
    gymOnlyAccess: activeAssignments.filter(a => !a.trainer_id).length,
    averageUsage: activeAssignments.length > 0 
      ? activeAssignments.reduce((sum, a) => sum + (a.sessions_total ? (a.sessions_used / a.sessions_total) * 100 : 0), 0) / activeAssignments.length
      : 0,
    totalSessions: activeAssignments.reduce((sum, a) => sum + a.sessions_used, 0),
    expiringThisMonth: activeAssignments.filter(a => {
      if (!a.end_date) return false;
      const endDate = new Date(a.end_date);
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return endDate <= nextMonth;
    }).length
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalActiveClients}</div>
          <div className="flex gap-2 mt-2">
            <Badge variant="default" className="text-xs">
              {stats.withTrainer} with trainer
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {stats.gymOnlyAccess} gym only
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Session Usage</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSessions}</div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Average usage</span>
              <span>{stats.averageUsage.toFixed(1)}%</span>
            </div>
            <Progress value={stats.averageUsage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.expiringThisMonth}</div>
          <p className="text-xs text-muted-foreground">packages this month</p>
          {stats.expiringThisMonth > 0 && (
            <Badge variant="destructive" className="mt-2 text-xs">
              Renewal required
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
}