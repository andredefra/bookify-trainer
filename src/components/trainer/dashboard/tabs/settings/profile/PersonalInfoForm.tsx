
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
      </div>
    </div>
  );
}
