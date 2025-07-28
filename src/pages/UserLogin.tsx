import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoginContainer from "@/components/login/LoginContainer";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const UserLogin = () => {
  const navigate = useNavigate();
  
  const handleLogin = (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    
    // Demo mode: Accept any credentials
    toast.success("Demo login successful!");
    // Store user data
    localStorage.setItem('user-app-user', JSON.stringify({
      name: "Demo User",
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
    <LoginContainer 
      onLogin={handleLogin} 
      onCancel={handleCancel}
      title="Welcome back to Trainer.ai"
      subtitle="Continue your fitness journey"
    />
  );
};

export default UserLogin;