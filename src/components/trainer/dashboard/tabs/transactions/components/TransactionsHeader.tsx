
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Calendar, FileDown, Plus } from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

export function TransactionsHeader() {
  const { setShowAddDialog } = useTransactions();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <CardTitle>Transactions & Payments</CardTitle>
        <CardDescription>Manage your revenue and client payments</CardDescription>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
}
