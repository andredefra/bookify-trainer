
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { PaymentMethod, BusinessInfo } from "@/components/trainer/training/types";
import { PaymentMethodsSection } from "./billing/PaymentMethodsSection";
import { BusinessInfoSection } from "./billing/BusinessInfoSection";

interface BillingSectionProps {
  user: {
    plan?: string;
  };
}

export function BillingSection({ user }: BillingSectionProps) {
  const [selectedTab, setSelectedTab] = useState("payment-methods");
  const [businessType, setBusinessType] = useState<"individual" | "business">("individual");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { 
      id: "1", 
      type: "creditCard", 
      isDefault: true,
      lastFour: "4242",
      expiryDate: "12/25"
    }
  ]);

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    type: "individual",
    businessName: "",
    vatNumber: "",
    taxId: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Italy"
    }
  });

  const handleSavePaymentMethod = () => {
    toast.success("Payment method saved successfully");
  };

  const handleSaveBusinessInfo = () => {
    toast.success("Business information saved successfully");
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast.success("Payment method removed");
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    toast.success("Default payment method updated");
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="business-info">Business Information</TabsTrigger>
        </TabsList>

        <TabsContent value="payment-methods" className="space-y-4">
          <PaymentMethodsSection 
            paymentMethods={paymentMethods}
            onRemovePaymentMethod={handleRemovePaymentMethod}
            onSetDefault={handleSetDefault}
            onSavePaymentMethod={handleSavePaymentMethod}
          />
        </TabsContent>
        
        <TabsContent value="business-info" className="space-y-4">
          <BusinessInfoSection 
            businessType={businessType}
            setBusinessType={setBusinessType}
            businessInfo={businessInfo}
            onSaveBusinessInfo={handleSaveBusinessInfo}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
