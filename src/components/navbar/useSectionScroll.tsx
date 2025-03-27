
export const useSectionScroll = (isHomePage: boolean, setMobileMenuOpen: (isOpen: boolean) => void) => {
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      // If not on home page, navigate to home page with hash
      return;
    }
    
    setMobileMenuOpen(false); // Close mobile menu if open
    
    if (sectionId === 'hero') {
      // Scroll to top for hero section
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return scrollToSection;
};
