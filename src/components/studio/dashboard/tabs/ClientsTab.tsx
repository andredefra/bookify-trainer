import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ClientsTab() {
  const clients = [
    { id: 1, name: "Sarah Johnson", email: "sarah@email.com", trainer: "Marco Rossi", status: "active", package: "Premium 20" },
    { id: 2, name: "Michael Brown", email: "michael@email.com", trainer: "Laura Bianchi", status: "active", package: "Basic 10" },
    { id: 3, name: "Emma Wilson", email: "emma@email.com", trainer: "Marco Rossi", status: "active", package: "Premium 20" },
    { id: 4, name: "James Davis", email: "james@email.com", trainer: "Giuseppe Verde", status: "inactive", package: "Basic 10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Clients / CRM</h1>
          <p className="text-muted-foreground">Manage all studio clients and their assignments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">{client.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium">{client.trainer}</p>
                  <p className="text-xs text-muted-foreground">Assigned Trainer</p>
                </div>
                <Badge variant="secondary">{client.package}</Badge>
                <Badge variant={client.status === "active" ? "default" : "secondary"}>
                  {client.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
