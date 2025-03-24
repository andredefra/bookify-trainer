
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star } from "lucide-react";

export function TrainersTab() {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Trainers</CardTitle>
            <CardDescription>Your personal training team</CardDescription>
          </div>
          <Button 
            className="flex items-center"
            onClick={() => navigate('/find-trainer')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Find New Trainer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-medium">
                SJ
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">Personal Trainer</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="ml-1 text-sm font-medium">4.9</span>
                <span className="ml-1 text-xs text-muted-foreground">(48 reviews)</span>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button size="sm" onClick={() => navigate('/trainer/1')}>View Profile</Button>
                <Button variant="outline" size="sm">Message</Button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-medium">
                AT
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">Alex Thompson</h3>
              <p className="text-sm text-muted-foreground">HIIT Specialist</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="ml-1 text-sm font-medium">4.7</span>
                <span className="ml-1 text-xs text-muted-foreground">(32 reviews)</span>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button size="sm" onClick={() => navigate('/trainer/2')}>View Profile</Button>
                <Button variant="outline" size="sm">Message</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
