import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import { getDemoUserData } from "@/utils/demoUserUtils";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('trainer');
  const [name, setName] = useState('Andrea');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", {
      email,
      password,
      loginType,
      name
    });
    if (email && password) {
      toast.success("Demo login successful!");

      // Generate unique demo user data
      const demoUserData = getDemoUserData(email, name, loginType);
      console.log('Generated demo user:', demoUserData);
      localStorage.setItem('demo-user', JSON.stringify(demoUserData));
      
      // Route based on user type
      if (loginType === 'client') {
        navigate('/client-dashboard');
      } else if (loginType === 'gym') {
        navigate('/gym-dashboard');
      } else if (loginType === 'studio') {
        navigate('/studio-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      toast.error("Please enter both email and password");
    }
  };

  const getButtonLabel = () => {
    switch (loginType) {
      case 'client': return 'Access Client Demo';
      case 'gym': return 'Access Gym Demo';
      case 'studio': return 'Access Studio Demo';
      default: return 'Access Trainer Demo';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 mt-6">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Demo Login</h1>
            <p className="text-muted-foreground">Try our platform features with a demo account. If you are interested in the live app, please get in touch via this email andrea.mypersonal.fit@gmail.com</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User type selector - 4 types */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button 
                  type="button" 
                  className={`py-3 text-sm font-medium rounded-lg border transition-colors ${loginType === 'trainer' ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground border-border hover:bg-muted/50'}`} 
                  onClick={() => setLoginType('trainer')}
                >
                  Trainer
                </button>
                <button 
                  type="button" 
                  className={`py-3 text-sm font-medium rounded-lg border transition-colors ${loginType === 'client' ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground border-border hover:bg-muted/50'}`} 
                  onClick={() => setLoginType('client')}
                >
                  Client
                </button>
                <button 
                  type="button" 
                  className={`py-3 text-sm font-medium rounded-lg border transition-colors ${loginType === 'gym' ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground border-border hover:bg-muted/50'}`} 
                  onClick={() => setLoginType('gym')}
                >
                  <div className="flex flex-col items-center">
                    <span>Gym</span>
                    <span className="text-xs opacity-70">€119/mo</span>
                  </div>
                </button>
                <button 
                  type="button" 
                  className={`py-3 text-sm font-medium rounded-lg border transition-colors ${loginType === 'studio' ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground border-border hover:bg-muted/50'}`} 
                  onClick={() => setLoginType('studio')}
                >
                  <div className="flex flex-col items-center">
                    <span>Studio</span>
                    <span className="text-xs opacity-70">€89/mo</span>
                  </div>
                </button>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email address
                </label>
                <input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  placeholder="Enter your email here" 
                  required 
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
              
              <button type="submit" className="w-full py-3 bg-primary text-white rounded-full font-medium button-hover">
                {getButtonLabel()}
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Don't have a demo account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Try the Demo
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

export default Login;