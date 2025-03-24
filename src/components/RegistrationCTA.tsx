
import { Link } from 'react-router-dom';

const RegistrationCTA = () => {
  return (
    <section className="py-12 bg-primary/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4 reveal">
          Be the First to Know When We Launch
        </h2>
        <p className="text-lg text-muted-foreground mb-8 reveal reveal-delay-1">
          Register for the demo today and get a special discounted price when we officially launch.
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-3 bg-primary text-white rounded-full text-lg font-medium button-hover reveal reveal-delay-2"
        >
          Register for Early Access
        </Link>
      </div>
    </section>
  );
};

export default RegistrationCTA;
