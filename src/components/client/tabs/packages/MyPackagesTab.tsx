
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Package, Calendar, Clock, CreditCard, AlertCircle, Plus, Eye, User, FileText } from "lucide-react";
import { useClientPackages } from "@/hooks/useClientPackages";
import { BrowsePackagesDialog } from "./BrowsePackagesDialog";
import { ClientPackageManagementDialog } from "./ClientPackageManagementDialog";
import { useState } from "react";

export function MyPackagesTab() {
  const { packages, availablePackages, assignedPackages, loading, error, refetch } = useClientPackages();
  const [showBrowsePackages, setShowBrowsePackages] = useState(false);
  const [showManageDialog, setShowManageDialog] = useState(false);
  const [managePackage, setManagePackage] = useState(null);
  const [selectedHistoryPkg, setSelectedHistoryPkg] = useState<any>(null);

  const handlePaymentComplete = () => {
    refetch(); // Refresh package list after purchase
    setShowBrowsePackages(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysToExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysToExpiry < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
    if (daysToExpiry <= 7) return { status: 'expiring', color: 'text-orange-600', text: `Expires in ${daysToExpiry} days` };
    return { status: 'active', color: 'text-green-600', text: `Expires: ${expiry.toLocaleDateString()}` };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Packages</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const activePackages = packages.filter(pkg => pkg.status === 'active');
  const completedPackages = packages.filter(pkg => ['completed', 'expired', 'cancelled'].includes(pkg.status));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Packages</h2>
          <p className="text-muted-foreground">Manage your training packages and sessions</p>
        </div>
        <Button onClick={() => setShowBrowsePackages(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Browse Packages
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Packages ({activePackages.length})</TabsTrigger>
          <TabsTrigger value="history">History ({completedPackages.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activePackages.length > 0 ? (
            <div className="grid gap-4">
              {activePackages.map((pkg) => {
                const progress = (pkg.sessions_used / pkg.sessions_total) * 100;
                const expiryStatus = getExpiryStatus(pkg.expiry_date);
                
                return (
                  <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-primary" />
                          <div>
                            <CardTitle className="text-lg">{pkg.package.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">with {pkg.trainer_name}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="outline" className={getStatusColor(pkg.status)}>
                            {pkg.status}
                          </Badge>
                          <span className={`text-sm ${expiryStatus.color}`}>
                            {expiryStatus.text}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {pkg.package.package_type === 'sessions_only' || pkg.package.package_type === 'hybrid' ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Sessions Used</span>
                            <span>{pkg.sessions_used}/{pkg.sessions_total}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Program-only package
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Purchased: {new Date(pkg.purchase_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span>Paid: €{pkg.total_paid}</span>
                        </div>
                      </div>

                      {pkg.package.description && (
                        <p className="text-sm text-muted-foreground">
                          {pkg.package.description}
                        </p>
                      )}

                      <div className="flex gap-2 pt-2 flex-wrap">
                        <Button 
                          size="sm"
                          onClick={() => {
                            setManagePackage(pkg);
                            setShowManageDialog(true);
                          }}
                        >
                          <Package className="w-4 h-4 mr-1" />
                          Manage Package
                        </Button>
                        {pkg.sessions_used === pkg.sessions_total && (
                          <Button size="sm" variant="outline">
                            Renew Package
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Active Packages</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any active training packages yet.
              </p>
              <Button onClick={() => setShowBrowsePackages(true)}>
                Browse Available Packages
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {completedPackages.length > 0 ? (
            <div className="grid gap-4">
              {completedPackages.map((pkg) => (
                <Card key={pkg.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{pkg.package.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">with {pkg.trainer_name}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(pkg.status)}>
                        {pkg.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Sessions: {pkg.sessions_used}/{pkg.sessions_total}</div>
                      <div>Total: €{pkg.total_paid}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Package History</h3>
              <p className="text-muted-foreground">
                Your completed packages will appear here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <BrowsePackagesDialog
        open={showBrowsePackages}
        onOpenChange={setShowBrowsePackages}
        packages={availablePackages || []}
        assignedPackages={assignedPackages || []}
        onPaymentComplete={handlePaymentComplete}
      />

      <ClientPackageManagementDialog
        open={showManageDialog}
        onOpenChange={setShowManageDialog}
        packageData={managePackage}
      />
    </div>
  );
}
