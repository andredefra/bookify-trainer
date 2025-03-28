
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
  // Common styles
  const baseClasses = isMobile
    ? "w-full py-4 text-xl font-bold text-primary"
    : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors";
  
  const iconClasses = isMobile 
    ? "flex items-center gap-4" 
    : "flex items-center gap-1";

  // Center the Home item
  const combinedClasses = `${baseClasses} ${Icon ? iconClasses : ''} ${className || ''}`;

  // If we're on the homepage and this item has a sectionId, use a button to scroll
  if (isHomePage && sectionId) {
    return (
      <button
        onClick={() => {
          scrollToSection(sectionId);
          if (onClick) onClick();
        }}
        className={combinedClasses}
      >
        {Icon && <Icon size={isMobile ? 24 : 16} />}
        {label}
      </button>
    );
  }

  // Otherwise, use a Link component to navigate
  return (
    <Link
      to={to}
      className={combinedClasses}
      onClick={onClick}
    >
      {Icon && <Icon size={isMobile ? 24 : 16} />}
      {label}
    </Link>
  );
};

export default NavItem;
