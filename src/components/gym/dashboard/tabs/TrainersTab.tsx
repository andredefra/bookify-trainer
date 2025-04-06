
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Plus, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TrainersList } from "./trainers/TrainersList";
import { TrainerAvailability } from "./trainers/TrainerAvailability";
import { TrainerPerformance } from "./trainers/TrainerPerformance";

export function TrainersTab() {
  const [activeTab, setActiveTab] = useState("trainers");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Trainers Management</h1>
        <p className="text-muted-foreground">Manage your gym's trainers</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search trainers..."
            className="pl-9 w-full md:w-[300px]"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="sm:order-first">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Trainer
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Trainer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trainers</CardTitle>
          <CardDescription>View and manage your gym's trainers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="trainers">Trainers</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trainers">
              <TrainersList />
            </TabsContent>
            
            <TabsContent value="availability">
              <TrainerAvailability />
            </TabsContent>
            
            <TabsContent value="performance">
              <TrainerPerformance />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
