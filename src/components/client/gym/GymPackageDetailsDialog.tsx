import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, Package, Building2 } from "lucide-react";
import { GymPackageAssignment, calculatePackageRemaining } from "@/hooks/useGymConnection";
import { format } from "date-fns";

interface GymPackageDetailsDialogProps {
  package: GymPackageAssignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GymPackageDetailsDialog({ package: pkg, open, onOpenChange }: GymPackageDetailsDialogProps) {
  if (!pkg) return null;

  const packageInfo = calculatePackageRemaining(pkg);
  const isSessionBased = pkg.package_type === 'sessions';
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'suspended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPackageTypeLabel = (type: string) => {
    switch (type) {
      case 'monthly': return 'Monthly Membership';
      case 'annual': return 'Annual Membership';
      case 'weekly': return 'Weekly Pass';
      case 'sessions': return 'Session Package';
      default: return 'Package';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            Package Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{pkg.title}</h3>
              <Badge className={getStatusColor(pkg.status)}>
                {pkg.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{pkg.description}</p>
            <Badge variant="outline">{getPackageTypeLabel(pkg.package_type)}</Badge>
          </div>

          {/* Progress Section */}
          {isSessionBased ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sessions Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {pkg.sessions_used}/{pkg.sessions_total} used
                    </span>
                  </div>
                  <Progress value={packageInfo.progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {packageInfo.sessionsRemaining} sessions remaining
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Membership Duration</span>
                    <span className="text-sm text-muted-foreground">
                      {packageInfo.displayText}
                    </span>
                  </div>
                  <Progress value={100 - packageInfo.progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {packageInfo.daysLeft} days until expiry
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Package Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="font-medium">{format(new Date(pkg.start_date), 'dd MMM yyyy')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Expiry Date</p>
                    <p className="font-medium">
                      {pkg.end_date ? format(new Date(pkg.end_date), 'dd MMM yyyy') : 'No expiry'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Paid</p>
                    <p className="font-medium">€{pkg.price.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Payment Status</p>
                    <p className="font-medium capitalize">{pkg.payment_status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          {isSessionBased && pkg.duration_days && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> This package is valid for {pkg.duration_days} days from the start date.
                  Sessions must be used before the expiry date.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
