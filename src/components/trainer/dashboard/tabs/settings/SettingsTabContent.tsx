
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ChevronRight, Settings as SettingsIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-mobile";

import { ProfileSection } from "./ProfileSection";
import { AvailabilitySection } from "./AvailabilitySection";
import { MembershipSection } from "./MembershipSection";
import { BillingSection } from "./BillingSection";

interface SettingsTabContentProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
}

export function SettingsTabContent({ user }: SettingsTabContentProps) {
  if (!user) return null;
  
  // Set the default profile image
  const updatedUser = {
    ...user,
    profileImage: user.profileImage || "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
  };
  
  const [selectedSection, setSelectedSection] = useState("profile");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSaveChanges = () => {
    toast({
      title: "Success",
      description: "Settings saved successfully",
      variant: "default",
    });
    
    // Save the updated profile image to localStorage if it was changed
    const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
    if (demoUser.email === user.email) {
      demoUser.profileImage = updatedUser.profileImage;
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
    }
  };

  const sections = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "availability", label: "Availability", icon: "📅" },
    { id: "membership", label: "Membership", icon: "🌟" },
    { id: "billing", label: "Billing", icon: "💳" }
  ];

  return (
    <div className="bg-white rounded-lg shadow sm:overflow-hidden">
      {/* Mobile header with settings icon */}
      <div className="p-4 border-b md:hidden">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Menu</div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar navigation */}
        <div className="w-full md:w-64 border-r bg-muted/20">
          <ScrollArea className="h-full max-h-[calc(100vh-12rem)]">
            <nav className="flex flex-col divide-y divide-border">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${
                    selectedSection === section.id
                      ? "bg-primary/5 text-primary" 
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{section.icon}</span>
                    <span>{section.label}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 ml-auto ${selectedSection === section.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </button>
              ))}
            </nav>
          </ScrollArea>
        </div>
        
        {/* Content area */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="hidden md:block mb-6">
            <h2 className="text-2xl font-bold">
              {sections.find(s => s.id === selectedSection)?.label || "Settings"}
            </h2>
            <p className="text-muted-foreground">
              Manage your {selectedSection} settings
            </p>
          </div>
          
          <div className="space-y-6">
            {selectedSection === "profile" && <ProfileSection user={updatedUser} />}
            {selectedSection === "availability" && <AvailabilitySection />}
            {selectedSection === "membership" && <MembershipSection user={updatedUser} />}
            {selectedSection === "billing" && <BillingSection user={updatedUser} />}
          </div>
          
          <div className="mt-8 pt-4 border-t">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
