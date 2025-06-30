
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PackageData {
  basePrice: number;
  discount: number;
  finalPrice: number;
  calculatedDuration: number;
  sessions: {
    individual: { count: number; pricePerSession: number; };
    group: { count: number; pricePerSession: number; };
    online: { count: number; pricePerSession: number; };
  };
  selectedPrograms: Array<{ title: string; price: number; }>;
  additionalServices: Array<{ name: string; price: number; }>;
  [key: string]: any;
}

interface PricingStepProps {
  data: PackageData;
  onChange: (updates: Partial<PackageData>) => void;
}

export function PricingStep({ data, onChange }: PricingStepProps) {
  const handleDiscountChange = (value: number[]) => {
    onChange({ discount: value[0] });
  };

  const sessionsPrice = 
    (data.sessions.individual.count * data.sessions.individual.pricePerSession) +
    (data.sessions.group.count * data.sessions.group.pricePerSession) +
    (data.sessions.online.count * data.sessions.online.pricePerSession);

  const programsPrice = data.selectedPrograms.reduce((sum, program) => sum + program.price, 0);
  const servicesPrice = data.additionalServices.reduce((sum, service) => sum + service.price, 0);

  const discountAmount = data.basePrice * (data.discount / 100);
  const savings = discountAmount > 0 ? discountAmount : 0;

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Pricing e Sconto</h3>
        <p className="text-sm text-muted-foreground">
          Rivedi il prezzo totale e applica eventuali sconti
        </p>
      </div>

      {/* Price Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riepilogo Prezzi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessionsPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm">
                Sessioni ({data.sessions.individual.count + data.sessions.group.count + data.sessions.online.count} totali)
              </span>
              <span className="font-medium">€{sessionsPrice.toFixed(2)}</span>
            </div>
          )}
          
          {programsPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm">
                Programmi ({data.selectedPrograms.length})
              </span>
              <span className="font-medium">€{programsPrice.toFixed(2)}</span>
            </div>
          )}
          
          {servicesPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm">
                Servizi Aggiuntivi ({data.additionalServices.length})
              </span>
              <span className="font-medium">€{servicesPrice.toFixed(2)}</span>
            </div>
          )}

          <Separator />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Subtotale</span>
            <span className="font-medium">€{data.basePrice.toFixed(2)}</span>
          </div>

          {data.discount > 0 && (
            <div className="flex justify-between items-center text-red-600">
              <span className="text-sm">Sconto ({data.discount}%)</span>
              <span className="font-medium">-€{savings.toFixed(2)}</span>
            </div>
          )}

          <Separator />
          
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold">Prezzo Finale</span>
            <span className="font-bold text-primary">€{data.finalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Discount Slider */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Applica Sconto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Percentuale di Sconto</Label>
              <Badge variant="outline">{data.discount}%</Badge>
            </div>
            <Slider
              value={[data.discount]}
              onValueChange={handleDiscountChange}
              max={50}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          {data.discount > 0 && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Risparmio per il cliente:</strong> €{savings.toFixed(2)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Package Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base text-primary">Riepilogo Finale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Durata Calcolata:</span>
            <Badge variant="secondary">{data.calculatedDuration} settimane</Badge>
          </div>
          <div className="flex justify-between">
            <span>Prezzo Totale:</span>
            <span className="text-xl font-bold text-primary">€{data.finalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Prezzo per settimana:</span>
            <span>€{(data.finalPrice / data.calculatedDuration).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
