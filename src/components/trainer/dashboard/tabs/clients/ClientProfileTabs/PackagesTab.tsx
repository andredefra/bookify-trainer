import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Package, Calendar, Clock, Euro, TrendingUp } from "lucide-react";
import { useClientPackages } from "@/hooks/useClientPackages";

interface PackagesTabProps {
  clientId: number;
  searchQuery?: string;
}

export function PackagesTab({ clientId, searchQuery }: PackagesTabProps) {
  const { packages, loading, error } = useClientPackages();

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
            Errore nel caricamento dei pacchetti: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (filteredPackages.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nessun pacchetto trovato</h3>
            <p>
              {searchQuery 
                ? "Nessun pacchetto corrisponde ai criteri di ricerca."
                : "Questo cliente non ha ancora acquistato pacchetti."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{filteredPackages.length}</div>
                <div className="text-xs text-muted-foreground">Pacchetti Totali</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredPackages.filter(p => p.status === 'active').length}
                </div>
                <div className="text-xs text-muted-foreground">Attivi</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  €{filteredPackages.reduce((sum, p) => sum + p.total_paid, 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Speso Totale</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">
                  {filteredPackages.reduce((sum, p) => sum + p.sessions_used, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Sessioni Usate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Package Details */}
      <div className="space-y-4">
        {filteredPackages.map((packageAssignment) => {
          const progressPercentage = packageAssignment.sessions_total > 0 
            ? (packageAssignment.sessions_used / packageAssignment.sessions_total) * 100 
            : 0;

          return (
            <Card key={packageAssignment.id}>
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
                    <div className="text-sm text-muted-foreground">Pagato</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {packageAssignment.package.description && (
                    <p className="text-sm text-muted-foreground">
                      {packageAssignment.package.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Acquistato:</span>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {packageAssignment.purchase_date 
                          ? new Date(packageAssignment.purchase_date).toLocaleDateString()
                          : 'N/A'
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Scadenza:</span>
                      <p className="font-medium">
                        {packageAssignment.expiry_date 
                          ? new Date(packageAssignment.expiry_date).toLocaleDateString()
                          : 'N/A'
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sessioni:</span>
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
                        <span>Progresso sessioni</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      Visualizza Dettagli
                    </Button>
                    {packageAssignment.status === 'expired' && (
                      <Button variant="outline" size="sm">
                        Rinnova Pacchetto
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
  );
}