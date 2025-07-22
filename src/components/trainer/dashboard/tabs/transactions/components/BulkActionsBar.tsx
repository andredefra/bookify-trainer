import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Receipt, Send, X, CheckSquare, Square } from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

export function BulkActionsBar() {
  const { 
    selectedTransactions, 
    filteredTransactions,
    handleBulkSendReceipts, 
    selectAllPaidTransactions, 
    clearSelection 
  } = useTransactions();

  const selectedCount = selectedTransactions.size;
  const paidUnsentCount = filteredTransactions.filter(t => t.status === 'paid' && !t.receiptSent).length;
  const allPaidSelected = paidUnsentCount > 0 && 
    filteredTransactions
      .filter(t => t.status === 'paid' && !t.receiptSent)
      .every(t => selectedTransactions.has(t.id));

  if (selectedCount === 0) {
    return null;
  }

  const handleBulkSend = () => {
    const selectedIds = Array.from(selectedTransactions);
    handleBulkSendReceipts(selectedIds);
  };

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Receipt className="h-3 w-3" />
              {selectedCount} selezionate
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={allPaidSelected ? clearSelection : selectAllPaidTransactions}
            >
              {allPaidSelected ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Deseleziona tutto
                </>
              ) : (
                <>
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Seleziona pagamenti ({paidUnsentCount})
                </>
              )}
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="text-sm text-muted-foreground">
            Transazioni pagate senza scontrino
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearSelection}
          >
            <X className="h-4 w-4 mr-2" />
            Annulla
          </Button>
          <Button
            size="sm"
            onClick={handleBulkSend}
            disabled={selectedCount === 0}
          >
            <Send className="h-4 w-4 mr-2" />
            Invia {selectedCount} scontrini
          </Button>
        </div>
      </div>
    </div>
  );
}