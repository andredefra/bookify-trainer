
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { TrainingProgramCard } from "@/components/client/training/TrainingProgramCard";
import { PreviousProgramsList } from "@/components/client/training/PreviousProgramsList";
import { TrainingProgram } from "@/data/trainingPrograms";

interface TrainingProgramContentProps {
  currentProgram: TrainingProgram;
  previousPrograms: TrainingProgram[];
}

export function TrainingProgramContent({ 
  currentProgram, 
  previousPrograms 
}: TrainingProgramContentProps) {
  const [activeProgram, setActiveProgram] = useState("current");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Programs</CardTitle>
        <CardDescription>
          View and track your personalized training programs from your trainers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current" onValueChange={setActiveProgram}>
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Program</TabsTrigger>
            <TabsTrigger value="previous">Previous Programs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <TrainingProgramCard program={currentProgram} />
          </TabsContent>
          
          <TabsContent value="previous">
            <PreviousProgramsList programs={previousPrograms} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
