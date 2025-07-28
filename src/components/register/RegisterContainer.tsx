
import { z } from "zod";
import { Link } from "react-router-dom";
import UserNavbar from '@/components/UserNavbar';
import UserFooter from '@/components/UserFooter';
import { RegisterForm, registerSchema } from "@/components/register/RegisterForm";
import { RegisterHeader } from "@/components/register/RegisterHeader";

interface RegisterContainerProps {
  onRegister: (data: z.infer<typeof registerSchema>) => void;
  onCancel: () => void;
  hideUserTypeSelection?: boolean;
  title?: string;
  subtitle?: string;
}

const RegisterContainer = ({ onRegister, onCancel, hideUserTypeSelection = false, title, subtitle }: RegisterContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-lg">
          <RegisterHeader title={title} subtitle={subtitle} />
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <RegisterForm 
              onSubmit={onRegister} 
              onCancel={onCancel} 
              hideUserTypeSelection={hideUserTypeSelection}
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
      
      <UserFooter />
    </div>
  );
};

export default RegisterContainer;
