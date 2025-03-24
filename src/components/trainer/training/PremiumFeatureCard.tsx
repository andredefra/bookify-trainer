
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PremiumFeatureCard() {
  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader>
        <CardTitle className="text-amber-800">Premium Feature</CardTitle>
        <CardDescription>
          Training program creation and sharing is a premium feature.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-amber-700 mb-4">
          Upgrade to our Pro plan to access advanced features like custom training programs, which you can create and share with your clients.
        </p>
        <Button>Upgrade to Pro</Button>
      </CardContent>
    </Card>
  );
}
