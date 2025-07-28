import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDashboardComponent } from "@/components/user/UserDashboard";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user-app-user');
    if (!userData) {
      navigate('/user-login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/user-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user-app-user');
    navigate('/user');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <UserDashboardComponent 
      user={user}
      onLogout={handleLogout}
    />
  );
};

export default UserDashboard;