
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

interface UserProfileProps {
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
  displayName: string;
  status?: "online" | "in-session" | "offline";
  isMobile?: boolean;
}

export function UserProfile({ user, displayName, status, isMobile = false }: UserProfileProps) {
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";
  const dummyUser = user || {
    name: displayName,
    email: "trainer@example.com",
    type: "trainer"
  };

  if (isMobile) {
    return (
      <div className="flex items-center">
        <div className="mr-2">
          <Circle 
            className={`h-3 w-3 ${
              status === "online" ? "text-emerald-500 fill-emerald-500" :
              status === "in-session" ? "text-amber-500 fill-amber-500" :
              "text-slate-500 fill-slate-500"
            }`} 
          />
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.profileImage || defaultImage} alt={displayName} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {displayName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.profileImage || defaultImage} alt={displayName} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {displayName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{displayName}</span>
      <Badge variant="secondary" className="bg-primary/10 text-primary">
        {dummyUser.type === 'trainer' ? 'Trainer' : 'Client'}
      </Badge>
      {dummyUser.plan && (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {dummyUser.plan === 'pro' ? 'Pro Plan' : 'Freemium'}
        </Badge>
      )}
    </div>
  );
}
