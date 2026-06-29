import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin } from "lucide-react";
import { toast } from "sonner";

export interface BasicGymConnection {
  gymId: string;
  gymName: string;
  gymAddress: string;
  connectedAt: string;
}

const DEMO_GYMS: BasicGymConnection[] = [
  { gymId: "fitlife", gymName: "FitLife Gym", gymAddress: "Via Roma 10, Milano", connectedAt: "" },
  { gymId: "powerhouse", gymName: "PowerHouse Studio", gymAddress: "Corso Italia 45, Milano", connectedAt: "" },
  { gymId: "urbanfit", gymName: "Urban Fit Club", gymAddress: "Viale Monza 120, Milano", connectedAt: "" },
];

interface ConnectGymCardProps {
  onConnected: (conn: BasicGymConnection) => void;
}

export function ConnectGymCard({ onConnected }: ConnectGymCardProps) {
  const [selectedId, setSelectedId] = useState<string>("");

  const handleConnect = () => {
    const gym = DEMO_GYMS.find(g => g.gymId === selectedId);
    if (!gym) {
      toast.error("Seleziona una palestra");
      return;
    }
    const conn = { ...gym, connectedAt: new Date().toISOString() };
    onConnected(conn);
    toast.success(`Connesso a ${gym.gymName}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Connetti la tua palestra
        </CardTitle>
        <CardDescription>
          Seleziona la palestra a cui sei iscritto per accedere a contenuti, allenatori e gestire il tuo piano.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2">
          {DEMO_GYMS.map(g => (
            <button
              key={g.gymId}
              onClick={() => setSelectedId(g.gymId)}
              className={`text-left border rounded-lg p-3 hover:bg-muted/40 transition ${selectedId === g.gymId ? 'border-primary bg-primary/5' : 'border-border'}`}
            >
              <div className="font-medium">{g.gymName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" /> {g.gymAddress}
              </div>
            </button>
          ))}
        </div>
        <Button className="w-full" onClick={handleConnect} disabled={!selectedId}>
          Connetti
        </Button>
      </CardContent>
    </Card>
  );
}
