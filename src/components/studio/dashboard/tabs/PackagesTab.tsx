import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  MoreVertical, 
  Users, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Package, 
  TrendingUp,
  UserPlus,
  Filter,
  User
} from "lucide-react";
import { toast } from "sonner";

// Import Trainer components
import { StudioCreatePackageDialog } from "./packages/StudioCreatePackageDialog";
import { EditPackageDialog } from "@/components/trainer/dashboard/tabs/packages/EditPackageDialog";
import { AssignPackageDialog } from "@/components/trainer/dashboard/tabs/packages/AssignPackageDialog";
import { ActivePackageManagementDialog } from "@/components/trainer/dashboard/tabs/packages/ActivePackageManagementDialog";
import { PackageSalesContent } from "@/components/trainer/dashboard/tabs/packages/PackageSalesContent";
import { PackageType } from "@/components/trainer/dashboard/tabs/packages/PackageBuilder";

// Mock data for trainers
const mockTrainers = [
  { id: "1", name: "Marco Rossi", specialization: "Strength Training" },
  { id: "2", name: "Giulia Bianchi", specialization: "Yoga & Pilates" },
  { id: "3", name: "Alessandro Verdi", specialization: "CrossFit" },
];

// Mock packages with full trainer system data
interface PackageTemplate {
  id: number;
  title: string;
  description: string;
  type: PackageType;
  price: number;
  sessions: number;
  programs: number;
  services: number;
  isActive: boolean;
  isPublic: boolean;
  trainerId: string;
  trainerName: string;
  createdAt: string;
}

interface ActivePackage {
  id: string;
  clientId: string;
  clientName: string;
  packageId: number;
  packageTitle: string;
  trainerId: string;
  trainerName: string;
  sessionsTotal: number;
  sessionsUsed: number;
  status: string;
  purchaseDate: string;
  expiryDate?: string;
  totalPaid: number;
}

export function PackagesTab() {
  const [activeTab, setActiveTab] = useState("templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [trainerFilter, setTrainerFilter] = useState<string>("all");
  
  // Dialogs state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  
  const [selectedPackage, setSelectedPackage] = useState<PackageTemplate | null>(null);
  const [selectedActivePackage, setSelectedActivePackage] = useState<ActivePackage | null>(null);
  
  // Mock data
  const [packages, setPackages] = useState<PackageTemplate[]>([
    { 
      id: 1,
      title: "Complete Transformation", 
      description: "12-week complete body transformation with personal training and nutrition",
      type: "hybrid",
      price: 1200,
      sessions: 24,
      programs: 2,
      services: 3,
      isActive: true,
      isPublic: true,
      trainerId: "1",
      trainerName: "Marco Rossi",
      createdAt: "2024-01-15"
    },
    { 
      id: 2,
      title: "Strength Builder", 
      description: "8-week strength focused program",
      type: "sessions_only",
      price: 600,
      sessions: 16,
      programs: 0,
      services: 0,
      isActive: true,
      isPublic: true,
      trainerId: "1",
      trainerName: "Marco Rossi",
      createdAt: "2024-02-10"
    },
    { 
      id: 3,
      title: "Yoga Journey", 
      description: "Complete yoga and mindfulness program",
      type: "program_only",
      price: 350,
      sessions: 0,
      programs: 1,
      services: 2,
      isActive: true,
      isPublic: false,
      trainerId: "2",
      trainerName: "Giulia Bianchi",
      createdAt: "2024-03-05"
    },
  ]);

  const [activePackages, setActivePackages] = useState<ActivePackage[]>([
    {
      id: "ap1",
      clientId: "c1",
      clientName: "Sarah Johnson",
      packageId: 1,
      packageTitle: "Complete Transformation",
      trainerId: "1",
      trainerName: "Marco Rossi",
      sessionsTotal: 24,
      sessionsUsed: 8,
      status: "active",
      purchaseDate: "2024-11-01",
      expiryDate: "2025-02-01",
      totalPaid: 1200
    },
    {
      id: "ap2",
      clientId: "c2",
      clientName: "Mike Peterson",
      packageId: 2,
      packageTitle: "Strength Builder",
      trainerId: "1",
      trainerName: "Marco Rossi",
      sessionsTotal: 16,
      sessionsUsed: 4,
      status: "active",
      purchaseDate: "2024-12-01",
      totalPaid: 600
    },
  ]);

  // Filter packages by trainer and search
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrainer = trainerFilter === "all" || pkg.trainerId === trainerFilter;
    return matchesSearch && matchesTrainer;
  });

  const filteredActivePackages = activePackages.filter(pkg => {
    const matchesSearch = pkg.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.packageTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrainer = trainerFilter === "all" || pkg.trainerId === trainerFilter;
    return matchesSearch && matchesTrainer;
  });

  // Stats
  const stats = {
    totalTemplates: packages.length,
    activeTemplates: packages.filter(p => p.isActive).length,
    activePackages: activePackages.length,
    totalRevenue: activePackages.reduce((sum, p) => sum + p.totalPaid, 0),
  };

  const getPackageTypeBadge = (type: PackageType) => {
    const styles = {
      sessions_only: "bg-blue-100 text-blue-800",
      program_only: "bg-purple-100 text-purple-800",
      hybrid: "bg-green-100 text-green-800",
      service: "bg-orange-100 text-orange-800",
    };
    const labels = {
      sessions_only: "Sessions",
      program_only: "Program",
      hybrid: "Hybrid",
      service: "Service",
    };
    return <Badge className={styles[type]}>{labels[type]}</Badge>;
  };

  const handleCreatePackage = (data: any) => {
    const trainer = mockTrainers.find(t => t.id === data.trainerId);
    const newPackage: PackageTemplate = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      type: data.type,
      price: data.finalPrice,
      sessions: data.sessions.individual.count + data.sessions.group.count + data.sessions.online.count,
      programs: data.selectedPrograms?.length || 0,
      services: data.additionalServices?.length || 0,
      isActive: true,
      isPublic: data.isPublic || false,
      trainerId: data.trainerId,
      trainerName: trainer?.name || "Unknown",
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPackages([newPackage, ...packages]);
    setCreateDialogOpen(false);
    toast.success("Package template created successfully!");
  };

  const handleEditPackage = (id: number) => {
    const pkg = packages.find(p => p.id === id);
    if (pkg) {
      setSelectedPackage(pkg);
      setEditDialogOpen(true);
    }
  };

  const handleAssignPackage = (id: number) => {
    const pkg = packages.find(p => p.id === id);
    if (pkg) {
      setSelectedPackage(pkg);
      setAssignDialogOpen(true);
    }
  };

  const handleManageActivePackage = (pkg: ActivePackage) => {
    setSelectedActivePackage(pkg);
    setManageDialogOpen(true);
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter(p => p.id !== id));
    toast.success("Package deleted");
  };

  const handleToggleActive = (id: number) => {
    setPackages(packages.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  // Mock sales data for PackageSalesContent
  const mockSalesData = {
    weeklyRevenue: 1800,
    previousWeekRevenue: 1500,
    monthlyRevenue: 7200,
    previousMonthRevenue: 6500,
    quarterlyRevenue: 21000,
    previousQuarterRevenue: 18000,
    allSales: activePackages.map(pkg => ({
      id: pkg.id,
      clientId: pkg.clientId,
      clientName: pkg.clientName,
      clientEmail: `${pkg.clientName.toLowerCase().replace(' ', '.')}@email.com`,
      packageId: String(pkg.packageId),
      packageTitle: pkg.packageTitle,
      price: pkg.totalPaid,
      purchaseDate: pkg.purchaseDate,
      status: pkg.status as 'active' | 'completed' | 'expired',
      packageType: 'sessions_only',
      sessionsTotal: pkg.sessionsTotal,
      sessionsUsed: pkg.sessionsUsed,
      paymentMethod: 'card' as const,
      paymentStatus: 'paid' as const,
      invoiceStatus: 'none' as const,
    })),
    loading: false,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Packages</h1>
          <p className="text-muted-foreground">
            Create and manage training packages with sessions, programs and services
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Package
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats.totalTemplates}</div>
            </div>
            <p className="text-sm text-muted-foreground">Package Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.activeTemplates}</div>
            <p className="text-sm text-muted-foreground">Active Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats.activePackages}</div>
            </div>
            <p className="text-sm text-muted-foreground">Active Packages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-green-600">
                €{stats.totalRevenue.toLocaleString()}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="active">
            Active Packages
            {activePackages.length > 0 && (
              <Badge variant="secondary" className="ml-2">{activePackages.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
        </TabsList>

        {/* Filters - shared across tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search packages..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={trainerFilter} onValueChange={setTrainerFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by trainer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trainers</SelectItem>
              {mockTrainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{pkg.title}</CardTitle>
                      {!pkg.isActive && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-primary">€{pkg.price}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAssignPackage(pkg.id)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign to Client
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditPackage(pkg.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Package
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(pkg.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {pkg.isActive ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeletePackage(pkg.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Type Badge */}
                    <div className="flex items-center gap-2">
                      {getPackageTypeBadge(pkg.type)}
                      {pkg.isPublic && <Badge variant="outline">Public</Badge>}
                    </div>
                    
                    {/* Package Contents */}
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {pkg.sessions > 0 && (
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-semibold">{pkg.sessions}</div>
                          <div className="text-xs text-muted-foreground">Sessions</div>
                        </div>
                      )}
                      {pkg.programs > 0 && (
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-semibold">{pkg.programs}</div>
                          <div className="text-xs text-muted-foreground">Programs</div>
                        </div>
                      )}
                      {pkg.services > 0 && (
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-semibold">{pkg.services}</div>
                          <div className="text-xs text-muted-foreground">Services</div>
                        </div>
                      )}
                    </div>

                    {/* Trainer */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                      <User className="h-4 w-4" />
                      <span>{pkg.trainerName}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No packages found. Create your first package to get started.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Active Packages Tab */}
        <TabsContent value="active" className="mt-4">
          <div className="space-y-4">
            {filteredActivePackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{pkg.clientName}</h3>
                        <Badge variant={pkg.status === "active" ? "default" : "secondary"}>
                          {pkg.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{pkg.packageTitle}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span>
                          <strong>{pkg.sessionsUsed}</strong> / {pkg.sessionsTotal} sessions
                        </span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-green-600">€{pkg.totalPaid}</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <User className="h-3 w-3" />
                          {pkg.trainerName}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleManageActivePackage(pkg)}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(pkg.sessionsUsed / pkg.sessionsTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredActivePackages.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No active packages. Assign a package to a client to get started.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="mt-4">
          <PackageSalesContent
            weeklyRevenue={mockSalesData.weeklyRevenue}
            previousWeekRevenue={mockSalesData.previousWeekRevenue}
            monthlyRevenue={mockSalesData.monthlyRevenue}
            previousMonthRevenue={mockSalesData.previousMonthRevenue}
            quarterlyRevenue={mockSalesData.quarterlyRevenue}
            previousQuarterRevenue={mockSalesData.previousQuarterRevenue}
            allSales={mockSalesData.allSales}
            loading={mockSalesData.loading}
            onConfirmCashPayment={(id) => toast.success(`Payment ${id} confirmed`)}
            onRejectCashPayment={(id) => toast.success(`Payment ${id} rejected`)}
            onMarkNoShow={(id) => toast.success(`Marked ${id} as no-show`)}
            onUpdateInvoiceStatus={(id, status) => toast.success(`Invoice status updated`)}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <StudioCreatePackageDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreatePackage}
        trainers={mockTrainers}
      />

      {selectedPackage && (
        <AssignPackageDialog
          open={assignDialogOpen}
          onOpenChange={setAssignDialogOpen}
          onAssign={(packageId, clientId) => {
            const client = { id: clientId, name: "New Client" };
            const newActivePackage: ActivePackage = {
              id: `ap${Date.now()}`,
              clientId,
              clientName: client.name,
              packageId: selectedPackage.id,
              packageTitle: selectedPackage.title,
              trainerId: selectedPackage.trainerId,
              trainerName: selectedPackage.trainerName,
              sessionsTotal: selectedPackage.sessions,
              sessionsUsed: 0,
              status: "active",
              purchaseDate: new Date().toISOString().split('T')[0],
              totalPaid: selectedPackage.price,
            };
            setActivePackages([newActivePackage, ...activePackages]);
            toast.success("Package assigned to client!");
          }}
          packageData={{
            id: selectedPackage.id,
            title: selectedPackage.title,
            type: selectedPackage.type,
            sessions: selectedPackage.sessions,
            price: selectedPackage.price,
            description: selectedPackage.description,
          }}
        />
      )}

      {selectedActivePackage && (
        <ActivePackageManagementDialog
          open={manageDialogOpen}
          onOpenChange={setManageDialogOpen}
          packageAssignment={{
            id: selectedActivePackage.id,
            clientId: selectedActivePackage.clientId,
            clientName: selectedActivePackage.clientName,
            packageTitle: selectedActivePackage.packageTitle,
            sessionsTotal: selectedActivePackage.sessionsTotal,
            sessionsUsed: selectedActivePackage.sessionsUsed,
            status: selectedActivePackage.status,
            purchaseDate: selectedActivePackage.purchaseDate,
            expiryDate: selectedActivePackage.expiryDate,
            totalPaid: selectedActivePackage.totalPaid,
            trainerId: selectedActivePackage.trainerId,
          }}
        />
      )}
    </div>
  );
}
