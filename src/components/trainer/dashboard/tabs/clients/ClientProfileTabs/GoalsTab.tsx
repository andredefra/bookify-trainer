
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HighlightText } from "./shared/HighlightText";

interface GoalsTabProps {
  mockClientDetails: {
    goals: string[];
  };
  searchQuery?: string;
}

export function GoalsTab({ mockClientDetails, searchQuery = "" }: GoalsTabProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <h3 className="text-sm font-medium">Active Goals</h3>
          <Button size="sm" variant="outline">Add Goal</Button>
        </div>
        
        {mockClientDetails.goals.map((goal, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <div className="font-medium">
                <HighlightText text={goal} highlight={searchQuery} />
              </div>
              <div className="text-xs text-muted-foreground">Target date: Aug 30, 2023</div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                In progress
              </Badge>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </div>
        ))}
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Completed Goals</h3>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <div className="font-medium">Attend 10 sessions</div>
              <div className="text-xs text-muted-foreground">Completed on Jul 15, 2023</div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Completed
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
