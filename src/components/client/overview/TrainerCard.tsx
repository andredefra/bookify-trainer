
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, DollarSign, CalendarCheck } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";
import { toast } from "sonner";

export function TrainerCard() {
  const navigate = useNavigate();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  
  const handleBookSession = (trainerName: string) => {
    setSelectedTrainer(trainerName);
    setShowBookingDialog(true);
  };
  
  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast.success(`Session booked successfully with ${selectedTrainer} for ${data.date.toLocaleDateString()} at ${data.time}`);
    setShowBookingDialog(false);
  };
  
  const handleMessageTrainer = (trainerName: string) => {
    navigate('/client-dashboard?tab=messages');
    toast.success(`Opening chat with ${trainerName}`);
  };
  
  const handlePayTrainer = (trainerName: string) => {
    navigate('/client-dashboard?tab=trainers&view=payments');
    toast.success(`Opening payment options for ${trainerName}`);
  };
  
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
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleMessageTrainer("Sarah Johnson")}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handlePayTrainer("Sarah Johnson")}
              >
                <DollarSign className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleBookSession("Sarah Johnson")}
              >
                <CalendarCheck className="h-4 w-4" />
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleMessageTrainer("Alex Thompson")}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handlePayTrainer("Alex Thompson")}
              >
                <DollarSign className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleBookSession("Alex Thompson")}
              >
                <CalendarCheck className="h-4 w-4" />
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
      
      {/* Session Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book a Session with {selectedTrainer}</DialogTitle>
            <DialogDescription>
              Select a date and time for your session
            </DialogDescription>
          </DialogHeader>
          <BookingForm 
            trainerName={selectedTrainer}
            onSubmit={handleBookingSubmit}
            onCancel={() => setShowBookingDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
