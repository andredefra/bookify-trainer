
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Clock, Award, MessageSquare, Calendar } from "lucide-react";

interface TrainerProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainerId: number;
  trainerName: string;
  onBookSession: (trainerName: string) => void;
  onSendMessage: (trainerName: string) => void;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string;
  clientName: string;
}

export function TrainerProfileDialog({ 
  open, 
  onOpenChange, 
  trainerId, 
  trainerName,
  onBookSession,
  onSendMessage
}: TrainerProfileDialogProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Mock trainer data - in real app this would come from API
  const trainerData = {
    1: {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop",
      specialty: "Personal Trainer",
      location: "Downtown Gym",
      experience: "5+ years",
      certifications: ["NASM-CPT", "Yoga Alliance RYT-200", "Nutrition Specialist"],
      about: "Passionate personal trainer specializing in strength training and functional fitness. I help clients achieve their goals through personalized workout plans and nutritional guidance.",
      specialties: ["Strength Training", "Weight Loss", "Functional Fitness", "Nutrition"],
      availability: ["Monday: 6:00 AM - 8:00 PM", "Tuesday: 6:00 AM - 8:00 PM", "Wednesday: 6:00 AM - 8:00 PM"]
    },
    2: {
      name: "Alex Thompson",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
      specialty: "HIIT Specialist",
      location: "CrossFit Box",
      experience: "3+ years",
      certifications: ["CrossFit Level 2", "HIIT Certified", "First Aid CPR"],
      about: "High-energy trainer focused on HIIT and cardiovascular fitness. I believe in pushing limits while maintaining proper form and safety.",
      specialties: ["HIIT", "CrossFit", "Cardio", "Agility Training"],
      availability: ["Monday: 5:00 AM - 7:00 PM", "Tuesday: 5:00 AM - 7:00 PM", "Thursday: 5:00 AM - 7:00 PM"]
    }
  };

  const trainer = trainerData[trainerId as keyof typeof trainerData];

  useEffect(() => {
    // Load reviews from localStorage
    const existingReviews = JSON.parse(localStorage.getItem('trainer-reviews') || '{}');
    setReviews(existingReviews[trainerId] || []);
  }, [trainerId, open]);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (!trainer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Trainer Profile</DialogTitle>
        </DialogHeader>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <Avatar className="h-24 w-24 mx-auto md:mx-0">
            <AvatarImage src={trainer.image} alt={trainer.name} />
            <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{trainer.name}</h2>
            <p className="text-lg text-muted-foreground mb-2">{trainer.specialty}</p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {trainer.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {trainer.experience}
              </div>
              {reviews.length > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {trainer.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2 justify-center md:justify-start">
              <Button onClick={() => onBookSession(trainer.name)}>
                <Calendar className="h-4 w-4 mr-2" />
                Book Session
              </Button>
              <Button variant="outline" onClick={() => onSendMessage(trainer.name)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>About {trainer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{trainer.about}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="experience" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications & Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Experience</h4>
                    <p className="text-mulated-foreground">{trainer.experience} in the fitness industry</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert) => (
                        <Badge key={cert} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
                {reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= averageRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {averageRating.toFixed(1)} out of 5
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No reviews yet. Be the first to leave a review!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{review.clientName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="availability" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trainer.availability.map((schedule, index) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                      <span className="font-medium">{schedule}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Contact {trainer.name} to schedule a session or discuss availability for other times.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
