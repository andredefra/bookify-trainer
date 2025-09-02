
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import { RegisterForm, registerSchema } from "@/components/register/RegisterForm";
import { z } from "zod";
import { RegisterHeader } from "@/components/register/RegisterHeader";
import { Link } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleRegister = (data: z.infer<typeof registerSchema>) => {
    console.log("Registration data:", data);
    
    // Demo mode for MyPersonalFit: Accept any credentials
    toast.success("Welcome to MyPersonalFit!");
    // Store user data for MyPersonalFit
    localStorage.setItem('demo-user', JSON.stringify({
      name: data.name,
      email: data.email,
      type: data.userType,
      plan: data.plan || 'free'
    }));
    
    // Redirect based on user type for MyPersonalFit (trainers, clients, gyms)
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-lg">
          <RegisterHeader 
            title="Create your demo account"
            subtitle="This is a mock registration for our demo alpha version. If you are interested in joining MyPersonal.fit you can get in touch via email at andrea.mypersonal.fit@gmail.com"
          />
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <RegisterForm 
              onSubmit={handleRegister} 
              onCancel={handleCancel} 
              hideUserTypeSelection={false}
            />
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
