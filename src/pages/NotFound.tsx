
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center px-6">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-primary mb-4">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">Oops! Page not found</p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-primary text-white rounded-full text-base font-medium button-hover"
          >
            Return to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
