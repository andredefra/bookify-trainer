
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PersonalInfoFormProps {
  initialName: string;
  userEmail: string;
}

export function PersonalInfoForm({ initialName, userEmail }: PersonalInfoFormProps) {
  const [name, setName] = useState(initialName);

  // When name changes, update localStorage
  useEffect(() => {
    const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
    if (demoUser.email === userEmail && name !== demoUser.name) {
      demoUser.name = name;
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
    }
  }, [name, userEmail]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    toast.success("Name updated");
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="space-y-3">
        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input 
            id="name" 
            value={name}
            onChange={handleNameChange}
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
  );
}
