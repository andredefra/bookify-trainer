
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MessageCircle, Users, Settings, PlusCircle, Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="font-display text-xl font-bold text-primary">
              TrainerAI
            </Link>
            <Badge variant="outline" className="ml-2">Demo</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              D
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-border p-4 sticky top-20">
              <nav className="space-y-2">
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/5 text-primary font-medium"
                >
                  <Calendar className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link 
                  to="/dashboard/sessions"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-muted-foreground font-medium"
                >
                  <Clock className="h-5 w-5" />
                  Sessions
                </Link>
                <Link 
                  to="/dashboard/clients"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-muted-foreground font-medium"
                >
                  <Users className="h-5 w-5" />
                  Clients
                </Link>
                <Link 
                  to="/dashboard/messages"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-muted-foreground font-medium"
                >
                  <MessageCircle className="h-5 w-5" />
                  Messages
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-display font-bold">Trainer Dashboard</h1>
              <p className="text-muted-foreground">Manage your sessions and clients</p>
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Stats Cards */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Sessions This Week</CardTitle>
                      <CardDescription>Total upcoming sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">8</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0 h-auto">View all sessions</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Active Clients</CardTitle>
                      <CardDescription>Clients with bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0 h-auto">View all clients</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Unread Messages</CardTitle>
                      <CardDescription>Pending client inquiries</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">3</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0 h-auto">Go to messages</Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Today's Schedule</h2>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Session
                    </Button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {/* Sample sessions */}
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 text-primary rounded-lg p-3">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">Morning HIIT Session</h3>
                              <p className="text-sm text-muted-foreground">9:00 AM - 10:00 AM</p>
                            </div>
                          </div>
                          <Badge>3 Clients</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 text-primary rounded-lg p-3">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">Personal Training - Sarah</h3>
                              <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                            </div>
                          </div>
                          <Badge>1-on-1</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 text-primary rounded-lg p-3">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">Evening Yoga Class</h3>
                              <p className="text-sm text-muted-foreground">6:00 PM - 7:00 PM</p>
                            </div>
                          </div>
                          <Badge>5 Clients</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>All your scheduled sessions for the next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Calendar view will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Availability</CardTitle>
                    <CardDescription>Set your working hours and blocked times</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Availability management interface will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
