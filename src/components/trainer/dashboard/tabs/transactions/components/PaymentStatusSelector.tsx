
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { TransactionFormValues } from "../types/transactionTypes";

interface PaymentStatusSelectorProps {
  form: UseFormReturn<TransactionFormValues>;
  watchPaymentMethod: string;
}

export function PaymentStatusSelector({ form, watchPaymentMethod }: PaymentStatusSelectorProps) {
  return (
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
  );
}
