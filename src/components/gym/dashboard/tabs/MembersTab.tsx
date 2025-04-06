
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Calendar, ArrowUpDown, UserCheck, UserX, MessageSquare } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MemberDetailsDialog } from "./members/MemberDetailsDialog";
import { toast } from "sonner";

export function MembersTab() {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const members = [
    { 
      id: 1, 
      name: "Sofia Ricci", 
      email: "sofia.r@example.com",
      membershipType: "Premium",
      status: "Active",
      joinDate: "Jan 15, 2023",
      trainingSessions: 48,
      lastActive: "Today",
      platformActive: true,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    },
    { 
      id: 2, 
      name: "Luca Marino", 
      email: "luca.m@example.com",
      membershipType: "Standard",
      status: "Active",
      joinDate: "Mar 3, 2023",
      trainingSessions: 32,
      lastActive: "Yesterday",
      platformActive: true,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    },
    { 
      id: 3, 
      name: "Elena Costa", 
      email: "elena.c@example.com",
      membershipType: "Premium",
      status: "Away",
      joinDate: "Nov 12, 2022",
      trainingSessions: 56,
      lastActive: "4 days ago",
      platformActive: false,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    },
    { 
      id: 4, 
      name: "Roberto Ferrari", 
      email: "roberto.f@example.com",
      membershipType: "Standard",
      status: "Active",
      joinDate: "Feb 28, 2023",
      trainingSessions: 28,
      lastActive: "2 days ago",
      platformActive: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    },
    { 
      id: 5, 
      name: "Martina Russo", 
      email: "martina.r@example.com",
      membershipType: "Premium",
      status: "Active",
      joinDate: "Dec 10, 2022",
      trainingSessions: 42,
      lastActive: "Today",
      platformActive: true,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Away":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Inactive":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case "Premium":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Standard":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  const getPlatformStatusColor = (active: boolean) => {
    return active 
      ? "bg-green-50 text-green-700 border-green-200" 
      : "bg-red-50 text-red-700 border-red-200";
  };
  
  const handleInvite = (member: any) => {
    toast.success(`Invito alla piattaforma inviato a ${member.name}`);
  };
  
  const handleMessage = (member: any) => {
    toast.success(`Messaggio inviato a ${member.name}`);
  };
  
  const filteredMembers = members
    .filter(member => {
      // Apply search filter
      if (searchTerm && !member.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !member.email.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply status filter
      if (statusFilter === 'active' && !member.platformActive) return false;
      if (statusFilter === 'inactive' && member.platformActive) return false;
      
      return true;
    });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestione Membri</h1>
          <p className="text-muted-foreground">Gestisci e monitora l'attività dei membri della tua palestra</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cerca membri..."
              className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setStatusFilter(statusFilter === "all" ? "active" : statusFilter === "active" ? "inactive" : "all")}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Nuovo Membro
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-md border">
        <div className="p-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="font-medium">Status del filtro:</p>
            <Badge variant="outline" className={
              statusFilter === "active" ? "bg-green-50 text-green-700" : 
              statusFilter === "inactive" ? "bg-red-50 text-red-700" : 
              "bg-gray-50"
            }>
              {statusFilter === "all" ? "Tutti" : 
               statusFilter === "active" ? "Attivi sulla piattaforma" : 
               "Inattivi sulla piattaforma"}
            </Badge>
            <Badge variant="outline">{filteredMembers.length} membri</Badge>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "table" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("table")}
              className="py-1 h-8"
            >
              <ArrowUpDown className="mr-1 h-4 w-4" />
              Tabella
            </Button>
            <Button 
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className="py-1 h-8"
            >
              <Calendar className="mr-1 h-4 w-4" />
              Schede
            </Button>
          </div>
        </div>
        
        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membro</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Abbonamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Iscritto dal</TableHead>
                  <TableHead>Stato Piattaforma</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getMembershipColor(member.membershipType)}>
                        {member.membershipType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPlatformStatusColor(member.platformActive)}>
                        {member.platformActive ? "Attivo" : "Non attivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!member.platformActive && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleInvite(member)}
                            className="gap-1"
                          >
                            <UserCheck className="h-4 w-4" />
                            <span className="hidden sm:inline">Invita</span>
                          </Button>
                        )}
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleMessage(member)}
                          className="gap-1"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="hidden sm:inline">Messaggio</span>
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedMember(member);
                            setShowDetailsDialog(true);
                          }}
                        >
                          Dettagli
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredMembers.map(member => (
              <Card key={member.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className={getMembershipColor(member.membershipType)}>
                        {member.membershipType}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      <Badge variant="outline" className={getPlatformStatusColor(member.platformActive)}>
                        {member.platformActive ? "Attivo sulla piattaforma" : "Non attivo sulla piattaforma"}
                      </Badge>
                    </div>
                    
                    <div className="text-sm space-y-1 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Membro dal:</span>
                        <span>{member.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sessioni:</span>
                        <span>{member.trainingSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ultima attività:</span>
                        <span>{member.lastActive}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-1"
                        onClick={() => {
                          setSelectedMember(member);
                          setShowDetailsDialog(true);
                        }}
                      >
                        Profilo
                      </Button>
                      {!member.platformActive ? (
                        <Button 
                          size="sm" 
                          className="flex-1 gap-1"
                          onClick={() => handleInvite(member)}
                        >
                          <UserCheck className="h-4 w-4" />
                          <span>Attiva</span>
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="flex-1 gap-1"
                          onClick={() => handleMessage(member)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Messaggio</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <MemberDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        member={selectedMember}
      />
    </div>
  );
}
