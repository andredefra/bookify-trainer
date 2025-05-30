
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from "lucide-react";
import { providers } from "./invoicing/InvoicingProviders";
import { ConnectedProviderCard } from "./invoicing/ConnectedProviderCard";
import { ProviderSetupForm } from "./invoicing/ProviderSetupForm";
import { AvailableProvidersList } from "./invoicing/AvailableProvidersList";
import { InvoicingInfoCard } from "./invoicing/InvoicingInfoCard";

export function InvoicingSection() {
  const handleDisconnect = () => {
    localStorage.removeItem('invoicing-provider');
    toast.success("Disconnected from invoicing provider");
  };

  const connectedProvider = localStorage.getItem('invoicing-provider') 
    ? JSON.parse(localStorage.getItem('invoicing-provider')!) 
    : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Invoicing Integration
          </CardTitle>
          <CardDescription>
            Connect your invoicing system to send invoices directly from transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {connectedProvider ? (
            <ConnectedProviderCard 
              connectedProvider={connectedProvider}
              providers={providers}
              onDisconnect={handleDisconnect}
            />
          ) : (
            <ProviderSetupForm providers={providers} />
          )}
        </CardContent>
      </Card>

      <AvailableProvidersList 
        providers={providers}
        connectedProvider={connectedProvider}
      />

      <InvoicingInfoCard />
    </div>
  );
}
