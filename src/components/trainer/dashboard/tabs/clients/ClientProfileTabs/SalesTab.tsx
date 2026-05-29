import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Receipt } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTrainerPlan } from "@/context/TrainerPlanContext";
import {
  AddSalesEntryDialog,
  SalesEntryInput,
  SalesEntryType,
} from "./sales/AddSalesEntryDialog";

interface SalesEntry extends SalesEntryInput {
  id: string;
  source: "manual" | "auto";
}

interface SalesTabProps {
  clientId: number;
  clientName: string;
}

export function SalesTab({ clientId, clientName }: SalesTabProps) {
  const plan = useTrainerPlan();
  const [entries, setEntries] = useState<SalesEntry[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const total = entries.reduce((sum, e) => sum + e.amount, 0);

  const handleAdd = (entry: SalesEntryInput) => {
    setEntries((prev) => [
      {
        ...entry,
        id: `${clientId}-${Date.now()}`,
        source: "manual",
      },
      ...prev,
    ]);
  };

  const description =
    plan === "basic"
      ? "Manually track sales to this client. When you upgrade, sold items flow here automatically and can be converted into invoices."
      : "Entries created by the system from your sales appear here. Manual entries you add will also flow into Transactions / Business Data so you can invoice them.";

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Sales — Entries
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-md">
              {description}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Entry
            </Button>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold">€{total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="border border-dashed rounded-lg p-8 text-center text-sm text-muted-foreground">
            No sales entries yet. Click "Add Entry" to record a sale.
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{entry.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{entry.name}</div>
                      {entry.notes && (
                        <div className="text-xs text-muted-foreground">
                          {entry.notes}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      €{entry.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={entry.source === "manual" ? "outline" : "default"}
                        className="text-xs"
                      >
                        {entry.source === "manual" ? "Manual" : "Auto"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <AddSalesEntryDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          clientName={clientName}
          onAdd={handleAdd}
        />
      </CardContent>
    </Card>
  );
}
