
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Video, DollarSign } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { toast } from "sonner";
import { z } from "zod";

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
  price?: number; // Adding optional price field
}

interface UpcomingSessionsCardProps {
  upcomingSessions: SessionItem[];
}

export function UpcomingSessionsCard({ upcomingSessions }: UpcomingSessionsCardProps) {
  const navigate = useNavigate();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  
  const handleBookSession = (trainer: string) => {
    setSelectedTrainer(trainer);
    setShowBookingDialog(true);
  };
  
  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast.success(`Session booked successfully for ${data.date.toLocaleDateString()} at ${data.time}`);
    setShowBookingDialog(false);
  };
  
  const handleJoinSession = (sessionId: number) => {
    // In a real app, this would join a video call
    toast.success("Joining session... This would launch a video call in a real app.");
  };
  
  const handlePayForSession = (sessionId: number) => {
    navigate('/client-dashboard?tab=trainers&view=payments');
    toast.success("Redirecting to payment page");
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled training sessions</CardDescription>
        </div>
        <Button 
          onClick={() => navigate('/client-dashboard?tab=sessions')}
          className="flex items-center mr-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">{session.name}</h3>
                <div className="text-sm text-muted-foreground">
                  With {session.trainer} • {session.date} • {session.time}
                </div>
                {session.price && (
                  <div className="text-sm font-medium mt-1">
                    €{session.price}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {session.status === 'confirmed' ? (
                  <>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Confirmed
                    </Badge>
                    <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleJoinSession(session.id)}>
                      <Video className="h-3.5 w-3.5 mr-1" />
                      Join
                    </Button>
                    {session.price && session.price > 0 && (
                      <Button variant="secondary" size="sm" className="flex items-center" onClick={() => handlePayForSession(session.id)}>
                        <DollarSign className="h-3.5 w-3.5 mr-1" />
                        Pay
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Pending
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/client-dashboard?tab=sessions&session=${session.id}`)}>
                      Details
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Session Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Session</DialogTitle>
              <DialogDescription>
                Select a date and time for your session with {selectedTrainer}
              </DialogDescription>
            </DialogHeader>
            <BookingForm 
              trainerName={selectedTrainer}
              onSubmit={handleBookingSubmit}
              onCancel={() => setShowBookingDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
