
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateServiceDialog } from "./services/CreateServiceDialog";
import { EditServiceDialog } from "./services/EditServiceDialog";
import { ServiceClientsDialog } from "./services/ServiceClientsDialog";
import { ServicePackagesDialog } from "./services/ServicePackagesDialog";
import { Plus, Search, Edit, Trash2, Copy, Eye, ToggleLeft, ToggleRight, Trophy, Users, Package, TrendingUp } from "lucide-react";
import { useServices } from "./services/hooks/useServices";

export function ServicesTab() {
  const {
    services,
    createService,
    updateService,
    deleteService,
    duplicateService,
    toggleServiceStatus,
    getServiceAnalytics,
    getMostSoldService,
    getTotalServiceRevenue,
    getTotalActiveClients
  } = useServices();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [showClientsDialog, setShowClientsDialog] = useState<{show: boolean, serviceId: string, serviceName: string}>({ show: false, serviceId: '', serviceName: '' });
  const [showPackagesDialog, setShowPackagesDialog] = useState<{show: boolean, serviceId: string, serviceName: string}>({ show: false, serviceId: '', serviceName: '' });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || service.category === filterCategory;
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && service.isActive) ||
                         (filterStatus === "inactive" && !service.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeServicesCount = services.filter(s => s.isActive).length;
  const totalRevenue = getTotalServiceRevenue();
  const totalActiveClients = getTotalActiveClients();
  const mostSoldService = getMostSoldService();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Services</h2>
          <p className="text-muted-foreground">Manage additional services for your packages</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeServicesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalActiveClients}</div>
          </CardContent>
        </Card>
      </div>

      {/* Most Sold Service Card */}
      {mostSoldService && (
        <Card className="border-2 border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-lg text-amber-800">Most Sold Service</CardTitle>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                🏆 Best Seller
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{mostSoldService.service.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{mostSoldService.service.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {mostSoldService.analytics.salesCount} sales
                  </span>
                  <span>€{mostSoldService.analytics.totalRevenue.toLocaleString()} revenue</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">€{mostSoldService.service.price}</div>
                <div className="text-sm text-muted-foreground">per service</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
            <SelectItem value="nutrition">Nutrition</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="wellness">Wellness</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground mb-4">
              {services.length === 0 ? "No services created" : "No services found with current filters"}
            </div>
            {services.length === 0 && (
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create your first service
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => {
            const analytics = getServiceAnalytics(service.id);
            const isBestSeller = mostSoldService?.service.id === service.id;
            
            return (
              <Card key={service.id} className={`relative ${!service.isActive ? 'opacity-60' : ''} ${isBestSeller ? 'ring-2 ring-amber-400' : ''}`}>
                {isBestSeller && (
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full z-10">
                    🏆 Best Seller
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <service.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{service.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleServiceStatus(service.id)}
                      >
                        {service.isActive ? (
                          <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  
                  {/* Analytics Data */}
                  {analytics && (
                    <div className="mb-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-blue-50 p-2 rounded">
                          <div className="font-semibold text-blue-700">{analytics.salesCount}</div>
                          <div className="text-blue-600">Sales</div>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <div className="font-semibold text-green-700">€{analytics.totalRevenue.toLocaleString()}</div>
                          <div className="text-green-600">Revenue</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs flex-1"
                          onClick={() => setShowClientsDialog({ 
                            show: true, 
                            serviceId: service.id, 
                            serviceName: service.name 
                          })}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          {analytics.activeClients.length} Clients
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs flex-1"
                          onClick={() => setShowPackagesDialog({ 
                            show: true, 
                            serviceId: service.id, 
                            serviceName: service.name 
                          })}
                        >
                          <Package className="h-3 w-3 mr-1" />
                          {analytics.linkedPackages.length} Packages
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-primary">€{service.price}</span>
                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingService(service)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => duplicateService(service.id)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteService(service.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialogs */}
      <CreateServiceDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={createService}
      />

      {editingService && (
        <EditServiceDialog
          open={!!editingService}
          onOpenChange={(open) => !open && setEditingService(null)}
          service={editingService}
          onSubmit={(updatedService) => {
            updateService(editingService.id, updatedService);
            setEditingService(null);
          }}
        />
      )}

      <ServiceClientsDialog
        open={showClientsDialog.show}
        onOpenChange={(open) => setShowClientsDialog(prev => ({ ...prev, show: open }))}
        serviceName={showClientsDialog.serviceName}
        clients={showClientsDialog.serviceId ? getServiceAnalytics(showClientsDialog.serviceId)?.activeClients || [] : []}
      />

      <ServicePackagesDialog
        open={showPackagesDialog.show}
        onOpenChange={(open) => setShowPackagesDialog(prev => ({ ...prev, show: open }))}
        serviceName={showPackagesDialog.serviceName}
        packages={showPackagesDialog.serviceId ? getServiceAnalytics(showPackagesDialog.serviceId)?.linkedPackages || [] : []}
      />
    </div>
  );
}
