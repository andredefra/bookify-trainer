import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { StudioTransactionStats } from "./components/StudioTransactionStats";
import { StudioTransactionsTable } from "./components/StudioTransactionsTable";
import { 
  mockStudioTransactions, 
  mockTrainerStats, 
  studioTrainers 
} from "./data/studioTransactionsData";
import { toast } from "sonner";

export function StudioTransactionsTab() {
  const [selectedTrainer, setSelectedTrainer] = useState("all");

  const handleExport = () => {
    toast.success("Transactions exported successfully");
  };

  const handleBulkInvoice = () => {
    toast.success("Bulk invoices generated");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Manage payments, invoices, and trainer commissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select trainer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trainers</SelectItem>
              {studioTrainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleBulkInvoice}>
            <FileText className="mr-2 h-4 w-4" />
            Bulk Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StudioTransactionStats 
        transactions={mockStudioTransactions}
        trainerStats={mockTrainerStats}
        selectedTrainer={selectedTrainer}
      />

      {/* Trainer Commission Summary (only when showing all) */}
      {selectedTrainer === "all" && (
        <Card>
          <CardHeader>
            <CardTitle>Trainer Commission Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockTrainerStats.map((trainer) => (
                <div 
                  key={trainer.trainerId}
                  className="p-4 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{trainer.trainerName}</h4>
                    <span className="text-sm text-muted-foreground">
                      {trainer.transactionCount} transactions
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium text-emerald-600">
                        €{trainer.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Commission (20%)</p>
                      <p className="font-medium text-blue-600">
                        €{trainer.commission.toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Pending</p>
                      <p className="font-medium text-amber-600">
                        €{trainer.pendingAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      <StudioTransactionsTable 
        transactions={mockStudioTransactions}
        selectedTrainer={selectedTrainer}
      />
    </div>
  );
}
