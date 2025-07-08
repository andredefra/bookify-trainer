import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Package, Calendar, Clock, Euro, TrendingUp } from "lucide-react";
import { useClientPackages } from "@/hooks/useClientPackages";
import { PackageDetailsDialog } from "../dialogs/PackageDetailsDialog";
import { useState } from "react";

interface PackagesTabProps {
  clientId: number;
  searchQuery?: string;
}

export function PackagesTab({ clientId, searchQuery }: PackagesTabProps) {
  const { packages, loading, error } = useClientPackages();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPackageDetails, setShowPackageDetails] = useState(false);

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

  // Separate active and historical packages
  const activePackages = packages.filter(pkg => pkg.status === 'active');
  const historicalPackages = packages.filter(pkg => pkg.status !== 'active');
  
  // Get the latest active package (should be only one)
  const currentPackage = activePackages.length > 0 ? activePackages[0] : null;

  const filteredPackages = packages.filter(pkg => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      pkg.package.title.toLowerCase().includes(searchLower) ||
      pkg.status.toLowerCase().includes(searchLower) ||
      pkg.package.package_type.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-muted animate-pulse rounded-lg" />
        <div className="h-32 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Error loading packages: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (packages.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No packages found</h3>
            <p>This client has not purchased any packages yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Package Section */}
      {currentPackage && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Current Package</h3>
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{currentPackage.package.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getPackageTypeColor(currentPackage.package.package_type)}>
                      {currentPackage.package.package_type.replace('_', ' ')}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">€{currentPackage.total_paid}</div>
                  <div className="text-sm text-muted-foreground">Paid</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {currentPackage.package.description && (
                  <p className="text-sm text-muted-foreground">
                    {currentPackage.package.description}
                  </p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Purchased:</span>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {currentPackage.purchase_date 
                        ? new Date(currentPackage.purchase_date).toLocaleDateString()
                        : 'N/A'
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expires:</span>
                    <p className="font-medium">
                      {currentPackage.expiry_date 
                        ? new Date(currentPackage.expiry_date).toLocaleDateString()
                        : 'N/A'
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sessions:</span>
                    <p className="font-medium">
                      {currentPackage.sessions_used}/{currentPackage.sessions_total}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Trainer:</span>
                    <p className="font-medium">{currentPackage.trainer_name}</p>
                  </div>
                </div>

                {currentPackage.sessions_total > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Session Progress</span>
                      <span>{Math.round((currentPackage.sessions_used / currentPackage.sessions_total) * 100)}%</span>
                    </div>
                    <Progress value={(currentPackage.sessions_used / currentPackage.sessions_total) * 100} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedPackage(currentPackage);
                      setShowPackageDetails(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Package Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{packages.length}</div>
          <div className="text-sm text-muted-foreground">Total Packages</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{activePackages.length}</div>
          <div className="text-sm text-green-600">Active</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">
            €{packages.reduce((sum, p) => sum + p.total_paid, 0)}
          </div>
          <div className="text-sm text-blue-600">Total Spent</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">
            {packages.reduce((sum, p) => sum + p.sessions_used, 0)}
          </div>
          <div className="text-sm text-purple-600">Sessions Used</div>
        </div>
      </div>

      {/* Historical Packages */}
      {historicalPackages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Package History</h3>
          <div className="space-y-4">
            {historicalPackages.map((packageAssignment) => {
              const progressPercentage = packageAssignment.sessions_total > 0 
                ? (packageAssignment.sessions_used / packageAssignment.sessions_total) * 100 
                : 0;

              return (
                <Card key={packageAssignment.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{packageAssignment.package.title}</CardTitle>
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
                        <div className="text-lg font-bold">€{packageAssignment.total_paid}</div>
                        <div className="text-sm text-muted-foreground">Paid</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Purchased:</span>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {packageAssignment.purchase_date 
                              ? new Date(packageAssignment.purchase_date).toLocaleDateString()
                              : 'N/A'
                            }
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            {packageAssignment.status === 'expired' ? 'Expired:' : 'Completed:'}
                          </span>
                          <p className="font-medium">
                            {packageAssignment.expiry_date 
                              ? new Date(packageAssignment.expiry_date).toLocaleDateString()
                              : 'N/A'
                            }
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Sessions:</span>
                          <p className="font-medium">
                            {packageAssignment.sessions_used}/{packageAssignment.sessions_total}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Trainer:</span>
                          <p className="font-medium">{packageAssignment.trainer_name}</p>
                        </div>
                      </div>

                      {packageAssignment.sessions_total > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Session Progress</span>
                            <span>{Math.round(progressPercentage)}%</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedPackage(packageAssignment);
                            setShowPackageDetails(true);
                          }}
                        >
                          View Details
                        </Button>
                        {packageAssignment.status === 'expired' && (
                          <Button variant="outline" size="sm">
                            Renew Package
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Package Details Dialog */}
      <PackageDetailsDialog
        open={showPackageDetails}
        onOpenChange={setShowPackageDetails}
        packageAssignment={selectedPackage}
      />
    </div>
  );
}