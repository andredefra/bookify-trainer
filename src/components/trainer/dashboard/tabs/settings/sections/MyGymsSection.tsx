import { useState } from "react";
import { useTrainerGymAffiliations, type GymInfo } from "@/hooks/useTrainerGymAffiliations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Search, Star, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MyGymsSectionProps {
  trainerId?: string;
}

export function MyGymsSection({ trainerId }: MyGymsSectionProps) {
  const { affiliations, loading, saving, requestAffiliation, setPrimaryGym, cancelRequest, searchGyms } = useTrainerGymAffiliations(trainerId);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GymInfo[]>([]);
  const [selectedGym, setSelectedGym] = useState<GymInfo | null>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchGyms(searchQuery);
      setSearchResults(results);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRequestAffiliation = async () => {
    if (!selectedGym) return;
    
    const success = await requestAffiliation(selectedGym.id, requestMessage);
    if (success) {
      setShowRequestDialog(false);
      setSelectedGym(null);
      setRequestMessage("");
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Gyms</h2>
          <p className="text-muted-foreground">Manage your gym affiliations and partnerships</p>
        </div>
        
        <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Request Affiliation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Gym Affiliation</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="gym-search">Search for a gym</Label>
                <div className="flex gap-2">
                  <Input
                    id="gym-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter gym name or location..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} disabled={isSearching}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <Label>Search Results</Label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {searchResults.map((gym) => (
                      <Card 
                        key={gym.id} 
                        className={`cursor-pointer transition-colors ${selectedGym?.id === gym.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedGym(gym)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{gym.name}</div>
                              {gym.location && <div className="text-sm text-muted-foreground">{gym.location}</div>}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedGym && (
                <div className="space-y-3">
                  <Separator />
                  <div>
                    <Label htmlFor="request-message">Message (optional)</Label>
                    <Textarea
                      id="request-message"
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      placeholder="Introduce yourself and explain why you'd like to work with this gym..."
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleRequestAffiliation} 
                    disabled={saving}
                    className="w-full"
                  >
                    {saving ? "Sending Request..." : "Send Affiliation Request"}
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {affiliations.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No Gym Affiliations</h3>
              <p className="text-muted-foreground mb-4">
                Connect with gyms to expand your reach and get more clients
              </p>
              <Button onClick={() => setShowRequestDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Request Your First Affiliation
              </Button>
            </CardContent>
          </Card>
        ) : (
          affiliations.map((affiliation) => (
            <Card key={affiliation.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Gym ID: {affiliation.gym_id}</h3>
                        {affiliation.is_primary && (
                          <Badge variant="outline" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Primary
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Commission: {affiliation.commission_rate}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(affiliation.status)}
                    
                    <div className="flex gap-2">
                      {affiliation.status === 'approved' && !affiliation.is_primary && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPrimaryGym(affiliation.gym_id)}
                          disabled={saving}
                        >
                          Set as Primary
                        </Button>
                      )}
                      
                      {affiliation.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => cancelRequest(affiliation.id)}
                          disabled={saving}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {affiliation.request_message && (
                  <div className="mt-3 p-3 bg-muted rounded-md">
                    <p className="text-sm">
                      <strong>Your message:</strong> {affiliation.request_message}
                    </p>
                  </div>
                )}
                
                {affiliation.response_message && (
                  <div className="mt-3 p-3 bg-muted rounded-md">
                    <p className="text-sm">
                      <strong>Gym response:</strong> {affiliation.response_message}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}