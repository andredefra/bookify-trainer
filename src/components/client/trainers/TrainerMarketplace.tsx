
import { useState } from "react";
import { Search, MapPin, Star, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Trainer data with real images
const trainers = [
  {
    id: "t1",
    name: "Sarah Johnson",
    specialty: "Strength Training",
    location: "New York, NY",
    rating: 4.9,
    reviews: 124,
    price: "€50",
    availability: "Available today",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: "t2",
    name: "Michael Thompson",
    specialty: "HIIT Workouts",
    location: "Los Angeles, CA",
    rating: 4.7,
    reviews: 98,
    price: "€45",
    availability: "Available tomorrow",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "t3",
    name: "Emma Davis",
    specialty: "Yoga Instructor",
    location: "Chicago, IL",
    rating: 4.8,
    reviews: 156,
    price: "€40",
    availability: "Available today",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "t4",
    name: "James Wilson",
    specialty: "Nutrition Coach",
    location: "Austin, TX",
    rating: 4.6,
    reviews: 87,
    price: "€60",
    availability: "Available this week",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
  }
];

export function TrainerMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
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
  
  const filteredTrainers = trainers.filter(trainer => 
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter by location if provided
  const locationFilteredTrainers = location 
    ? filteredTrainers.filter(trainer => 
        trainer.location.toLowerCase().includes(location.toLowerCase())
      )
    : filteredTrainers;
  
  return (
    <div className="space-y-6">
      {/* Search and filter */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search for trainers or specialties"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Trainer cards */}
      <ScrollArea className="h-[calc(100vh-350px)] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
          {locationFilteredTrainers.map((trainer) => (
            <div key={trainer.id} className="bg-background rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${trainer.image})` }}
                ></div>
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{trainer.name}</h3>
                      <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10">
                      {trainer.price}/session
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{trainer.location}</span>
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm">
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <span>{trainer.rating}</span>
                    <span className="text-muted-foreground ml-1">({trainer.reviews} reviews)</span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-emerald-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{trainer.availability}</span>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleBookSession(trainer.name)}
                    >
                      Book Session
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
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
    </div>
  );
}
