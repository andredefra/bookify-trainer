
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrainingProgramCard } from "./TrainingProgramCard";
import { PreviousProgramsList } from "./PreviousProgramsList";
import { TrainingProgram } from "@/data/training";

interface TrainingProgramContentProps {
  currentProgram: TrainingProgram;
  previousPrograms: TrainingProgram[];
}

export function TrainingProgramContent({ currentProgram, previousPrograms }: TrainingProgramContentProps) {
  const [activeTab, setActiveTab] = useState("current");
  
  // Extract program details
  const programDetails = {
    objective: "Strength & Conditioning",
    duration: "8 weeks",
    paid: true,
    price: 49.99
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <h2 className="text-xl font-semibold mb-2">Your Training Program</h2>
        <p className="text-muted-foreground">
          Track your workout plan and progress with your personalized training program.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Target className="h-3.5 w-3.5 mr-1" />
            {programDetails.objective}
          </Badge>
          <Badge variant="outline">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {programDetails.duration}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {currentProgram.week}
          </Badge>
          {programDetails.paid && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <DollarSign className="h-3.5 w-3.5 mr-1" />
              {programDetails.price} €
            </Badge>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="current">Current Program</TabsTrigger>
          <TabsTrigger value="previous">Previous Programs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="pt-4">
          <TrainingProgramCard program={currentProgram} />
        </TabsContent>
        
        <TabsContent value="previous" className="pt-4">
          <PreviousProgramsList programs={previousPrograms} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
