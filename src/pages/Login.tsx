
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('trainer'); // New state for login type
  const [name, setName] = useState('Andrea'); // Default name for demo purposes
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password, loginType, name });
    
    // Demo mode: Accept any credentials
    if (email && password) {
      toast.success("Demo login successful!");
      // For demo purposes, store that user is logged in with their type and name
      localStorage.setItem('demo-user', JSON.stringify({ 
        name, 
        email, 
        type: loginType 
      }));
      
      // Redirect based on user type
      if (loginType === 'client') {
        navigate('/client-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      toast.error("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Demo Login</h1>
            <p className="text-muted-foreground">Try our platform features with a demo account</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Login Type Selector */}
              <div className="flex border border-border rounded-lg overflow-hidden mb-2">
                <button
                  type="button"
                  className={`flex-1 py-3 text-sm font-medium ${
                    loginType === 'trainer' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-muted-foreground'
                  }`}
                  onClick={() => setLoginType('trainer')}
                >
                  Trainer
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 text-sm font-medium ${
                    loginType === 'client' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-muted-foreground'
                  }`}
                  onClick={() => setLoginType('client')}
                >
                  Client
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-full font-medium button-hover"
              >
                {loginType === 'client' ? 'Access Client Demo' : 'Access Trainer Demo'}
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
