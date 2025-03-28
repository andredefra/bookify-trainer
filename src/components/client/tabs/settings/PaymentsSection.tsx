
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, CreditCard, Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function PaymentsSection() {
  const [paymentMethod, setPaymentMethod] = useState<string>("none");

  const handleSavePaymentMethod = (method: string) => {
    setPaymentMethod(method);
    toast({
      title: `Payment Method Updated`,
      description: `${method} set as your default payment method`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Methods</h3>
      <p className="text-sm text-muted-foreground">
        Add and manage your payment methods for quick checkout when booking sessions
      </p>
      
      <div className="grid gap-4">
        <div 
          className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-primary ${paymentMethod === "creditCard" ? "bg-primary/5 border-primary" : ""}`}
          onClick={() => setPaymentMethod("creditCard")}
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Credit/Debit Card</h4>
              {paymentMethod === "creditCard" && (
                <p className="text-xs text-muted-foreground">Default payment method</p>
              )}
            </div>
          </div>
          
          {paymentMethod === "creditCard" && (
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="•••" type="password" />
                </div>
              </div>
              <Button onClick={() => handleSavePaymentMethod("creditCard")}>Save Card</Button>
            </div>
          )}
        </div>
        
        <div 
          className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-primary ${paymentMethod === "paypal" ? "bg-primary/5 border-primary" : ""}`}
          onClick={() => setPaymentMethod("paypal")}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.0001 6.4V17.5C19.0001 17.7652 18.8947 18.0196 18.7072 18.2071C18.5197 18.3946 18.2653 18.5 18.0001 18.5H15.0701L15.8301 20.72C15.9701 21.16 15.5701 21.59 15.1001 21.5H10.8601C10.6901 21.5 10.5301 21.42 10.4301 21.29L6.43005 14.29C6.29005 14.05 6.34005 13.75 6.55005 13.57L10.0001 10.5H5.70005C5.60127 10.4994 5.50361 10.4796 5.41322 10.4416C5.32282 10.4036 5.24147 10.3482 5.17429 10.2785C5.10712 10.2087 5.05552 10.1253 5.02255 10.0336C4.98958 9.94189 4.97598 9.84363 4.98005 9.74536L5.48005 4.74536C5.48846 4.61933 5.53322 4.49923 5.6097 4.4026C5.68618 4.30597 5.79073 4.2378 5.90733 4.20716C6.02393 4.17652 6.14752 4.18509 6.25905 4.23159C6.37058 4.27809 6.46441 4.36 6.52505 4.46536L8.00005 6.41536V3.5C8.00005 3.23478 8.10541 2.98043 8.29294 2.7929C8.48048 2.60536 8.73483 2.5 9.00005 2.5H18.0001C18.2653 2.5 18.5197 2.60536 18.7072 2.7929C18.8947 2.98043 19.0001 3.23478 19.0001 3.5V6.4Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h4 className="font-medium">PayPal</h4>
              {paymentMethod === "paypal" && (
                <p className="text-xs text-muted-foreground">Default payment method</p>
              )}
            </div>
          </div>
          
          {paymentMethod === "paypal" && (
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="paypalEmail">PayPal Email</Label>
                <Input id="paypalEmail" type="email" placeholder="your-email@example.com" />
              </div>
              <Button onClick={() => handleSavePaymentMethod("paypal")}>Connect PayPal</Button>
            </div>
          )}
        </div>
        
        <div 
          className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-primary ${paymentMethod === "googlePay" ? "bg-primary/5 border-primary" : ""}`}
          onClick={() => setPaymentMethod("googlePay")}
        >
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-full">
              <Wallet className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <h4 className="font-medium">Google Pay</h4>
              {paymentMethod === "googlePay" && (
                <p className="text-xs text-muted-foreground">Default payment method</p>
              )}
            </div>
          </div>
          
          {paymentMethod === "googlePay" && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">
                Click the button below to connect to your Google Pay account. You'll be redirected to Google to complete the setup.
              </p>
              <Button onClick={() => handleSavePaymentMethod("googlePay")}>Connect Google Pay</Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mt-4">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-700">
              Your payment information is securely stored. Your card details are never shared with trainers directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
