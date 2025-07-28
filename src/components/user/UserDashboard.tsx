import { useState } from "react";
import { UserHeader } from "./UserHeader";
import { UserSidebar } from "./UserSidebar";
import { UserOverview } from "./tabs/UserOverview";
import { UserTrainingProgram } from "./tabs/UserTrainingProgram";
import { UserTrainingLog } from "./tabs/UserTrainingLog";
import { UserAnalytics } from "./tabs/UserAnalytics";
import { UserTrainers } from "./tabs/UserTrainers";
import { UserMessages } from "./tabs/UserMessages";
import { UserSettings } from "./tabs/UserSettings";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  name: string;
  email: string;
  type: string;
  plan: string;
}

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
}

export function UserDashboardComponent({ user, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader
        user={user}
        onLogout={onLogout}
        onMobileMenuClick={() => setShowSidebar(!showSidebar)}
        showMobileMenuButton={isMobile}
      />
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          user={user}
          onLogout={onLogout}
        />
        
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Early Access Success Banner */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 p-2 rounded-full">
                  🎉
                </div>
                <h2 className="text-xl font-bold">Congratulazioni! Sei tra i primi 100 utenti!</h2>
              </div>
              <p className="text-white/90 mb-4">
                Hai accesso gratuito a tutte le funzionalità AI fino al prossimo anno. Potrai decidere quando annullare l'abbonamento e aggiungere un trainer personale nella sezione "My Trainers".
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✨ Accesso completo AI</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🆓 Gratuito fino al 2026</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">👨‍💼 Aggiungi trainer personale</span>
              </div>
            </div>
            
            {activeTab === "overview" && <UserOverview />}
            {activeTab === "training-program" && <UserTrainingProgram />}
            {activeTab === "training-log" && <UserTrainingLog />}
            {activeTab === "analytics" && <UserAnalytics />}
            {activeTab === "my-trainers" && <UserTrainers />}
            {activeTab === "messages" && <UserMessages />}
            {activeTab === "settings" && <UserSettings user={user} />}
          </div>
        </main>
      </div>
    </div>
  );
}