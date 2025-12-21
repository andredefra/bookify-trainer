import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Users, Search, Edit, Trash2, Eye, Package, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PackageItem {
  id: string;
  name: string;
  price: number;
  sessions: number | null;
  validity: string;
  validityDays: number;
  sold: number;
  status: "active" | "inactive";
  description?: string;
  revenue: number;
}

export function PackagesTab() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [packages, setPackages] = useState<PackageItem[]>([
    { 
      id: "1",
      name: "Premium 20 Sessions", 
      price: 800,
      sessions: 20,
      validityDays: 90,
      validity: "3 months",
      sold: 15,
      status: "active",
      description: "Our most popular package for dedicated clients",
      revenue: 12000
    },
    { 
      id: "2",
      name: "Basic 10 Sessions", 
      price: 450,
      sessions: 10,
      validityDays: 60,
      validity: "2 months",
      sold: 23,
      status: "active",
      description: "Perfect for getting started",
      revenue: 10350
    },
    { 
      id: "3",
      name: "Starter 5 Sessions", 
      price: 250,
      sessions: 5,
      validityDays: 30,
      validity: "1 month",
      sold: 31,
      status: "active",
      description: "Try our services",
      revenue: 7750
    },
    { 
      id: "4",
      name: "Unlimited Monthly", 
      price: 350,
      sessions: null,
      validityDays: 30,
      validity: "Monthly",
      sold: 8,
      status: "active",
      description: "Unlimited sessions per month",
      revenue: 2800
    },
  ]);

  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    sessions: "",
    validityDays: "30",
    description: "",
    isUnlimited: false,
  });

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePackage = () => {
    if (!newPackage.name.trim() || !newPackage.price) {
      toast({
        title: "Error",
        description: "Package name and price are required",
        variant: "destructive",
      });
      return;
    }

    const validityDays = parseInt(newPackage.validityDays) || 30;
    const validity = validityDays >= 30 
      ? `${Math.round(validityDays / 30)} month${validityDays >= 60 ? 's' : ''}`
      : `${validityDays} days`;

    const pkg: PackageItem = {
      id: Date.now().toString(),
      name: newPackage.name,
      price: parseFloat(newPackage.price),
      sessions: newPackage.isUnlimited ? null : (parseInt(newPackage.sessions) || 10),
      validityDays,
      validity,
      sold: 0,
      status: "active",
      description: newPackage.description,
      revenue: 0,
    };

    setPackages([pkg, ...packages]);
    setNewPackage({ name: "", price: "", sessions: "", validityDays: "30", description: "", isUnlimited: false });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Package Created",
      description: `${pkg.name} has been created successfully`,
    });
  };

  const handleDeletePackage = (id: string) => {
    setPackages(packages.filter(p => p.id !== id));
    toast({
      title: "Package Deleted",
      description: "The package has been removed",
    });
  };

  const handleToggleStatus = (id: string) => {
    setPackages(packages.map(p => {
      if (p.id === id) {
        const newStatus = p.status === "active" ? "inactive" : "active";
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  const stats = {
    total: packages.length,
    active: packages.filter(p => p.status === "active").length,
    totalSold: packages.reduce((sum, p) => sum + p.sold, 0),
    totalRevenue: packages.reduce((sum, p) => sum + p.revenue, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Packages</h1>
          <p className="text-muted-foreground">Create and manage session packages for your studio</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Package
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Package</DialogTitle>
              <DialogDescription>
                Create a session package that clients can purchase.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Package Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Premium 20 Sessions"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the package..."
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="450"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validity">Validity (days)</Label>
                  <Input
                    id="validity"
                    type="number"
                    min="1"
                    placeholder="30"
                    value={newPackage.validityDays}
                    onChange={(e) => setNewPackage({ ...newPackage, validityDays: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Unlimited Sessions</Label>
                  <p className="text-xs text-muted-foreground">No session limit for this package</p>
                </div>
                <Switch
                  checked={newPackage.isUnlimited}
                  onCheckedChange={(checked) => setNewPackage({ ...newPackage, isUnlimited: checked })}
                />
              </div>
              {!newPackage.isUnlimited && (
                <div className="space-y-2">
                  <Label htmlFor="sessions">Number of Sessions</Label>
                  <Input
                    id="sessions"
                    type="number"
                    min="1"
                    placeholder="10"
                    value={newPackage.sessions}
                    onChange={(e) => setNewPackage({ ...newPackage, sessions: e.target.value })}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePackage}>Create Package</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Packages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-sm text-muted-foreground">Active Packages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats.totalSold}</div>
            </div>
            <p className="text-sm text-muted-foreground">Packages Sold</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-green-600">€{stats.totalRevenue.toLocaleString()}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search packages..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                <p className="text-2xl font-bold text-primary mt-1">€{pkg.price}</p>
                {pkg.description && (
                  <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Package
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleStatus(pkg.id)}>
                    {pkg.status === "active" ? "Deactivate" : "Activate"}
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
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Sessions</p>
                  <p className="font-medium">{pkg.sessions || "Unlimited"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Validity</p>
                  <p className="font-medium">{pkg.validity}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{pkg.sold} sold</span>
                  <span className="text-xs text-green-600 ml-2">€{pkg.revenue.toLocaleString()}</span>
                </div>
                <Badge variant={pkg.status === "active" ? "default" : "secondary"}>
                  {pkg.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No packages found. Create your first package to get started.</p>
        </div>
      )}
    </div>
  );
}
