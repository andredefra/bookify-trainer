
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface InvoicingSectionProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
  };
}

interface InvoicingProvider {
  id: string;
  name: string;
  description: string;
  logo: string;
  fields: {
    name: string;
    label: string;
    type: string;
    required: boolean;
    placeholder: string;
  }[];
}

const invoicingProviders: InvoicingProvider[] = [
  {
    id: "fattureincloud",
    name: "FattureInCloud",
    description: "Gestionale di fatturazione online completo e semplice da usare",
    logo: "🏢",
    fields: [
      { name: "apiKey", label: "API Key", type: "password", required: true, placeholder: "Inserisci la tua API Key" },
      { name: "apiSecret", label: "API Secret", type: "password", required: true, placeholder: "Inserisci il tuo API Secret" },
      { name: "companyId", label: "ID Azienda", type: "text", required: true, placeholder: "ID della tua azienda" }
    ]
  },
  {
    id: "fiscozen",
    name: "Fiscozen",
    description: "Commercialista online per partite IVA e piccole imprese",
    logo: "📊",
    fields: [
      { name: "apiToken", label: "API Token", type: "password", required: true, placeholder: "Inserisci il tuo API Token" },
      { name: "clientId", label: "Client ID", type: "text", required: true, placeholder: "ID del tuo account cliente" }
    ]
  },
  {
    id: "aruba",
    name: "Aruba Fatturazione",
    description: "Soluzione di fatturazione elettronica di Aruba",
    logo: "🔐",
    fields: [
      { name: "username", label: "Username", type: "text", required: true, placeholder: "Il tuo username Aruba" },
      { name: "password", label: "Password", type: "password", required: true, placeholder: "La tua password Aruba" },
      { name: "companyCode", label: "Codice Azienda", type: "text", required: true, placeholder: "Codice della tua azienda" }
    ]
  }
];

export function InvoicingSection({ user }: InvoicingSectionProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [connectedProvider, setConnectedProvider] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setFormData({});
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const testConnection = async () => {
    setConnectionStatus('testing');
    
    // Simulate API test
    setTimeout(() => {
      setConnectionStatus('connected');
      toast({
        title: "Connessione riuscita",
        description: `Connesso con successo a ${invoicingProviders.find(p => p.id === selectedProvider)?.name}`,
      });
    }, 2000);
  };

  const saveConfiguration = () => {
    if (!selectedProvider) return;
    
    const provider = invoicingProviders.find(p => p.id === selectedProvider);
    const requiredFields = provider?.fields.filter(f => f.required);
    const missingFields = requiredFields?.filter(f => !formData[f.name]);
    
    if (missingFields && missingFields.length > 0) {
      toast({
        title: "Campi mancanti",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    setConnectedProvider(selectedProvider);
    setConnectionStatus('connected');
    
    toast({
      title: "Configurazione salvata",
      description: `Integrazione con ${provider?.name} configurata con successo`,
    });
  };

  const disconnect = () => {
    setConnectedProvider(null);
    setConnectionStatus('disconnected');
    setSelectedProvider("");
    setFormData({});
    
    toast({
      title: "Disconnesso",
      description: "Integrazione di fatturazione disconnessa",
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Stato Integrazione
            {connectionStatus === 'connected' ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connesso
              </Badge>
            ) : (
              <Badge variant="secondary">
                <AlertCircle className="w-3 h-3 mr-1" />
                Non connesso
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {connectedProvider ? (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {invoicingProviders.find(p => p.id === connectedProvider)?.logo}
                </span>
                <div>
                  <h4 className="font-medium">
                    {invoicingProviders.find(p => p.id === connectedProvider)?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Integrazione attiva e funzionante
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={disconnect}>
                <Trash2 className="w-4 h-4 mr-2" />
                Disconnetti
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Nessuna integrazione di fatturazione configurata. Seleziona un provider qui sotto per iniziare.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Provider Selection */}
      {!connectedProvider && (
        <Card>
          <CardHeader>
            <CardTitle>Seleziona Provider di Fatturazione</CardTitle>
            <CardDescription>
              Scegli il tuo gestionale di fatturazione fra le integrazioni disponibili
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {invoicingProviders.map((provider) => (
                <Card 
                  key={provider.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProvider === provider.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleProviderSelect(provider.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{provider.logo}</span>
                      <h3 className="font-medium">{provider.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {provider.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration Form */}
      {selectedProvider && !connectedProvider && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">
                {invoicingProviders.find(p => p.id === selectedProvider)?.logo}
              </span>
              Configura {invoicingProviders.find(p => p.id === selectedProvider)?.name}
            </CardTitle>
            <CardDescription>
              Inserisci le tue credenziali API per collegare il tuo account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {invoicingProviders
              .find(p => p.id === selectedProvider)
              ?.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                </div>
              ))}
            
            <Separator />
            
            <div className="flex gap-3">
              <Button 
                onClick={testConnection}
                disabled={connectionStatus === 'testing'}
                variant="outline"
              >
                {connectionStatus === 'testing' ? 'Test in corso...' : 'Testa Connessione'}
              </Button>
              <Button 
                onClick={saveConfiguration}
                disabled={connectionStatus !== 'connected'}
              >
                Salva Configurazione
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Come ottenere le credenziali API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <span className="text-xl">🏢</span>
              <div>
                <h4 className="font-medium">FattureInCloud</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Accedi al tuo account FattureInCloud, vai in Impostazioni > API e genera le tue credenziali.
                </p>
                <Button variant="link" size="sm" className="p-0 h-auto">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Vai alle API di FattureInCloud
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <span className="text-xl">📊</span>
              <div>
                <h4 className="font-medium">Fiscozen</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Nel tuo pannello Fiscozen, vai alla sezione API per ottenere il token di autenticazione.
                </p>
                <Button variant="link" size="sm" className="p-0 h-auto">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Documentazione API Fiscozen
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <span className="text-xl">🔐</span>
              <div>
                <h4 className="font-medium">Aruba Fatturazione</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Usa le stesse credenziali del tuo account Aruba Fatturazione Elettronica.
                </p>
                <Button variant="link" size="sm" className="p-0 h-auto">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Accedi ad Aruba Fatturazione
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
