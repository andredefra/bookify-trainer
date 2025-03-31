
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, DollarSign, CalendarCheck, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";
import { toast } from "sonner";
import { PaymentDialog } from "@/components/shared/PaymentDialog";
import { useMediaQuery } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TrainerCard() {
  const navigate = useNavigate();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Mock user plan - in a real app, this would come from your user context or state
  const userPlan = localStorage.getItem('user-plan') || "freemium";
  
  const handleBookSession = (trainerName: string) => {
    setSelectedTrainer(trainerName);
    setShowBookingDialog(true);
  };
  
  const handlePayTrainer = (trainerName: string) => {
    setSelectedTrainer(trainerName);
    setShowPaymentDialog(true);
  };
  
  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast.success(`Session booked successfully with ${selectedTrainer} for ${data.date.toLocaleDateString()} at ${data.time}`);
    setShowBookingDialog(false);
  };
  
  const handlePaymentComplete = () => {
    toast.success(`Payment to ${selectedTrainer} completed successfully`);
    setShowPaymentDialog(false);
  };
  
  const handleMessageTrainer = (trainerName: string) => {
    navigate('/client-dashboard?tab=messages');
    toast.success(`Opening chat with ${trainerName}`);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>My Trainers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sarah Johnson */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop" 
                alt="Sarah Johnson" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">Sarah Johnson</div>
              <div className="text-xs text-muted-foreground">Personal Trainer</div>
            </div>
            {isMobile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleMessageTrainer("Sarah Johnson")}>
                    Message
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePayTrainer("Sarah Johnson")}>
                    Pay
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBookSession("Sarah Johnson")}>
                    Book Session
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )}
          </div>
          
          {/* Alex Thompson */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" 
                alt="Alex Thompson"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">Alex Thompson</div>
              <div className="text-xs text-muted-foreground">HIIT Specialist</div>
            </div>
            {isMobile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleMessageTrainer("Alex Thompson")}>
                    Message
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePayTrainer("Alex Thompson")}>
                    Pay
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBookSession("Alex Thompson")}>
                    Book Session
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex flex-col sm:flex-row justify-between gap-2 py-4">
        <Button 
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => navigate('/client-dashboard', { 
            state: { 
              activeTab: "trainers"
            } 
          })}
        >
          View All Trainers
        </Button>
        <Button 
          variant="link" 
          className="w-full sm:w-auto"
          onClick={() => navigate('/client-dashboard', { 
            state: { 
              activeTab: "trainers", 
              discoverTrainers: true 
            } 
          })}
        >
          Find more trainers
        </Button>
      </CardFooter>
      
      {/* Session Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className={isMobile ? "w-[calc(100%-2rem)] max-w-lg p-4" : undefined}>
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
      
      {/* Payment Dialog */}
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        item={{
          id: `trainer-payment-${Date.now()}`,
          name: `Payment to ${selectedTrainer}`,
          price: 45,
          description: "Direct payment for trainer services",
          reference: "Direct Payment"
        }}
        onPaymentComplete={handlePaymentComplete}
        title={`Pay ${selectedTrainer}`}
        description="Complete payment for trainer services"
        isPremiumFeature={true}
        userPlan={userPlan}
      />
    </Card>
  );
}
