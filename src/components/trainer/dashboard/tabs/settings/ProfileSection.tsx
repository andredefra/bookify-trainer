
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, Camera, Info } from "lucide-react";
import { toast } from "sonner";

interface ProfileSectionProps {
  user: {
    name?: string;
    email: string;
    profileImage?: string;
  };
}

export function ProfileSection({ user }: ProfileSectionProps) {
  // Use a general image of a man as default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";
  
  const [name, setName] = useState(user.name || "Demo Trainer");
  const [profileImage, setProfileImage] = useState<string>(user.profileImage || defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Update local storage when profile image changes
  useEffect(() => {
    const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
    if (demoUser.email === user.email && profileImage !== demoUser.profileImage) {
      demoUser.profileImage = profileImage;
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
    }
  }, [profileImage, user.email]);
  
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
        setProfileImage(result);
        toast.success("Profile image updated");
        
        // Also update in localStorage
        const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
        if (demoUser.email === user.email) {
          demoUser.profileImage = result;
          localStorage.setItem('demo-user', JSON.stringify(demoUser));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Reset image to default
  const handleResetImage = () => {
    setProfileImage(defaultImage);
    toast.success("Profile image reset to default");
    
    // Also update in localStorage
    const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
    if (demoUser.email === user.email) {
      demoUser.profileImage = defaultImage;
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Trainer Profile</h3>
        <p className="text-sm text-muted-foreground">This information will be displayed on your public profile page.</p>
        
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
            <p className="text-sm text-muted-foreground">{user.email}</p>
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
        
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea 
                id="bio" 
                className="w-full mt-1 px-3 py-2 border border-border rounded-md h-24" 
                placeholder="Tell clients about yourself and your training approach..." 
              />
            </div>
            <div>
              <Label htmlFor="specializations">Specializations</Label>
              <Input id="specializations" className="mt-1" placeholder="e.g. HIIT, Yoga, Strength Training" />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" className="mt-1" defaultValue="5" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Certifications</h3>
        <p className="text-sm text-muted-foreground">Add your professional certifications to build client trust.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <Label htmlFor="cert-title">Certification Title</Label>
              <Input id="cert-title" className="mt-1" placeholder="e.g. NASM Certified Personal Trainer" />
            </div>
            <div>
              <Label htmlFor="issuing-org">Issuing Organization</Label>
              <Input id="issuing-org" className="mt-1" placeholder="e.g. National Academy of Sports Medicine" />
            </div>
            <div>
              <Label htmlFor="issue-date">Issue Date</Label>
              <Input id="issue-date" type="date" className="mt-1" />
            </div>
            <Button variant="secondary" size="sm">Add Certification</Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">AI Assistant Settings</h3>
        <p className="text-sm text-muted-foreground">Configure how your AI assistant interacts with clients.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-ai">Enable AI Assistant</Label>
              <Switch id="enable-ai" />
            </div>
            <div>
              <Label htmlFor="ai-style">AI Response Style</Label>
              <Select>
                <SelectTrigger id="ai-style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="motivational">Motivational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
