import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PackageSale } from "@/hooks/usePackageSales";
import { format } from "date-fns";

interface PackageSalesHistoryTableProps {
  sales: PackageSale[];
  searchQuery: string;
}

export function PackageSalesHistoryTable({ sales, searchQuery }: PackageSalesHistoryTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">✓ Active</Badge>;
      case 'pending_confirmation':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">⏳ Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">✗ Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPackageTypeBadge = (type: string) => {
    switch (type) {
      case 'sessions_only':
        return <Badge variant="outline" className="text-xs">Sessions</Badge>;
      case 'program_only':
        return <Badge variant="outline" className="text-xs">Program</Badge>;
      case 'hybrid':
        return <Badge variant="outline" className="text-xs">Hybrid</Badge>;
      case 'service':
        return <Badge variant="outline" className="text-xs">Service</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{type}</Badge>;
    }
  };

  const filteredSales = sales.filter(sale => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      sale.clientName.toLowerCase().includes(query) ||
      sale.packageTitle.toLowerCase().includes(query) ||
      sale.clientEmail.toLowerCase().includes(query)
    );
  });

  const sortedSales = [...filteredSales].sort(
    (a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
  );

  if (sortedSales.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {searchQuery ? "No sales match your search" : "No sales found"}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="hidden md:table-cell">Package</TableHead>
            <TableHead className="hidden sm:table-cell">Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="font-medium">
                {format(new Date(sale.purchaseDate), 'MMM dd')}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{sale.clientName}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">{sale.clientEmail}</p>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="truncate max-w-[200px]">{sale.packageTitle}</p>
                {sale.sessionsTotal && sale.sessionsTotal > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {sale.sessionsUsed || 0}/{sale.sessionsTotal} sessions
                  </p>
                )}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {getPackageTypeBadge(sale.packageType)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                €{sale.price.toFixed(2)}
              </TableCell>
              <TableCell>
                {getStatusBadge(sale.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
