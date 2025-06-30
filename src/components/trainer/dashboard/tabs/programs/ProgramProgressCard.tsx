
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ProgramProgress } from '@/hooks/useProgramAssignments';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

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
        return <Badge variant="default" className="bg-green-100 text-green-800">In Orario</Badge>;
      case 'ahead_of_schedule':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">In Anticipo</Badge>;
      case 'behind_schedule':
        return <Badge variant="destructive">In Ritardo</Badge>;
      case 'expired':
        return <Badge variant="destructive">Scaduto</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  const getExpirationText = () => {
    if (progress.daysUntilExpiry < 0) {
      return `Scaduto ${Math.abs(progress.daysUntilExpiry)} giorni fa`;
    } else if (progress.daysUntilExpiry === 0) {
      return 'Scade oggi';
    } else if (progress.daysUntilExpiry <= 7) {
      return `Scade tra ${progress.daysUntilExpiry} giorni`;
    } else {
      return formatDistanceToNow(new Date(progress.estimatedEndDate), {
        addSuffix: true,
        locale: it
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
            <span>Progresso</span>
            <span className="font-medium">{progress.completionPercentage}%</span>
          </div>
          <Progress value={progress.completionPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress.sessionsCompleted}/{progress.totalSessions} sessioni</span>
            <span>{getExpirationText()}</span>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">
              {progress.status === 'on_track' && 'Tutto a posto'}
              {progress.status === 'ahead_of_schedule' && 'Ottimo ritmo!'}
              {progress.status === 'behind_schedule' && 'Serve incentivo'}
              {progress.status === 'expired' && 'Programma scaduto'}
            </span>
          </div>
          
          <div className="flex gap-2">
            {progress.status === 'behind_schedule' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onContactClient?.(progress.clientName)}
              >
                Contatta
              </Button>
            )}
            {progress.daysUntilExpiry <= 7 && progress.daysUntilExpiry >= 0 && (
              <Button size="sm" variant="default">
                Rinnova
              </Button>
            )}
          </div>
        </div>

        {/* Expiration Warning */}
        {progress.daysUntilExpiry <= 7 && progress.daysUntilExpiry >= 0 && (
          <div className="flex items-center gap-2 p-3 bg-orange-100 rounded-lg">
            <Calendar className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-orange-800">
              Programma in scadenza! Considera di proporre un rinnovo.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
