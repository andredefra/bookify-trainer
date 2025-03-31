
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HighlightText } from "./shared/HighlightText";
import { useIsMobile } from "@/hooks/use-mobile";

interface GoalsTabProps {
  mockClientDetails: {
    goals: string[];
  };
  searchQuery?: string;
}

export function GoalsTab({ mockClientDetails, searchQuery = "" }: GoalsTabProps) {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
          <h3 className="text-sm font-medium">{isMobile ? "Goals" : "Active Goals"}</h3>
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full sm:w-auto"
          >
            Add Goal
          </Button>
        </div>
        
        <div className="space-y-3">
          {mockClientDetails.goals.map((goal, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded gap-2">
              <div>
                <div className="font-medium">
                  <HighlightText text={goal} highlight={searchQuery} />
                </div>
                <div className="text-xs text-muted-foreground">Target date: Aug 30, 2023</div>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  In progress
                </Badge>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Completed Goals</h3>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded gap-2">
            <div>
              <div className="font-medium">Attend 10 sessions</div>
              <div className="text-xs text-muted-foreground">Completed on Jul 15, 2023</div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mt-2 sm:mt-0">
              Completed
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
