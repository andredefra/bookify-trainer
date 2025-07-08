import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Euro, User, Package as PackageIcon } from "lucide-react";
import { ClientPackageAssignment } from "@/hooks/useClientPackages";

interface PackageDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageAssignment: ClientPackageAssignment | null;
}

export function PackageDetailsDialog({ open, onOpenChange, packageAssignment }: PackageDetailsDialogProps) {
  if (!packageAssignment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case 'sessions_only': return 'bg-blue-100 text-blue-800';
      case 'program_only': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progressPercentage = packageAssignment.sessions_total > 0 
    ? (packageAssignment.sessions_used / packageAssignment.sessions_total) * 100 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PackageIcon className="h-5 w-5" />
            Package Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Package Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{packageAssignment.package.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={getPackageTypeColor(packageAssignment.package.package_type)}>
                      {packageAssignment.package.package_type.replace('_', ' ')}
                    </Badge>
                    <Badge className={getStatusColor(packageAssignment.status)}>
                      {packageAssignment.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">€{packageAssignment.total_paid}</div>
                  <div className="text-sm text-muted-foreground">Total Paid</div>
                </div>
              </div>

              {packageAssignment.package.description && (
                <p className="text-muted-foreground mb-4">
                  {packageAssignment.package.description}
                </p>
              )}

              {/* Progress Bar for Sessions */}
              {packageAssignment.sessions_total > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Session Progress</span>
                    <span>{packageAssignment.sessions_used}/{packageAssignment.sessions_total} sessions used</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="text-right text-sm text-muted-foreground">
                    {Math.round(progressPercentage)}% completed
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Package Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium">Purchase Date</div>
                    <div className="text-sm text-muted-foreground">
                      {packageAssignment.purchase_date 
                        ? new Date(packageAssignment.purchase_date).toLocaleDateString()
                        : 'N/A'
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="font-medium">Expiry Date</div>
                    <div className="text-sm text-muted-foreground">
                      {packageAssignment.expiry_date 
                        ? new Date(packageAssignment.expiry_date).toLocaleDateString()
                        : 'N/A'
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Trainer</div>
                    <div className="text-sm text-muted-foreground">
                      {packageAssignment.trainer_name || 'Unknown'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Euro className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="font-medium">Package Price</div>
                    <div className="text-sm text-muted-foreground">
                      €{packageAssignment.package.price}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Package Sessions Details */}
          {packageAssignment.sessions_total > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Session Summary</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {packageAssignment.sessions_total}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Sessions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {packageAssignment.sessions_used}
                    </div>
                    <div className="text-sm text-muted-foreground">Sessions Used</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {packageAssignment.sessions_total - packageAssignment.sessions_used}
                    </div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {packageAssignment.status === 'active' && (
              <Button>
                Manage Package
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}