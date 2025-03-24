
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, DollarSign } from "lucide-react";

export function TrainerCard() {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>My Trainers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              SJ
            </div>
            <div>
              <div className="font-medium">Sarah Johnson</div>
              <div className="text-xs text-muted-foreground">Personal Trainer</div>
            </div>
            <div className="ml-auto flex gap-1">
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <DollarSign className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              AT
            </div>
            <div>
              <div className="font-medium">Alex Thompson</div>
              <div className="text-xs text-muted-foreground">HIIT Specialist</div>
            </div>
            <div className="ml-auto flex gap-1">
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <DollarSign className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between py-4">
        <Button 
          variant="outline"
          onClick={() => navigate('/client-dashboard?tab=trainers')}
        >
          View All Trainers
        </Button>
        <Button 
          variant="link" 
          onClick={() => navigate('/find-trainer')}
        >
          Find more trainers
        </Button>
      </CardFooter>
    </Card>
  );
}
