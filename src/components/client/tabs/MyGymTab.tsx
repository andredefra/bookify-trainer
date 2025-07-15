import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building2, Calendar, Package, MessageSquare, Users, Clock, MapPin, Settings } from "lucide-react";

interface MyGymTabProps {
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
  };
}

export function MyGymTab({ user }: MyGymTabProps) {
  const [isConnectedToGym] = useState(false); // This will come from gym connection hook later
  
  // Mock gym data - will be replaced with real data from hooks
  const gymData = {
    name: "FitLife Gym Center",
    address: "Via Roma 123, Milano",
    memberSince: "March 2024",
    status: "active"
  };

  const activePackages = [
    {
      id: 1,
      name: "Premium Monthly",
      type: "gym_membership",
      sessionsUsed: 12,
      sessionsTotal: 20,
      expiryDate: "2024-04-30",
      daysLeft: 15
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      name: "Morning Yoga",
      time: "09:00 - 10:00",
      date: "Tomorrow",
      instructor: "Maria Rossi",
      spots: 5,
      maxSpots: 15
    },
    {
      id: 2,
      name: "HIIT Training",
      time: "18:30 - 19:30",
      date: "Thursday",
      instructor: "Marco Bianchi",
      spots: 12,
      maxSpots: 12
    }
  ];

  if (!isConnectedToGym) {
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
            <Button onClick={() => {}} className="mt-4">
              <Settings className="h-4 w-4 mr-2" />
              Connect to Gym
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <CardTitle className="text-xl">{gymData.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {gymData.address}
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
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Active Packages</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">15</div>
              <div className="text-sm text-muted-foreground">Sessions This Month</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{gymData.memberSince}</div>
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
            {activePackages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{pkg.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {pkg.sessionsUsed}/{pkg.sessionsTotal} sessions used
                    </p>
                  </div>
                  <Badge variant={pkg.daysLeft < 7 ? "destructive" : "secondary"}>
                    {pkg.daysLeft} days left
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${(pkg.sessionsUsed / pkg.sessionsTotal) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Expires: {pkg.expiryDate}</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Available Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Available Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{session.name}</h4>
                  <Badge variant={session.spots === session.maxSpots ? "destructive" : "secondary"}>
                    {session.spots}/{session.maxSpots} spots
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {session.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {session.instructor}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  disabled={session.spots === session.maxSpots}
                >
                  {session.spots === session.maxSpots ? "Full - Join Waitlist" : "Book Session"}
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Sessions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Communication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Quick Communication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message Gym
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Tour
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              View Packages
            </Button>
          </div>
          
          <Separator />
          
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{gymData.name}</span>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Don't forget about our new HIIT class starting this Thursday! Limited spots available.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}