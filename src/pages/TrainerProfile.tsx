
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  MessageSquare, 
  CalendarCheck, 
  CreditCard,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  profileImage: "/placeholder.svg",
  status: "in-session",
  nextAvailability: "Today at 4:00 PM"
};

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

const aiConversation = [
  {
    sender: "client",
    message: "Hi, I need to reschedule my private session this week. Can I move it to Tuesday?",
    time: "10:23 AM"
  },
  {
    sender: "ai",
    message: "Hello! I see you currently have a session scheduled for Thursday at 3:00 PM. Let me check Sarah's availability for Tuesday. She has open slots at 10:00 AM and 4:00 PM on Tuesday. Would either of those work for you?",
    time: "10:24 AM"
  },
  {
    sender: "client",
    message: "4:00 PM on Tuesday works for me. Can you book that?",
    time: "10:26 AM"
  },
  {
    sender: "ai",
    message: "Perfect! I've rescheduled your session to Tuesday at 4:00 PM with Sarah. You'll receive a confirmation email shortly. Sarah has been notified of this change. Is there anything else you need help with?",
    time: "10:27 AM"
  }
];

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const bookingSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional()
});

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(trainerData);
  const { toast } = useToast();
  const [showRegister, setShowRegister] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  
  // Create separate forms with their own independent states
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const bookingForm = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      notes: ""
    }
  });

  // Reset the booking form when showing it
  useEffect(() => {
    if (showBookingForm) {
      bookingForm.reset({
        date: new Date(),
        time: "",
        notes: ""
      });
    }
  }, [showBookingForm, bookingForm]);

  // Reset the register form when showing it
  useEffect(() => {
    if (showRegister) {
      registerForm.reset({
        name: "",
        email: "",
        password: ""
      });
    }
  }, [showRegister, registerForm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBookSession = () => {
    if (!isLoggedIn) {
      setShowRegister(true);
    } else {
      setShowBookingForm(true);
    }
  };

  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("Register data:", data);
    setIsLoggedIn(true);
    setShowRegister(false);
    setShowBookingForm(true);
    toast({
      title: "Registration successful",
      description: "You can now book a session with Sarah.",
    });
  };

  const onBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    console.log("Booking data:", data);
    setShowBookingForm(false);
    toast({
      title: "Booking successful",
      description: `Your session with ${trainer.name} has been booked for ${data.date.toLocaleDateString()} at ${data.time}.`,
    });
  };

  const getStatusBadge = () => {
    switch (trainer.status) {
      case "online":
        return <Badge className="bg-emerald-500">Online</Badge>;
      case "in-session":
        return <Badge className="bg-amber-500">In Session</Badge>;
      case "offline":
        return <Badge className="bg-slate-500">Offline</Badge>;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (trainer.status) {
      case "online":
        return "Available now";
      case "in-session":
        return `Next available: ${trainer.nextAvailability}`;
      case "offline":
        return `Next available: ${trainer.nextAvailability}`;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              to="/find-trainer" 
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              ← Back to trainers
            </Link>
          </div>
          
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
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-display font-bold tracking-tight text-primary">{trainer.name}</h1>
                  {getStatusBadge()}
                </div>
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

                <div className="flex items-center gap-2 mt-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{getStatusMessage()}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {trainer.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">{specialty}</Badge>
                ))}
              </div>
              
              <p className="text-base leading-relaxed">{trainer.bio}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1" onClick={handleBookSession}>
                      <CalendarCheck className="mr-2 h-4 w-4" />
                      Book a Session
                    </Button>
                  </DialogTrigger>
                  
                  {showRegister ? (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create an account to book a session</DialogTitle>
                        <DialogDescription>
                          Join Personal.ai to book sessions with {trainer.name} and other trainers.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                          <FormField
                            control={registerForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end gap-3 pt-3">
                            <Button type="button" variant="outline" onClick={() => setShowRegister(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Create Account & Continue</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  ) : showBookingForm ? (
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Book a Session with {trainer.name}</DialogTitle>
                        <DialogDescription>
                          Select a date and time for your session
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Form {...bookingForm}>
                        <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-4">
                          <div className="mb-4">
                            <FormLabel>Select a date</FormLabel>
                            <div className="border rounded-md p-3 mt-2">
                              <CalendarComponent
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                  setSelectedDate(date);
                                  bookingForm.setValue('date', date as Date);
                                }}
                                className="mx-auto pointer-events-auto"
                                disabled={(date) => {
                                  const day = date.getDay();
                                  return day === 0 || date < new Date(new Date().setHours(0, 0, 0, 0));
                                }}
                              />
                            </div>
                          </div>
                          
                          <FormField
                            control={bookingForm.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select a time</FormLabel>
                                <FormControl>
                                  <select 
                                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    {...field}
                                  >
                                    <option value="">Select a time</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="2:00 PM">2:00 PM</option>
                                    <option value="3:00 PM">3:00 PM</option>
                                    <option value="4:00 PM">4:00 PM</option>
                                    <option value="5:00 PM">5:00 PM</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={bookingForm.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Notes (optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Any specific goals or concerns for this session?"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end gap-3 pt-3">
                            <Button type="button" variant="outline" onClick={() => setShowBookingForm(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Book Session</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  ) : null}
                </Dialog>
                
                <Dialog open={openMessageDialog} onOpenChange={setOpenMessageDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <span>Chat with AI Assistant</span>
                        <Badge variant="outline" className="ml-2 text-xs">Sarah is in session</Badge>
                      </DialogTitle>
                      <DialogDescription>
                        Our AI assistant can help you with scheduling, basic questions, and more while Sarah is unavailable.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto py-4 max-h-[400px]">
                      <div className="space-y-4 px-1">
                        {aiConversation.map((message, index) => (
                          <div 
                            key={index} 
                            className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`
                                max-w-[80%] p-3 rounded-lg 
                                ${message.sender === 'client' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                                }
                              `}
                            >
                              <div className="text-sm">{message.message}</div>
                              <div className={`text-xs mt-1 ${message.sender === 'client' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                {message.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t mt-auto">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Type your message..." 
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              toast({
                                description: "This is a demo conversation. In a real app, you would be able to send messages.",
                              });
                            }
                          }}
                        />
                        <Button size="sm" onClick={() => {
                          toast({
                            description: "This is a demo conversation. In a real app, you would be able to send messages.",
                          });
                        }}>
                          Send
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
