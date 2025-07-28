import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { MobileMenuButton } from "../client/header/MobileMenuButton";
import { BrandLogo } from "../client/header/BrandLogo";
import { HeaderActions } from "../client/header/HeaderActions";

interface UserHeaderProps {
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
  onLogout: () => void;
  onMobileMenuClick?: () => void;
  showMobileMenuButton?: boolean;
}

export function UserHeader({
  user,
  onLogout,
  onMobileMenuClick,
  showMobileMenuButton = false
}: UserHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear any user data from localStorage
    localStorage.removeItem('user-app-user');

    // Show success toast
    toast.success("Logged out successfully!");

    // Execute the passed onLogout function
    onLogout();

    // Navigate to the user landing page
    navigate('/user');
  };
  
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {(isMobile || showMobileMenuButton) && (
              <MobileMenuButton onClick={onMobileMenuClick} />
            )}
            <BrandLogo />
          </div>
          
          <HeaderActions 
            user={user} 
            onLogout={handleLogout} 
          />
        </div>
      </div>
    </header>
  );
}