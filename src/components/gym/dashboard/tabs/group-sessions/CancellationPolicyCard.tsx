import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Euro, RefreshCcw, AlertCircle } from "lucide-react";

interface CancellationPolicyCardProps {
  scheduledDate: string;
}

export function CancellationPolicyCard({ scheduledDate }: CancellationPolicyCardProps) {
  const sessionDate = new Date(scheduledDate);
  const now = new Date();
  const hoursUntilSession = Math.floor((sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60));

  const getPolicyStatus = () => {
    if (hoursUntilSession >= 48) {
      return {
        type: "free" as const,
        title: "Cancellazione Gratuita",
        description: "Cancellazione senza costi",
        icon: RefreshCcw,
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200"
      };
    } else if (hoursUntilSession >= 24) {
      return {
        type: "partial" as const,
        title: "Cancellazione con Costo Ridotto",
        description: "50% del costo della sessione",
        icon: Euro,
        color: "text-amber-600",
        bgColor: "bg-amber-50 border-amber-200"
      };
    } else {
      return {
        type: "full" as const,
        title: "Cancellazione Tardiva",
        description: "100% del costo della sessione",
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200"
      };
    }
  };

  const policy = getPolicyStatus();
  const Icon = policy.icon;

  return (
    <Card className={`${policy.bgColor} border`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Icon className={`h-4 w-4 ${policy.color}`} />
          Policy di Cancellazione
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">{policy.title}</span>
          <Badge 
            variant={policy.type === "free" ? "default" : policy.type === "partial" ? "secondary" : "destructive"}
          >
            {policy.description}
          </Badge>
        </div>

        <div className="text-xs space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Tempo rimanente: {hoursUntilSession > 0 ? `${hoursUntilSession} ore` : 'Meno di 1 ora'}</span>
          </div>
          
          <div className="bg-white/50 rounded-md p-2 space-y-1">
            <p className="font-medium">Termini di Cancellazione:</p>
            <ul className="space-y-0.5 text-muted-foreground">
              <li>• +48h prima: cancellazione gratuita</li>
              <li>• 24-48h prima: 50% del costo</li>
              <li>• &lt;24h prima: 100% del costo</li>
              <li>• Rimborsi elaborati entro 3-5 giorni</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}