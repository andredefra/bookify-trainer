import { Badge } from '@/components/ui/badge';
import { SessionBookingStatus } from '@/types/packageSessions';
import { CheckCircle2, Clock, Calendar, XCircle, UserX, Circle } from 'lucide-react';

interface SessionStatusBadgeProps {
  status: SessionBookingStatus;
  className?: string;
}

export const SessionStatusBadge = ({ status, className }: SessionStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle2,
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'confirmed':
        return {
          label: 'Confirmed',
          icon: Calendar,
          variant: 'default' as const,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'proposed':
        return {
          label: 'Proposed',
          icon: Clock,
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      case 'available':
        return {
          label: 'Available',
          icon: Circle,
          variant: 'outline' as const,
          className: 'bg-gray-50 text-gray-600 border-gray-200',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          icon: XCircle,
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      case 'no_show':
        return {
          label: 'No-Show',
          icon: UserX,
          variant: 'destructive' as const,
          className: 'bg-orange-100 text-orange-800 border-orange-200',
        };
      default:
        return {
          label: status,
          icon: Circle,
          variant: 'outline' as const,
          className: '',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={`${config.className} ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
};
