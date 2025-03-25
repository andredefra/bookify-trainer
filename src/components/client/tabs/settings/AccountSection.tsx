
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { toast } from "sonner";

interface AccountSectionProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
  };
}

export function AccountSection({ user }: AccountSectionProps) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);

  const handleSaveAccount = () => {
    toast.success("Account information saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
