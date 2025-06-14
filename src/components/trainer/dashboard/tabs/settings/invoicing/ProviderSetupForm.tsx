
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { InvoicingProvider } from "./CountriesAndProviders";

interface ProviderSetupFormProps {
  providers: InvoicingProvider[];
}

export function ProviderSetupForm({ providers }: ProviderSetupFormProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [apiKey, setApiKey] = useState("");
  const [companyVat, setCompanyVat] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!selectedProvider || !apiKey || !companyVat) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      localStorage.setItem('invoicing-provider', JSON.stringify({
        provider: selectedProvider,
        apiKey: apiKey,
        companyVat: companyVat,
        connectedAt: new Date().toISOString()
      }));
      
      toast.success(`Successfully connected to ${providers.find(p => p.id === selectedProvider)?.name}`);
      setIsConnecting(false);
      
      // Reset form
      setApiKey("");
      setCompanyVat("");
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="provider">Select Provider</Label>
        <Select value={selectedProvider} onValueChange={setSelectedProvider}>
          <SelectTrigger>
            <SelectValue placeholder="Choose your invoicing system" />
          </SelectTrigger>
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                <div className="flex items-center gap-2">
                  <span>{provider.logo}</span>
                  <div>
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-xs text-muted-foreground">{provider.description}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedProvider && (
        <div className="space-y-4 border rounded-lg p-4 bg-muted/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{providers.find(p => p.id === selectedProvider)?.logo}</span>
            <h4 className="font-medium">{providers.find(p => p.id === selectedProvider)?.name}</h4>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Find your API key in the provider's control panel
              </p>
            </div>
            
            <div>
              <Label htmlFor="companyVat">VAT Number</Label>
              <Input
                id="companyVat"
                placeholder="IT12345678901"
                value={companyVat}
                onChange={(e) => setCompanyVat(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting || !apiKey || !companyVat}
            className="w-full"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </Button>
        </div>
      )}
    </div>
  );
}
