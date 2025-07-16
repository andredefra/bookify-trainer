import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { SettingsSidebar } from "./components/SettingsSidebar";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsFooter } from "./components/SettingsFooter";

import { ProfileSection } from "./ProfileSection";
import { PublicProfileSection } from "./sections/PublicProfileSection";
import { AvailabilitySection } from "./AvailabilitySection";
import { InvoicingSection } from "./InvoicingSection";
import { MembershipSection } from "./MembershipSection";
import { BillingSection } from "./BillingSection";
import { MyGymsSection } from "./sections/MyGymsSection";

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

  return (
    <div className="bg-white rounded-lg shadow sm:overflow-hidden">
      {/* Mobile header with settings icon */}
      <div className="p-4 border-b md:hidden">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Settings</div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar navigation */}
        <SettingsSidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        
        {/* Content area */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <SettingsHeader selectedSection={selectedSection} />
          
          <div className="space-y-6">
            {selectedSection === "profile" && <ProfileSection user={updatedUser} />}
            {selectedSection === "public-profile" && <PublicProfileSection user={updatedUser} />}
            {selectedSection === "availability" && <AvailabilitySection />}
            {selectedSection === "my-gyms" && <MyGymsSection trainerId={user?.email} />}
            {selectedSection === "invoicing" && <InvoicingSection />}
            {selectedSection === "membership" && <MembershipSection user={updatedUser} />}
            {selectedSection === "billing" && <BillingSection user={updatedUser} />}
          </div>
          
        {selectedSection !== "invoicing" && selectedSection !== "my-gyms" && (
          <SettingsFooter onSave={handleSaveChanges} />
        )}
        </div>
      </div>
    </div>
  );
}
