
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CreditCard, Coins } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { TransactionFormValues } from "../types/transactionTypes";

interface PaymentMethodSelectorProps {
  form: UseFormReturn<TransactionFormValues>;
  onPaymentMethodChange: (value: 'card' | 'cash') => void;
}

export function PaymentMethodSelector({ form, onPaymentMethodChange }: PaymentMethodSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Payment Method</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => onPaymentMethodChange(value as 'card' | 'cash')}
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
  );
}
