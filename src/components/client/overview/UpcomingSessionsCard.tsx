
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Users, CalendarCheck, CreditCard } from "lucide-react";
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
  price?: number;
  attendees?: number;
  maxAttendees?: number;
}

interface UpcomingSessionsCardProps {
  upcomingSessions: SessionItem[];
}

export function UpcomingSessionsCard({ upcomingSessions }: UpcomingSessionsCardProps) {
  const navigate = useNavigate();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  
  const handleBookSession = (trainer: string) => {
    setSelectedTrainer(trainer);
    setShowBookingDialog(true);
  };
  
  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast.success(`Session booked successfully for ${data.date.toLocaleDateString()} at ${data.time}`);
    setShowBookingDialog(false);
    
    // Automatically show payment dialog after booking
    if (selectedTrainer) {
      const mockSession = {
        id: Math.floor(Math.random() * 1000),
        name: "Personal Training",
        trainer: selectedTrainer,
        time: data.time,
        date: data.date.toLocaleDateString(),
        status: "pending",
        price: 45
      };
      setSelectedSession(mockSession);
      setShowPaymentDialog(true);
    }
  };
  
  const handleRegisterForSession = (session: SessionItem) => {
    setSelectedSession(session);
    setShowPaymentDialog(true);
  };
  
  const handlePaymentSubmit = () => {
    toast.success("Payment successful! You're now registered for the session.");
    setShowPaymentDialog(false);
    // In a real app, this would update the session status in the database
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Live training sessions you can join</CardDescription>
        </div>
        <Button 
          onClick={() => navigate('/client-dashboard?tab=sessions')}
          className="flex items-center mr-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Find Sessions
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
                {session.attendees !== undefined && session.maxAttendees && (
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    <span>{session.attendees}/{session.maxAttendees} attending</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {session.status === 'registered' ? (
                  <>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Registered
                    </Badge>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <CalendarCheck className="h-3.5 w-3.5 mr-1" />
                      Add to Calendar
                    </Button>
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      {session.status === 'pending' ? 'Payment Required' : 'Available'}
                    </Badge>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex items-center" 
                      onClick={() => handleRegisterForSession(session)}
                    >
                      <CreditCard className="h-3.5 w-3.5 mr-1" />
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Demo upcoming session that can be joined */}
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div>
              <h3 className="font-medium">HIIT Workout (Featured)</h3>
              <div className="text-sm text-muted-foreground">
                With Sarah Johnson • Tomorrow • 10:00 - 11:00
              </div>
              <div className="text-sm font-medium mt-1">
                €35
              </div>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>12/20 attending</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Premium
              </Badge>
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center"
                onClick={() => handleRegisterForSession({
                  id: 999,
                  name: "HIIT Workout",
                  trainer: "Sarah Johnson",
                  time: "10:00 - 11:00",
                  date: "Tomorrow",
                  status: "available",
                  price: 35,
                  attendees: 12,
                  maxAttendees: 20
                })}
              >
                Register Now
              </Button>
            </div>
          </div>
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

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Complete Registration</DialogTitle>
              <DialogDescription>
                Register for {selectedSession?.name} with {selectedSession?.trainer}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-5 my-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">{selectedSession?.name}</div>
                  <div className="font-bold">€{selectedSession?.price || 50}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedSession?.date} at {selectedSession?.time}
                </div>
                {selectedSession?.attendees !== undefined && selectedSession?.maxAttendees && (
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{selectedSession.attendees}/{selectedSession.maxAttendees} attending</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="grid grid-cols-1 gap-3">
                  {["Google Pay", "PayPal", "Credit Card"].map((method) => (
                    <div key={method} className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id={`method-${method}`} 
                          name="paymentMethod"
                          className="h-4 w-4 mr-3"
                          defaultChecked={method === "Credit Card"}
                        />
                        <label htmlFor={`method-${method}`}>{method}</label>
                      </div>
                      {method === "Credit Card" && (
                        <span className="text-sm text-muted-foreground">ending in 4242</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4 text-sm">
                <p className="mb-2">By registering, you agree that:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Payment will be processed automatically when the session starts</li>
                  <li>Cancellations must be made at least 24 hours in advance</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePaymentSubmit}>
                Complete Registration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
