
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  to: string;
  label: string;
  sectionId?: string;
  icon?: LucideIcon;
  isHomePage: boolean;
  isMobile?: boolean;
  scrollToSection: (sectionId: string) => void;
  onClick?: () => void;
  className?: string;
}

const NavItem = ({ 
  to, 
  label, 
  sectionId, 
  icon: Icon, 
  isHomePage, 
  isMobile = false,
  scrollToSection, 
  onClick,
  className
}: NavItemProps) => {
  const { pathname } = useLocation();
  const homePrefix = pathname === '/en' || pathname === '/in' ? pathname : '';
  const destination = homePrefix && to.startsWith('/') && (to === '/' || to.startsWith('/#'))
    ? `${homePrefix}${to.slice(1)}` : to;
  // Common styles
  const baseClasses = isMobile
    ? "w-full h-auto py-4 text-xl font-medium text-brand-text/70 hover:text-brand-text"
    : "h-auto p-0 text-sm font-medium text-brand-text/70 hover:text-brand-text hover:bg-transparent transition-colors";
  
  const iconClasses = isMobile 
    ? "flex items-center gap-4" 
    : "flex items-center gap-1";

  // Center the Home item
  const combinedClasses = `${baseClasses} ${Icon ? iconClasses : ''} ${className || ''}`;

  // If we're on the homepage and this item has a sectionId, use a button to scroll
  if (isHomePage && sectionId) {
    return (
      <Button variant="ghost"
        onClick={() => {
          scrollToSection(sectionId);
          if (onClick) onClick();
        }}
        className={combinedClasses}
      >
        {Icon && <Icon size={isMobile ? 24 : 16} />}
        {label}
      </Button>
    );
  }

  // Otherwise, use a Link component to navigate
  return (
    <Link
      to={destination}
      className={combinedClasses}
      onClick={onClick}
    >
      {Icon && <Icon size={isMobile ? 24 : 16} />}
      {label}
    </Link>
  );
};

export default NavItem;
