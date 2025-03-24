import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-50"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4 reveal">
              Reach Your Fitness Goals with Expert Trainers
            </h1>
            <p className="text-lg text-muted-foreground mb-8 reveal reveal-delay-1">
              Find the perfect trainer to guide you on your fitness journey. Browse profiles, compare prices,
              and connect with certified professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              <Link
                to="/register"
                className="px-8 py-3 md:py-4 bg-primary text-white rounded-full text-lg font-medium button-hover"
              >
                Get Started as a Trainer
              </Link>
              
              <Link
                to="/find-trainer"
                className="w-full sm:w-auto px-8 py-3 md:py-4 bg-white text-primary rounded-full text-base md:text-lg font-medium border border-primary/10 button-hover"
              >
                Looking for a trainer?
              </Link>
            </div>
            
            <div className="mt-8 reveal reveal-delay-2">
              <p className="text-sm text-muted-foreground">
                Over 500+ trainers are ready to help you.
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            <img
              src="/images/hero-image.png"
              alt="Trainer and Trainee"
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg reveal reveal-delay-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
