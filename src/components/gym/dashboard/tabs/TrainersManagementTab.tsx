import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Users, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TrainersList } from "./trainers/TrainersList";
import { TrainerAssignmentsList } from "./trainer-assignments/TrainerAssignmentsList";
import { CreateAssignmentDialog } from "./trainer-assignments/CreateAssignmentDialog";
import { useGymTrainerAssignments } from "@/hooks/gym/useGymTrainerAssignments";

export function TrainersManagementTab() {
  const [activeTab, setActiveTab] = useState("trainers");
  const { 
    assignments, 
    availableTrainers, 
    availableClients, 
    loading, 
    createAssignment, 
    updateAssignmentStatus 
  } = useGymTrainerAssignments();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Trainer Management</h1>
        <p className="text-muted-foreground">Manage your personal trainers and their assignments</p>
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
          <CreateAssignmentDialog
            availableTrainers={availableTrainers}
            availableClients={availableClients}
            onCreateAssignment={createAssignment}
          />
          <Button variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Trainer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Trainers</CardTitle>
          <CardDescription>View and manage your personal trainers and their assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="trainers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Trainers
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Assignments
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Performance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="trainers">
              <TrainersList />
            </TabsContent>
            
            <TabsContent value="assignments">
              {loading ? (
                <div className="text-center py-8">Loading assignments...</div>
              ) : (
                <TrainerAssignmentsList 
                  assignments={assignments}
                  onUpdateStatus={updateAssignmentStatus}
                />
              )}
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="text-center py-8 text-muted-foreground">
                Performance analytics coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}