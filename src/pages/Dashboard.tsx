
import { useState, useEffect } from "react";
import { DashboardContainer } from "@/components/trainer/dashboard/DashboardContainer";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Check if user data exists in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('demo-user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      // If user is a client, redirect to client dashboard
      if (user.type === 'client') {
        navigate('/client-dashboard');
      }
    } else {
      // If no user data is found, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Only render dashboard if user data exists
  if (!userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Trainer Dashboard</title>
        {/* Add a meta tag to prevent password managers from auto-filling */}
        <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
      </Helmet>
      <div className="max-w-full overflow-x-hidden" data-lpignore="true">
        <DashboardContainer customName={userData?.name} />
      </div>
    </>
  );
};

export default Dashboard;
