
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
            <Button variant="ghost" size="sm" className="ml-auto">
              Message
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              AT
            </div>
            <div>
              <div className="font-medium">Alex Thompson</div>
              <div className="text-xs text-muted-foreground">HIIT Specialist</div>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              Message
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-center py-4">
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
