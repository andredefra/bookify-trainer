
import { Button } from "@/components/ui/button";
import { StatusSelector } from "./StatusSelector";
import { UserProfile } from "./UserProfile";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

interface HeaderActionsProps {
  displayName: string;
  status: "online" | "in-session" | "offline";
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
  onLogout?: () => void;
}

export function HeaderActions({ displayName, status, user, onLogout }: HeaderActionsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data from localStorage if present
    localStorage.removeItem('demo-user');
    
    // Execute the passed onLogout function if available
    if (onLogout) {
      onLogout();
    }
    
    // Navigate to the landing page
    navigate('/');
  };

  return (
    <div className="flex items-center space-x-4">
      {!isMobile && (
        <div className="flex items-center space-x-4">
          <StatusSelector initialStatus={status} />
          <UserProfile user={user} displayName={displayName} />
        </div>
      )}
      {isMobile ? (
        <UserProfile user={user} displayName={displayName} status={status} isMobile={true} />
      ) : null}
      <Button variant="outline" size="sm" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}
