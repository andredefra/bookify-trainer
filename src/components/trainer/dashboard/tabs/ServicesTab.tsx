
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateServiceDialog } from "./services/CreateServiceDialog";
import { EditServiceDialog } from "./services/EditServiceDialog";
import { Plus, Search, Edit, Trash2, Copy, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { useServices } from "./services/hooks/useServices";

export function ServicesTab() {
  const {
    services,
    createService,
    updateService,
    deleteService,
    duplicateService,
    toggleServiceStatus
  } = useServices();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

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
  const totalRevenue = services.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">I miei servizi</h2>
          <p className="text-muted-foreground">Gestisci i servizi aggiuntivi per i tuoi packages</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Aggiungi Servizio
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Totale Servizi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Servizi Attivi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeServicesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valore Totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca servizi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le categorie</SelectItem>
            <SelectItem value="consultation">Consulenza</SelectItem>
            <SelectItem value="nutrition">Nutrizione</SelectItem>
            <SelectItem value="support">Supporto</SelectItem>
            <SelectItem value="wellness">Benessere</SelectItem>
            <SelectItem value="other">Altro</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti</SelectItem>
            <SelectItem value="active">Attivi</SelectItem>
            <SelectItem value="inactive">Inattivi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground mb-4">
              {services.length === 0 ? "Nessun servizio creato" : "Nessun servizio trovato con i filtri attuali"}
            </div>
            {services.length === 0 && (
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Crea il tuo primo servizio
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <Card key={service.id} className={`relative ${!service.isActive ? 'opacity-60' : ''}`}>
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
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-primary">€{service.price}</span>
                  <Badge variant={service.isActive ? "default" : "secondary"}>
                    {service.isActive ? "Attivo" : "Inattivo"}
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
                    Modifica
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
          ))}
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
    </div>
  );
}
