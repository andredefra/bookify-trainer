
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoFormProps {
  initialName: string;
}

export function PersonalInfoForm({ initialName }: PersonalInfoFormProps) {
  const [name, setName] = useState(initialName);

  return (
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
  );
}
