
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Video, User } from "lucide-react";

interface SessionsData {
  individual: { count: number; pricePerSession: number; };
  group: { count: number; pricePerSession: number; };
  online: { count: number; pricePerSession: number; };
}

interface PackageData {
  sessions: SessionsData;
  [key: string]: any;
}

interface SessionsStepProps {
  data: PackageData;
  onChange: (updates: Partial<PackageData>) => void;
}

export function SessionsStep({ data, onChange }: SessionsStepProps) {
  const updateSessions = (type: keyof SessionsData, field: 'count' | 'pricePerSession', value: number) => {
    const newSessions = {
      ...data.sessions,
      [type]: {
        ...data.sessions[type],
        [field]: value
      }
    };
    onChange({ sessions: newSessions });
  };

  const sessionTypes = [
    {
      key: 'individual' as const,
      title: 'Sessioni Individuali',
      icon: User,
      description: 'Allenamento 1-on-1 personalizzato'
    },
    {
      key: 'group' as const,
      title: 'Sessioni di Gruppo',
      icon: Users,
      description: 'Allenamento in piccoli gruppi (2-4 persone)'
    },
    {
      key: 'online' as const,
      title: 'Sessioni Online',
      icon: Video,
      description: 'Allenamento tramite videochiamata'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Configura le Sessioni</h3>
        <p className="text-sm text-muted-foreground">
          Seleziona il numero di sessioni e il prezzo per ogni tipologia
        </p>
      </div>

      {sessionTypes.map(({ key, title, icon: Icon, description }) => (
        <Card key={key}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Icon className="h-4 w-4" />
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${key}-count`}>Numero di Sessioni</Label>
              <Input
                id={`${key}-count`}
                type="number"
                min="0"
                value={data.sessions[key].count}
                onChange={(e) => updateSessions(key, 'count', parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`${key}-price`}>Prezzo per Sessione (€)</Label>
              <Input
                id={`${key}-price`}
                type="number"
                min="0"
                step="5"
                value={data.sessions[key].pricePerSession}
                onChange={(e) => updateSessions(key, 'pricePerSession', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> La durata del package sarà calcolata automaticamente basandosi sul numero di sessioni 
          (assumendo 2 sessioni a settimana) e sulla durata dei programmi selezionati.
        </p>
      </div>
    </div>
  );
}
