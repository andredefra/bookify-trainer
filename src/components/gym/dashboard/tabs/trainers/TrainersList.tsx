
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
  Circle
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Sample trainer data
const trainers = [
  { 
    id: 1, 
    name: "Marco Rossi", 
    image: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    email: "marco.rossi@example.com",
    phone: "+1 (555) 123-4567",
    specialties: ["Strength Training", "HIIT"],
    status: "online",
    clientCount: 18
  },
  { 
    id: 2, 
    name: "Laura Bianchi",  
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    email: "laura.bianchi@example.com",
    phone: "+1 (555) 987-6543",
    specialties: ["Yoga", "Pilates"],
    status: "away",
    clientCount: 24
  },
  { 
    id: 3, 
    name: "Giovanni Verdi", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    email: "giovanni.verdi@example.com",
    phone: "+1 (555) 234-5678",
    specialties: ["Bodybuilding", "Nutrition"],
    status: "offline",
    clientCount: 15
  }
];

export function TrainersList() {
  const [filter, setFilter] = useState("all");
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "away": return "bg-amber-500";
      default: return "bg-slate-400";
    }
  };
  
  const filteredTrainers = filter === "all" 
    ? trainers 
    : trainers.filter(trainer => trainer.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge 
          onClick={() => setFilter("all")} 
          className={`cursor-pointer ${filter === "all" ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
        >
          All Trainers
        </Badge>
        <Badge 
          onClick={() => setFilter("online")} 
          className={`cursor-pointer ${filter === "online" ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
        >
          Online
        </Badge>
        <Badge 
          onClick={() => setFilter("away")} 
          className={`cursor-pointer ${filter === "away" ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
        >
          Away
        </Badge>
        <Badge 
          onClick={() => setFilter("offline")} 
          className={`cursor-pointer ${filter === "offline" ? "bg-primary" : "bg-secondary hover:bg-secondary/80"}`}
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
                      <AvatarImage src={trainer.image} alt={trainer.name} />
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
                    <DropdownMenuItem>Edit Trainer</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    <DropdownMenuItem>View Clients</DropdownMenuItem>
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
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{trainer.phone}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{trainer.clientCount} active clients</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  Schedule
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
