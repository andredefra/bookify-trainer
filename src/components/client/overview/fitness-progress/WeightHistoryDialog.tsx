import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Trash2, Weight } from "lucide-react";
import type { WeightLog } from "./hooks/useWeightLogs";
import { formatDate } from "./utils";

interface WeightHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: WeightLog[];
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function WeightHistoryDialog({ open, onOpenChange, logs, onDelete, onBack }: WeightHistoryDialogProps) {
  const sorted = [...logs].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Weight className="h-5 w-5" />
            Weight History
          </DialogTitle>
          <DialogDescription>All your logged weight entries over time.</DialogDescription>
        </DialogHeader>

        {sorted.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground text-sm">No logs yet.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map(log => (
                <TableRow key={log.id}>
                  <TableCell>{formatDate(log.date)}</TableCell>
                  <TableCell className="font-medium">{log.weight}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{log.note || "—"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(log.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <DialogFooter className="sm:justify-between gap-2">
          <Button type="button" variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Log
          </Button>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
