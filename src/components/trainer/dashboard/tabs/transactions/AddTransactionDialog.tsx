
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Euro, Receipt, CreditCard, Coins } from "lucide-react";
import { toast } from "sonner";

// Define the transaction type
type TransactionType = {
  id: number;
  client: string;
  type: string;
  name: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  paymentMethod?: 'card' | 'cash';
}

// Define the form schema
const transactionSchema = z.object({
  client: z.string().min(1, { message: "Please select a client" }),
  type: z.string().min(1, { message: "Please select a type" }),
  name: z.string().min(1, { message: "Required" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  date: z.string().min(1, { message: "Required" }),
  status: z.enum(["paid", "pending", "failed"]),
  paymentMethod: z.enum(["card", "cash"])
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (transaction: Omit<TransactionType, 'id'>) => void;
  clients: { id: number; name: string }[];
}

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
  const watchStatus = form.watch("status");
  
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
    toast.success("Transaction added successfully");
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
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.name}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Session">Session</SelectItem>
                        <SelectItem value="Program">Program</SelectItem>
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Transaction description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (€)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Euro className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        className="pl-8" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => handlePaymentMethodChange(value as 'card' | 'cash')}
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer">
                          <CreditCard className="mr-1.5 h-4 w-4" />
                          Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center cursor-pointer">
                          <Coins className="mr-1.5 h-4 w-4" />
                          Cash
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-2"
                      disabled={watchPaymentMethod === 'cash'}
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="paid" id="paid" />
                        <Label htmlFor="paid" className={`text-xs ${watchPaymentMethod === 'cash' ? 'opacity-50' : ''}`}>Paid</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="pending" id="pending" />
                        <Label htmlFor="pending" className={`text-xs ${watchPaymentMethod === 'cash' ? 'opacity-50' : ''}`}>Pending</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="failed" id="failed" />
                        <Label htmlFor="failed" className={`text-xs ${watchPaymentMethod === 'cash' ? 'opacity-50' : ''}`}>Failed</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  {watchPaymentMethod === 'cash' && (
                    <p className="text-xs text-muted-foreground">
                      Cash payments are marked as pending until you confirm receipt
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
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
