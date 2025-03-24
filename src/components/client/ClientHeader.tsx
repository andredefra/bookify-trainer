
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClientHeaderProps {
  user: {name?: string, email: string, type: string, plan?: string} | null;
  onLogout: () => void;
}

export function ClientHeader({ user, onLogout }: ClientHeaderProps) {
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="font-display text-xl font-bold text-primary">Personal.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Demo Mode</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Client
              </Badge>
              {user?.plan && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {user.plan === 'pro' ? 'Pro Plan' : 'Freemium'}
                </Badge>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
