
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
import ClientDemoDialog from "@/components/ClientDemoDialog";
import { getPublicDemoProfile, getPublicDemoRecord } from "@/data/publicDemoProfiles";

// Import refactored components
import { PublicHeader, type PublicProfileTab } from "@/components/trainer/PublicHeader";
import { MarketingSection } from "@/components/trainer/MarketingSection";
import { registerSchema } from "@/components/trainer/RegisterForm";
import { bookingSchema } from "@/components/trainer/BookingForm";
import { SessionDialogs } from "@/components/trainer/SessionDialogs";
import { ChatDialog } from "@/components/trainer/ChatDialog";
import { useLanguage } from "@/context/LanguageContext";
import type { PublicBookingSelection } from "@/data/trainerMockData";

// Import hooks and types
import { useTrainerProfile, type TrainerProfile } from "@/hooks/useTrainerProfile";
import { useTrainerReviews } from "@/hooks/useTrainerReviews";
import { useTrainerGymAffiliations } from "@/hooks/useTrainerGymAffiliations";

// Import mock data as fallback
import { 
  trainerData as defaultTrainerData, 
  aiConversation,
  Trainer
} from "@/data/trainerMockData";

const TrainerProfile = () => {
  const { idOrSlug } = useParams();
  const [searchParams] = useSearchParams();
  const consumer = searchParams.get('from') === 'user';
  const PageNavbar = consumer ? UserNavbar : Navbar;
  const PageFooter = consumer ? UserFooter : Footer;
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [bookingSelection, setBookingSelection] = useState<PublicBookingSelection | null>(null);
  
  const [trainer, setTrainer] = useState<Trainer>(defaultTrainerData);
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(null);
  const [trainerId, setTrainerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<PublicProfileTab>("about");
  const demoTrainer = getPublicDemoRecord(trainer.id);

  const { reviews, averageRating, totalReviews } = useTrainerReviews(trainerId || undefined);
  const { affiliations, searchGyms } = useTrainerGymAffiliations(trainerId || undefined);
  const [primaryGymInfo, setPrimaryGymInfo] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab("about");
    fetchTrainerData();
  }, [idOrSlug]);

  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const fetchTrainerData = async () => {
    if (!idOrSlug) return;

    setLoading(true);
    setTrainerProfile(null);
    setTrainerId(null);
    setPrimaryGymInfo(null);
    const publicDemo = getPublicDemoProfile(idOrSlug);
    if (publicDemo) {
      setTrainer(publicDemo);
      setLoading(false);
      return;
    }

    // Try the database first. A miss or an error here must never swallow the
    // mock-data fallback below.
    let profileData: any = null;
    try {
      // First try to find by slug
      const { data: slugData, error: slugError } = await supabase
        .from('trainer_profiles')
        .select('*')
        .eq('slug', idOrSlug)
        .eq('is_public', true)
        .maybeSingle();

      if (slugError) throw slugError;
      profileData = slugData;

      // If not found by slug, try by trainer_id (fallback to old ID system).
      // trainer_id is a uuid column — only query it when the param actually
      // looks like a UUID, otherwise Postgres throws 22P02 on "1", "2", etc.
      if (!profileData && UUID_REGEX.test(idOrSlug)) {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('trainer_profiles')
          .select('*')
          .eq('trainer_id', idOrSlug)
          .eq('is_public', true)
          .maybeSingle();

        if (fallbackError) throw fallbackError;
        profileData = fallbackData;
      }
    } catch (dbError) {
      console.error('Error fetching trainer profile from database:', dbError);
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
      setLoading(false);
      return;
    }

    // Fallback to mock data for demo
    const mockTrainer = getPublicDemoProfile(idOrSlug);
    if (mockTrainer) {
      setTrainer(mockTrainer);
      setLoading(false);
      return;
    }

    // Only surface the destructive toast when neither source resolved the profile
    console.error(`Trainer profile "${idOrSlug}" not found in database or mock data`);
    toast({
      title: "Error",
      description: "Failed to load trainer profile",
      variant: "destructive",
    });
    navigate('/404');
    setLoading(false);
  };

  const handleBookSession = () => {
    setShowDemoDialog(true);
  };

  const handleOfferBook = (selection: PublicBookingSelection) => {
    if (consumer) { setShowDemoDialog(true); return; }
    setBookingSelection(selection);
    if (!isLoggedIn) setShowRegister(true);
    else setShowBookingForm(true);
  };

  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    setIsLoggedIn(true);
    setShowRegister(false);
    setShowBookingForm(true);
    if (!demoTrainer) toast({
      title: "Registration successful",
      description: "You can now book a session with Sarah.",
    });
  };

  const onBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    setShowBookingForm(false);
    if (demoTrainer) {
      toast({ title: t("publicProfile.demoTitle"), description: t("publicProfile.demoNote") });
      return;
    }
    toast({
      title: "Booking successful",
      description: `Your session with ${trainer.name} has been booked for ${data.date.toLocaleDateString()} at ${data.time}.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <PageNavbar />
        <main className="flex-grow pt-16 pb-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading trainer profile...</p>
              </div>
            </div>
          </div>
        </main>
        <PageFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageNavbar />
      
      <main className={`flex-grow pt-16${consumer ? " pb-16" : ""}`}>
        <PublicHeader
          trainer={trainer}
          demoTrainer={demoTrainer}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBookSession={handleBookSession}
          onOfferBook={handleOfferBook}
          onMessageClick={() => setShowDemoDialog(true)}
          primaryGym={primaryGymInfo}
        />
        {!consumer && <MarketingSection trainerName={trainer.name} />}
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ClientDemoDialog open={showDemoDialog} onOpenChange={setShowDemoDialog} context={consumer ? 'client' : 'trainer'} />
          
          {/* Dialogs */}
          <SessionDialogs 
            trainerName={trainer.name}
            showRegister={showRegister}
            showBookingForm={showBookingForm}
            selection={bookingSelection}
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
      
      <PageFooter />
    </div>
  );
};

export default TrainerProfile;
