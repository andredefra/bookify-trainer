
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Link, Globe } from "lucide-react";
import { countries, getProvidersByCountry, getCountryById } from "./invoicing/CountriesAndProviders";
import { ConnectedProviderCard } from "./invoicing/ConnectedProviderCard";
import { ProviderSetupForm } from "./invoicing/ProviderSetupForm";
import { AvailableProvidersList } from "./invoicing/AvailableProvidersList";
import { InvoicingInfoCard } from "./invoicing/InvoicingInfoCard";

export function InvoicingSection() {
  const [selectedCountry, setSelectedCountry] = useState<string>("it"); // Default to Italy
  
  const handleDisconnect = () => {
    localStorage.removeItem('invoicing-provider');
    toast.success("Disconnected from invoicing provider");
  };

  const connectedProvider = localStorage.getItem('invoicing-provider') 
    ? JSON.parse(localStorage.getItem('invoicing-provider')!) 
    : null;
    
  const availableProviders = getProvidersByCountry(selectedCountry);
  const selectedCountryData = getCountryById(selectedCountry);

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
            {selectedCountryData && (
              <p className="text-sm text-muted-foreground">
                Showing invoicing providers available in {selectedCountryData.flag} {selectedCountryData.name}
              </p>
            )}
          </div>

          {connectedProvider ? (
            <ConnectedProviderCard 
              connectedProvider={connectedProvider}
              providers={availableProviders}
              onDisconnect={handleDisconnect}
            />
          ) : (
            <ProviderSetupForm providers={availableProviders} />
          )}
        </CardContent>
      </Card>

      <AvailableProvidersList 
        providers={availableProviders}
        connectedProvider={connectedProvider}
        selectedCountry={selectedCountryData}
      />

      <InvoicingInfoCard />
    </div>
  );
}
