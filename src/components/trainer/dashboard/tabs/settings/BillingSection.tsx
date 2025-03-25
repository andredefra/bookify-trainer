
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BillingSectionProps {
  user: {
    plan?: string;
  };
}

export function BillingSection({ user }: BillingSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Current Plan</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">{user.plan || "Demo Plan"}</h4>
              <p className="text-xs text-muted-foreground">Your current plan features and limitations</p>
            </div>
            <Button variant="outline" size="sm">Upgrade</Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Billing Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
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
            <Button className="mt-2">Save Payment Method</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
