
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Wallet, Building2, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { PaymentMethod, BusinessInfo } from "@/components/trainer/training/types";

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
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Your Payment Methods</h3>
            
            {paymentMethods.length > 0 ? (
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <div key={method.id} className="flex items-center justify-between border p-3 rounded-md bg-white">
                    <div className="flex items-center space-x-3">
                      {method.type === "creditCard" && <CreditCard className="h-5 w-5 text-primary" />}
                      {method.type === "paypal" && <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none"><path d="M19.0001 6.4V17.5C19.0001 17.7652 18.8947 18.0196 18.7072 18.2071C18.5197 18.3946 18.2653 18.5 18.0001 18.5H15.0701L15.8301 20.72C15.9701 21.16 15.5701 21.59 15.1001 21.5H10.8601C10.6901 21.5 10.5301 21.42 10.4301 21.29L6.43005 14.29C6.29005 14.05 6.34005 13.75 6.55005 13.57L10.0001 10.5H5.70005C5.60127 10.4994 5.50361 10.4796 5.41322 10.4416C5.32282 10.4036 5.24147 10.3482 5.17429 10.2785C5.10712 10.2087 5.05552 10.1253 5.02255 10.0336C4.98958 9.94189 4.97598 9.84363 4.98005 9.74536L5.48005 4.74536C5.48846 4.61933 5.53322 4.49923 5.6097 4.4026C5.68618 4.30597 5.79073 4.2378 5.90733 4.20716C6.02393 4.17652 6.14752 4.18509 6.25905 4.23159C6.37058 4.27809 6.46441 4.36 6.52505 4.46536L8.00005 6.41536V3.5C8.00005 3.23478 8.10541 2.98043 8.29294 2.7929C8.48048 2.60536 8.73483 2.5 9.00005 2.5H18.0001C18.2653 2.5 18.5197 2.60536 18.7072 2.7929C18.8947 2.98043 19.0001 3.23478 19.0001 3.5V6.4Z" fill="currentColor"/></svg>}
                      {method.type === "googlePay" && <Wallet className="h-5 w-5 text-slate-600" />}
                      
                      <div>
                        <p className="font-medium">
                          {method.type === "creditCard" && `Card ending in ${method.lastFour}`}
                          {method.type === "paypal" && "PayPal"}
                          {method.type === "googlePay" && "Google Pay"}
                        </p>
                        {method.expiryDate && <p className="text-xs text-muted-foreground">Expires {method.expiryDate}</p>}
                        {method.isDefault && <span className="text-xs text-emerald-600 font-medium flex items-center mt-1"><Check className="h-3 w-3 mr-1" /> Default</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!method.isDefault && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleRemovePaymentMethod(method.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 border border-dashed rounded-md">
                <p className="text-muted-foreground">No payment methods added yet</p>
              </div>
            )}
            
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
                <Button onClick={handleSavePaymentMethod}>Save Payment Method</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="business-info" className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Business Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Trainer Type</Label>
                <RadioGroup 
                  value={businessType} 
                  onValueChange={(value) => setBusinessType(value as "individual" | "business")}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual Trainer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business">Business/Company</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {businessType === "business" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" placeholder="Your Company Name" />
                  </div>
                  <div>
                    <Label htmlFor="vat">VAT Number</Label>
                    <Input id="vat" placeholder="VAT Number" />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="tax-id">Tax ID / Fiscal Code</Label>
                <Input id="tax-id" placeholder="Tax ID or Fiscal Code" />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Street Address" className="mb-2" />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input placeholder="City" />
                  <Input placeholder="State/Province" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Postal Code" />
                  <Select defaultValue="Italy">
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleSaveBusinessInfo}>Save Business Information</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
