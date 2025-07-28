import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RegisterForm, registerSchema } from "@/components/register/RegisterForm";
import { z } from "zod";
import RegisterContainer from "@/components/register/RegisterContainer";

const UserRegister = () => {
  const navigate = useNavigate();
  
  const handleRegister = (data: z.infer<typeof registerSchema>) => {
    console.log("Registration data:", data);
    
    // Demo mode: Accept any credentials
    toast.success("Welcome to Trainer.ai!");
    // Store user data
    localStorage.setItem('user-app-user', JSON.stringify({
      name: data.name,
      email: data.email,
      type: "user",
      plan: 'free'
    }));
    
    // Redirect to user dashboard
    navigate('/user-dashboard');
  };

  const handleCancel = () => {
    navigate('/user');
  };

  return (
    <RegisterContainer 
      onRegister={handleRegister} 
      onCancel={handleCancel}
      hideUserTypeSelection={true}
      title="Join Trainer.ai"
      subtitle="Start your AI-powered fitness journey"
    />
  );
};

export default UserRegister;