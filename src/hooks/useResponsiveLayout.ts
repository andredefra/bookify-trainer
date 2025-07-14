import { useState, useEffect } from 'react';

interface ResponsiveLayout {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
}

export function useResponsiveLayout(): ResponsiveLayout {
  const [layout, setLayout] = useState<ResponsiveLayout>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenSize: 'desktop'
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      let screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (isMobile) screenSize = 'mobile';
      else if (isTablet) screenSize = 'tablet';

      setLayout({
        isMobile,
        isTablet,
        isDesktop,
        screenSize
      });
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return layout;
}