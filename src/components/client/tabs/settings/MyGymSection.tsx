import { useState } from "react";
import { Building2, Search, CheckCircle, Clock, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGymConnection } from "@/hooks/useGymConnection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MyGymSectionProps {
  user: {
    email: string;
    type: string;
    name?: string;
    plan?: string;
  };
}

// Mock gyms data - in production this would come from a gym directory API
const mockGyms = [
  {
    id: "11111111-1111-1111-1111-111111111111", // Demo gym ID
    name: "FitZone Premium",
    address: "Via Roma 123, Milano",
    email: "info@fitzone.com",
    phone: "+39 02 1234567"
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "PowerGym Elite",
    address: "Via Torino 456, Milano",
    email: "contact@powergym.com",
    phone: "+39 02 2345678"
  }
];

export function MyGymSection({ user }: MyGymSectionProps) {
  const { connection, loading, isConnected, sendConnectionRequest, disconnect, refetch } = useGymConnection();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filteredGyms = mockGyms.filter(gym =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gym.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendRequest = async () => {
    if (!selectedGym) return;
    
    setIsSubmitting(true);
    try {
      await sendConnectionRequest(selectedGym, `Hi, I'd like to connect to your gym. My details: ${user.name || user.email}`);
      setSelectedGym(null);
      setSearchTerm("");
      await refetch();
    } catch (error) {
      console.error('Error sending connection request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!connection) return;
    try {
      await disconnect();
      toast({
        title: "Disconnected",
        description: "You have been disconnected from the gym.",
      });
      await refetch();
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect from gym.",
        variant: "destructive",
      });
    }
  };


  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            My Gym Connection
          </CardTitle>
          <CardDescription>
            Loading your gym connection status...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Clock className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Connected state
  if (isConnected && connection?.status === 'approved') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            My Gym Connection
          </CardTitle>
          <CardDescription>
            You're connected to your gym
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              You're successfully connected to your gym. You can now access group classes and communicate directly.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{connection.gym_name}</h4>
                <p className="text-sm text-muted-foreground">{connection.gym_address || 'Gym Address'}</p>
                <p className="text-sm text-muted-foreground">
                  Connected since {new Date(connection.requested_at).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                <X className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Pending request state
  if (connection?.status === 'pending') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            My Gym Connection
          </CardTitle>
          <CardDescription>
            Your connection request status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Your connection request to <strong>{connection.gym_name || 'the gym'}</strong> is pending approval. 
              You'll receive a notification once they respond.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{connection.gym_name || 'Selected Gym'}</h4>
                <p className="text-sm text-muted-foreground">
                  Request sent {new Date(connection.requested_at).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="secondary">
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Not connected state - show search and connect interface
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          My Gym Connection
        </CardTitle>
        <CardDescription>
          Connect to your gym to access group classes, packages, and communicate directly with your gym.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Building2 className="h-4 w-4" />
          <AlertDescription>
            You're not connected to any gym yet. Search for your gym below to send a connection request.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Search for your gym</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter gym name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {searchTerm && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Search Results</h4>
              {filteredGyms.length > 0 ? (
                <div className="space-y-2">
                  {filteredGyms.map((gym) => (
                    <Card 
                      key={gym.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedGym === gym.id ? "ring-2 ring-primary" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedGym(selectedGym === gym.id ? null : gym.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{gym.name}</h5>
                            <p className="text-sm text-muted-foreground">{gym.address}</p>
                            <p className="text-sm text-muted-foreground">{gym.email}</p>
                          </div>
                          {selectedGym === gym.id && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No gyms found matching your search.</p>
              )}
            </div>
          )}

          {selectedGym && (
            <Button 
              onClick={handleSendRequest} 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Sending Request...
                </>
              ) : (
                'Send Connection Request'
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}