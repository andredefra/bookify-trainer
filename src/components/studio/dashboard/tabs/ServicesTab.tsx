import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Clock, DollarSign, Search, Edit, Trash2, TrendingUp, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  bookings: number;
  status: "active" | "inactive";
  category: string;
  description?: string;
  revenue: number;
}

export function ServicesTab() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([
    { 
      id: "1",
      name: "Personal Training Session", 
      price: 50,
      duration: 60,
      bookings: 156,
      status: "active",
      category: "Training",
      description: "One-on-one personal training",
      revenue: 7800
    },
    { 
      id: "2",
      name: "Nutrition Consultation", 
      price: 80,
      duration: 45,
      bookings: 45,
      status: "active",
      category: "Consultation",
      description: "Personalized nutrition advice",
      revenue: 3600
    },
    { 
      id: "3",
      name: "Body Composition Analysis", 
      price: 30,
      duration: 30,
      bookings: 89,
      status: "active",
      category: "Assessment",
      description: "InBody or similar body composition scan",
      revenue: 2670
    },
    { 
      id: "4",
      name: "Group HIIT Class", 
      price: 20,
      duration: 45,
      bookings: 234,
      status: "active",
      category: "Group",
      description: "High intensity group workout",
      revenue: 4680
    },
    { 
      id: "5",
      name: "Yoga Session", 
      price: 25,
      duration: 60,
      bookings: 178,
      status: "active",
      category: "Wellness",
      description: "Relaxing yoga class",
      revenue: 4450
    },
  ]);

  const [newService, setNewService] = useState({
    name: "",
    price: "",
    duration: "60",
    category: "",
    description: "",
  });

  const categories = ["Training", "Consultation", "Assessment", "Group", "Wellness", "Other"];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateService = () => {
    if (!newService.name.trim() || !newService.price || !newService.category) {
      toast({
        title: "Error",
        description: "Name, price, and category are required",
        variant: "destructive",
      });
      return;
    }

    const service: Service = {
      id: Date.now().toString(),
      name: newService.name,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration) || 60,
      bookings: 0,
      status: "active",
      category: newService.category,
      description: newService.description,
      revenue: 0,
    };

    setServices([service, ...services]);
    setNewService({ name: "", price: "", duration: "60", category: "", description: "" });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Service Created",
      description: `${service.name} has been created successfully`,
    });
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast({
      title: "Service Deleted",
      description: "The service has been removed",
    });
  };

  const handleToggleStatus = (id: string) => {
    setServices(services.map(s => {
      if (s.id === id) {
        const newStatus = s.status === "active" ? "inactive" : "active";
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === "active").length,
    totalBookings: services.reduce((sum, s) => sum + s.bookings, 0),
    totalRevenue: services.reduce((sum, s) => sum + s.revenue, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage the services your studio offers</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service that clients can book.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Personal Training Session"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the service..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
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
                    placeholder="50"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    step="15"
                    placeholder="60"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newService.category}
                  onValueChange={(value) => setNewService({ ...newService, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateService}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <p className="text-sm text-muted-foreground">Total Services</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-sm text-muted-foreground">Active Services</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
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
          placeholder="Search services..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Services List */}
      <div className="grid gap-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <Badge variant="outline" className="text-xs">{service.category}</Badge>
                </div>
                {service.description && (
                  <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>€{service.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} min</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{service.bookings}</p>
                  <p className="text-xs text-muted-foreground">bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">€{service.revenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">revenue</p>
                </div>
                <Badge variant={service.status === "active" ? "default" : "secondary"}>
                  {service.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Service
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(service.id)}>
                      {service.status === "active" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found. Add your first service to get started.</p>
        </div>
      )}
    </div>
  );
}
