import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SalesEntryType = "Session" | "Package" | "Program" | "Other";

export interface SalesEntryInput {
  type: SalesEntryType;
  name: string;
  amount: number;
  date: string;
  notes?: string;
}

interface AddSalesEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName?: string;
  onAdd: (entry: SalesEntryInput) => void;
}

export function AddSalesEntryDialog({
  open,
  onOpenChange,
  clientName,
  onAdd,
}: AddSalesEntryDialogProps) {
  const [type, setType] = useState<SalesEntryType>("Session");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const reset = () => {
    setType("Session");
    setName("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!name || !value || value <= 0) return;
    onAdd({
      type,
      name,
      amount: value,
      date,
      notes: notes || undefined,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Sales Entry</DialogTitle>
          <DialogDescription>
            Track a sale to {clientName || "this client"}. No payment status
            required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="entry-type">Type *</Label>
            <Select value={type} onValueChange={(v) => setType(v as SalesEntryType)}>
              <SelectTrigger id="entry-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Session">Session</SelectItem>
                <SelectItem value="Package">Package</SelectItem>
                <SelectItem value="Program">Program</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="entry-name">Description *</Label>
            <Input
              id="entry-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 10-session PT package"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="entry-amount">Amount (€) *</Label>
            <Input
              id="entry-amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="150.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="entry-date">Date *</Label>
            <Input
              id="entry-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="entry-notes">Notes (Optional)</Label>
            <Textarea
              id="entry-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any extra context about this sale..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Entry</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
