import { useState } from "react";
import { SessionRequest } from "@/hooks/useSessionSales";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CreditCard, Banknote, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface ApproveSessionRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: SessionRequest | null;
  isProTrainer: boolean;
  onConfirm: (requestId: string, paymentMethod: 'cash' | 'online') => void;
}

export function ApproveSessionRequestDialog({
  open,
  onOpenChange,
  request,
  isProTrainer,
  onConfirm,
}: ApproveSessionRequestDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('online');
  const [paymentReceived, setPaymentReceived] = useState(false);

  if (!request) return null;

  const handleConfirm = () => {
    if (!isProTrainer && !paymentReceived) return;
    onConfirm(request.id, paymentMethod);
    onOpenChange(false);
    // Reset state
    setPaymentMethod('online');
    setPaymentReceived(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Approve Session Request
          </DialogTitle>
          <DialogDescription>
            Approve the session request from {request.clientName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Session Details */}
          <div className="p-4 bg-muted/30 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{request.sessionTitle}</h4>
              <Badge variant="outline">{request.sessionType}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(request.requestedDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{request.requestedTime} ({request.duration}min)</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Session Price</span>
              <span className="text-xl font-bold">{formatCurrency(request.price)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          {isProTrainer ? (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'cash' | 'online')}>
                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="online" id="online" className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer font-medium">
                      <CreditCard className="h-4 w-4" />
                      Request Online Payment
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Client will receive a payment link via email to complete payment before the session
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="cash" id="cash" className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer font-medium">
                      <Banknote className="h-4 w-4" />
                      Cash Payment
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Manually confirm when you receive payment in cash or via bank transfer
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          ) : (
            // Essential Trainer
            <Alert>
              <AlertDescription className="space-y-3">
                <p className="text-sm font-medium">
                  💰 Payments are managed outside the app
                </p>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="payment-received"
                    checked={paymentReceived}
                    onCheckedChange={(checked) => setPaymentReceived(checked as boolean)}
                  />
                  <Label htmlFor="payment-received" className="cursor-pointer text-sm">
                    I confirm that payment has been received (cash/bank transfer)
                  </Label>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isProTrainer && !paymentReceived}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            {isProTrainer
              ? paymentMethod === 'online'
                ? 'Approve & Send Payment Link'
                : 'Approve Session'
              : 'Approve Session'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
