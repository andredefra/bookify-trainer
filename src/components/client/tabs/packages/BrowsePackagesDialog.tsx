
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, CreditCard } from "lucide-react";
import { ClientPackage } from "@/hooks/useClientPackages";

interface BrowsePackagesDialogProps {
  packages: ClientPackage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrowsePackagesDialog({ packages, open, onOpenChange }: BrowsePackagesDialogProps) {
  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case 'sessions_only': return 'bg-blue-100 text-blue-800';
      case 'program_only': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Available Packages
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 md:grid-cols-2">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <Badge className={getPackageTypeColor(pkg.package_type)}>
                    {pkg.package_type.replace('_', ' ')}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{pkg.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">€{pkg.price}</span>
                  <div className="text-sm text-muted-foreground text-right">
                    {pkg.sessions_count > 0 && (
                      <div>{pkg.sessions_count} sessions</div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {pkg.validity_days} days validity
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">What's included:</h5>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {pkg.package_type === 'sessions_only' && (
                      <div>• {pkg.sessions_count} personal training sessions</div>
                    )}
                    {pkg.package_type === 'program_only' && (
                      <div>• Complete training program</div>
                    )}
                    {pkg.package_type === 'hybrid' && (
                      <>
                        <div>• {pkg.sessions_count} personal training sessions</div>
                        <div>• Complete training program</div>
                      </>
                    )}
                    {pkg.package_type === 'service' && (
                      <div>• Custom service package</div>
                    )}
                    <div>• {pkg.validity_days} days to complete</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    Purchase Package
                  </Button>
                  <Button variant="outline" size="sm">
                    More Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Packages Available</h3>
            <p className="text-muted-foreground">
              Check back later for new training packages.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
