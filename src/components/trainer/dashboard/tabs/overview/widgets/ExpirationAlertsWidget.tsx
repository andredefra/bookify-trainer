import { BaseWidget } from "./BaseWidget";
import { AlertTriangle, Clock, Package, Target, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useExpirationMonitoring, ExpirationItem } from "@/hooks/useExpirationMonitoring";

export function ExpirationAlertsWidget() {
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
      <BaseWidget title="Expiration Alerts" icon={AlertTriangle}>
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </BaseWidget>
    );
  }

  if (expiringItems.length === 0) {
    return (
      <BaseWidget 
        title="Expiration Alerts" 
        icon={Clock}
        description="Monitor expiring packages and programs"
      >
        <div className="text-center py-6">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No expirations in the upcoming days</p>
        </div>
      </BaseWidget>
    );
  }

  return (
    <BaseWidget
      title="Expiration Alerts"
      icon={AlertTriangle}
      description={`${counts.total} expiring items - ${counts.critical} critical`}
      action={
        <div className="flex items-center gap-2 flex-wrap">
          {counts.critical > 0 && (
            <Badge variant="destructive" className="text-xs">{counts.critical} critical</Badge>
          )}
          {counts.warning > 0 && (
            <Badge variant="secondary" className="text-xs">{counts.warning} warning</Badge>
          )}
        </div>
      }
    >
      <div className="space-y-4">
        {expiringItems.slice(0, 5).map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {getTypeIcon(item.type)}
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.clientName}</p>
                  <p className="text-sm text-muted-foreground truncate">{item.title}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant={getStatusBadgeVariant(item.status)} className="text-xs whitespace-nowrap">
                {item.daysLeft} days left
              </Badge>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                  Reminder
                </Button>
                <Button size="sm" variant="default" className="h-7 px-2 text-xs">
                  Offer
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {expiringItems.length > 5 && (
          <Button variant="outline" className="w-full">
            View All {expiringItems.length} Expirations
          </Button>
        )}
      </div>
    </BaseWidget>
  );
}
