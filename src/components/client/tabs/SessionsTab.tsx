
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PlusCircle, Users, CalendarCheck, CreditCard, Calendar, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

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
  description?: string;
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
  const [showSessionDetailsDialog, setShowSessionDetailsDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("Select a trainer");
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Available trainers for booking
  const availableTrainers = [
    { id: 1, name: "Sarah Johnson", speciality: "Personal Trainer" },
    { id: 2, name: "Alex Thompson", speciality: "HIIT Specialist" },
  ];

  // Available public sessions
  const availableSessions = [
    { 
      id: 101, 
      name: "HIIT Morning Workout", 
      trainer: "Sarah Johnson", 
      time: "08:00 - 09:00", 
      date: "Monday, July 3", 
      status: "available", 
      price: 25,
      attendees: 8,
      maxAttendees: 15,
      description: "Start your day with a high-intensity interval training session designed to boost your metabolism and energy levels."
    },
    { 
      id: 102, 
      name: "Yoga for Beginners", 
      trainer: "Alex Thompson", 
      time: "18:00 - 19:00", 
      date: "Tuesday, July 4", 
      status: "available", 
      price: 20,
      attendees: 12,
      maxAttendees: 20,
      description: "A gentle introduction to yoga fundamentals, focusing on proper alignment and breathing techniques."
    },
    { 
      id: 103, 
      name: "Core Strength", 
      trainer: "Sarah Johnson", 
      time: "17:00 - 18:00", 
      date: "Wednesday, July 5", 
      status: "available", 
      price: 30,
      attendees: 5,
      maxAttendees: 12,
      description: "Focus on building core strength and stability with a series of targeted exercises for your abdominals, lower back, and pelvis."
    },
    { 
      id: 999, 
      name: "HIIT Workout (Featured)",
      trainer: "Sarah Johnson", 
      time: "10:00 - 11:00", 
      date: "Tomorrow", 
      status: "available", 
      price: 35,
      attendees: 12,
      maxAttendees: 20,
      description: "A premium high-intensity interval training session with one of our top trainers. This session is designed for all fitness levels with modifications provided."
    }
  ];

  const filteredSessions = availableSessions.filter(session => 
    session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.trainer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    // If a session ID is passed in the URL, find that session
    if (sessionId) {
      const session = upcomingSessions.find(s => s.id === parseInt(sessionId));
      if (session) {
        setSelectedSession(session);
        setShowSessionDetailsDialog(true);
      }
    }
  }, [sessionId, upcomingSessions]);
  
  const handleBookSession = () => {
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
  
  const handleViewSessionDetails = (session: SessionItem) => {
    setSelectedSession(session);
    setShowSessionDetailsDialog(true);
  };
  
  const handleRegisterForSession = (session: SessionItem) => {
    setSelectedSession(session);
    setShowPaymentDialog(true);
    setShowSessionDetailsDialog(false);
  };
  
  const handlePaymentSubmit = () => {
    toast.success("Payment successful! You're now registered for the session.");
    setShowPaymentDialog(false);
    // In a real app, this would update the session status in the database
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Discover and register for live training sessions</CardDescription>
          </div>
          <Button 
            className="flex items-center"
            onClick={handleBookSession}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Book Private Session
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">My Sessions</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
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
                    {session.attendees !== undefined && session.maxAttendees && (
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>{session.attendees}/{session.maxAttendees} attending</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.status === 'registered' || session.status === 'confirmed' ? (
                      <>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Registered
                        </Badge>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <CalendarCheck className="h-3.5 w-3.5 mr-1" />
                          Add to Calendar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </>
                    ) : session.status === 'pending' ? (
                      <>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Payment Required
                        </Badge>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="flex items-center" 
                          onClick={() => handleRegisterForSession(session)}
                        >
                          <CreditCard className="h-3.5 w-3.5 mr-1" />
                          Complete Registration
                        </Button>
                        <Button variant="ghost" size="sm">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Available
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => handleViewSessionDetails(session)}>
                          Details
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
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Premium
                  </Badge>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => handleViewSessionDetails(availableSessions[3])}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="discover">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for sessions or trainers..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{session.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      With {session.trainer} • {session.date} • {session.time}
                    </div>
                    <div className="text-sm font-medium mt-1">
                      €{session.price}
                    </div>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>{session.attendees}/{session.maxAttendees} attending</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewSessionDetails(session)}
                    >
                      Details
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleRegisterForSession(session)}
                    >
                      Register
                    </Button>
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
        </Tabs>
        
        {/* Session Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Private Session</DialogTitle>
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
        
        {/* Session Details Dialog */}
        <Dialog open={showSessionDetailsDialog} onOpenChange={setShowSessionDetailsDialog}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedSession?.name}</DialogTitle>
              <DialogDescription>
                Session details and registration
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 my-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{selectedSession?.date}, {selectedSession?.time}</span>
                </div>
                <Badge variant={selectedSession?.id === 999 ? "default" : "outline"}>
                  {selectedSession?.id === 999 ? "Premium" : "Standard"}
                </Badge>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Trainer</div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-2">
                    {selectedSession?.trainer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>{selectedSession?.trainer}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Attendance</div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{selectedSession?.attendees}/{selectedSession?.maxAttendees} attending</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Price</div>
                <div className="text-lg font-bold">€{selectedSession?.price}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Description</div>
                <p className="text-sm text-muted-foreground">
                  {selectedSession?.description || "No description available."}
                </p>
              </div>
              
              <div className="pt-2 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowSessionDetailsDialog(false)}>
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    if (selectedSession) handleRegisterForSession(selectedSession);
                  }}
                >
                  Register for Session
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
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
