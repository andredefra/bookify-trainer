
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SalesContact } from "../SalesTab";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
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

    // Calculate potential value (e.g., assume 20% more than current)
    const prospectiveValue = Math.round(totalValue * 1.2);

    return {
      totalClients,
      totalValue,
      prospectiveValue,
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
            <p className="text-sm text-muted-foreground">Prospective Value</p>
            <h4 className="text-2xl font-semibold">${metrics.prospectiveValue.toLocaleString()}</h4>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <DollarSign className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <h4 className="text-2xl font-semibold">${metrics.totalValue.toLocaleString()}</h4>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <Calendar className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Duration</p>
            <h4 className="text-2xl font-semibold">{metrics.avgRetentionDays} days</h4>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <TrendingUp className="h-5 w-5 text-purple-700" />
          </div>
          <div className="w-full">
            <p className="text-sm text-muted-foreground">Longest Client</p>
            {metrics.longestClient ? (
              <div>
                <h4 className="text-sm font-medium truncate">{metrics.longestClient.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(
                    new Date(metrics.longestClient.clientSince!), 
                    { locale: enUS }
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
