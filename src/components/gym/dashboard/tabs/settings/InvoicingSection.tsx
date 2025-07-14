import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Receipt, 
  Globe, 
  Settings, 
  CreditCard, 
  Calculator,
  FileText,
  Link,
  Check,
  AlertCircle,
  DollarSign
} from "lucide-react";

const invoicingProviders = {
  it: [
    { id: 'fatture-in-cloud', name: 'Fatture in Cloud', logo: '🧾', popular: true },
    { id: 'danea', name: 'Danea Easyfatt', logo: '📊', popular: true },
    { id: 'aruba', name: 'Aruba Fatturazione', logo: '💼', popular: false },
    { id: 'teamsystem', name: 'TeamSystem', logo: '🏢', popular: false }
  ],
  en: [
    { id: 'quickbooks', name: 'QuickBooks', logo: '💳', popular: true },
    { id: 'xero', name: 'Xero', logo: '📈', popular: true },
    { id: 'freshbooks', name: 'FreshBooks', logo: '📋', popular: false },
    { id: 'wave', name: 'Wave Accounting', logo: '🌊', popular: false }
  ],
  fr: [
    { id: 'pennylane', name: 'Pennylane', logo: '🇫🇷', popular: true },
    { id: 'sage', name: 'Sage', logo: '🌿', popular: true }
  ]
};

const countries = [
  { id: 'it', name: 'Italy', flag: '🇮🇹' },
  { id: 'en', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'fr', name: 'France', flag: '🇫🇷' }
];

export function InvoicingSection() {
  const [selectedCountry, setSelectedCountry] = useState<string>("it");
  const [autoInvoicing, setAutoInvoicing] = useState(true);
  const [trainerCommissions, setTrainerCommissions] = useState(true);
  const [defaultCommission, setDefaultCommission] = useState("20");
  
  const connectedProvider = localStorage.getItem('gym-invoicing-provider') 
    ? JSON.parse(localStorage.getItem('gym-invoicing-provider')!) 
    : null;

  const availableProviders = invoicingProviders[selectedCountry] || [];
  const selectedCountryData = countries.find(c => c.id === selectedCountry);

  const handleConnect = (providerId: string) => {
    const provider = availableProviders.find(p => p.id === providerId);
    if (provider) {
      localStorage.setItem('gym-invoicing-provider', JSON.stringify({
        ...provider,
        connectedAt: new Date().toISOString(),
        country: selectedCountry
      }));
      toast.success(`Connected to ${provider.name} successfully!`);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('gym-invoicing-provider');
    toast.success("Disconnected from invoicing provider");
  };

  const handleSaveSettings = () => {
    const settings = {
      autoInvoicing,
      trainerCommissions,
      defaultCommission: parseFloat(defaultCommission)
    };
    localStorage.setItem('gym-invoicing-settings', JSON.stringify(settings));
    toast.success("Invoicing settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Main Connection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Invoicing Integration
          </CardTitle>
          <CardDescription>
            Automatically generate invoices for package sales and manage trainer commissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Country Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium">Select Your Country</h4>
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="bg-white border border-gray-300 shadow-sm">
                <SelectValue placeholder="Choose your country" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg z-50 max-h-60">
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Connected Provider or Setup */}
          {connectedProvider ? (
            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{connectedProvider.logo}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">{connectedProvider.name}</h4>
                    <p className="text-sm text-green-700">
                      Connected on {new Date(connectedProvider.connectedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Check className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose an invoicing provider to start generating automatic invoices:
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {availableProviders.map((provider) => (
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

      {/* Invoice Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Invoice Settings
          </CardTitle>
          <CardDescription>
            Configure automatic invoicing and payment processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-invoicing">Automatic Invoice Generation</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically create invoices when packages are sold
                </p>
              </div>
              <Switch
                id="auto-invoicing"
                checked={autoInvoicing}
                onCheckedChange={setAutoInvoicing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="trainer-commissions">Trainer Commission Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Track and calculate trainer commissions on sales
                </p>
              </div>
              <Switch
                id="trainer-commissions"
                checked={trainerCommissions}
                onCheckedChange={setTrainerCommissions}
              />
            </div>

            {trainerCommissions && (
              <div className="space-y-2">
                <Label htmlFor="default-commission">Default Commission Rate (%)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="default-commission"
                    type="number"
                    min="0"
                    max="100"
                    value={defaultCommission}
                    onChange={(e) => setDefaultCommission(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  This will be the default commission rate for new trainer contracts
                </p>
              </div>
            )}
          </div>

          <Button onClick={handleSaveSettings} className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Save Invoice Settings
          </Button>
        </CardContent>
      </Card>

      {/* Revenue & Commission Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Revenue & Commission Overview
          </CardTitle>
          <CardDescription>
            Track invoicing performance and trainer commissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Monthly Revenue</span>
              </div>
              <div className="text-2xl font-bold">€1,275.00</div>
              <p className="text-xs text-muted-foreground">From package sales</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Total Commissions</span>
              </div>
              <div className="text-2xl font-bold">€255.00</div>
              <p className="text-xs text-muted-foreground">Owed to trainers</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Invoices Sent</span>
              </div>
              <div className="text-2xl font-bold">11</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help & Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Automatic Invoicing:</strong> When enabled, invoices are automatically generated 
              when clients purchase packages. The invoice will be sent to your connected accounting system.
            </p>
            <p>
              <strong>Trainer Commissions:</strong> Set default commission rates and track earnings 
              for each trainer based on their package sales.
            </p>
            <p>
              <strong>Integration:</strong> Connect with popular accounting software to streamline 
              your financial management and ensure compliance with local tax requirements.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}