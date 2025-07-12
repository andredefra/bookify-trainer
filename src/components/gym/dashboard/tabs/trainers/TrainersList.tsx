
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  UserPlus
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTrainerContracts } from "@/hooks/gym/useTrainerContracts";

export function TrainersList() {
  const [filter, setFilter] = useState("all");
  const { trainersWithContracts, loading } = useTrainerContracts();
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "away": return "bg-amber-500";
      default: return "bg-slate-400";
    }
  };
  
  const filteredTrainers = filter === "all" 
    ? trainersWithContracts 
    : trainersWithContracts.filter(trainer => trainer.status === filter);

  if (loading) {
    return <div className="flex justify-center p-8">Loading trainers...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge 
          onClick={() => setFilter("all")} 
          variant={filter === "all" ? "default" : "secondary"}
          className="cursor-pointer"
        >
          All Trainers
        </Badge>
        <Badge 
          onClick={() => setFilter("online")} 
          variant={filter === "online" ? "default" : "secondary"}
          className="cursor-pointer"
        >
          Online
        </Badge>
        <Badge 
          onClick={() => setFilter("away")} 
          variant={filter === "away" ? "default" : "secondary"}
          className="cursor-pointer"
        >
          Away
        </Badge>
        <Badge 
          onClick={() => setFilter("offline")} 
          variant={filter === "offline" ? "default" : "secondary"}
          className="cursor-pointer"
        >
          Offline
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTrainers.map((trainer) => (
          <Card key={trainer.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage 
                        src={`https://images.unsplash.com/photo-${trainer.id === 'trainer-1' ? '1597223557154-721c1cecc4b0' : trainer.id === 'trainer-2' ? '1494790108377-be9c29b29330' : '1506794778202-cad84cf45f1d'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80`} 
                        alt={trainer.name} 
                      />
                      <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(trainer.status)}`}></span>
                  </div>
                  <div>
                    <h3 className="font-medium">{trainer.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {trainer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-secondary/20">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      View Schedule
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      {trainer.contract ? 'Edit Contract' : 'Create Contract'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{trainer.email}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{trainer.clientCount} active clients</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>€{trainer.monthlyEarnings}/month</span>
                </div>
                {trainer.contract && (
                  <div className="flex items-center text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="capitalize">{trainer.contract.contract_type}</span>
                    {trainer.contract.commission_rate && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {trainer.contract.commission_rate}% commission
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Assign
                </Button>
                <Button size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
