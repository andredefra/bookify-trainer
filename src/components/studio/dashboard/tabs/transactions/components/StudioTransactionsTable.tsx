import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, FileText, Mail, Eye } from "lucide-react";
import { StudioTransaction } from "../data/studioTransactionsData";
import { format } from "date-fns";
import { toast } from "sonner";

interface StudioTransactionsTableProps {
  transactions: StudioTransaction[];
  selectedTrainer: string;
}

export function StudioTransactionsTable({ 
  transactions, 
  selectedTrainer 
}: StudioTransactionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTransactions = transactions
    .filter(t => selectedTrainer === "all" || t.trainerId === selectedTrainer)
    .filter(t => statusFilter === "all" || t.status === statusFilter)
    .filter(t => 
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.trainerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      overdue: "bg-rose-100 text-rose-700",
      refunded: "bg-gray-100 text-gray-700"
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const handleSendInvoice = (transaction: StudioTransaction) => {
    toast.success(`Invoice sent to ${transaction.clientEmail}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Transactions</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[250px]"
              />
            </div>
            <div className="flex gap-1">
              {["all", "paid", "pending", "overdue"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status === "all" ? "All" : status}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{transaction.clientName}</p>
                    <p className="text-sm text-muted-foreground">{transaction.clientEmail}</p>
                  </div>
                </TableCell>
                <TableCell>{transaction.trainerName}</TableCell>
                <TableCell>{transaction.packageName}</TableCell>
                <TableCell className="font-medium">€{transaction.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(transaction.date), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  {transaction.invoiceSent ? (
                    <Badge variant="outline" className="text-emerald-600">
                      {transaction.invoiceNumber}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-600">
                      Not sent
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Invoice
                      </DropdownMenuItem>
                      {!transaction.invoiceSent && (
                        <DropdownMenuItem onClick={() => handleSendInvoice(transaction)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Invoice
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No transactions found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
