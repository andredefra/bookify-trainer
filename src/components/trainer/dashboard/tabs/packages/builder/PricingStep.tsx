
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Euro, Percent, Calculator } from "lucide-react";

interface PackageData {
  basePrice: number;
  discount: number;
  finalPrice: number;
  [key: string]: any;
}

interface PricingStepProps {
  data: PackageData;
  onChange: (updates: Partial<PackageData>) => void;
}

export function PricingStep({ data, onChange }: PricingStepProps) {
  const handleDiscountChange = (value: number[]) => {
    const discount = value[0];
    onChange({ discount });
  };

  const handleDiscountInputChange = (value: string) => {
    const discount = Math.min(Math.max(parseFloat(value) || 0, 0), 50);
    onChange({ discount });
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Prezzo e Sconto</h3>
        <p className="text-sm text-muted-foreground">
          Rivedi il prezzo calcolato e applica uno sconto se necessario
        </p>
      </div>

      {/* Price Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="h-4 w-4" />
            Riepilogo Prezzo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sessioni di allenamento:</span>
              <span>€{(
                (data.sessions?.individual?.count || 0) * (data.sessions?.individual?.pricePerSession || 0) +
                (data.sessions?.group?.count || 0) * (data.sessions?.group?.pricePerSession || 0) +
                (data.sessions?.online?.count || 0) * (data.sessions?.online?.pricePerSession || 0)
              ).toFixed(2)}</span>
            </div>
            
            {data.selectedPrograms?.length > 0 && (
              <div className="flex justify-between text-sm">
                <span>Programmi di allenamento:</span>
                <span>€{data.selectedPrograms.reduce((sum: number, program: any) => sum + program.price, 0).toFixed(2)}</span>
              </div>
            )}
            
            {data.additionalServices?.length > 0 && (
              <div className="flex justify-between text-sm">
                <span>Servizi aggiuntivi:</span>
                <span>€{data.additionalServices.reduce((sum: number, service: any) => sum + service.price, 0).toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-medium">
            <span>Prezzo base:</span>
            <span>€{data.basePrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Discount Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Percent className="h-4 w-4" />
            Sconto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="discount">Percentuale di sconto (0-50%)</Label>
            <div className="mt-2 space-y-4">
              <Slider
                value={[data.discount]}
                onValueChange={handleDiscountChange}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex items-center gap-2">
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="50"
                  value={data.discount}
                  onChange={(e) => handleDiscountInputChange(e.target.value)}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </div>
          
          {data.discount > 0 && (
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Sconto applicato:</span>
                <span className="text-green-600">-€{(data.basePrice * data.discount / 100).toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Price */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-primary">
            <Euro className="h-5 w-5" />
            Prezzo Finale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">€{data.finalPrice.toFixed(2)}</div>
            {data.calculatedDuration > 0 && (
              <div className="text-sm text-muted-foreground mt-1">
                Durata: {data.calculatedDuration} settimane
                <br />
                €{(data.finalPrice / data.calculatedDuration).toFixed(2)} per settimana
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {data.finalPrice === 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            <strong>Attenzione:</strong> Il prezzo risulta €0. Assicurati di aver selezionato almeno una sessione o un programma.
          </p>
        </div>
      )}
    </div>
  );
}
