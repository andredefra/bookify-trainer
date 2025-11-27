import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ProgramSale } from "@/hooks/useProgramSales";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface SalesHistoryTableProps {
  sales: ProgramSale[];
}

export function SalesHistoryTable({ sales }: SalesHistoryTableProps) {
  // Sort by most recent first
  const sortedSales = [...sales].sort(
    (a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            ✓ Active
          </Badge>
        );
      case "pending_confirmation":
        return <Badge variant="secondary">⏳ Pending</Badge>;
      case "rejected":
        return (
          <Badge variant="destructive" className="bg-red-500">
            ✗ Rejected
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
        <p className="text-xs mt-1">Sales will appear here once clients purchase packages</p>
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
              <th className="text-left p-3 text-xs font-medium hidden md:table-cell">Package</th>
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
                  <p className="text-sm">{sale.packageTitle}</p>
                </td>
                <td className="p-3 hidden lg:table-cell">
                  <Badge variant="outline" className="text-xs">
                    {sale.packageType.replace("_", " ")}
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
