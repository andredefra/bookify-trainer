import { useState } from "react";
import { SessionItem } from "@/types/sessions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Video, Euro, MessageSquare } from "lucide-react";
import { CardPaymentForm } from "@/components/shared/payment/CardPaymentForm";
import { toast } from "sonner";

interface AcceptInvitePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionItem | null;
  onConfirm: () => void;
}

export function AcceptInvitePaymentDialog({
  open,
  onOpenChange,
  session,
  onConfirm
}: AcceptInvitePaymentDialogProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!session) return null;

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Payment successful! Session confirmed.");
    setIsProcessing(false);
    onConfirm();
    onOpenChange(false);
    
    // Reset form
    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setCvv("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Accept Session Invitation</DialogTitle>
          <DialogDescription>
            Review session details and complete payment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Details */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{session.name}</h3>
                <p className="text-sm text-muted-foreground">with {session.trainer}</p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Invited Session
              </Badge>
            </div>

          <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{typeof session.date === 'string' ? session.date : session.date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {session.mode === 'video' ? (
                  <>
                    <Video className="w-4 h-4 text-muted-foreground" />
                    <span>Video Session</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{session.address}</span>
                  </>
                )}
              </div>
            </div>

            {session.description && (
              <p className="text-sm text-muted-foreground">{session.description}</p>
            )}
          </div>

          {/* Trainer Message */}
          {session.inviteMessage && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-start gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-sm font-medium">Message from {session.trainer}</span>
              </div>
              <p className="text-sm italic text-muted-foreground ml-6">
                "{session.inviteMessage}"
              </p>
            </div>
          )}

          <Separator />

          {/* Payment Section */}
          {session.paymentRequired && session.price && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Payment Details</h4>
                <div className="text-2xl font-bold text-primary flex items-center gap-1">
                  <Euro className="w-5 h-5" />
                  {session.price}
                </div>
              </div>

              <CardPaymentForm
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardHolder={cardHolder}
                setCardHolder={setCardHolder}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                cvv={cvv}
                setCvv={setCvv}
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>Confirm & Pay €{session.price}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
