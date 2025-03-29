
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SalesContact } from "./types";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { enUS } from "date-fns/locale";
import { Users, TrendingUp, Calendar, Euro } from "lucide-react";

interface SalesMetricsProps {
  clients: SalesContact[];
  prospects: SalesContact[];
}

export function SalesMetrics({ clients, prospects }: SalesMetricsProps) {
  const metrics = useMemo(() => {
    // Total number of clients
    const totalClients = clients.length;

    // Total value of all clients (in Euro)
    const totalValue = clients.reduce((sum, client) => sum + (client.value || 0), 0);

    // Prospective value from prospects (in Euro)
    const prospectiveValue = prospects.reduce((sum, prospect) => sum + (prospect.value || 0), 0);

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
      prospectiveValue,
      avgRetentionDays,
      longestClient,
      maxDays
    };
  }, [clients, prospects]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <Users className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Prospective Value</p>
            <h4 className="text-lg font-semibold">{metrics.prospectiveValue.toLocaleString()}€</h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <Euro className="h-4 w-4 text-green-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Value</p>
            <h4 className="text-lg font-semibold">{metrics.totalValue.toLocaleString()}€</h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-amber-100 p-2 rounded-full mr-3">
            <Calendar className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average Duration</p>
            <h4 className="text-lg font-semibold">{metrics.avgRetentionDays} days</h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-purple-100 p-2 rounded-full mr-3">
            <TrendingUp className="h-4 w-4 text-purple-700" />
          </div>
          <div className="w-full">
            <p className="text-xs text-muted-foreground">Longest Client</p>
            {metrics.longestClient ? (
              <div>
                <h4 className="text-xs font-medium truncate">{metrics.longestClient.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(
                    new Date(metrics.longestClient.clientSince!), 
                    { locale: enUS }
                  )}
                </p>
              </div>
            ) : (
              <h4 className="text-xs font-medium">-</h4>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
