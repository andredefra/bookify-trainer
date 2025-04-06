
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import { RegisterForm, registerSchema } from "@/components/register/RegisterForm";
import { z } from "zod";
import RegisterContainer from "@/components/register/RegisterContainer";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleRegister = (data: z.infer<typeof registerSchema>) => {
    console.log("Registration data:", data);
    
    // Demo mode: Accept any credentials
    toast.success("Demo registration successful!");
    // Store user data
    localStorage.setItem('demo-user', JSON.stringify({
      name: data.name,
      email: data.email,
      type: data.userType,
      plan: data.plan || 'free'
    }));
    
    // Redirect based on user type
    if (data.userType === "client") {
      navigate('/client-dashboard');
    } else if (data.userType === "trainer") {
      navigate('/dashboard');
    } else if (data.userType === "gym") {
      navigate('/gym-dashboard');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <RegisterContainer 
      onRegister={handleRegister} 
      onCancel={handleCancel} 
    />
  );
};

export default Register;
