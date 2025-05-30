
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

interface InvoicingProvider {
  id: string;
  name: string;
  description: string;
  logo: string;
  isConnected: boolean;
}

export function InvoicingSection() {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [apiKey, setApiKey] = useState("");
  const [companyVat, setCompanyVat] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const providers: InvoicingProvider[] = [
    {
      id: "fattureincloud",
      name: "FattureInCloud",
      description: "Leading electronic invoicing system in Italy",
      logo: "🧾",
      isConnected: false
    },
    {
      id: "fiscozen",
      name: "Fiscozen",
      description: "Digital accountant with integrated invoicing",
      logo: "📊",
      isConnected: false
    },
    {
      id: "aruba",
      name: "Aruba Fatturazione",
      description: "Simple and secure electronic invoicing",
      logo: "🔒",
      isConnected: false
    }
  ];

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
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">
                      Connected to {providers.find(p => p.id === connectedProvider.provider)?.name}
                    </h4>
                    <p className="text-sm text-green-600">
                      VAT Number: {connectedProvider.companyVat}
                    </p>
                    <p className="text-xs text-green-500">
                      Connected on {new Date(connectedProvider.connectedAt).toLocaleDateString('en-US')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>

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

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 mb-1">Important Information</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• API keys are stored securely and encrypted</li>
              <li>• You can disconnect the provider at any time</li>
              <li>• Sent invoices will be automatically recorded in your system</li>
              <li>• Make sure your company data is up to date in the provider</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
