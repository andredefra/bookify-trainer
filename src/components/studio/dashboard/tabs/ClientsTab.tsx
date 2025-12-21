import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Users, TrendingUp, UserCheck, UserX } from "lucide-react";

export function ClientsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trainerFilter, setTrainerFilter] = useState("all");

  const clients = [
    { id: "1", name: "Sarah Johnson", email: "sarah@email.com", trainer: "Marco Rossi", status: "active", package: "Premium 20", sessionsLeft: 12, joinedAt: "2024-01-15" },
    { id: "2", name: "Michael Brown", email: "michael@email.com", trainer: "Laura Bianchi", status: "active", package: "Basic 10", sessionsLeft: 4, joinedAt: "2024-02-01" },
    { id: "3", name: "Emma Wilson", email: "emma@email.com", trainer: "Marco Rossi", status: "active", package: "Premium 20", sessionsLeft: 18, joinedAt: "2024-01-20" },
    { id: "4", name: "James Davis", email: "james@email.com", trainer: "Giuseppe Verde", status: "inactive", package: "Basic 10", sessionsLeft: 0, joinedAt: "2023-11-15" },
    { id: "5", name: "Sofia Martinez", email: "sofia@email.com", trainer: "Laura Bianchi", status: "active", package: "Unlimited", sessionsLeft: null, joinedAt: "2024-02-10" },
  ];

  const trainers = ["Marco Rossi", "Laura Bianchi", "Giuseppe Verde"];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrainer = trainerFilter === "all" || client.trainer === trainerFilter;
    return matchesSearch && matchesTrainer;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === "active").length,
    inactive: clients.filter(c => c.status === "inactive").length,
  };

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <Users className="h-8 w-8 text-muted-foreground" />
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <UserX className="h-8 w-8 text-red-500" />
            <div>
              <div className="text-2xl font-bold text-red-500">{stats.inactive}</div>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={trainerFilter} onValueChange={setTrainerFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by trainer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trainers</SelectItem>
            {trainers.map(trainer => (
              <SelectItem key={trainer} value={trainer}>{trainer}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {client.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
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
                <div className="text-center hidden lg:block">
                  <p className="text-sm font-medium">{client.sessionsLeft ?? "∞"}</p>
                  <p className="text-xs text-muted-foreground">Sessions left</p>
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
