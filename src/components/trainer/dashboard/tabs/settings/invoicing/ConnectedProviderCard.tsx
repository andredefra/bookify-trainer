
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { InvoicingProvider } from "./InvoicingProviders";

interface ConnectedProviderCardProps {
  connectedProvider: {
    provider: string;
    companyVat: string;
    connectedAt: string;
  };
  providers: InvoicingProvider[];
  onDisconnect: () => void;
}

export function ConnectedProviderCard({ connectedProvider, providers, onDisconnect }: ConnectedProviderCardProps) {
  const providerInfo = providers.find(p => p.id === connectedProvider.provider);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <h4 className="font-medium text-green-800">
              Connected to {providerInfo?.name}
            </h4>
            <p className="text-sm text-green-600">
              VAT Number: {connectedProvider.companyVat}
            </p>
            <p className="text-xs text-green-500">
              Connected on {new Date(connectedProvider.connectedAt).toLocaleDateString('en-US')}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onDisconnect}>
          Disconnect
        </Button>
      </div>
    </div>
  );
}
