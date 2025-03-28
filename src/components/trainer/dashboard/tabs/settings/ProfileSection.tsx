
import { useState, useEffect } from "react";
import { ProfileImageUpload } from "./profile/ProfileImageUpload";
import { PersonalInfoForm } from "./profile/PersonalInfoForm";
import { CertificationsForm } from "./profile/CertificationsForm";
import { AIAssistantSettings } from "./profile/AIAssistantSettings";

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
  // Use a general image of a man as default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";
  
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
        <h3 className="text-lg font-medium">Trainer Profile</h3>
        <p className="text-sm text-muted-foreground">This information will be displayed on your public profile page.</p>
        
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
        <h3 className="text-lg font-medium">Certifications</h3>
        <p className="text-sm text-muted-foreground">Add your professional certifications to build client trust.</p>
        <CertificationsForm />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">AI Assistant Settings</h3>
        <p className="text-sm text-muted-foreground">Configure how your AI assistant interacts with clients.</p>
        <AIAssistantSettings />
      </div>
    </div>
  );
}
