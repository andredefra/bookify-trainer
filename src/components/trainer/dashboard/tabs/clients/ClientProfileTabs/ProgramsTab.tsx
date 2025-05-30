
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HighlightText } from "./shared/HighlightText";
import { TrainerProgramDetailsDialog } from "./TrainerProgramDetailsDialog";
import { currentProgram } from "@/data/training";

interface ProgramsTabProps {
  searchQuery?: string;
}

export function ProgramsTab({ searchQuery = "" }: ProgramsTabProps) {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showProgramDetails, setShowProgramDetails] = useState(false);

  const handleViewDetails = () => {
    setSelectedProgram(currentProgram);
    setShowProgramDetails(true);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Assigned Programs</h3>
            <Button size="sm" variant="outline">Assign New</Button>
          </div>
          
          <div className="p-4 bg-gray-50 rounded mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">
                  <HighlightText text="Strength & Conditioning" highlight={searchQuery} />
                </h4>
                <p className="text-xs text-muted-foreground">Assigned on Jul 10, 2023</p>
              </div>
              <Badge variant="secondary">Current</Badge>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex justify-between items-center">
                <span>Progress:</span>
                <span>Week 3 of 8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleViewDetails}>
                View Details
              </Button>
              <Button variant="ghost" size="sm">Track Progress</Button>
            </div>
          </div>
          
          <h3 className="text-sm font-medium mt-4 mb-2">Previous Programs</h3>
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="font-medium">
              <HighlightText text="Flexibility & Recovery" highlight={searchQuery} />
            </h4>
            <div className="text-xs text-muted-foreground">Completed on Jun 15, 2023</div>
          </div>
        </CardContent>
      </Card>

      <TrainerProgramDetailsDialog 
        program={selectedProgram}
        open={showProgramDetails}
        onOpenChange={setShowProgramDetails}
        clientName="Sarah Johnson"
      />
    </>
  );
}
