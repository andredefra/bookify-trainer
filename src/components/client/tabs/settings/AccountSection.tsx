
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Info } from "lucide-react";
import { toast } from "sonner";

interface AccountSectionProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    profileImage?: string;
  };
}

export function AccountSection({ user }: AccountSectionProps) {
  // Use a general image as default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";
  
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState<string>(user.profileImage || defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveAccount = () => {
    toast.success("Account information saved successfully");
  };

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
  
  // Reset image to default
  const handleResetImage = () => {
    setProfileImage(defaultImage);
    toast.success("Profile image reset to default");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <Avatar 
              className="h-24 w-24 border-2 border-primary/20 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleImageClick}
            >
              <AvatarImage src={profileImage} alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {name ? name.split(' ').map(n => n[0]).join('') : 'U'}
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
            <h4 className="font-medium">{name || 'Client'}</h4>
            <p className="text-sm text-muted-foreground">{email}</p>
            <div className="space-x-2">
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto"
                onClick={handleImageClick}
              >
                Change profile picture
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto text-muted-foreground"
                onClick={handleResetImage}
              >
                Reset to default
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+39 123 456 7890"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input 
              id="age" 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              min="1"
              max="120"
            />
          </div>
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input 
              id="height" 
              type="number" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              min="100"
              max="250"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <Button onClick={handleSaveAccount}>Save Changes</Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-700 mb-1">Client Account</h3>
            <p className="text-sm text-blue-600">
              The app is always free for clients. Premium features like custom training programs and advanced progress tracking are available based on your trainer's subscription plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
