import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, Camera } from "lucide-react";
import { toast } from "sonner";

interface ProfileSectionProps {
  user: {
    name?: string;
    email: string;
    profileImage?: string;
  };
}

export function ProfileSection({ user }: ProfileSectionProps) {
  const [name, setName] = useState(user.name || "Demo Trainer");
  const [profileImage, setProfileImage] = useState<string>(user.profileImage || "/placeholder.svg");
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
        setProfileImage(result);
        toast.success("Profile image updated");
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Trainer Profile</h3>
        <p className="text-sm text-muted-foreground">This information will be displayed on your public profile page.</p>
        
        <div className="flex items-center gap-6 mt-4 mb-6">
          <div className="relative">
            <Avatar 
              className="h-24 w-24 border-2 border-primary/20 cursor-pointer hover:opacity-90 transition-opacity"
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
              className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
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
          <div className="space-y-1">
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto"
              onClick={handleImageClick}
            >
              Change profile picture
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
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
