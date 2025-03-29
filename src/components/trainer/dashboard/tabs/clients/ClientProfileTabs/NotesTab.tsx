
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HighlightText } from "./shared/HighlightText";

interface NotesTabProps {
  mockClientDetails: {
    notes: string;
  };
  searchQuery?: string;
}

export function NotesTab({ mockClientDetails, searchQuery = "" }: NotesTabProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Client Notes</h3>
          <Button size="sm" variant="outline">Add Note</Button>
        </div>
        
        <div className="p-4 border rounded mb-4">
          <textarea 
            className="w-full h-24 text-sm resize-none focus:outline-none" 
            placeholder="Add notes about this client..."
            defaultValue={mockClientDetails.notes}
          />
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded">
            <div className="flex justify-between">
              <h4 className="font-medium text-sm">Session Notes - Jul 24, 2023</h4>
              <span className="text-xs text-muted-foreground">3 days ago</span>
            </div>
            <p className="text-sm mt-1">
              <HighlightText 
                text="Client reported feeling stronger during squat exercises. Increased weight by 5kg."
                highlight={searchQuery}
              />
            </p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded">
            <div className="flex justify-between">
              <h4 className="font-medium text-sm">Session Notes - Jul 17, 2023</h4>
              <span className="text-xs text-muted-foreground">10 days ago</span>
            </div>
            <p className="text-sm mt-1">
              <HighlightText 
                text="Focused on form for deadlifts. Client needs to work on keeping back straight."
                highlight={searchQuery}
              />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
