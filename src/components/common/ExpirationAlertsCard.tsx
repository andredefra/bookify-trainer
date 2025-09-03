
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Package, Target, Calendar } from 'lucide-react';
import { useExpirationMonitoring, ExpirationItem } from '@/hooks/useExpirationMonitoring';

export function ExpirationAlertsCard() {
  const { expiringItems, loading, getExpirationCount } = useExpirationMonitoring();
  const counts = getExpirationCount();

  const getStatusColor = (status: ExpirationItem['status']) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: ExpirationItem['type']) => {
    switch (type) {
      case 'package':
        return <Package className="h-4 w-4" />;
      case 'program':
        return <Target className="h-4 w-4" />;
      case 'session':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: ExpirationItem['status']) => {
    switch (status) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'outline';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Loading expiration dates...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (expiringItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Expirations
          </CardTitle>
          <CardDescription>Monitor expiring packages and programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No expirations in the upcoming days</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Upcoming Expirations
            </CardTitle>
            <CardDescription>
              {counts.total} expiring items - {counts.critical} critical
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {counts.critical > 0 && (
              <Badge variant="destructive" className="text-xs">{counts.critical} critical</Badge>
            )}
            {counts.warning > 0 && (
              <Badge variant="secondary" className="text-xs">{counts.warning} warning</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expiringItems.slice(0, 5).map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {getTypeIcon(item.type)}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.clientName}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:text-right gap-1">
                <Badge variant={getStatusBadgeVariant(item.status)} className="text-xs w-fit">
                  {item.daysLeft} days
                </Badge>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Expires on {new Date(item.expiryDate).toLocaleDateString('en-US')}
                </p>
                <p className="text-xs text-muted-foreground sm:hidden">
                  {new Date(item.expiryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </p>
              </div>
            </div>
          ))}
          
          {expiringItems.length > 5 && (
            <Button variant="outline" className="w-full">
              View all ({expiringItems.length})
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
