
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Receipt, Brain, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { 
  TransactionFormValues, 
  transactionSchema, 
  AddTransactionDialogProps 
} from "./types/transactionTypes";
import { TransactionFormFields } from "./components/TransactionFormFields";
import { PaymentMethodSelector } from "./components/PaymentMethodSelector";
import { PaymentStatusSelector } from "./components/PaymentStatusSelector";
import { useInstallmentDetection, InstallmentDetectionResult } from "@/hooks/useInstallmentDetection";
import { useTransactions } from "./context/TransactionsContext";

export function AddTransactionDialog({ open, onOpenChange, onAdd, clients }: AddTransactionDialogProps) {
  const { transactions } = useTransactions();
  const { detectPattern } = useInstallmentDetection();
  const [aiDetection, setAiDetection] = useState<InstallmentDetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      client: "",
      type: "Session",
      name: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      status: "paid",
      paymentMethod: "card",
      isInstallment: false
    }
  });

  const watchPaymentMethod = form.watch("paymentMethod");
  const watchClient = form.watch("client");
  const watchAmount = form.watch("amount");
  const watchIsInstallment = form.watch("isInstallment");
  const watchInstallmentNumber = form.watch("installmentNumber");
  
  // AI Detection when client or amount changes
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (watchClient && watchAmount > 0) {
      setIsAnalyzing(true);
      
      // Debounce the AI call
      timeoutId = setTimeout(async () => {
        try {
          const result = await detectPattern(watchClient, watchAmount, transactions);
          setAiDetection(result);
          
          // Auto-populate if confidence > 70%
          if (result.confidence > 0.7 && result.isLikelyInstallment) {
            form.setValue("isInstallment", true);
            form.setValue("installmentNumber", result.suggestedInstallmentNumber);
            form.setValue("totalInstallments", result.totalInstallmentsDetected);
            
            // Only set parentTransactionId if NOT the first installment
            if (result.suggestedInstallmentNumber > 1 && result.parentTransactionId) {
              form.setValue("parentTransactionId", result.parentTransactionId);
            }
          }
        } catch (error) {
          console.error('Error detecting installment:', error);
        } finally {
          setIsAnalyzing(false);
        }
      }, 800);
    } else {
      setAiDetection(null);
    }
    
    return () => clearTimeout(timeoutId);
  }, [watchClient, watchAmount, detectPattern, transactions]);

  // When payment method changes, update status appropriately
  const handlePaymentMethodChange = (value: 'card' | 'cash') => {
    form.setValue("paymentMethod", value);
    
    // If cash is selected, default to pending status
    if (value === 'cash') {
      form.setValue("status", "pending");
    }
  };

  const handleSubmit = (values: TransactionFormValues) => {
    onAdd({
      client: values.client,
      type: values.type,
      name: values.name,
      amount: values.amount,
      date: values.date,
      status: values.status,
      paymentMethod: values.paymentMethod,
      isInstallment: values.isInstallment,
      installmentNumber: values.installmentNumber,
      totalInstallments: values.totalInstallments,
      parentTransactionId: values.parentTransactionId
    });
    
    form.reset();
    setAiDetection(null);
    onOpenChange(false);
    toast.success("Transaction added successfully", {
      duration: 3000
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Receipt className="mr-2 h-5 w-5" />
            Add New Transaction
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <TransactionFormFields form={form} clients={clients} />
            
            <PaymentMethodSelector 
              form={form} 
              onPaymentMethodChange={handlePaymentMethodChange} 
            />
            
            <PaymentStatusSelector 
              form={form} 
              watchPaymentMethod={watchPaymentMethod} 
            />

            {/* AI Detection Card */}
            {isAnalyzing && (
              <Card className="bg-muted/50 border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Analyzing payment pattern...</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {aiDetection && aiDetection.confidence > 0 && !isAnalyzing && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">AI Pattern Detection</span>
                    <Badge variant="outline" className="ml-auto">
                      {(aiDetection.confidence * 100).toFixed(0)}% confidence
                    </Badge>
                  </div>
                  
                  {aiDetection.isLikelyInstallment && (
                    <div className="space-y-2">
                      <p className="text-sm">
                        This appears to be installment{' '}
                        <Badge variant="secondary">{aiDetection.suggestedInstallmentNumber}</Badge>
                        {' '}of{' '}
                        <Badge variant="secondary">{aiDetection.totalInstallmentsDetected}</Badge>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {aiDetection.reasoning}
                      </p>
                    </div>
                  )}
                  
                  {!aiDetection.isLikelyInstallment && (
                    <p className="text-sm text-muted-foreground">{aiDetection.reasoning}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Installment Toggle */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <Switch
                checked={watchIsInstallment || false}
                onCheckedChange={(checked) => form.setValue("isInstallment", checked)}
              />
              <Label className="cursor-pointer">This is an installment payment</Label>
            </div>

            {/* Installment Fields */}
            {watchIsInstallment && (
              <div className="space-y-3 p-4 rounded-lg bg-muted/50 border border-border">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="installmentNumber">Installment #</Label>
                    <Input
                      id="installmentNumber"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={form.watch("installmentNumber") || ""}
                      onChange={(e) => form.setValue("installmentNumber", parseInt(e.target.value) || undefined)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalInstallments">Total Installments</Label>
                    <Input
                      id="totalInstallments"
                      type="number"
                      min="2"
                      placeholder="3"
                      value={form.watch("totalInstallments") || ""}
                      onChange={(e) => form.setValue("totalInstallments", parseInt(e.target.value) || undefined)}
                    />
                  </div>
                </div>
                
                {/* Parent Transaction - only show if installment number > 1 */}
                {watchInstallmentNumber > 1 && (
                  <div className="space-y-2">
                    <Label htmlFor="parentTransaction">Parent Transaction (First Payment) *</Label>
                    <Select
                      value={form.watch("parentTransactionId") || ""}
                      onValueChange={(value) => form.setValue("parentTransactionId", value)}
                    >
                      <SelectTrigger id="parentTransaction">
                        <SelectValue placeholder="Select the first installment payment" />
                      </SelectTrigger>
                      <SelectContent>
                        {transactions
                          .filter(t => 
                            t.client === watchClient && 
                            t.isInstallment && 
                            t.installmentNumber === 1  // Show ONLY first installments
                          )
                          .map((t) => (
                            <SelectItem key={t.id} value={t.id.toString()}>
                              {t.name} - €{t.amount} ({t.date})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
