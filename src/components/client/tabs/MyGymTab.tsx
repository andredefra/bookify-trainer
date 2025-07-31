import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building2, Calendar, Package, MessageSquare, Users, Clock, MapPin, Settings, AlertCircle, Activity, ShoppingBag } from "lucide-react";
import { useGymConnection } from "@/hooks/useGymConnection";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { GymSessionsCard } from "@/components/client/gym/GymSessionsCard";
import { GymMessagingCard } from "@/components/client/gym/GymMessagingCard";
import { GymActivitiesCard } from "@/components/client/gym/GymActivitiesCard";
import { PackageMarketplaceDialog } from "@/components/client/gym/PackageMarketplaceDialog";
import { useState } from "react";

interface MyGymTabProps {
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
  };
}

export function MyGymTab({ user }: MyGymTabProps) {
  console.log('🔍 MyGymTab START - Component inizializzato');
  
  const { connection, packages, communications, loading, error, isConnected } = useGymConnection();
  const navigate = useNavigate();
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  
  console.log('🔍 MyGymTab HOOK DATA:', { 
    connection, 
    packages: packages?.length || 0, 
    communications: communications?.length || 0, 
    loading, 
    error, 
    isConnected 
  });

  console.log('🔍 MyGymTab RENDER STATE:', {
    shouldShowLoading: loading,
    shouldShowError: error,
    shouldShowNotConnected: !isConnected,
    shouldShowMain: isConnected && !loading && !error
  });

  const handleConnectToGym = () => {
    navigate("/client-dashboard?tab=settings&section=gym");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Gym</h1>
            <p className="text-muted-foreground">Loading your gym connection...</p>
          </div>
        </div>

        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <Clock className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">Loading gym data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Gym</h1>
            <p className="text-muted-foreground">Error loading gym data</p>
          </div>
        </div>

        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Error Loading Data</h3>
              <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
            </div>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Gym</h1>
            <p className="text-muted-foreground">Connect to your gym to access sessions and services</p>
          </div>
        </div>

        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">No Gym Connected</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Connect to a gym to access group sessions, facilities, and exclusive services
              </p>
            </div>
            <Button onClick={handleConnectToGym} className="mt-4">
              <Settings className="h-4 w-4 mr-2" />
              Connect to Gym
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activePackagesCount = packages.filter(pkg => pkg.status === 'active').length;
  const totalSessionsUsed = packages.reduce((sum, pkg) => sum + pkg.sessions_used, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Gym</h1>
          <p className="text-muted-foreground">Manage your gym membership and sessions</p>
        </div>
      </div>

      {/* Gym Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{connection?.gym_name || 'Your Gym'}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {connection?.gym_address || 'Gym Address'}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Active Member
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{activePackagesCount}</div>
              <div className="text-sm text-muted-foreground">Active Packages</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalSessionsUsed}</div>
              <div className="text-sm text-muted-foreground">Sessions Used</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {connection?.requested_at ? format(new Date(connection.requested_at), 'MMM yyyy') : 'Recently'}
              </div>
              <div className="text-sm text-muted-foreground">Member Since</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Packages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Active Packages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {packages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No active packages</p>
              </div>
            ) : (
              packages.map((pkg) => {
                const progressPercentage = pkg.sessions_total > 0 ? (pkg.sessions_used / pkg.sessions_total) * 100 : 0;
                const endDate = pkg.end_date ? new Date(pkg.end_date) : null;
                const daysLeft = endDate ? Math.max(0, Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0;
                
                return (
                  <div key={pkg.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{pkg.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {pkg.sessions_used}/{pkg.sessions_total} sessions used
                        </p>
                      </div>
                      <Badge variant={daysLeft < 7 ? "destructive" : "secondary"}>
                        {daysLeft} days left
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Expires: {endDate ? format(endDate, 'dd/MM/yyyy') : 'No expiry'}</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
            
            <Button 
              className="w-full mt-4" 
              onClick={() => setMarketplaceOpen(true)}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Browse New Packages
            </Button>
          </CardContent>
        </Card>

        {/* Available Sessions */}
        <GymSessionsCard gymId={connection?.gym_id} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Communication */}
        <GymMessagingCard 
          gymId={connection?.gym_id} 
          communications={communications}
          onNewMessage={() => {
            // Refresh communications when a new message is sent
            // This could be enhanced with real-time updates
          }}
        />
        
        {/* Gym Activities */}
        <GymActivitiesCard gymId={connection?.gym_id} />
      </div>
      
      <PackageMarketplaceDialog
        open={marketplaceOpen}
        onOpenChange={setMarketplaceOpen}
        gymId={connection?.gym_id}
      />
    </div>
  );
}

