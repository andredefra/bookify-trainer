
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, Package, User } from "lucide-react";
import { ClientPackageAssignment } from "@/hooks/useClientPackages";

interface PackageDetailsDialogProps {
  package: ClientPackageAssignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PackageDetailsDialog({ package: pkg, open, onOpenChange }: PackageDetailsDialogProps) {
  if (!pkg) return null;

  const progress = (pkg.sessions_used / pkg.sessions_total) * 100;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Package Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{pkg.package.title}</h3>
              <p className="text-muted-foreground">{pkg.package.description}</p>
            </div>
            <Badge className={getStatusColor(pkg.status)}>
              {pkg.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Trainer</span>
                </div>
                <p className="text-lg">{pkg.trainer_name}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Total Paid</span>
                </div>
                <p className="text-lg font-semibold">€{pkg.total_paid}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Purchase Date</span>
                </div>
                <p>{new Date(pkg.purchase_date).toLocaleDateString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Expiry Date</span>
                </div>
                <p>{new Date(pkg.expiry_date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </div>

          {(pkg.package.package_type === 'sessions_only' || pkg.package.package_type === 'hybrid') && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Session Progress</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sessions Used</span>
                    <span>{pkg.sessions_used} / {pkg.sessions_total}</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    {pkg.sessions_total - pkg.sessions_used} sessions remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <h4 className="font-medium">Package Type</h4>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {pkg.package.package_type.replace('_', ' ')}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {pkg.package.package_type === 'sessions_only' && 'Sessions only'}
                {pkg.package.package_type === 'program_only' && 'Training program only'}
                {pkg.package.package_type === 'hybrid' && 'Sessions + Training program'}
                {pkg.package.package_type === 'service' && 'Service package'}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
