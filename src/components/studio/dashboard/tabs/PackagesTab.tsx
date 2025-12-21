import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Users, DollarSign } from "lucide-react";

export function PackagesTab() {
  const packages = [
    { 
      id: 1, 
      name: "Premium 20 Sessions", 
      price: "€800",
      sessions: 20,
      validity: "3 months",
      sold: 15,
      status: "active"
    },
    { 
      id: 2, 
      name: "Basic 10 Sessions", 
      price: "€450",
      sessions: 10,
      validity: "2 months",
      sold: 23,
      status: "active"
    },
    { 
      id: 3, 
      name: "Starter 5 Sessions", 
      price: "€250",
      sessions: 5,
      validity: "1 month",
      sold: 31,
      status: "active"
    },
    { 
      id: 4, 
      name: "Unlimited Monthly", 
      price: "€350/mo",
      sessions: null,
      validity: "Monthly",
      sold: 8,
      status: "active"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Packages</h1>
          <p className="text-muted-foreground">Create and manage session packages for your studio</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                <p className="text-2xl font-bold text-primary mt-1">{pkg.price}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
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
                </div>
                <Badge variant={pkg.status === "active" ? "default" : "secondary"}>
                  {pkg.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
