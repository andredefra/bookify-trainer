
import { Link } from 'react-router-dom';

const BrandLogo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 text-primary"
    >
      <span className="font-display text-2xl font-bold tracking-tight">MyPersonal.fit</span>
    </Link>
  );
};

export default BrandLogo;
