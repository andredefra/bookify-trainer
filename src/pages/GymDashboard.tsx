
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GymDashboardContainer } from "@/components/gym/dashboard/GymDashboardContainer";

const GymDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem('demo-user');
    if (!user) {
      navigate('/login');
    } else {
      const userData = JSON.parse(user);
      if (userData.type !== 'gym') {
        // Redirect users who aren't gym administrators
        if (userData.type === 'client') {
          navigate('/client-dashboard');
        } else if (userData.type === 'trainer') {
          navigate('/dashboard');
        }
      } else {
        // Ensure demo gym user has the correct ID to match existing data
        const updatedUserData = {
          ...userData,
          id: '11111111-1111-1111-1111-111111111111'
        };
        localStorage.setItem('demo-user', JSON.stringify(updatedUserData));
      }
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Gym Dashboard</title>
        <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
      </Helmet>
      <div className="max-w-full overflow-x-hidden" data-lpignore="true">
        <GymDashboardContainer />
      </div>
    </>
  );
};

export default GymDashboard;
