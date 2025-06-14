
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { InvoicingProvider, Country } from "./CountriesAndProviders";

interface AvailableProvidersListProps {
  providers: InvoicingProvider[];
  connectedProvider?: {
    provider: string;
    companyVat: string;
    connectedAt: string;
  } | null;
  selectedCountry?: Country;
}

export function AvailableProvidersList({ providers, connectedProvider, selectedCountry }: AvailableProvidersListProps) {
  const handleConnect = (provider: InvoicingProvider) => {
    toast.success(`Connecting to ${provider.name}...`);
    // Here you would implement the actual connection logic
    window.open(provider.website, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {selectedCountry && <span>{selectedCountry.flag}</span>}
          Available Providers
          {selectedCountry && <span className="text-sm font-normal text-muted-foreground">in {selectedCountry.name}</span>}
        </CardTitle>
        <CardDescription>
          Invoicing systems supported in your country
        </CardDescription>
      </CardHeader>
      <CardContent>
        {providers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No invoicing providers available for the selected country.</p>
            <p className="text-sm text-muted-foreground mt-2">Try selecting a different country or contact support.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {providers.map((provider) => (
              <div key={provider.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{provider.logo}</span>
                    <div className="flex-1">
                      <h4 className="font-medium">{provider.name}</h4>
                      <p className="text-sm text-muted-foreground">{provider.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{provider.pricing}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {connectedProvider?.provider === provider.id ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Connected
                      </Badge>
                    ) : (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleConnect(provider)}
                      >
                        Connect
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.open(provider.website, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {provider.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {provider.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {provider.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{provider.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
