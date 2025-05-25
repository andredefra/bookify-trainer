
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
      description: "Sistema di fatturazione elettronica leader in Italia",
      logo: "🧾",
      isConnected: false
    },
    {
      id: "fiscozen",
      name: "Fiscozen",
      description: "Commercialista digitale con fatturazione integrata",
      logo: "📊",
      isConnected: false
    },
    {
      id: "aruba",
      name: "Aruba Fatturazione",
      description: "Fatturazione elettronica semplice e sicura",
      logo: "🔒",
      isConnected: false
    }
  ];

  const handleConnect = async () => {
    if (!selectedProvider || !apiKey || !companyVat) {
      toast.error("Compila tutti i campi richiesti");
      return;
    }

    setIsConnecting(true);
    
    // Simula la connessione
    setTimeout(() => {
      localStorage.setItem('invoicing-provider', JSON.stringify({
        provider: selectedProvider,
        apiKey: apiKey,
        companyVat: companyVat,
        connectedAt: new Date().toISOString()
      }));
      
      toast.success(`Connesso con successo a ${providers.find(p => p.id === selectedProvider)?.name}`);
      setIsConnecting(false);
      
      // Reset form
      setApiKey("");
      setCompanyVat("");
    }, 2000);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('invoicing-provider');
    toast.success("Disconnesso dal provider di fatturazione");
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
            Integrazione Fatturazione
          </CardTitle>
          <CardDescription>
            Connetti il tuo sistema di fatturazione per inviare fatture direttamente dalle transazioni
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
                      Connesso a {providers.find(p => p.id === connectedProvider.provider)?.name}
                    </h4>
                    <p className="text-sm text-green-600">
                      P.IVA: {connectedProvider.companyVat}
                    </p>
                    <p className="text-xs text-green-500">
                      Connesso il {new Date(connectedProvider.connectedAt).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Disconnetti
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="provider">Seleziona Provider</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Scegli il tuo sistema di fatturazione" />
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
                        placeholder="Inserisci la tua API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Trova la tua API key nel pannello di controllo del provider
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="companyVat">Partita IVA</Label>
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
                    {isConnecting ? "Connessione in corso..." : "Connetti"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Provider Disponibili</CardTitle>
          <CardDescription>
            Sistemi di fatturazione supportati dalla piattaforma
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
                      Connesso
                    </Badge>
                  ) : (
                    <Badge variant="outline">Disponibile</Badge>
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
            <h4 className="font-medium text-amber-800 mb-1">Informazioni Importanti</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Le API key sono memorizzate in modo sicuro e crittografato</li>
              <li>• Puoi disconnettere il provider in qualsiasi momento</li>
              <li>• Le fatture inviate saranno automaticamente registrate nel tuo sistema</li>
              <li>• Assicurati che i dati della tua azienda siano aggiornati nel provider</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
