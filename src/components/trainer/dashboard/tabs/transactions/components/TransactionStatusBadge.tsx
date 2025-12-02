
import { Badge } from "@/components/ui/badge";

interface TransactionStatusBadgeProps {
  status: 'paid' | 'pending' | 'failed' | 'rejected' | 'no_show';
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/10 text-green-600 hover:bg-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20';
      case 'failed': return 'bg-red-500/10 text-red-600 hover:bg-red-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-600 hover:bg-red-500/20';
      case 'no_show': return 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20';
      default: return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'no_show': return 'No Show';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <Badge className={getStatusColor(status)} variant="outline">
      {getStatusLabel(status)}
    </Badge>
  );
}
