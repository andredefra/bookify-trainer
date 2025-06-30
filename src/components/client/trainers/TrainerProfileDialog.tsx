
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
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  MessageSquare, 
  Calendar, 
  DollarSign,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Users,
  Target,
  TrendingUp
} from "lucide-react";

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
  
  // Enhanced trainer data matching the landing page structure
  const trainerData = {
    1: {
      name: "Sarah Johnson",
      title: "Certified Personal Trainer",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop",
      specialty: "Personal Trainer",
      location: "New York, NY",
      hourlyRate: 50,
      rating: 4.9,
      reviews: 124,
      experience: "8+ years",
      certifications: ["NASM CPT", "ACE Nutrition Specialist", "Precision Nutrition Level 1"],
      specialties: ["Strength Training", "HIIT", "Weight Loss", "Nutrition"],
      bio: "Dedicated fitness professional with 8+ years of experience helping clients achieve their health and fitness goals. Specialized in strength training, weight loss, and nutrition coaching. My approach combines scientific methods with personalized attention to ensure every client reaches their potential.",
      education: "Bachelor's in Exercise Science, University of California",
      professionalExp: [
        {
          title: "Senior Personal Trainer",
          company: "FitLife Gym",
          period: "2019 - Present",
          description: "Working with 20+ clients weekly on personalized fitness programs. Achieved 95% client retention rate and helped over 150 clients reach their fitness goals."
        },
        {
          title: "Fitness Instructor",
          company: "Urban Health Club",
          period: "2016 - 2019",
          description: "Led group fitness classes and provided one-on-one training. Developed innovative HIIT programs that increased class attendance by 40%."
        }
      ],
      highlights: ["Certified", "Verified", "Top Rated", "Nutrition Expert"],
      stats: {
        clientsHelped: "200+",
        successRate: "95%",
        avgWeightLoss: "12 lbs",
        specializations: 4
      },
      availability: {
        monday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
        tuesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"], 
        wednesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
        thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
        friday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
        saturday: ["10:00 AM - 2:00 PM"],
        sunday: ["Closed"]
      }
    },
    2: {
      name: "Alex Thompson",
      title: "HIIT Specialist & CrossFit Coach",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
      specialty: "HIIT Specialist",
      location: "Los Angeles, CA",
      hourlyRate: 45,
      rating: 4.7,
      reviews: 98,
      experience: "6+ years",
      certifications: ["CrossFit Level 2", "HIIT Certified", "First Aid CPR", "Functional Movement Screen"],
      specialties: ["HIIT", "CrossFit", "Cardio", "Agility Training"],
      bio: "High-energy trainer focused on HIIT and cardiovascular fitness. I believe in pushing limits while maintaining proper form and safety. Specialized in helping clients break through plateaus and achieve peak performance through structured, intense workouts.",
      education: "Master's in Kinesiology, UCLA",
      professionalExp: [
        {
          title: "HIIT Specialist",
          company: "Elite Fitness Center",
          period: "2020 - Present",
          description: "Leading high-intensity interval training classes and personal sessions. Developed signature HIIT programs with 98% client satisfaction rate."
        },
        {
          title: "CrossFit Coach",
          company: "CrossFit Downtown", 
          period: "2018 - 2020",
          description: "Coached athletes in Olympic lifting and functional movements. Prepared 15+ athletes for regional competitions."
        }
      ],
      highlights: ["Certified", "CrossFit Expert", "HIIT Specialist", "Competition Coach"],
      stats: {
        clientsHelped: "150+",
        successRate: "92%",
        avgFitnessGain: "35%",
        specializations: 4
      },
      availability: {
        monday: ["5:00 AM - 7:00 PM"],
        tuesday: ["5:00 AM - 7:00 PM"],
        wednesday: ["6:00 AM - 8:00 PM"],
        thursday: ["5:00 AM - 7:00 PM"],
        friday: ["5:00 AM - 6:00 PM"],
        saturday: ["8:00 AM - 4:00 PM"],
        sunday: ["9:00 AM - 3:00 PM"]
      }
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
    : trainer?.rating || 0;

  if (!trainer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Trainer Profile</DialogTitle>
        </DialogHeader>
        
        {/* Hero Section */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
          <div className="absolute -bottom-16 left-8">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
              <AvatarImage src={trainer.image} alt={trainer.name} />
              <AvatarFallback className="text-2xl">{trainer.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="px-8 pt-20 pb-8">
          {/* Header Info */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{trainer.name}</h1>
                <div className="flex gap-1">
                  {trainer.highlights.map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <h2 className="text-xl text-gray-600 mb-4">{trainer.title}</h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{trainer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{trainer.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm">{averageRating.toFixed(1)} ({trainer.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">${trainer.hourlyRate}/hour</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-bold">{trainer.stats.clientsHelped}</div>
                  <div className="text-xs text-gray-500">Clients Helped</div>
                </Card>
                <Card className="p-4 text-center">
                  <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold">{trainer.stats.successRate}</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </Card>
                <Card className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-lg font-bold">{trainer.stats.avgWeightLoss || trainer.stats.avgFitnessGain}</div>
                  <div className="text-xs text-gray-500">Avg. Results</div>
                </Card>
                <Card className="p-4 text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                  <div className="text-lg font-bold">{trainer.stats.specializations}</div>
                  <div className="text-xs text-gray-500">Specializations</div>
                </Card>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 lg:min-w-[200px]">
              <Button size="lg" onClick={() => onBookSession(trainer.name)} className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Book Session
              </Button>
              <Button variant="outline" size="lg" onClick={() => onSendMessage(trainer.name)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="availability">Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {trainer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{trainer.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {trainer.professionalExp.map((exp, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <h4 className="font-semibold text-lg">{exp.title}</h4>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-lg mb-2">Education</h4>
                    <p className="text-gray-700">{trainer.education}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-lg mb-3">Certifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {trainer.certifications.map((cert) => (
                        <div key={cert} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <Award className="h-4 w-4 text-amber-600" />
                          <span className="font-medium">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
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
                      <span className="text-sm text-gray-600">
                        {averageRating.toFixed(1)} out of 5 stars
                      </span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">No reviews yet</p>
                      <p className="text-gray-400 text-sm">Be the first to leave a review!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">{review.clientName}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-gray-700">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="availability" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {Object.entries(trainer.availability).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                        <span className="font-medium capitalize text-gray-900">{day}</span>
                        <div className="text-right">
                          {Array.isArray(hours) && hours.length > 0 ? (
                            hours.map((timeSlot, index) => (
                              <div key={index} className="text-sm text-gray-600">
                                {timeSlot}
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">Closed</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Contact {trainer.name} to schedule a session or discuss availability for other times.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
