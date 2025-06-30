
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, User, Plus } from "lucide-react";
import { ClientPackage } from "@/hooks/useClientPackages";
import { PackagePaymentDialog } from "./PackagePaymentDialog";
import { CustomPackageRequestDialog } from "./CustomPackageRequestDialog";

interface BrowsePackagesDialogProps {
  packages: ClientPackage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Trainer name mapping function
const getTrainerName = (trainerId: string): string => {
  const trainerNames: { [key: string]: string } = {
    '00000000-0000-0000-0000-000000000001': 'John Doe',
    '11111111-1111-1111-1111-111111111111': 'Sarah Johnson',
    '22222222-2222-2222-2222-222222222222': 'Alex Thompson'
  };
  
  return trainerNames[trainerId] || 'Unknown Trainer';
};

export function BrowsePackagesDialog({ packages, open, onOpenChange }: BrowsePackagesDialogProps) {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCustomRequestDialog, setShowCustomRequestDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ClientPackage | null>(null);
  const [selectedTrainerName, setSelectedTrainerName] = useState('');

  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case 'sessions_only': return 'bg-blue-100 text-blue-800';
      case 'program_only': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePurchasePackage = (pkg: ClientPackage) => {
    setSelectedPackage(pkg);
    setSelectedTrainerName(getTrainerName(pkg.trainer_id));
    setShowPaymentDialog(true);
  };

  const handlePaymentComplete = () => {
    console.log('Payment completed for package:', selectedPackage?.title);
    // Here you could update the package status, refresh data, etc.
  };

  const handleCustomRequestSubmitted = () => {
    console.log('Custom package request submitted');
    // Here you could refresh available packages or show confirmation
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Available Training Packages
              </DialogTitle>
              <Button
                onClick={() => setShowCustomRequestDialog(true)}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                Request Custom Package
              </Button>
            </div>
          </DialogHeader>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>by {getTrainerName(pkg.trainer_id)}</span>
                  </div>
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
                    <Button 
                      className="flex-1"
                      onClick={() => handlePurchasePackage(pkg)}
                    >
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
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Packages Available</h3>
              <p className="text-muted-foreground mb-4">
                Check back later for new training packages from your trainers.
              </p>
              <Button
                onClick={() => setShowCustomRequestDialog(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Request Custom Package
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <PackagePaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        packageData={selectedPackage}
        trainerName={selectedTrainerName}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Custom Package Request Dialog */}
      <CustomPackageRequestDialog
        open={showCustomRequestDialog}
        onOpenChange={setShowCustomRequestDialog}
        onRequestSubmitted={handleCustomRequestSubmitted}
      />
    </>
  );
}
