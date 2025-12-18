import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Package, CreditCard, Users, Clock, Edit, UserPlus, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CreatePackageDialog } from "./packages/CreatePackageDialog";
import { EditPackageDialog } from "./packages/EditPackageDialog";
import { AssignPackageDialog } from "./packages/AssignPackageDialog";
import { ActivePackageManagementDialog } from "./packages/ActivePackageManagementDialog";
import { PackageSalesContent } from "./packages/PackageSalesContent";
import { toast } from "sonner";
import { useActivePackages } from "@/hooks/useActivePackages";
import { usePackageSales } from "@/hooks/usePackageSales";
import { supabase } from "@/integrations/supabase/client";

export function PackagesTab() {
  const [activeTab, setActiveTab] = useState("templates");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showManagementDialog, setShowManagementDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [trainerId, setTrainerId] = useState<string | null>(null);

  // Fetch trainer ID with demo fallback
  useEffect(() => {
    const fetchTrainerId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const effectiveTrainerId = user?.id || '00000000-0000-0000-0000-000000000001';
      setTrainerId(effectiveTrainerId);
    };
    fetchTrainerId();
  }, []);

  // Fetch active packages from database
  const { packages: activePackages, loading: packagesLoading, refetch } = useActivePackages(trainerId || undefined);

  // Fetch package sales data
  const salesData = usePackageSales(trainerId || undefined);
  const pendingCount = salesData.pendingCashPayments.length;

  // Mock data for demonstration
  const [packageTemplates, setPackageTemplates] = useState([
    {
      id: 1,
      title: "Personal Training Package",
      description: "10 one-on-one personal training sessions",
      type: "sessions_only",
      sessions: 10,
      price: 500,
      isActive: true,
      clientsAssigned: 5,
      isPaid: true,
      objective: "Strength",
      duration: 8
    },
    {
      id: 2,
      title: "Complete Transformation",
      description: "8 sessions + 12-week strength program",
      type: "hybrid",
      sessions: 8,
      programs: ["Strength Building Program"],
      price: 750,
      isActive: true,
      clientsAssigned: 3,
      isPaid: true,
      objective: "Body Transformation",
      duration: 12
    },
    {
      id: 3,
      title: "Beginner's Program",
      description: "6-week foundation program only",
      type: "program_only",
      programs: ["Beginner Fitness Program"],
      price: 200,
      isActive: true,
      clientsAssigned: 8,
      isPaid: true,
      objective: "Foundation",
      duration: 6
    },
    {
      id: 4,
      title: "Nutrition Consultation",
      description: "Complete nutrition analysis and meal planning",
      type: "service",
      price: 150,
      isActive: true,
      clientsAssigned: 12,
      isPaid: true,
      objective: "Nutrition",
      duration: 4
    }
  ]);


  const handleCreatePackage = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPackage = {
      id: Date.now(),
      ...data,
      isActive: true,
      clientsAssigned: 0,
      sessions: data.sessions?.individual?.count + data.sessions?.group?.count + data.sessions?.online?.count || 0,
      programs: data.selectedPrograms?.map((p: any) => p.title) || [],
      price: data.finalPrice,
      duration: data.calculatedDuration
    };
    
    setPackageTemplates(prev => [...prev, newPackage]);
  };

  const handleEditPackage = async (id: number, data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPackageTemplates(prev => 
      prev.map(pkg => pkg.id === id ? { ...pkg, ...data } : pkg)
    );
  };

  const handleAssignPackage = async (packageId: number, clientId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, this would create a package assignment
    console.log(`Assigning package ${packageId} to client ${clientId}`);
  };

  const handleEditClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowEditDialog(true);
  };

  const handleAssignClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowAssignDialog(true);
  };

  const handleManageClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowManagementDialog(true);
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Package Management</CardTitle>
            <CardDescription>Create and manage training packages for your clients</CardDescription>
          </div>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center self-start sm:self-auto w-full sm:w-auto"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Package
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="active">Active Packages</TabsTrigger>
              <TabsTrigger value="sales" className="relative">
                Sales
                {pendingCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {pendingCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {packageTemplates.map((pkg) => (
                  <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <Package className="h-5 w-5 text-muted-foreground mt-1" />
                        <Badge className={getPackageTypeColor(pkg.type)}>
                          {pkg.type?.replace('_', ' ') || 'Package'}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-lg leading-tight">{pkg.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Price and Sessions Info */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">€{pkg.price}</span>
                          <div className="text-right">
                            {pkg.sessions && pkg.type !== 'service' && (
                              <div className="text-sm font-medium">{pkg.sessions} sessions</div>
                            )}
                            {pkg.programs && pkg.programs.length > 0 && (
                              <div className="text-sm text-muted-foreground">
                                + {pkg.programs.length} program(s)
                              </div>
                            )}
                            {pkg.type === 'service' && (
                              <div className="text-sm text-muted-foreground">
                                Service package
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Package Details */}
                        <div className="flex flex-wrap gap-2">
                          {pkg.objective && (
                            <Badge variant="outline" className="text-xs">
                              {pkg.objective}
                            </Badge>
                          )}
                          {pkg.duration && (
                            <Badge variant="outline" className="text-xs">
                              {pkg.duration} weeks
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Clients Info */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{pkg.clientsAssigned} clients assigned</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAssignClick(pkg)}
                          className="flex items-center gap-1 flex-1"
                        >
                          <UserPlus className="h-3 w-3" />
                          Assign
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditClick(pkg)}
                          className="flex items-center gap-1 flex-1"
                        >
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {packagesLoading ? (
                <p className="text-center text-muted-foreground py-8">Loading packages...</p>
              ) : activePackages.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active packages found</p>
              ) : (
                <div className="space-y-4">
                  {activePackages.map((pkg) => {
                    const progressPercentage = (pkg.sessionsUsed / pkg.sessionsTotal) * 100;
                  
                  return (
                    <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">{pkg.clientName}</h3>
                              <Badge variant="outline" className="capitalize">
                                {pkg.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{pkg.packageTitle}</p>
                          </div>
                          <div className="text-sm text-muted-foreground sm:text-right">
                            {pkg.expiryDate && <p>Expires: {new Date(pkg.expiryDate).toLocaleDateString()}</p>}
                          </div>
                        </div>

                        {/* Session Progress */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Sessions: {pkg.sessionsUsed}/{pkg.sessionsTotal}</span>
                            <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full transition-all" 
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          
                        </div>

                        {/* Payment Info */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <CreditCard className="h-4 w-4" />
                          <span>Total Paid: €{pkg.totalPaid}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleManageClick(pkg)}
                            className="flex items-center gap-1.5"
                          >
                            <Package className="h-3.5 w-3.5" />
                            Manage Package
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditClick(pkg)}
                            className="flex items-center gap-1.5"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit Package
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <PackageSalesContent
                weeklyRevenue={salesData.weeklyRevenue}
                previousWeekRevenue={salesData.previousWeekRevenue}
                monthlyRevenue={salesData.monthlyRevenue}
                previousMonthRevenue={salesData.previousMonthRevenue}
                quarterlyRevenue={salesData.quarterlyRevenue}
                previousQuarterRevenue={salesData.previousQuarterRevenue}
                allSales={salesData.allSales}
                loading={salesData.loading}
                isProTrainer={true}
                onConfirmCashPayment={salesData.confirmCashPayment}
                onRejectCashPayment={salesData.rejectCashPayment}
                onMarkNoShow={salesData.markNoShow}
                onUpdateInvoiceStatus={salesData.updateInvoiceStatus}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreatePackageDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreatePackage}
      />

      <EditPackageDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={handleEditPackage}
        package={selectedPackage}
      />

      <AssignPackageDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        onAssign={handleAssignPackage}
        packageData={selectedPackage}
      />

      {selectedPackage && (
        <ActivePackageManagementDialog
          open={showManagementDialog}
          onOpenChange={setShowManagementDialog}
          packageAssignment={selectedPackage}
        />
      )}
    </>
  );
}
