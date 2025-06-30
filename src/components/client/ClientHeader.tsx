
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { MobileMenuButton } from "./header/MobileMenuButton";
import { BrandLogo } from "./header/BrandLogo";
import { HeaderActions } from "./header/HeaderActions";

interface ClientHeaderProps {
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
  name?: string;
  onLogout: () => void;
  onMobileMenuClick?: () => void;
  showMobileMenuButton?: boolean;
}

export function ClientHeader({
  user,
  name,
  onLogout,
  onMobileMenuClick,
  showMobileMenuButton = false
}: ClientHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear any user data from localStorage
    localStorage.removeItem('demo-user');

    // Show success toast
    toast.success("Logged out successfully!");

    // Execute the passed onLogout function
    onLogout();

    // Navigate to the landing page
    navigate('/');
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
