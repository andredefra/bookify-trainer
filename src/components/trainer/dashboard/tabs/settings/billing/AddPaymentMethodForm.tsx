
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddPaymentMethodFormProps {
  onSave: () => void;
}

export function AddPaymentMethodForm({ onSave }: AddPaymentMethodFormProps) {
  return (
    <div className="mt-6 border-t pt-4">
      <h4 className="text-medium font-medium mb-3">Add New Payment Method</h4>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="card-name">Name on Card</Label>
          <Input id="card-name" className="mt-1" placeholder="John Doe" />
        </div>
        <div>
          <Label htmlFor="card-number">Card Number</Label>
          <Input id="card-number" className="mt-1" placeholder="•••• •••• •••• ••••" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" className="mt-1" placeholder="MM/YY" />
          </div>
          <div>
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" className="mt-1" placeholder="•••" />
          </div>
        </div>
        <Button onClick={onSave}>Save Payment Method</Button>
      </div>
    </div>
  );
}
