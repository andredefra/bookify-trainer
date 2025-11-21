import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Package, CreditCard, Users, Clock, Edit, UserPlus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CreatePackageDialog } from "./packages/CreatePackageDialog";
import { EditPackageDialog } from "./packages/EditPackageDialog";
import { AssignPackageDialog } from "./packages/AssignPackageDialog";
import { toast } from "sonner";

export function PackagesTab() {
  const [activeTab, setActiveTab] = useState("templates");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

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

  const activePackages = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      packageTitle: "Personal Training Package",
      sessionsUsed: 6,
      totalSessions: 10,
      paymentStatus: "paid",
      expiryDate: "2024-08-15",
      totalPaid: 500
    },
    {
      id: 2,
      clientName: "Mike Peterson",
      packageTitle: "Complete Transformation",
      sessionsUsed: 3,
      totalSessions: 8,
      paymentStatus: "pending",
      expiryDate: "2024-09-20",
      totalPaid: 375,
      remainingPayment: 375
    }
  ];

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
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="active">Active Packages</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {packageTemplates.map((pkg) => (
                  <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <Package className="h-5 w-5 text-muted-foreground mt-1" />
                        <Badge className={getPackageTypeColor(pkg.type)}>
                          {pkg.type.replace('_', ' ')}
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
              <div className="space-y-4">
                {activePackages.map((pkg) => (
                  <Card key={pkg.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{pkg.clientName}</h3>
                            <p className="text-sm text-muted-foreground">{pkg.packageTitle}</p>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Sessions: {pkg.sessionsUsed}/{pkg.totalSessions}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CreditCard className="h-4 w-4" />
                              <span>Paid: €{pkg.totalPaid}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-3">
                          <Badge className={getPaymentStatusColor(pkg.paymentStatus)}>
                            {pkg.paymentStatus}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            <p>Expires: {pkg.expiryDate}</p>
                            {pkg.remainingPayment && (
                              <p className="text-red-600 font-medium">
                                Remaining: €{pkg.remainingPayment}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all" 
                            style={{ width: `${(pkg.sessionsUsed / pkg.totalSessions) * 100}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
    </>
  );
}
