
import { Link } from 'react-router-dom';

const BrandLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-xl font-bold tracking-tight text-primary">MyPersonalFit</span>
    </Link>
  );
};

export default BrandLogo;
