
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HighlightText } from "./shared/HighlightText";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus, Edit, CheckCircle, Target, Calendar, Trophy } from "lucide-react";

interface GoalsTabProps {
  mockClientDetails: {
    goals: string[];
  };
  searchQuery?: string;
}

export function GoalsTab({ mockClientDetails, searchQuery = "" }: GoalsTabProps) {
  const isMobile = useIsMobile();

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Fitness Program</CardTitle>
        <CardDescription>Client's active and completed goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Action buttons with mobile-friendly layout */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            className="w-full sm:w-auto flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Goal
          </Button>
          <Button 
            variant="outline"
            className="w-full sm:w-auto flex items-center justify-center"
          >
            <Target className="h-4 w-4 mr-1.5" />
            View Progress
          </Button>
        </div>
        
        {/* Active goals section */}
        <div className="active-goals-section pt-2">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Trophy className="h-4 w-4 mr-1.5 text-primary" />
            {isMobile ? "Current Goals" : "Active Goals"}
          </h3>
          <div className="goals-list space-y-3">
            {mockClientDetails.goals.map((goal, i) => (
              <div key={i} className="goal-item flex flex-col p-4 bg-gray-50 rounded-md">
                <div className="goal-content flex flex-col gap-2">
                  <div className="flex-1">
                    <div className="font-medium">
                      <HighlightText text={goal} highlight={searchQuery} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Target date: Aug 30, 2023</div>
                  </div>
                  
                  <div className="goal-actions flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mt-1 gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 py-1 text-xs flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> In progress
                    </Badge>
                    
                    <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center">
                      <Edit className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Completed goals section */}
        <div className="completed-goals-section pt-2 border-t border-gray-100">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1.5 text-blue-600" />
            Completed Goals
          </h3>
          <div className="completed-goal-item p-4 bg-gray-50 rounded-md">
            <div className="flex flex-col gap-2">
              <div className="flex-1">
                <div className="font-medium">Attend 10 sessions</div>
                <div className="text-xs text-muted-foreground mt-1">Completed on Jul 15, 2023</div>
              </div>
              
              <div className="flex items-center mt-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-1 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" /> Completed
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
