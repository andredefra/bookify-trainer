import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrainingProgram } from "@/data/training/types";
import { Calendar, User, Target, DollarSign, Package, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProgramManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: TrainingProgram | null;
  onConfirmPayment?: () => void;
  onViewPackage?: () => void;
}

export function ProgramManagementDialog({
  open,
  onOpenChange,
  program,
  onConfirmPayment,
  onViewPackage
}: ProgramManagementDialogProps) {
  if (!program) return null;

  const getPaymentStatusBadge = () => {
    const statusConfig = {
      pending: { label: 'Payment Pending', className: 'bg-destructive/10 text-destructive' },
      partial: { label: 'Partially Paid', className: 'bg-orange-500/10 text-orange-600' },
      paid: { label: 'Paid', className: 'bg-green-500/10 text-green-600' },
      confirmed: { label: 'Payment Confirmed ✓', className: 'bg-green-500/10 text-green-600' }
    };
    
    const config = statusConfig[program.paymentStatus || 'pending'];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Program Management</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Program Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{program.trainerName}</span>
                </div>
              </div>

              <Separator />

              {/* Program Type */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Program Type</span>
                {program.isStandalone ? (
                  <Badge variant="outline" className="gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Standalone Program
                  </Badge>
                ) : (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Package className="h-3 w-3" />
                      Part of Package
                    </Badge>
                    {onViewPackage && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={onViewPackage}
                        className="gap-1 h-7"
                      >
                        View Package
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Program Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Duration</span>
                  </div>
                  <p className="font-medium">{program.duration} weeks</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    <span>Sessions</span>
                  </div>
                  <p className="font-medium">{program.totalSessions} total</p>
                </div>
              </div>

              {program.objective && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Objective</p>
                  <p className="text-sm text-muted-foreground">{program.objective}</p>
                </div>
              )}

              {program.description && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6 mt-6">
            {/* Payment Status */}
            <div className="flex items-center justify-between">
              <span className="font-medium">Payment Status</span>
              {getPaymentStatusBadge()}
            </div>

            <Separator />

            {/* Payment Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-bold">{formatCurrency(program.totalPrice || 0)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(program.amountPaid || 0)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-lg font-bold text-destructive">
                    {formatCurrency((program.totalPrice || 0) - (program.amountPaid || 0))}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium capitalize">{program.paymentMethod || 'N/A'}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Essential Trainer Cash Payment */}
            {program.trainerSubscriptionTier === 'essential' && program.paymentMethod === 'cash' && (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your trainer manages payments outside the app. Once you've made the payment, 
                    please confirm it here to keep your training records up to date.
                  </AlertDescription>
                </Alert>

                {!program.clientConfirmedPayment ? (
                  <Button 
                    onClick={onConfirmPayment} 
                    className="w-full gap-2"
                    size="lg"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Confirm Payment Received
                  </Button>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                      <CheckCircle className="h-5 w-5" />
                      Payment Confirmed
                    </div>
                    {program.clientConfirmedAt && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Confirmed on {new Date(program.clientConfirmedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Installments (for future Pro trainer features) */}
            {program.installments && (
              <div className="space-y-4">
                <h4 className="font-medium">Installment Plan</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {program.installments.paidInstallments} / {program.installments.totalInstallments} paid
                    </span>
                  </div>
                  {program.installments.nextDueDate && (
                    <Alert>
                      <AlertDescription>
                        Next payment of {formatCurrency(program.installments.nextAmount || 0)} due on{' '}
                        {new Date(program.installments.nextDueDate).toLocaleDateString()}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
