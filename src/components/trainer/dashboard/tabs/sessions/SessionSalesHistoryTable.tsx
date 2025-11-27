import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { SessionSale } from "@/hooks/useSessionSales";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface SessionSalesHistoryTableProps {
  sales: SessionSale[];
}

export function SessionSalesHistoryTable({ sales }: SessionSalesHistoryTableProps) {
  // Sort by most recent first
  const sortedSales = [...sales].sort(
    (a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="default" className="bg-green-500">
            ✓ Paid
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">⏳ Pending</Badge>;
      case "unpaid":
        return (
          <Badge variant="destructive" className="bg-red-500">
            ✗ Unpaid
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (sortedSales.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-sm">No sales found</p>
        <p className="text-xs mt-1">Sales will appear here once clients book sessions</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-xs font-medium">Date</th>
              <th className="text-left p-3 text-xs font-medium">Client</th>
              <th className="text-left p-3 text-xs font-medium hidden md:table-cell">Session</th>
              <th className="text-left p-3 text-xs font-medium hidden lg:table-cell">Type</th>
              <th className="text-right p-3 text-xs font-medium">Amount</th>
              <th className="text-center p-3 text-xs font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <span className="text-sm">
                    {format(new Date(sale.purchaseDate), "MMM dd")}
                  </span>
                  <br />
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(sale.purchaseDate), "yyyy")}
                  </span>
                </td>
                <td className="p-3">
                  <div>
                    <p className="font-medium text-sm">{sale.clientName}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {sale.clientEmail}
                    </p>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell">
                  <p className="text-sm">{sale.sessionTitle}</p>
                </td>
                <td className="p-3 hidden lg:table-cell">
                  <Badge variant="outline" className="text-xs">
                    {sale.sessionType === 'video' ? 'Video' : 'In-Person'}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <span className="font-semibold text-sm">
                    {formatCurrency(sale.price)}
                  </span>
                </td>
                <td className="p-3 text-center">{getStatusBadge(sale.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
