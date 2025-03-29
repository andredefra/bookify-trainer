
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SalesContact } from "../SalesTab";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { Users, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface SalesMetricsProps {
  clients: SalesContact[];
}

export function SalesMetrics({ clients }: SalesMetricsProps) {
  const metrics = useMemo(() => {
    // Total number of clients
    const totalClients = clients.length;

    // Total value of all clients
    const totalValue = clients.reduce((sum, client) => sum + (client.value || 0), 0);

    // Average client retention time in days
    let avgRetentionDays = 0;
    if (totalClients > 0) {
      const totalDays = clients.reduce((sum, client) => {
        if (client.clientSince) {
          return sum + differenceInDays(new Date(), new Date(client.clientSince));
        }
        return sum;
      }, 0);
      avgRetentionDays = Math.round(totalDays / totalClients);
    }

    // Longest client relationship
    let longestClient = null;
    let maxDays = 0;
    
    clients.forEach(client => {
      if (client.clientSince) {
        const days = differenceInDays(new Date(), new Date(client.clientSince));
        if (days > maxDays) {
          maxDays = days;
          longestClient = client;
        }
      }
    });

    return {
      totalClients,
      totalValue,
      avgRetentionDays,
      longestClient,
      maxDays
    };
  }, [clients]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Users className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Totale Clienti</p>
            <h4 className="text-2xl font-semibold">{metrics.totalClients}</h4>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <DollarSign className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valore Totale</p>
            <h4 className="text-2xl font-semibold">{metrics.totalValue.toLocaleString()}€</h4>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <Calendar className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Durata Media</p>
            <h4 className="text-2xl font-semibold">{metrics.avgRetentionDays} giorni</h4>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <TrendingUp className="h-5 w-5 text-purple-700" />
          </div>
          <div className="w-full">
            <p className="text-sm text-muted-foreground">Cliente più Longevo</p>
            {metrics.longestClient ? (
              <div>
                <h4 className="text-sm font-medium truncate">{metrics.longestClient.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(
                    new Date(metrics.longestClient.clientSince!), 
                    { locale: it }
                  )}
                </p>
              </div>
            ) : (
              <h4 className="text-sm font-medium">-</h4>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
