import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, MoreVertical, Search, Mail, Phone, Users, DollarSign, Calendar, TrendingUp, UserPlus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  clients: number;
  status: "active" | "inactive" | "pending";
  specialties: string[];
  sessionsCompleted: number;
  revenue: number;
  commissionRate: number;
  joinedAt: string;
}

export function TrainersManagementTab() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([
    { 
      id: "1",
      name: "Marco Rossi", 
      email: "marco@studio.com",
      phone: "+39 333 123 4567",
      clients: 12, 
      status: "active",
      specialties: ["Strength", "HIIT"],
      sessionsCompleted: 156,
      revenue: 7800,
      commissionRate: 60,
      joinedAt: "2024-01-15"
    },
    { 
      id: "2",
      name: "Laura Bianchi", 
      email: "laura@studio.com",
      phone: "+39 333 234 5678",
      clients: 10, 
      status: "active",
      specialties: ["Yoga", "Pilates"],
      sessionsCompleted: 134,
      revenue: 6700,
      commissionRate: 55,
      joinedAt: "2024-02-01"
    },
    { 
      id: "3",
      name: "Giuseppe Verde", 
      email: "giuseppe@studio.com",
      clients: 8, 
      status: "active",
      specialties: ["CrossFit", "Functional"],
      sessionsCompleted: 112,
      revenue: 5600,
      commissionRate: 55,
      joinedAt: "2024-01-20"
    },
    { 
      id: "4",
      name: "Anna Neri", 
      email: "anna@studio.com",
      clients: 0, 
      status: "pending",
      specialties: ["Boxing", "Cardio"],
      sessionsCompleted: 0,
      revenue: 0,
      commissionRate: 50,
      joinedAt: "2024-03-01"
    },
  ]);

  const [inviteData, setInviteData] = useState({
    email: "",
    name: "",
    commissionRate: "55",
  });

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeTrainers = trainers.filter(t => t.status === "active");
  const pendingTrainers = trainers.filter(t => t.status === "pending");

  const handleInviteTrainer = () => {
    if (!inviteData.email.trim() || !inviteData.name.trim()) {
      toast({
        title: "Error",
        description: "Email and name are required",
        variant: "destructive",
      });
      return;
    }

    const trainer: Trainer = {
      id: Date.now().toString(),
      name: inviteData.name,
      email: inviteData.email,
      clients: 0,
      status: "pending",
      specialties: [],
      sessionsCompleted: 0,
      revenue: 0,
      commissionRate: parseInt(inviteData.commissionRate) || 55,
      joinedAt: new Date().toISOString().split('T')[0],
    };

    setTrainers([...trainers, trainer]);
    setInviteData({ email: "", name: "", commissionRate: "55" });
    setIsInviteDialogOpen(false);
    
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${trainer.email}`,
    });
  };

  const handleRemoveTrainer = (id: string) => {
    setTrainers(trainers.filter(t => t.id !== id));
    toast({
      title: "Trainer Removed",
      description: "The trainer has been removed from your studio",
    });
  };

  const stats = {
    totalTrainers: trainers.length,
    activeTrainers: activeTrainers.length,
    totalClients: trainers.reduce((sum, t) => sum + t.clients, 0),
    totalRevenue: trainers.reduce((sum, t) => sum + t.revenue, 0),
    totalSessions: trainers.reduce((sum, t) => sum + t.sessionsCompleted, 0),
  };

  const TrainerCard = ({ trainer }: { trainer: Trainer }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={trainer.avatar} alt={trainer.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {trainer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{trainer.name}</h3>
              <p className="text-sm text-muted-foreground">{trainer.email}</p>
              {trainer.phone && (
                <p className="text-sm text-muted-foreground">{trainer.phone}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={
              trainer.status === "active" ? "default" : 
              trainer.status === "pending" ? "secondary" : "outline"
            }>
              {trainer.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Commission
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => handleRemoveTrainer(trainer.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {trainer.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {trainer.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
            </div>
            <p className="text-xl font-bold">{trainer.clients}</p>
            <p className="text-xs text-muted-foreground">Clients</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
            </div>
            <p className="text-xl font-bold">{trainer.sessionsCompleted}</p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <DollarSign className="h-4 w-4" />
            </div>
            <p className="text-xl font-bold text-green-600">€{trainer.revenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4" />
            </div>
            <p className="text-xl font-bold">{trainer.commissionRate}%</p>
            <p className="text-xs text-muted-foreground">Commission</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trainers Management</h1>
          <p className="text-muted-foreground">Manage your studio's trainers and their assignments</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Trainer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite New Trainer</DialogTitle>
              <DialogDescription>
                Send an invitation to a trainer to join your studio.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Trainer Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="trainer@email.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission">Commission Rate (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="55"
                  value={inviteData.commissionRate}
                  onChange={(e) => setInviteData({ ...inviteData, commissionRate: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Percentage of session revenue the trainer will receive
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteTrainer}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.totalTrainers}</div>
            <p className="text-sm text-muted-foreground">Total Trainers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.activeTrainers}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-sm text-muted-foreground">Total Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.totalSessions}</div>
            <p className="text-sm text-muted-foreground">Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">€{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search trainers..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Trainers Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active ({activeTrainers.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingTrainers.length})</TabsTrigger>
          <TabsTrigger value="all">All ({trainers.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-4">
          {filteredTrainers.filter(t => t.status === "active").map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4 mt-4">
          {filteredTrainers.filter(t => t.status === "pending").map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
          {pendingTrainers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending invitations.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </TabsContent>
      </Tabs>

      {filteredTrainers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No trainers found. Invite your first trainer to get started.</p>
        </div>
      )}
    </div>
  );
}
