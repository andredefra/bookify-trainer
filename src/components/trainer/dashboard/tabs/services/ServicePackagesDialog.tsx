import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkedPackage } from "./types";
import { Package, Users, Euro } from "lucide-react";

interface ServicePackagesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  packages: LinkedPackage[];
}

export function ServicePackagesDialog({ 
  open, 
  onOpenChange, 
  serviceName, 
  packages 
}: ServicePackagesDialogProps) {
  const getPackageTypeColor = (type: LinkedPackage['type']) => {
    switch (type) {
      case 'sessions_only': return 'default';
      case 'program_only': return 'secondary';
      case 'hybrid': return 'destructive';
      case 'service': return 'outline';
      default: return 'outline';
    }
  };

  const getPackageTypeLabel = (type: LinkedPackage['type']) => {
    switch (type) {
      case 'sessions_only': return 'Solo Sessioni';
      case 'program_only': return 'Solo Programmi';
      case 'hybrid': return 'Ibrido';
      case 'service': return 'Servizio';
      default: return type;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Linked Packages - {serviceName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {packages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No packages linked to this service
            </div>
          ) : (
            packages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <Badge variant={getPackageTypeColor(pkg.type)} className="mt-1">
                        {getPackageTypeLabel(pkg.type)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                      <Euro className="h-4 w-4" />
                      {pkg.price}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{pkg.clientsCount} clienti attivi</span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    <Package className="h-3 w-3 mr-1" />
                    View Package
                  </Button>
                  <Button size="sm" variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    View Clients
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