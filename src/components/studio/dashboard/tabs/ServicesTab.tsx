import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Clock, DollarSign } from "lucide-react";

export function ServicesTab() {
  const services = [
    { 
      id: 1, 
      name: "Personal Training Session", 
      price: "€50",
      duration: "60 min",
      bookings: 156,
      status: "active"
    },
    { 
      id: 2, 
      name: "Nutrition Consultation", 
      price: "€80",
      duration: "45 min",
      bookings: 45,
      status: "active"
    },
    { 
      id: 3, 
      name: "Body Composition Analysis", 
      price: "€30",
      duration: "30 min",
      bookings: 89,
      status: "active"
    },
    { 
      id: 4, 
      name: "Group HIIT Class", 
      price: "€20",
      duration: "45 min",
      bookings: 234,
      status: "active"
    },
    { 
      id: 5, 
      name: "Yoga Session", 
      price: "€25",
      duration: "60 min",
      bookings: 178,
      status: "active"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage the services your studio offers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{service.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{service.bookings}</p>
                  <p className="text-xs text-muted-foreground">bookings</p>
                </div>
                <Badge variant={service.status === "active" ? "default" : "secondary"}>
                  {service.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
