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
          className="cursor-pointer h-9 px-4"
        >
          All Trainers
        </Badge>
        <Badge 
          onClick={() => setFilter("online")} 
          variant={filter === "online" ? "default" : "secondary"}
          className="cursor-pointer h-9 px-4"
        >
          Online
        </Badge>
        <Badge 
          onClick={() => setFilter("away")} 
          variant={filter === "away" ? "default" : "secondary"}
          className="cursor-pointer h-9 px-4"
        >
          Away
        </Badge>
        <Badge 
          onClick={() => setFilter("offline")} 
          variant={filter === "offline" ? "default" : "secondary"}
          className="cursor-pointer h-9 px-4"
        >
          Offline
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredTrainers.map((trainer) => (
          <Card key={trainer.id} className="overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                {/* Header with avatar and basic info */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-14 w-14">
                        <AvatarImage 
                          src={`https://images.unsplash.com/photo-${trainer.id === 'trainer-1' ? '1597223557154-721c1cecc4b0' : trainer.id === 'trainer-2' ? '1494790778202-cad84cf45f1d' : '1506794778202-cad84cf45f1d'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80`} 
                          alt={trainer.name} 
                        />
                        <AvatarFallback className="text-lg font-medium">{trainer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(trainer.status)}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold">{trainer.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
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
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <MoreHorizontal className="h-5 w-5" />
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
                
                {/* Contact and stats info */}
                <div className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm truncate">{trainer.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{trainer.clientCount} clients</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>€{trainer.monthlyEarnings}/mo</span>
                    </div>
                  </div>
                  {trainer.contract && (
                    <div className="flex items-center justify-between text-muted-foreground bg-muted/50 p-2 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <span className="text-sm capitalize">{trainer.contract.contract_type}</span>
                      </div>
                      {trainer.contract.commission_rate && (
                        <Badge variant="outline" className="text-xs">
                          {trainer.contract.commission_rate}% commission
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col gap-2 pt-2 border-t">
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="h-10">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="h-10">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign
                    </Button>
                  </div>
                  <Button size="sm" className="h-10">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}