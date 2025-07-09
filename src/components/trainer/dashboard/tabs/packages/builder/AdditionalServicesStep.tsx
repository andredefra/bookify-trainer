
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useServices } from "../../services/hooks/useServices";

interface AdditionalService {
  id: string;
  name: string;
  price: number;
}

interface PackageData {
  additionalServices: AdditionalService[];
  [key: string]: any;
}

interface AdditionalServicesStepProps {
  data: PackageData;
  onChange: (updates: Partial<PackageData>) => void;
}

export function AdditionalServicesStep({ data, onChange }: AdditionalServicesStepProps) {
  const { getActiveServices } = useServices();
  const availableServices = getActiveServices();

  const toggleService = (serviceData: typeof availableServices[0]) => {
    const service: AdditionalService = {
      id: serviceData.id,
      name: serviceData.name,
      price: serviceData.price
    };
    
    const isSelected = data.additionalServices.some(s => s.id === service.id);
    
    if (isSelected) {
      const newServices = data.additionalServices.filter(s => s.id !== service.id);
      onChange({ additionalServices: newServices });
    } else {
      const newServices = [...data.additionalServices, service];
      onChange({ additionalServices: newServices });
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Additional Services</h3>
        <p className="text-sm text-muted-foreground">
          Add extra services to increase the value of your package
        </p>
      </div>

      {data.additionalServices.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Selected Services:</h4>
          <div className="flex flex-wrap gap-2">
            {data.additionalServices.map(service => (
              <Badge key={service.id} variant="secondary" className="bg-blue-100 text-blue-800">
                {service.name} (€{service.price})
              </Badge>
            ))}
          </div>
        </div>
      )}

      {availableServices.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No services available. Go to the "Services" section to create some.</p>
        </div>
      )}

      {availableServices.length > 0 && (
        <div className="grid gap-4">
          {availableServices.map((service) => {
            const isSelected = data.additionalServices.some(s => s.id === service.id);
            const Icon = service.icon;
            
            return (
              <Card 
                key={service.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => toggleService(service)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => {}} // Handled by card click
                    />
                    <Icon className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <CardTitle className="text-base">{service.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-primary">€{service.price}</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}

      {data.additionalServices.length === 0 && availableServices.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No additional services selected. Services are optional.</p>
        </div>
      )}
    </div>
  );
}
