
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Index from "./pages/Index";
import IndexIta from "./pages/IndexIta";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindTrainer from "./pages/FindTrainer";
import TrainerProfile from "./pages/TrainerProfile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardBasic from "./pages/DashboardBasic";
import DashboardEssential from "./pages/DashboardEssential";
import ClientDashboard from "./pages/ClientDashboard";
import GymDashboard from "./pages/GymDashboard";
import StudioDashboard from "./pages/StudioDashboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import UserLanding from "./pages/UserLanding";
import UserLandingEn from "./pages/UserLandingEn";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserDashboard from "./pages/UserDashboard";
import GymOnboarding from "./pages/GymOnboarding";

const DomainRedirect = () => {
  useEffect(() => {
    const currentDomain = window.location.hostname;
    
    // Check if user is on mypersonalai.it (with or without www)
    if (currentDomain === 'mypersonalai.it' || currentDomain === 'www.mypersonalai.it') {
      // Preserve any URL parameters during redirect
      const currentParams = window.location.search;
      const newUrl = `https://my-personal-fit.it/user${currentParams}`;
      window.location.replace(newUrl);
    }
  }, []);

  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RevealObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
};

// Create the QueryClient instance outside of the component
const queryClient = new QueryClient();

// Separate the router part to properly scope the hooks
const AppContent = () => {
  return (
    <>
      <DomainRedirect />
      <ScrollToTop />
      <RevealObserver />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/it" element={<IndexIta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find-trainer" element={<FindTrainer />} />
        <Route path="/trainer/:idOrSlug" element={<TrainerProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-basic" element={<DashboardBasic />} />
        <Route path="/dashboard-essential" element={<DashboardEssential />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/studio-dashboard" element={<StudioDashboard />} />
        <Route path="/gym-dashboard" element={<GymDashboard />} />
        <Route path="/gym-onboarding/:token" element={<GymOnboarding />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/user" element={<UserLanding />} />
        <Route path="/user-en" element={<UserLandingEn />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
