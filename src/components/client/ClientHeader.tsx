import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { MobileMenuButton } from "./header/MobileMenuButton";
import { BrandLogo } from "./header/BrandLogo";
import { HeaderActions } from "./header/HeaderActions";
import { supabase } from "@/integrations/supabase/client";

const DEMO_CLIENT_ID = '00000000-0000-0000-0000-000000000002';

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
  
  const handleLogout = async () => {
    try {
      console.log('Cleaning up demo data before logout...');
      
      // Step 1: Delete all package assignments purchased today (demo purchases)
      const { error: deleteError } = await supabase
        .from('client_package_assignments')
        .delete()
        .eq('client_id', DEMO_CLIENT_ID)
        .eq('status', 'active')
        .gte('created_at', new Date().toISOString().split('T')[0]);

      if (deleteError) {
        console.error('Error cleaning up demo purchases:', deleteError);
      } else {
        console.log('Demo purchases cleaned up successfully');
      }

      // Step 2: Reset the "Premium Wellness Package" back to 'proposed' status
      const { data: assignments } = await supabase
        .from('client_package_assignments')
        .select('id, package_id, client_packages(title)')
        .eq('client_id', DEMO_CLIENT_ID)
        .eq('status', 'active');

      const premiumPackage = assignments?.find(
        (a: any) => a.client_packages?.title === 'Premium Wellness Package'
      );

      if (premiumPackage) {
        await supabase
          .from('client_package_assignments')
          .update({ status: 'proposed', sessions_used: 0, total_paid: 0 })
          .eq('id', premiumPackage.id);
        console.log('Premium Wellness Package reset to proposed');
      }

    } catch (error) {
      console.error('Error during demo cleanup:', error);
    }

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
