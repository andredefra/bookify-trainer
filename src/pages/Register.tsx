
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import { RegisterForm, registerSchema } from "@/components/trainer/RegisterForm";
import { z } from "zod";

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8 mt-4">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Create your account</h1>
            <p className="text-muted-foreground">Join Personal.ai and start your fitness journey</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <RegisterForm onSubmit={handleRegister} onCancel={handleCancel} />
            
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
