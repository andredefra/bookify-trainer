import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical } from "lucide-react";

export function TrainersManagementTab() {
  const trainers = [
    { 
      id: 1, 
      name: "Marco Rossi", 
      email: "marco@studio.com", 
      clients: 12, 
      status: "active",
      specialties: ["Strength", "HIIT"]
    },
    { 
      id: 2, 
      name: "Laura Bianchi", 
      email: "laura@studio.com", 
      clients: 10, 
      status: "active",
      specialties: ["Yoga", "Pilates"]
    },
    { 
      id: 3, 
      name: "Giuseppe Verde", 
      email: "giuseppe@studio.com", 
      clients: 8, 
      status: "active",
      specialties: ["CrossFit", "Functional"]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Trainers Management</h1>
          <p className="text-muted-foreground">Manage your studio's trainers and their assignments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      <div className="grid gap-4">
        {trainers.map((trainer) => (
          <Card key={trainer.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">{trainer.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{trainer.name}</h3>
                  <p className="text-sm text-muted-foreground">{trainer.email}</p>
                  <div className="flex gap-1 mt-1">
                    {trainer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{trainer.clients}</p>
                  <p className="text-xs text-muted-foreground">Clients</p>
                </div>
                <Badge variant={trainer.status === "active" ? "default" : "secondary"}>
                  {trainer.status}
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
