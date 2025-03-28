
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, UploadCloud, Info } from "lucide-react";
import { toast } from "sonner";

interface ProfileImageUploadProps {
  name: string;
  profileImage: string;
  defaultImage: string;
  userEmail: string;
  onImageChange: (image: string) => void;
}

export function ProfileImageUpload({ 
  name, 
  profileImage, 
  defaultImage, 
  userEmail,
  onImageChange 
}: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        toast.error("Please select an image file");
        return;
      }
      
      // Check if the file size is less than 5MB
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
        toast.success("Profile image updated");
        
        // Also update in localStorage
        const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
        if (demoUser.email === userEmail) {
          demoUser.profileImage = result;
          localStorage.setItem('demo-user', JSON.stringify(demoUser));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Reset image to default
  const handleResetImage = () => {
    onImageChange(defaultImage);
    toast.success("Profile image reset to default");
    
    // Also update in localStorage
    const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
    if (demoUser.email === userEmail) {
      demoUser.profileImage = defaultImage;
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 mb-6">
      <div className="relative">
        <Avatar 
          className="h-32 w-32 border-2 border-primary/20 cursor-pointer hover:opacity-90 transition-opacity shadow-md"
          onClick={handleImageClick}
        >
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xl">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <Button 
          size="sm" 
          variant="outline" 
          className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 shadow-sm"
          onClick={handleImageClick}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="space-y-2 text-center sm:text-left mt-4 sm:mt-0">
        <h4 className="font-medium text-lg">{name}</h4>
        <p className="text-sm text-muted-foreground">{userEmail}</p>
        <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 mt-2 max-w-sm flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>This image will be shown on your trainer profile card and in client views.</span>
        </div>
        <div className="space-x-2 mt-3">
          <Button 
            variant="default" 
            size="sm" 
            className="shadow-sm"
            onClick={handleImageClick}
          >
            <UploadCloud className="h-4 w-4 mr-1" />
            Change profile picture
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="shadow-sm"
            onClick={handleResetImage}
          >
            Reset to default
          </Button>
        </div>
      </div>
    </div>
  );
}
