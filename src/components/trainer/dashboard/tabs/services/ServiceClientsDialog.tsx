import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceClient } from "./types";
import { Phone, Mail, Calendar, Package } from "lucide-react";

interface ServiceClientsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  clients: ServiceClient[];
}

export function ServiceClientsDialog({ 
  open, 
  onOpenChange, 
  serviceName, 
  clients 
}: ServiceClientsDialogProps) {
  const getStatusColor = (status: ServiceClient['status']) => {
    switch (status) {
      case 'active': return 'default';
      case 'expired': return 'destructive';
      case 'paused': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Active Clients - {serviceName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {clients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No active clients for this service
            </div>
          ) : (
            clients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{client.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Mail className="h-3 w-3" />
                      {client.email}
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                    )}
                  </div>
                  <Badge variant={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    <span className="font-medium">{client.packageName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Started: {client.startDate.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    View Package
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}