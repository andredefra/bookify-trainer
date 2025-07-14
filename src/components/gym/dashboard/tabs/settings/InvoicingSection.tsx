import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Receipt, Globe, Check, Link } from "lucide-react";

const invoicingProviders = [
  { id: 'fatture-in-cloud', name: 'Fatture in Cloud', logo: '🧾', popular: true },
  { id: 'quickbooks', name: 'QuickBooks', logo: '💳', popular: true },
  { id: 'xero', name: 'Xero', logo: '📈', popular: false }
];

export function InvoicingSection() {
  const [connectedProvider, setConnectedProvider] = useState(null);

  const handleConnect = (providerId: string) => {
    const provider = invoicingProviders.find(p => p.id === providerId);
    if (provider) {
      setConnectedProvider(provider);
      toast.success(`Connected to ${provider.name} successfully!`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Invoicing Integration
          </CardTitle>
          <CardDescription>
            Connect your invoicing system to automatically generate invoices for package sales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {connectedProvider ? (
            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{connectedProvider.logo}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">{connectedProvider.name}</h4>
                    <p className="text-sm text-green-700">Successfully connected</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose an invoicing provider to start generating automatic invoices:
              </p>
              <div className="grid gap-3">
                {invoicingProviders.map((provider) => (
                  <div key={provider.id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <span>{provider.logo}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{provider.name}</h4>
                          {provider.popular && (
                            <Badge variant="secondary" className="text-xs">Popular</Badge>
                          )}
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleConnect(provider.id)}>
                        <Link className="w-3 h-3 mr-1" />
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Track your invoicing performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">€1,275.00</div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">€255.00</div>
              <p className="text-sm text-muted-foreground">Trainer Commissions</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">11</div>
              <p className="text-sm text-muted-foreground">Invoices Sent</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}