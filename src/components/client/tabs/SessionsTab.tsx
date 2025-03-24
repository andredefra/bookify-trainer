
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PlusCircle, Video, DollarSign, CalendarCheck, X, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";
import { toast } from "sonner";

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
  price?: number;
}

interface SessionsTabProps {
  upcomingSessions: SessionItem[];
}

export function SessionsTab({ upcomingSessions }: SessionsTabProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session');
  
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("Select a trainer");
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  
  // Available trainers for booking
  const availableTrainers = [
    { id: 1, name: "Sarah Johnson", speciality: "Personal Trainer" },
    { id: 2, name: "Alex Thompson", speciality: "HIIT Specialist" },
  ];
  
  useEffect(() => {
    // If a session ID is passed in the URL, find that session
    if (sessionId) {
      const session = upcomingSessions.find(s => s.id === parseInt(sessionId));
      if (session) {
        setSelectedSession(session);
      }
    }
  }, [sessionId, upcomingSessions]);
  
  const handleBookSession = () => {
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
  
  const handlePayForSession = (session: SessionItem) => {
    setSelectedSession(session);
    setShowPaymentDialog(true);
  };
  
  const handlePaymentSubmit = () => {
    toast.success("Payment successful!");
    setShowPaymentDialog(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>View and manage your scheduled sessions</CardDescription>
          </div>
          <Button 
            className="flex items-center"
            onClick={handleBookSession}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Book New Session
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
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
                  <div className="flex items-center space-x-2">
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
                          <Button variant="secondary" size="sm" className="flex items-center" onClick={() => handlePayForSession(session)}>
                            <DollarSign className="h-3.5 w-3.5 mr-1" />
                            Pay
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Pending
                        </Badge>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Strength Training</h3>
                  <div className="text-sm text-muted-foreground">
                    With Sarah Johnson • Last week • 15:00 - 16:00
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm">
                    Rate Session
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Cardio Kickboxing</h3>
                  <div className="text-sm text-muted-foreground">
                    With Alex Thompson • 2 weeks ago • 10:00 - 11:00
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Completed
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Summary
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="recurring">
            <div className="text-center py-8 text-muted-foreground">
              <p>No recurring sessions scheduled yet</p>
              <Button variant="outline" className="mt-4" onClick={handleBookSession}>
                <CalendarCheck className="mr-2 h-4 w-4" />
                Set Up Recurring Session
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Session Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Session</DialogTitle>
              <DialogDescription>
                Select a trainer, date and time for your session
              </DialogDescription>
            </DialogHeader>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Trainer</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableTrainers.map(trainer => (
                  <Button 
                    key={trainer.id}
                    variant={selectedTrainer === trainer.name ? "default" : "outline"}
                    className="justify-start h-auto py-3"
                    onClick={() => setSelectedTrainer(trainer.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                        {trainer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{trainer.name}</div>
                        <div className="text-xs text-muted-foreground">{trainer.speciality}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            
            <BookingForm 
              trainerName={selectedTrainer}
              onSubmit={handleBookingSubmit}
              onCancel={() => setShowBookingDialog(false)}
            />
          </DialogContent>
        </Dialog>
        
        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
              <DialogDescription>
                Pay for your session with {selectedSession?.trainer}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">{selectedSession?.name}</div>
                  <div className="font-bold">€{selectedSession?.price || 50}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedSession?.date} at {selectedSession?.time}
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="font-medium mb-2">Payment Method</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <div>Card ending in 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/24</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePaymentSubmit}>
                  Complete Payment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
