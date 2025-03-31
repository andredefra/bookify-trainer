
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HighlightText } from "./shared/HighlightText";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";

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
      <CardContent className="pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-sm font-medium mb-0">{isMobile ? "Goals" : "Active Goals"}</h3>
          <Button 
            size="sm" 
            className="w-full sm:w-auto flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Goal
          </Button>
        </div>
        
        <div className="space-y-4">
          {mockClientDetails.goals.map((goal, i) => (
            <div key={i} className="flex flex-col p-4 bg-gray-50 rounded-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
                <div className="flex-1">
                  <div className="font-medium">
                    <HighlightText text={goal} highlight={searchQuery} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Target date: Aug 30, 2023</div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-full sm:w-auto text-center sm:text-left">
                    In progress
                  </Badge>
                  <Button variant="ghost" size="sm" className="w-full sm:w-auto px-4">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-medium mb-4">Completed Goals</h3>
          <div className="flex flex-col p-4 bg-gray-50 rounded-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
              <div className="flex-1">
                <div className="font-medium">Attend 10 sessions</div>
                <div className="text-xs text-muted-foreground mt-1">Completed on Jul 15, 2023</div>
              </div>
              
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mt-2 sm:mt-0 w-full sm:w-auto text-center sm:text-left">
                Completed
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
