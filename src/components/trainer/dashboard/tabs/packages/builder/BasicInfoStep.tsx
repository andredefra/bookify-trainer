
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Dumbbell, Users, Wrench } from "lucide-react";
import { PackageType } from "../PackageBuilder";

interface PackageData {
  title: string;
  description: string;
  objective: string;
  type: PackageType;
  [key: string]: any;
}

interface BasicInfoStepProps {
  data: PackageData;
  onChange: (updates: Partial<PackageData>) => void;
}

export function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  const packageTypes = [
    {
      id: 'sessions_only',
      label: 'Solo Sessioni',
      description: 'Package con solo sessioni di allenamento',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 'program_only', 
      label: 'Solo Programmi',
      description: 'Package con solo programmi di allenamento',
      icon: Dumbbell,
      color: 'text-green-600'
    },
    {
      id: 'hybrid',
      label: 'Ibrido',
      description: 'Combinazione di sessioni, programmi e servizi',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      id: 'service',
      label: 'Solo Servizi',
      description: 'Package con solo servizi aggiuntivi',
      icon: Wrench,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Titolo Package *</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="es. Complete Transformation Package"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="objective">Obiettivo</Label>
        <Input
          id="objective"
          value={data.objective}
          onChange={(e) => onChange({ objective: e.target.value })}
          placeholder="es. Perdita di peso, Aumento massa muscolare"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description">Descrizione</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Descrivi il tuo package, cosa include e i benefici per il cliente..."
          className="mt-1 min-h-[100px]"
        />
      </div>

      <div className="space-y-3">
        <Label>Tipo di Package *</Label>
        <RadioGroup
          value={data.type}
          onValueChange={(value) => onChange({ type: value as PackageType })}
          className="grid grid-cols-1 gap-3"
        >
          {packageTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={type.id} />
                <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                  <Card className="hover:bg-gray-50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-5 w-5 ${type.color}`} />
                        <div>
                          <CardTitle className="text-sm">{type.label}</CardTitle>
                          <CardDescription className="text-xs">
                            {type.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Il tipo di package determina quali sezioni saranno disponibili nella configurazione
        </p>
      </div>
    </div>
  );
}
