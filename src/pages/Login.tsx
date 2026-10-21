import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "sonner";
import { getDemoUserData } from "@/utils/demoUserUtils";
import { getInviteByEmail } from "@/utils/mockGymInvites";
import { useLanguage } from "@/context/LanguageContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('trainer');
  const [name, setName] = useState('Andrea');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const allowedEmail = 'andrea.mypersonal.fit@gmail.com';
    const allowedPassword = '@Tr3ggy@';

    // Invited gym onboarded via trainer link: mock login bypass
    if (loginType === 'gym') {
      const invite = getInviteByEmail(normalizedEmail);
      if (invite) {
        const demoUser = {
          type: 'gym',
          source: 'invited',
          email: normalizedEmail,
          name: invite.name,
          gymName: invite.name,
          id: invite.token,
        };
        localStorage.setItem('demo-user', JSON.stringify(demoUser));
        toast.success("Demo login successful!");
        navigate('/gym-dashboard');
        return;
      }
    }

    // Gym/Studio remain restricted to the andrea credentials.
    if (loginType === 'gym' || loginType === 'studio') {
      if (normalizedEmail !== allowedEmail || password !== allowedPassword) {
        toast.error("Access to this demo is restricted. Please contact andrea.mypersonal.fit@gmail.com for access.");
        return;
      }
    }

    // Infer trainer plan from credentials.
    let resolvedPlan: 'basic' | 'essential' | 'pro' = 'pro';
    if (loginType === 'trainer') {
      if (normalizedEmail === 'andrea.mypersonal.fit@gmail.com' && password === allowedPassword) {
        resolvedPlan = 'basic';
      } else if (normalizedEmail === 'andredefra64@gmail.com' && password === allowedPassword) {
        resolvedPlan = 'essential';
      }
    }

    toast.success("Demo login successful!");

    const demoUserData = getDemoUserData(email, name, loginType);
    if (loginType === 'trainer') {
      (demoUserData as any).plan = resolvedPlan;
    }
    localStorage.setItem('demo-user', JSON.stringify(demoUserData));

    if (loginType === 'client') {
      if (normalizedEmail === allowedEmail && password === allowedPassword) {
        navigate('/client-dashboard-basic');
      } else {
        navigate('/client-dashboard');
      }
    } else if (loginType === 'gym') {
      navigate('/gym-dashboard');
    } else if (loginType === 'studio') {
      navigate('/studio-dashboard');
    } else if (loginType === 'trainer' && resolvedPlan === 'basic') {
      navigate('/dashboard-basic');
    } else if (loginType === 'trainer' && resolvedPlan === 'essential') {
      navigate('/dashboard-essential');
    } else {
      navigate('/dashboard');
    }
  };

  const getButtonLabel = () => {
    switch (loginType) {
      case 'client': return t('login.btnClient');
      case 'gym': return t('login.btnGym');
      case 'studio': return t('login.btnStudio');
      default: return t('login.btnTrainer');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 mt-6">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Demo Login</h1>
            <p className="text-muted-foreground">{t('login.subtitle')} <a href="mailto:andrea.mypersonal.fit@gmail.com" className="text-primary hover:underline">andrea.mypersonal.fit@gmail.com</a></p>
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
                  {t('login.tabTrainer')}
                </button>
                <button 
                  type="button" 
                  className={`py-3 text-sm font-medium rounded-lg border transition-colors ${loginType === 'client' ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground border-border hover:bg-muted/50'}`} 
                  onClick={() => setLoginType('client')}
                >
                  {t('login.tabClient')}
                </button>
                <button 
                  type="button" 
                  className={`py-3 text-sm font-medium rounded-lg border transition-colors ${loginType === 'gym' ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground border-border hover:bg-muted/50'}`} 
                  onClick={() => setLoginType('gym')}
                >
                  {t('login.tabGym')}
                </button>
                <button 
                  type="button" 
                  className={`py-3 text-sm font-medium rounded-lg border transition-colors ${loginType === 'studio' ? 'bg-primary text-white border-primary' : 'bg-white text-muted-foreground border-border hover:bg-muted/50'}`} 
                  onClick={() => setLoginType('studio')}
                >
                  {t('login.tabStudio')}
                </button>
              </div>

              
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {t('login.emailLabel')}
                </label>
                <input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  placeholder={t('login.emailPh')} 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  {t('login.password')}
                </label>
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
                {t('login.bottom')}{" "}
                <a href="mailto:andrea.mypersonal.fit@gmail.com" className="text-primary hover:underline">andrea.mypersonal.fit@gmail.com</a>
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