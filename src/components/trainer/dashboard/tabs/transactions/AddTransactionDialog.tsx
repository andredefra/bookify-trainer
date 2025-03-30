
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Receipt } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { 
  TransactionFormValues, 
  transactionSchema, 
  AddTransactionDialogProps 
} from "./types/transactionTypes";
import { TransactionFormFields } from "./components/TransactionFormFields";
import { PaymentMethodSelector } from "./components/PaymentMethodSelector";
import { PaymentStatusSelector } from "./components/PaymentStatusSelector";

export function AddTransactionDialog({ open, onOpenChange, onAdd, clients }: AddTransactionDialogProps) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      client: "",
      type: "Session",
      name: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      status: "paid",
      paymentMethod: "card"
    }
  });

  const watchPaymentMethod = form.watch("paymentMethod");
  
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
      paymentMethod: values.paymentMethod
    });
    
    form.reset();
    onOpenChange(false);
    toast.success("Transaction added successfully", {
      duration: 3000 // Auto-dismiss after 3 seconds
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

            <DialogFooter className="pt-4">
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
