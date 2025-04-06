
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Star, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainerAvailability } from "./trainers/TrainerAvailability";

export function TrainersTab() {
  const [activeTab, setActiveTab] = useState<"list" | "availability">("list");
  
  const trainers = [
    { 
      id: 1, 
      name: "Marco Rossi", 
      specialty: "Strength & Conditioning", 
      image: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80", 
      clients: 28,
      rating: 4.9
    },
    { 
      id: 2, 
      name: "Laura Bianchi", 
      specialty: "Yoga & Pilates", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80", 
      clients: 32,
      rating: 4.8
    },
    { 
      id: 3, 
      name: "Giovanni Verdi", 
      specialty: "Cardio & HIIT", 
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80", 
      clients: 24,
      rating: 4.7
    },
    { 
      id: 4, 
      name: "Anna Neri", 
      specialty: "Functional Training", 
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80", 
      clients: 20,
      rating: 4.9
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Trainers Management</h1>
            <p className="text-muted-foreground">Manage your gym's personal trainers</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search trainers..."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
            
            <Button>
              <Plus className="mr-1 h-4 w-4" />
              Add Trainer
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "list" | "availability")} className="w-full">
          <TabsList>
            <TabsTrigger value="list">Trainer List</TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Availability</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="list" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trainers.map(trainer => (
            <Card key={trainer.id}>
              <CardContent className="p-0">
                <div className="flex flex-col items-center p-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={trainer.image} alt={trainer.name} />
                    <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-semibold text-lg">{trainer.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{trainer.specialty}</p>
                  
                  <div className="flex items-center text-sm mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span>{trainer.rating} • {trainer.clients} clients</span>
                  </div>
                  
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" size="sm">Profile</Button>
                    <Button className="flex-1" size="sm">Sessions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="availability" className="mt-0">
        <TrainerAvailability />
      </TabsContent>
    </div>
  );
}
