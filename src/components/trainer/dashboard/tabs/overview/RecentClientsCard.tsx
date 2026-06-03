
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
  email?: string;
}

interface RecentClientsCardProps {
  clients: ClientItem[];
}

export function RecentClientsCard({ clients }: RecentClientsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Clients</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {clients.slice(0, 3).map((client) => (
            <div key={client.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{client.name}</div>
                <div className="text-xs text-muted-foreground">
                  Last session: {client.lastSession}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
