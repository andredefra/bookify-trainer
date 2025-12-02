
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BillingTabProps {
  user: {
    plan?: string;
  } | null;
}

export function BillingTab({ user }: BillingTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <h3 className="font-medium text-blue-800">Current Plan: {user?.plan || "Gym"}</h3>
              <p className="text-sm text-blue-600">€119/month • Billed monthly</p>
              <p className="text-xs text-blue-600 mt-2">Next billing date: July 15, 2023</p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline">Change Plan</Button>
              <Button variant="destructive">Cancel Subscription</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border rounded-md p-4">
              <div className="flex items-center">
                <div className="bg-gray-200 rounded p-2 mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            
            <Button variant="outline">Add Payment Method</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
