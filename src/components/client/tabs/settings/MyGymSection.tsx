import { useState } from "react";
import { Building2, Search, CheckCircle, Clock, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MyGymSectionProps {
  user: {
    email: string;
    type: string;
    name?: string;
    plan?: string;
  };
}

// Mock data per il demo - in futuro sarà sostituito con dati reali
const mockGymConnection = {
  isConnected: false,
  pendingRequest: null,
  currentGym: null
};

const mockGyms = [
  {
    id: "1",
    name: "FitZone Premium",
    address: "Via Roma 123, Milano",
    email: "info@fitzone.com",
    phone: "+39 02 1234567"
  },
  {
    id: "2", 
    name: "PowerGym Elite",
    address: "Via Torino 456, Milano",
    email: "contact@powergym.com",
    phone: "+39 02 2345678"
  }
];

export function MyGymSection({ user }: MyGymSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const filteredGyms = mockGyms.filter(gym =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gym.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendRequest = () => {
    // TODO: Implementare la logica per inviare la richiesta alla palestra
    setRequestSent(true);
    setSelectedGym(null);
    setSearchTerm("");
  };

  // Stato Non Connesso - Nessuna richiesta pendente
  if (!mockGymConnection.isConnected && !mockGymConnection.pendingRequest && !requestSent) {
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
              <Button onClick={handleSendRequest} className="w-full">
                Send Connection Request
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Stato Richiesta Inviata/Pendente
  if (requestSent || mockGymConnection.pendingRequest) {
    const gymName = requestSent 
      ? filteredGyms.find(g => g.id === selectedGym)?.name || "Selected Gym"
      : mockGymConnection.pendingRequest?.gymName;

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
              Your connection request to <strong>{gymName}</strong> is pending approval. 
              You'll receive a notification once they respond.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{gymName}</h4>
                <p className="text-sm text-muted-foreground">Request sent today</p>
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

  // Stato Connesso (questo sarà implementato quando avremo dati reali)
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
        
        {/* Dettagli della palestra connessa */}
        <div className="mt-4 p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{mockGymConnection.currentGym?.name}</h4>
              <p className="text-sm text-muted-foreground">{mockGymConnection.currentGym?.address}</p>
              <p className="text-sm text-muted-foreground">{mockGymConnection.currentGym?.email}</p>
            </div>
            <Badge variant="default">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}