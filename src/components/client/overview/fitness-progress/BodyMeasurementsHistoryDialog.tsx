import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Trash2, Ruler } from "lucide-react";
import type { BodyMeasurements } from "./types";
import { formatDate } from "./utils";

interface BodyMeasurementsHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: BodyMeasurements[];
  onDelete: (id: string) => void;
  onBack: () => void;
}

const fmt = (v?: number) => (v && v > 0 ? v : "—");

export function BodyMeasurementsHistoryDialog({ open, onOpenChange, logs, onDelete, onBack }: BodyMeasurementsHistoryDialogProps) {
  // Only show entries that actually have measurements (skip pure weight snapshots)
  const measurementEntries = logs.filter(l =>
    l.chest || l.waist || l.abdomen || l.hips || l.quadriceps || l.thighs || l.arms
  );
  const sorted = [...measurementEntries].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[780px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Body Measurements History
          </DialogTitle>
          <DialogDescription>All your logged body measurements over time.</DialogDescription>
        </DialogHeader>

        {sorted.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground text-sm">No logs yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Chest</TableHead>
                  <TableHead>Waist</TableHead>
                  <TableHead>Abdomen</TableHead>
                  <TableHead>Hips</TableHead>
                  <TableHead>Quadriceps</TableHead>
                  <TableHead>Arms</TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map(log => (
                  <TableRow key={log.id}>
                    <TableCell>{formatDate(log.date)}</TableCell>
                    <TableCell>{fmt(log.chest)}</TableCell>
                    <TableCell>{fmt(log.waist)}</TableCell>
                    <TableCell>{fmt(log.abdomen)}</TableCell>
                    <TableCell>{fmt(log.hips)}</TableCell>
                    <TableCell>{fmt(log.quadriceps ?? log.thighs)}</TableCell>
                    <TableCell>{fmt(log.arms)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => log.id && onDelete(log.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
