
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Package, CreditCard, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PackagesTab() {
  const [activeTab, setActiveTab] = useState("templates");

  // Mock data for demonstration
  const packageTemplates = [
    {
      id: 1,
      title: "Personal Training Package",
      description: "10 one-on-one personal training sessions",
      type: "sessions_only",
      sessions: 10,
      price: 500,
      isActive: true,
      clientsAssigned: 5
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
      clientsAssigned: 3
    },
    {
      id: 3,
      title: "Beginner's Program",
      description: "6-week foundation program only",
      type: "program_only",
      programs: ["Beginner Fitness Program"],
      price: 200,
      isActive: true,
      clientsAssigned: 8
    }
  ];

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
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Package Management</CardTitle>
          <CardDescription>Create and manage training packages for your clients</CardDescription>
        </div>
        <Button className="flex items-center self-start sm:self-auto w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Package
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="active">Active Packages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {packageTemplates.map((pkg) => (
                <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <Badge className={getPackageTypeColor(pkg.type)}>
                        {pkg.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{pkg.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">${pkg.price}</span>
                      <div className="text-sm text-muted-foreground">
                        {pkg.sessions && `${pkg.sessions} sessions`}
                        {pkg.programs && ` + ${pkg.programs.length} program(s)`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{pkg.clientsAssigned} clients assigned</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Assign
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
                      <div className="space-y-2">
                        <h3 className="font-semibold">{pkg.clientName}</h3>
                        <p className="text-sm text-muted-foreground">{pkg.packageTitle}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Sessions: {pkg.sessionsUsed}/{pkg.totalSessions}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            <span>Paid: ${pkg.totalPaid}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <Badge className={getPaymentStatusColor(pkg.paymentStatus)}>
                          {pkg.paymentStatus}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Expires: {pkg.expiryDate}
                        </p>
                        {pkg.remainingPayment && (
                          <p className="text-sm text-red-600">
                            Remaining: ${pkg.remainingPayment}
                          </p>
                        )}
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

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">$3,250</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Packages</p>
                      <p className="text-2xl font-bold">16</p>
                    </div>
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Payments</p>
                      <p className="text-2xl font-bold">$875</p>
                    </div>
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">68%</p>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
