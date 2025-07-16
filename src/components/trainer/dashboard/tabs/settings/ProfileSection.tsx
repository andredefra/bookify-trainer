
import { useState, useEffect } from "react";
import { ProfileImageUpload } from "./profile/ProfileImageUpload";
import { PersonalInfoForm } from "./profile/PersonalInfoForm";

import { AIAssistantSettings } from "./profile/AIAssistantSettings";
import { getDefaultProfileImage } from "@/utils/demoUserUtils";

interface ProfileSectionProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  };
}

export function ProfileSection({ user }: ProfileSectionProps) {
  // Use the default image from our utility
  const defaultImage = getDefaultProfileImage();
  
  const [name, setName] = useState(user.name || "Demo Trainer");
  const [profileImage, setProfileImage] = useState<string>(user.profileImage || defaultImage);
  
  // Update local storage when profile image changes
  useEffect(() => {
    const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
    if (demoUser.email === user.email && profileImage !== demoUser.profileImage) {
      demoUser.profileImage = profileImage;
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
    }
  }, [profileImage, user.email]);
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Private Profile Settings</h3>
        <p className="text-sm text-muted-foreground">Internal settings for your trainer account.</p>
        
        <ProfileImageUpload 
          name={name}
          profileImage={profileImage}
          defaultImage={defaultImage}
          userEmail={user.email}
          onImageChange={setProfileImage}
        />
        
        <PersonalInfoForm initialName={name} userEmail={user.email} />
      </div>
      
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">AI Assistant Settings</h3>
        <p className="text-sm text-muted-foreground">Configure how your AI assistant interacts with clients.</p>
        <AIAssistantSettings />
      </div>
    </div>
  );
}
