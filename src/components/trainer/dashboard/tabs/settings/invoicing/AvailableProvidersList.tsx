
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { InvoicingProvider } from "./InvoicingProviders";

interface AvailableProvidersListProps {
  providers: InvoicingProvider[];
  connectedProvider?: {
    provider: string;
    companyVat: string;
    connectedAt: string;
  } | null;
}

export function AvailableProvidersList({ providers, connectedProvider }: AvailableProvidersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Providers</CardTitle>
        <CardDescription>
          Invoicing systems supported by the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {providers.map((provider) => (
            <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-lg">{provider.logo}</span>
                <div>
                  <h4 className="font-medium">{provider.name}</h4>
                  <p className="text-sm text-muted-foreground">{provider.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {connectedProvider?.provider === provider.id ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline">Available</Badge>
                )}
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
