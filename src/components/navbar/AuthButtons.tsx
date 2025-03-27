
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link 
        to="/login" 
        className="px-4 py-2 text-sm font-medium text-primary rounded-full transition-colors"
      >
        Demo Login
      </Link>
      <Link 
        to="/register" 
        className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-full button-hover"
      >
        Try the Demo
      </Link>
    </div>
  );
};

export default AuthButtons;
