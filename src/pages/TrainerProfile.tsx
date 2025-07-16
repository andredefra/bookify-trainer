
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import refactored components
import { TrainerHeader } from "@/components/trainer/TrainerHeader";
import { TrainerInfo } from "@/components/trainer/TrainerInfo";
import { MarketingSection } from "@/components/trainer/MarketingSection";
import { registerSchema } from "@/components/trainer/RegisterForm";
import { bookingSchema } from "@/components/trainer/BookingForm";
import { SessionDialogs } from "@/components/trainer/SessionDialogs";
import { ChatDialog } from "@/components/trainer/ChatDialog";
import { TabsSection } from "@/components/trainer/TabsSection";

// Import hooks and types
import { useTrainerProfile, type TrainerProfile } from "@/hooks/useTrainerProfile";
import { useTrainerReviews } from "@/hooks/useTrainerReviews";
import { useTrainerGymAffiliations } from "@/hooks/useTrainerGymAffiliations";

// Import mock data as fallback
import { 
  trainerData as defaultTrainerData, 
  testimonials, 
  aiConversation,
  getTrainerById,
  Trainer
} from "@/data/trainerMockData";

const TrainerProfile = () => {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [trainer, setTrainer] = useState<Trainer>(defaultTrainerData);
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(null);
  const [trainerId, setTrainerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);

  const { reviews, averageRating, totalReviews } = useTrainerReviews(trainerId || undefined);
  const { affiliations, searchGyms } = useTrainerGymAffiliations(trainerId || undefined);
  const [primaryGymInfo, setPrimaryGymInfo] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTrainerData();
  }, [idOrSlug]);

  const fetchTrainerData = async () => {
    if (!idOrSlug) return;
    
    setLoading(true);
    try {
      // First try to find by slug
      let { data: profileData, error } = await supabase
        .from('trainer_profiles')
        .select('*')
        .eq('slug', idOrSlug)
        .eq('is_public', true)
        .maybeSingle();

      // If not found by slug, try by trainer_id (fallback to old ID system)
      if (!profileData) {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('trainer_profiles')
          .select('*')
          .eq('trainer_id', idOrSlug)
          .eq('is_public', true)
          .maybeSingle();
        
        profileData = fallbackData;
        error = fallbackError;
      }

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (profileData) {
        setTrainerProfile(profileData);
        setTrainerId(profileData.trainer_id);
        
        // Convert database profile to trainer format for existing components
        const convertedTrainer: Trainer = {
          id: profileData.trainer_id,
          name: profileData.title || "Personal Trainer",
          title: profileData.title || "Personal Trainer",
          bio: profileData.bio || "",
          location: profileData.location || "",
          rating: averageRating || 4.9,
          reviews: totalReviews || 0,
          specialties: (profileData.specialties as string[]) || [],
          hourlyRate: profileData.hourly_rate || 50,
          profileImage: profileData.profile_image_url || defaultTrainerData.profileImage,
          certifications: Array.isArray(profileData.certifications) ? 
            (profileData.certifications as any[]).map(cert => typeof cert === 'string' ? cert : cert.name || 'Certification') : [],
          education: typeof profileData.education === 'string' ? profileData.education : "Education details",
          experience: Array.isArray(profileData.experience) ? 
            (profileData.experience as any[]).map(exp => ({
              title: exp.title || "Position",
              company: exp.company || "Company",
              period: exp.period || "Period",
              description: exp.description || "Description"
            })) : [],
          availability: defaultTrainerData.availability, // Will be replaced with real data later
          status: "online" as const,
          nextAvailability: "Today at 2:00 PM"
        };
        
        setTrainer(convertedTrainer);
        
        // Fetch primary gym info if available
        if (profileData.primary_gym_id) {
          const allGyms = await searchGyms("");
          const primaryGym = allGyms.find(gym => gym.id === profileData.primary_gym_id);
          if (primaryGym) {
            setPrimaryGymInfo(primaryGym);
          }
        }
      } else {
        // Fallback to mock data for demo
        const mockTrainer = getTrainerById(idOrSlug);
        if (mockTrainer) {
          setTrainer(mockTrainer);
        } else {
          navigate('/404');
          return;
        }
      }
    } catch (error) {
      console.error('Error fetching trainer data:', error);
      toast({
        title: "Error",
        description: "Failed to load trainer profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading trainer profile...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Convert reviews to testimonials format for existing components
  const reviewTestimonials = reviews.map(review => ({
    id: Number(review.id.slice(-6)),
    name: `Client ${review.client_id.slice(0, 8)}`,
    image: "https://images.unsplash.com/photo-1494790108755-2616b32ff93d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80",
    text: review.comment || "Great session!",
    rating: review.rating
  }));

  const displayTestimonials = reviewTestimonials.length > 0 ? reviewTestimonials : testimonials;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <TrainerHeader trainer={trainer} />
          
          <div className="md:col-span-2 space-y-6">
            <TrainerInfo 
              trainer={trainer} 
              onBookSession={handleBookSession}
              onMessageClick={() => setOpenMessageDialog(true)}
              primaryGym={primaryGymInfo}
            />
          </div>
          
          <TabsSection 
            trainer={trainer} 
            testimonials={displayTestimonials} 
            onBookSession={handleBookSession} 
          />
          
          <MarketingSection trainerName={trainer.name} />
          
          {/* Dialogs */}
          <SessionDialogs 
            trainerName={trainer.name}
            showRegister={showRegister}
            showBookingForm={showBookingForm}
            onRegisterSubmit={onRegisterSubmit}
            onBookingSubmit={onBookingSubmit}
            onRegisterCancel={() => setShowRegister(false)}
            onBookingCancel={() => setShowBookingForm(false)}
          />
          
          <ChatDialog 
            open={openMessageDialog}
            onOpenChange={setOpenMessageDialog}
            trainerName={trainer.name}
            conversation={aiConversation}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainerProfile;
