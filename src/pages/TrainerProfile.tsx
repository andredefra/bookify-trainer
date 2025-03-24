
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Star, Clock, MessageSquare, CalendarCheck, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock trainer data - in a real app this would come from an API
const trainerData = {
  id: "t1",
  name: "Sarah Johnson",
  title: "Certified Personal Trainer",
  bio: "Dedicated fitness professional with 8+ years of experience helping clients achieve their health and fitness goals. Specialized in strength training, weight loss, and nutrition coaching.",
  location: "New York, NY",
  rating: 4.9,
  reviews: 124,
  hourlyRate: 50,
  specialties: ["Strength Training", "HIIT", "Weight Loss", "Nutrition"],
  certifications: ["NASM CPT", "ACE Nutrition Specialist", "Precision Nutrition Level 1"],
  availability: {
    monday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    tuesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    wednesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    friday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    saturday: ["10:00 AM - 2:00 PM"],
    sunday: []
  },
  education: "Bachelor's in Exercise Science, University of California",
  experience: [
    {
      title: "Senior Personal Trainer",
      company: "FitLife Gym",
      period: "2019 - Present",
      description: "Working with 20+ clients weekly on personalized fitness programs."
    },
    {
      title: "Fitness Instructor",
      company: "Urban Health Club",
      period: "2016 - 2019",
      description: "Led group fitness classes and provided one-on-one training."
    }
  ],
  profileImage: "/placeholder.svg"
};

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    image: "/placeholder.svg",
    text: "Sarah completely transformed my approach to fitness. In just 3 months, I've lost 15 pounds and feel stronger than ever.",
    rating: 5
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    image: "/placeholder.svg",
    text: "Working with Sarah has been life-changing. She knows exactly how to push me while making workouts enjoyable.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chang",
    image: "/placeholder.svg",
    text: "Sarah's nutrition advice alongside the training program helped me finally break through my weight loss plateau.",
    rating: 4
  }
];

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(trainerData);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, we would fetch the trainer data using the ID
    // For this demo, we're just using the mock data
    window.scrollTo(0, 0);
  }, [id]);

  const handleBookSession = () => {
    toast({
      title: "Booking requested",
      description: "Your session request has been sent to Sarah.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              to="/find-trainer" 
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              ← Back to trainers
            </Link>
          </div>
          
          {/* Trainer header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="md:col-span-1">
              <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm">
                <div className="aspect-square relative">
                  <img 
                    src={trainer.profileImage} 
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-display font-bold tracking-tight text-primary">{trainer.name}</h1>
                <p className="text-lg text-muted-foreground">{trainer.title}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{trainer.location}</span>
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">{trainer.rating}</span>
                  <span className="text-muted-foreground">({trainer.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {trainer.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">{specialty}</Badge>
                ))}
              </div>
              
              <p className="text-base leading-relaxed">{trainer.bio}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" onClick={handleBookSession}>
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Book a Session
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">€{trainer.hourlyRate}</span>
                      <span className="text-muted-foreground">/hour</span>
                    </div>
                    <div className="flex items-center text-sm text-emerald-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Available today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Trainer details tabs */}
          <Tabs defaultValue="about" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {trainer.certifications.map((cert) => (
                      <li key={cert}>{cert}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{trainer.education}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Training Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    I believe in creating personalized fitness plans that fit your lifestyle and help you achieve sustainable results. 
                    My approach combines strength training, cardio, and nutrition guidance to ensure comprehensive fitness development.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience" className="space-y-6">
              {trainer.experience.map((exp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{exp.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {exp.company} | {exp.period}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-muted-foreground">{testimonial.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="text-center">
                <Button variant="outline">See All Reviews</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="availability" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(trainer.availability).map(([day, slots]) => (
                      <div key={day} className="border-b pb-3 last:border-b-0">
                        <h3 className="font-medium capitalize mb-2">{day}</h3>
                        {slots.length > 0 ? (
                          slots.map((slot, i) => (
                            <div key={i} className="text-sm">
                              <span>{slot}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">Not available</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Book an Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">
                      Choose a date and time to schedule your session with {trainer.name}.
                    </p>
                    <Button onClick={handleBookSession}>
                      <Calendar className="mr-2 h-4 w-4" />
                      View Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* App features for trainers */}
          <div className="mt-12">
            <h2 className="text-2xl font-display font-semibold text-center mb-8">
              How Personal.ai helps trainers like {trainer.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                    <CalendarCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
                  <p className="text-muted-foreground">
                    Trainers can sync with Google Calendar and allow clients to book directly based on availability.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Automated Payments</h3>
                  <p className="text-muted-foreground">
                    Get paid automatically when sessions are completed, with secure Stripe integration.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Client Communication</h3>
                  <p className="text-muted-foreground">
                    Chat with clients, send workout plans, and answer questions all in one platform.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/register">
                <Button size="lg" className="px-8">
                  Try Personal.ai for Your Training Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainerProfile;
