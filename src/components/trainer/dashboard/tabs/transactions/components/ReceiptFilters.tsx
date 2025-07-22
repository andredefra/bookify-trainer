import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Receipt, CheckCircle, AlertCircle } from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

export function ReceiptFilters() {
  const { receiptFilter, setReceiptFilter, transactions } = useTransactions();

  const stats = {
    all: transactions.length,
    sent: transactions.filter(t => t.receiptSent).length,
    unsent: transactions.filter(t => t.status === 'paid' && !t.receiptSent).length
  };

  const filters = [
    {
      key: 'all' as const,
      label: 'Tutte',
      icon: Receipt,
      count: stats.all,
      variant: 'outline' as const
    },
    {
      key: 'sent' as const,
      label: 'Scontrini inviati',
      icon: CheckCircle,
      count: stats.sent,
      variant: 'outline' as const
    },
    {
      key: 'unsent' as const,
      label: 'Da inviare',
      icon: AlertCircle,
      count: stats.unsent,
      variant: stats.unsent > 0 ? 'destructive' as const : 'outline' as const
    }
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground mr-2">Filtra per scontrini:</span>
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = receiptFilter === filter.key;
        
        return (
          <Button
            key={filter.key}
            variant={isActive ? 'default' : filter.variant}
            size="sm"
            onClick={() => setReceiptFilter(filter.key)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            {filter.label}
            <Badge 
              variant={isActive ? 'secondary' : 'outline'} 
              className="ml-1"
            >
              {filter.count}
            </Badge>
          </Button>
        );
      })}
    </div>
  );
}