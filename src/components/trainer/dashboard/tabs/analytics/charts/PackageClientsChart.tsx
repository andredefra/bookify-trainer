import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users, Calendar, TrendingUp, Euro, Eye } from "lucide-react";
import { useState } from "react";
import { packageData } from "../data/packageAnalyticsData";

// Mock client data connected to packages
const packageClientsData = [
  {
    packageId: 1,
    packageTitle: "Complete Transformation",
    clients: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        purchaseDate: "2024-02-15",
        expiryDate: "2024-05-15",
        sessionsUsed: 6,
        sessionTotal: 8,
        totalPaid: 750,
        status: "active"
      },
      {
        id: 2,
        name: "Mike Peterson", 
        email: "mike@example.com",
        purchaseDate: "2024-01-20",
        expiryDate: "2024-04-20",
        sessionsUsed: 8,
        sessionTotal: 8,
        totalPaid: 750,
        status: "completed"
      }
    ]
  },
  {
    packageId: 2,
    packageTitle: "Personal Training Package",
    clients: [
      {
        id: 3,
        name: "Lisa Garcia",
        email: "lisa@example.com", 
        purchaseDate: "2024-03-01",
        expiryDate: "2024-06-01",
        sessionsUsed: 4,
        sessionTotal: 10,
        totalPaid: 500,
        status: "active"
      },
      {
        id: 4,
        name: "David Chen",
        email: "david@example.com",
        purchaseDate: "2024-02-10",
        expiryDate: "2024-05-10", 
        sessionsUsed: 2,
        sessionTotal: 10,
        totalPaid: 200,
        status: "expired"
      }
    ]
  },
  {
    packageId: 3,
    packageTitle: "Beginner's Program",
    clients: [
      {
        id: 5,
        name: "Emma Wilson",
        email: "emma@example.com",
        purchaseDate: "2024-03-10",
        expiryDate: "2024-05-10",
        sessionsUsed: 0,
        sessionTotal: 0,
        totalPaid: 240,
        status: "active"
      }
    ]
  }
];

export function PackageClientsChart() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculatePackageMetrics = (clients: any[]) => {
    return {
      totalClients: clients.length,
      activeClients: clients.filter(c => c.status === 'active').length,
      totalRevenue: clients.reduce((sum, c) => sum + c.totalPaid, 0),
      avgUtilization: clients.length > 0 
        ? Math.round(clients.reduce((sum, c) => sum + (c.sessionTotal > 0 ? (c.sessionsUsed / c.sessionTotal) * 100 : 0), 0) / clients.length)
        : 0
    };
  };

  return (
    <div className="space-y-6">
      {/* Package Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {packageClientsData.map((pkg) => {
          const metrics = calculatePackageMetrics(pkg.clients);
          const packageInfo = packageData.find(p => p.id === pkg.packageId);
          
          return (
            <Card key={pkg.packageId} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPackage(selectedPackage === pkg.packageId ? null : pkg.packageId)}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{pkg.packageTitle}</h3>
                    <Badge variant="outline">{metrics.totalClients} clients</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Active:</span>
                      <p className="font-medium">{metrics.activeClients}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Revenue:</span>
                      <p className="font-medium">€{metrics.totalRevenue}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Usage:</span>
                      <p className="font-medium">{metrics.avgUtilization}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <p className="font-medium">€{packageInfo?.avgValue || 0}</p>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="w-full h-8">
                    <Eye className="h-3 w-3 mr-1" />
                    {selectedPackage === pkg.packageId ? 'Hide' : 'View'} Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Client List */}
      {selectedPackage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Clients in {packageClientsData.find(p => p.packageId === selectedPackage)?.packageTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packageClientsData
                .find(p => p.packageId === selectedPackage)
                ?.clients.map((client) => {
                  const progressPercentage = client.sessionTotal > 0 
                    ? (client.sessionsUsed / client.sessionTotal) * 100 
                    : 0;

                  return (
                    <div key={client.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{client.name}</h4>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">€{client.totalPaid}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Purchased:</span>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(client.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expires:</span>
                          <p className="font-medium">
                            {new Date(client.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Sessions:</span>
                          <p className="font-medium">{client.sessionsUsed}/{client.sessionTotal}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Usage:</span>
                          <p className="font-medium flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {Math.round(progressPercentage)}%
                          </p>
                        </div>
                      </div>

                      {client.sessionTotal > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span>Session Progress</span>
                            <span>{Math.round(progressPercentage)}%</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="h-5 w-5" />
            Clients and Revenue Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {packageClientsData.reduce((sum, pkg) => sum + pkg.clients.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {packageClientsData.reduce((sum, pkg) => 
                  sum + pkg.clients.filter(c => c.status === 'active').length, 0
                )}
              </div>
              <div className="text-sm text-muted-foreground">Active Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                €{packageClientsData.reduce((sum, pkg) => 
                  sum + pkg.clients.reduce((clientSum, c) => clientSum + c.totalPaid, 0), 0
                ).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(
                  packageClientsData.reduce((sum, pkg) => {
                    const pkgUtilization = pkg.clients.length > 0
                      ? pkg.clients.reduce((clientSum, c) => 
                          clientSum + (c.sessionTotal > 0 ? (c.sessionsUsed / c.sessionTotal) * 100 : 0), 0
                        ) / pkg.clients.length
                      : 0;
                    return sum + pkgUtilization;
                  }, 0) / packageClientsData.length
                )}%
              </div>
              <div className="text-sm text-muted-foreground">Average Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}