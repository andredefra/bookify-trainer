
import { z } from "zod";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RegisterForm, registerSchema } from "@/components/register/RegisterForm";
import { RegisterHeader } from "@/components/register/RegisterHeader";

interface RegisterContainerProps {
  onRegister: (data: z.infer<typeof registerSchema>) => void;
  onCancel: () => void;
}

const RegisterContainer = ({ onRegister, onCancel }: RegisterContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-lg">
          <RegisterHeader />
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <RegisterForm onSubmit={onRegister} onCancel={onCancel} />
            
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

export default RegisterContainer;
