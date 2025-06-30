
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, FileText, Phone, Calendar, Utensils, Heart } from "lucide-react";

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

const availableServices = [
  {
    id: "whatsapp",
    name: "Supporto WhatsApp 24/7",
    price: 50,
    description: "Supporto costante via WhatsApp per domande e motivazione",
    icon: MessageCircle
  },
  {
    id: "nutrition",
    name: "Piano Nutrizionale Personalizzato",
    price: 80,
    description: "Piano alimentare su misura con ricette e lista spesa",
    icon: Utensils
  },
  {
    id: "consultation",
    name: "Consulenza Iniziale Approfondita",
    price: 60,
    description: "Sessione di 90 minuti per valutazione completa e obiettivi",
    icon: FileText
  },
  {
    id: "progress-calls",
    name: "Chiamate di Progresso Settimanali",
    price: 40,
    description: "Chiamate settimanali di 30 minuti per monitorare i progressi",
    icon: Phone
  },
  {
    id: "meal-prep",
    name: "Guida Meal Prep Personalizzata",
    price: 35,
    description: "Video tutorial e ricette per preparazione pasti settimanale",
    icon: Calendar
  },
  {
    id: "wellness",
    name: "Coaching Benessere Mentale",
    price: 70,
    description: "Supporto per gestione stress, sonno e benessere psicologico",
    icon: Heart
  }
];

export function AdditionalServicesStep({ data, onChange }: AdditionalServicesStepProps) {
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
        <h3 className="text-lg font-semibold">Servizi Aggiuntivi</h3>
        <p className="text-sm text-muted-foreground">
          Aggiungi servizi extra per aumentare il valore del tuo package
        </p>
      </div>

      {data.additionalServices.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Servizi Selezionati:</h4>
          <div className="flex flex-wrap gap-2">
            {data.additionalServices.map(service => (
              <Badge key={service.id} variant="secondary" className="bg-blue-100 text-blue-800">
                {service.name} (€{service.price})
              </Badge>
            ))}
          </div>
        </div>
      )}

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

      {data.additionalServices.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nessun servizio aggiuntivo selezionato. I servizi sono opzionali.</p>
        </div>
      )}
    </div>
  );
}
