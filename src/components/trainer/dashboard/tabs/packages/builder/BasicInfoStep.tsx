
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PackageData {
  title: string;
  description: string;
  objective: string;
  [key: string]: any;
}

interface BasicInfoStepProps {
  data: PackageData;
  onChange: (updates: Partial<PackageData>) => void;
}

export function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
