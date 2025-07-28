import { z } from "zod";
import { Link } from "react-router-dom";
import UserNavbar from '@/components/UserNavbar';
import Footer from '@/components/Footer';
import { LoginForm } from "./LoginForm";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

interface LoginContainerProps {
  onLogin: (data: z.infer<typeof loginSchema>) => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
}

const LoginContainer = ({ onLogin, onCancel, title = "Welcome back", subtitle = "Continue your journey" }: LoginContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 mt-6">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <LoginForm onSubmit={onLogin} />
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/user-register" className="text-primary hover:underline">
                  Sign up
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

export default LoginContainer;