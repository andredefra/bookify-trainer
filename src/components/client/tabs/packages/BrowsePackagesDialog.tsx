
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
import { Package, Clock, User, Plus, Star, UserCheck } from "lucide-react";
import { ClientPackage, AssignedPackage } from "@/hooks/useClientPackages";
import { PackagePaymentDialog } from "./PackagePaymentDialog";
import { CustomPackageRequestDialog } from "./CustomPackageRequestDialog";

interface BrowsePackagesDialogProps {
  packages: ClientPackage[];
  assignedPackages: AssignedPackage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentComplete: () => void;
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

export function BrowsePackagesDialog({ 
  packages = [], 
  assignedPackages = [], 
  open, 
  onOpenChange, 
  onPaymentComplete 
}: BrowsePackagesDialogProps) {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCustomRequestDialog, setShowCustomRequestDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ClientPackage | AssignedPackage | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | undefined>(undefined);
  const [selectedTrainerName, setSelectedTrainerName] = useState('');

  // Group packages by trainer
  const packagesByTrainer = packages.reduce((acc, pkg) => {
    const trainerId = pkg.trainer_id;
    if (!acc[trainerId]) {
      acc[trainerId] = {
        trainerName: getTrainerName(trainerId),
        packages: []
      };
    }
    acc[trainerId].packages.push(pkg);
    return acc;
  }, {} as Record<string, { trainerName: string; packages: ClientPackage[] }>);

  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case 'sessions_only': return 'bg-blue-100 text-blue-800';
      case 'program_only': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePurchasePackage = (pkg: ClientPackage | AssignedPackage, assignmentId?: string) => {
    setSelectedPackage(pkg);
    setSelectedAssignmentId(assignmentId);
    setSelectedTrainerName(getTrainerName(pkg.trainer_id));
    setShowPaymentDialog(true);
  };

  const handlePaymentCompleteInternal = () => {
    onPaymentComplete();
    setShowPaymentDialog(false);
  };

  const handleCustomRequestSubmitted = () => {
    console.log('Custom package request submitted');
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
          
          {/* Assigned by Trainer Section */}
          {assignedPackages.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Assigned by Your Trainer</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your trainer has recommended these packages specifically for you
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {assignedPackages.map((pkg) => (
                  <Card key={pkg.id} className="hover:shadow-lg transition-shadow border-primary/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          {pkg.title}
                        </CardTitle>
                        <Badge className="bg-purple-100 text-purple-800">
                          <Star className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{getTrainerName(pkg.trainer_id)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>{pkg.sessions_count} sessions included</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{pkg.validity_days} days validity</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-2xl font-bold">€{pkg.price.toFixed(2)}</span>
                        <Button onClick={() => handlePurchasePackage(pkg, pkg.assignmentId)}>
                          Purchase Package
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Available Packages Section */}
          {packages.length === 0 && assignedPackages.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Packages Available</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Your trainers haven't published any packages yet. Contact them directly to discuss custom training options.
              </p>
              <Button
                onClick={() => setShowCustomRequestDialog(true)}
                className="flex items-center gap-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                Request Custom Package
              </Button>
            </div>
          ) : packages.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Available Packages</h3>
              </div>
              {Object.entries(packagesByTrainer).map(([trainerId, { trainerName, packages: trainerPackages }]) => (
                <div key={trainerId} className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">{trainerName}'s Packages</h3>
                    <Badge variant="outline" className="ml-auto">
                      {trainerPackages.length} {trainerPackages.length === 1 ? 'package' : 'packages'}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {trainerPackages.map((pkg) => (
                      <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Package className="h-5 w-5 text-muted-foreground" />
                            <Badge className={getPackageTypeColor(pkg.package_type)}>
                              {pkg.package_type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{pkg.title}</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            {pkg.description || 'No description available'}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold">
                              €{pkg.price.toFixed(2)}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {pkg.validity_days} days
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground space-y-1">
                            {pkg.package_type === 'sessions_only' && (
                              <div>• {pkg.sessions_count} training sessions</div>
                            )}
                            {pkg.package_type === 'program_only' && (
                              <div>• Complete training program</div>
                            )}
                            {pkg.package_type === 'hybrid' && (
                              <>
                                <div>• {pkg.sessions_count} training sessions</div>
                                <div>• Complete training program</div>
                              </>
                            )}
                            {pkg.package_type === 'service' && (
                              <div>• Custom service package</div>
                            )}
                            <div>• {pkg.validity_days} days to complete</div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handlePurchasePackage(pkg)}
                              className="flex-1"
                            >
                              Purchase
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {selectedPackage && (
        <PackagePaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          packageData={selectedPackage}
          assignmentId={selectedAssignmentId}
          trainerName={selectedTrainerName}
          onPaymentComplete={handlePaymentCompleteInternal}
        />
      )}

      <CustomPackageRequestDialog 
        open={showCustomRequestDialog}
        onOpenChange={setShowCustomRequestDialog}
        onRequestSubmitted={handleCustomRequestSubmitted}
      />
    </>
  );
}
