
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ProgramProgress } from '@/hooks/useProgramAssignments';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface ProgramProgressCardProps {
  progress: ProgramProgress;
  onUpdateSessions?: (assignmentId: string, sessions: number) => void;
  onContactClient?: (clientName: string) => void;
}

export function ProgramProgressCard({ 
  progress, 
  onUpdateSessions,
  onContactClient 
}: ProgramProgressCardProps) {
  const getStatusIcon = () => {
    switch (progress.status) {
      case 'on_track':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'ahead_of_schedule':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'behind_schedule':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'expired':
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getStatusBadge = () => {
    switch (progress.status) {
      case 'on_track':
        return <Badge variant="default" className="bg-green-100 text-green-800">On Track</Badge>;
      case 'ahead_of_schedule':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Ahead of Schedule</Badge>;
      case 'behind_schedule':
        return <Badge variant="destructive">Behind Schedule</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getExpirationText = () => {
    if (progress.daysUntilExpiry < 0) {
      return `Expired ${Math.abs(progress.daysUntilExpiry)} days ago`;
    } else if (progress.daysUntilExpiry === 0) {
      return 'Expires today';
    } else if (progress.daysUntilExpiry <= 7) {
      return `Expires in ${progress.daysUntilExpiry} days`;
    } else {
      return formatDistanceToNow(new Date(progress.estimatedEndDate), {
        addSuffix: true,
        locale: enUS
      });
    }
  };

  return (
    <Card className={`${
      progress.daysUntilExpiry <= 7 && progress.daysUntilExpiry >= 0 
        ? 'border-orange-200 bg-orange-50/50' 
        : progress.daysUntilExpiry < 0 
        ? 'border-red-200 bg-red-50/50'
        : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{progress.clientName}</CardTitle>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-muted-foreground">{progress.programTitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress.completionPercentage}%</span>
          </div>
          <Progress value={progress.completionPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress.sessionsCompleted}/{progress.totalSessions} sessions</span>
            <span>{getExpirationText()}</span>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">
              {progress.status === 'on_track' && 'All good'}
              {progress.status === 'ahead_of_schedule' && 'Great pace!'}
              {progress.status === 'behind_schedule' && 'Needs encouragement'}
              {progress.status === 'expired' && 'Program expired'}
            </span>
          </div>
          
          <div className="flex gap-2">
            {progress.status === 'behind_schedule' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onContactClient?.(progress.clientName)}
              >
                Contact
              </Button>
            )}
            {progress.daysUntilExpiry <= 7 && progress.daysUntilExpiry >= 0 && (
              <Button size="sm" variant="default">
                Renew
              </Button>
            )}
          </div>
        </div>

        {/* Expiration Warning */}
        {progress.daysUntilExpiry <= 7 && progress.daysUntilExpiry >= 0 && (
          <div className="flex items-center gap-2 p-3 bg-orange-100 rounded-lg">
            <Calendar className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-orange-800">
              Program expiring! Consider proposing a renewal.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
