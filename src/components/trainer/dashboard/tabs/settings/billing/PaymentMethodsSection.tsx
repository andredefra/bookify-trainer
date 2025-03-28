
import React from "react";
import { PaymentMethodsList } from "./PaymentMethodsList";
import { AddPaymentMethodForm } from "./AddPaymentMethodForm";
import { PaymentMethod } from "@/components/trainer/training/types";

interface PaymentMethodsSectionProps {
  paymentMethods: PaymentMethod[];
  onRemovePaymentMethod: (id: string) => void;
  onSetDefault: (id: string) => void;
  onSavePaymentMethod: () => void;
}

export function PaymentMethodsSection({ 
  paymentMethods, 
  onRemovePaymentMethod, 
  onSetDefault,
  onSavePaymentMethod
}: PaymentMethodsSectionProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Your Payment Methods</h3>
      
      <PaymentMethodsList 
        paymentMethods={paymentMethods} 
        onRemove={onRemovePaymentMethod} 
        onSetDefault={onSetDefault} 
      />
      
      <AddPaymentMethodForm onSave={onSavePaymentMethod} />
    </div>
  );
}
