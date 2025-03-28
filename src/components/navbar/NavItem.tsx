import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  to: string;
  label: string;
  sectionId?: string;
  icon?: LucideIcon;
  isHomePage: boolean;
  isMobile?: boolean;
  scrollToSection: (sectionId: string) => void;
  onClick?: () => void;
}

const NavItem = ({ 
  to, 
  label, 
  sectionId, 
  icon: Icon, 
  isHomePage, 
  isMobile = false,
  scrollToSection, 
  onClick 
}: NavItemProps) => {
  // Common styles
  const baseClasses = isMobile
    ? "w-full py-3 text-xl font-medium text-primary text-center"
    : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors";
  
  const iconClasses = isMobile 
    ? "flex items-center justify-center gap-2" 
    : "flex items-center gap-1";

  // If we're on the homepage and this item has a sectionId, use a button to scroll
  if (isHomePage && sectionId) {
    return (
      <button
        onClick={() => {
          scrollToSection(sectionId);
          if (onClick) onClick();
        }}
        className={`${baseClasses} ${Icon ? iconClasses : ''}`}
      >
        {Icon && <Icon size={isMobile ? 20 : 16} />}
        {label}
      </button>
    );
  }

  // Otherwise, use a Link component to navigate
  return (
    <Link
      to={to}
      className={`${baseClasses} ${Icon ? iconClasses : ''}`}
      onClick={onClick}
    >
      {Icon && <Icon size={isMobile ? 20 : 16} />}
      {label}
    </Link>
  );
};

export default NavItem;
