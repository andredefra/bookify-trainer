
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('trainer'); // trainer or client
  const [plan, setPlan] = useState('freemium'); // freemium or pro
  
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get plan from URL if it exists
    const params = new URLSearchParams(location.search);
    const planParam = params.get('plan');
    if (planParam === 'pro') {
      setPlan('pro');
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration attempted with:", { name, email, password, userType, plan });
    
    // Demo mode: Accept any credentials as long as they're filled
    if (name && email && password) {
      toast.success("Demo registration successful!");
      // For demo purposes, store that user is logged in
      localStorage.setItem('demo-user', JSON.stringify({ name, email, type: userType, plan }));
      navigate('/dashboard');
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8 mt-4">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Create your account</h1>
            <p className="text-muted-foreground">Join Personal.ai and start managing your training business</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="John Doe"
                    required
                  />
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
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
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
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setUserType('trainer')}
                      className={`py-2 px-4 rounded-lg border text-center ${
                        userType === 'trainer' 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      Personal Trainer
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('client')}
                      className={`py-2 px-4 rounded-lg border text-center ${
                        userType === 'client' 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      Client
                    </button>
                  </div>
                </div>
              </div>
              
              {userType === 'trainer' && (
                <div className="py-4 border-t border-b border-border">
                  <label className="block text-sm font-medium mb-3">
                    Choose your plan:
                  </label>
                  <div className="space-y-3">
                    <div
                      onClick={() => setPlan('freemium')}
                      className={`flex items-start p-3 rounded-lg border cursor-pointer ${
                        plan === 'freemium' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium text-primary">Freemium</h3>
                          {plan === 'freemium' && (
                            <CheckCircle2 className="h-4 w-4 text-primary ml-2" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          €0/month + 7.5% transaction fee
                        </p>
                      </div>
                    </div>
                    
                    <div
                      onClick={() => setPlan('pro')}
                      className={`flex items-start p-3 rounded-lg border cursor-pointer ${
                        plan === 'pro' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium text-primary">Pro</h3>
                          {plan === 'pro' && (
                            <CheckCircle2 className="h-4 w-4 text-primary ml-2" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          €29/month + 5% transaction fee
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-full font-medium button-hover"
              >
                Create account
              </button>
              
              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </form>
            
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
