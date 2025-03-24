
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, MessageSquare, Settings, Plus, Clock, CheckCircle2, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{name?: string, email: string, type: string, plan?: string} | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data
  const upcomingSessions = [
    { id: 1, name: "Morning HIIT", time: "09:00 - 10:00", date: "Today", participants: 4, maxParticipants: 6 },
    { id: 2, name: "Personal Training with Sarah", time: "13:00 - 14:00", date: "Today", participants: 1, maxParticipants: 1 },
    { id: 3, name: "Yoga Basics", time: "17:30 - 18:30", date: "Tomorrow", participants: 8, maxParticipants: 10 },
  ];
  
  const clients = [
    { id: 1, name: "Sarah Johnson", sessions: 12, lastSession: "Yesterday" },
    { id: 2, name: "Mike Peterson", sessions: 5, lastSession: "3 days ago" },
    { id: 3, name: "Lisa Garcia", sessions: 8, lastSession: "Last week" },
    { id: 4, name: "David Kim", sessions: 2, lastSession: "2 weeks ago" },
  ];
  
  const messageRequests = [
    { id: 1, from: "Sarah Johnson", preview: "Hi, I need to reschedule my session tomorrow...", time: "10 min ago" },
    { id: 2, from: "New Client", preview: "I'm interested in your personal training services...", time: "2 hours ago" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('demo-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    navigate('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
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
                  {user.type === 'trainer' ? 'Trainer' : 'Client'}
                </Badge>
                {user.plan && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {user.plan === 'pro' ? 'Pro Plan' : 'Freemium'}
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user.name || user.email.split('@')[0]}
          </h1>
          <p className="text-muted-foreground">Manage your sessions, clients, and business all in one place.</p>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <nav className="flex flex-col divide-y divide-border">
                  <button 
                    onClick={() => setActiveTab("overview")}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "overview" ? "bg-primary/5 text-primary" : ""}`}
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>Overview</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("sessions")}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "sessions" ? "bg-primary/5 text-primary" : ""}`}
                  >
                    <Clock className="w-5 h-5 mr-3" />
                    <span>Sessions</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("clients")}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "clients" ? "bg-primary/5 text-primary" : ""}`}
                  >
                    <Users className="w-5 h-5 mr-3" />
                    <span>Clients</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("messages")}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "messages" ? "bg-primary/5 text-primary" : ""}`}
                  >
                    <MessageSquare className="w-5 h-5 mr-3" />
                    <span>Messages</span>
                    {messageRequests.length > 0 && (
                      <Badge className="ml-auto">{messageRequests.length}</Badge>
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveTab("settings")}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "settings" ? "bg-primary/5 text-primary" : ""}`}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span>Settings</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
            
            {/* Trainer Status Card */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Availability</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AI Assistant</span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200">
                      Off
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sessions Today</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Upcoming Sessions</CardTitle>
                      <CardDescription>Your scheduled training sessions</CardDescription>
                    </div>
                    <Button className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Session
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium">{session.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              {session.date} • {session.time}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-4 text-sm">
                              <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
                            </div>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t flex justify-center py-4">
                    <Button variant="link">View all sessions</Button>
                  </CardFooter>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Clients</CardTitle>
                        <Button variant="ghost" size="sm" className="text-primary">
                          View all
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {clients.slice(0, 3).map((client) => (
                          <div key={client.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Last session: {client.lastSession}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Message
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Message Requests</CardTitle>
                        <Button variant="ghost" size="sm" className="text-primary">
                          View all
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {messageRequests.map((message) => (
                          <div key={message.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{message.from}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[220px]">
                                {message.preview}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {message.time}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Reply
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "sessions" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Training Sessions</CardTitle>
                      <CardDescription>Create and manage your training sessions</CardDescription>
                    </div>
                    <Button className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Session
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-6">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="past">Past</TabsTrigger>
                      <TabsTrigger value="recurring">Recurring</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                      <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h3 className="font-medium">{session.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                {session.date} • {session.time}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm">
                                <span className="font-medium">{session.participants}/{session.maxParticipants}</span>
                              </div>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="past">
                      <div className="text-center py-8 text-muted-foreground">
                        Past sessions will appear here
                      </div>
                    </TabsContent>
                    <TabsContent value="recurring">
                      <div className="text-center py-8 text-muted-foreground">
                        Recurring sessions will appear here
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "clients" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Client Management</CardTitle>
                      <CardDescription>Manage your client list and invitations</CardDescription>
                    </div>
                    <Button className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      Invite Client
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {client.sessions} sessions • Last: {client.lastSession}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Message
                          </Button>
                          <Button variant="ghost" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Communication with clients and inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm">
                      <div className="flex items-center">
                        <div className="bg-yellow-100 p-2 rounded-full mr-3">
                          <MessageSquare className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-yellow-800 font-medium">AI Assistant Functionality</p>
                          <p className="text-yellow-700 mt-1">
                            In the full version, your AI assistant can handle client inquiries when you're unavailable or in a session.
                          </p>
                        </div>
                      </div>
                    </div>
                  
                    {messageRequests.map((message) => (
                      <div key={message.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{message.from}</h3>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm mb-3">{message.preview}</p>
                        <div className="flex space-x-2">
                          <Button size="sm">Reply</Button>
                          <Button variant="outline" size="sm">Mark as Read</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your profile and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Trainer Profile</h3>
                      <p className="text-sm text-muted-foreground">This information will be displayed on your public profile page.</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">Your Name</label>
                            <input type="text" defaultValue={user.name || "Demo Trainer"} className="w-full mt-1 px-3 py-2 border border-border rounded-md" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Bio</label>
                            <textarea className="w-full mt-1 px-3 py-2 border border-border rounded-md h-24" placeholder="Tell clients about yourself and your training approach..." />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Specializations</label>
                            <input type="text" className="w-full mt-1 px-3 py-2 border border-border rounded-md" placeholder="e.g. HIIT, Yoga, Strength Training" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Availability</h3>
                      <p className="text-sm text-muted-foreground">Set your working hours and preferences for bookings.</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <div className="text-sm text-green-700 font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Google Calendar integration will be available in the full version
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">AI Assistant Settings</h3>
                      <p className="text-sm text-muted-foreground">Configure how your AI assistant interacts with clients.</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Enable AI Assistant</span>
                            <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300">
                              <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white"></div>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">AI Response Style</label>
                            <select className="w-full mt-1 px-3 py-2 border border-border rounded-md">
                              <option>Professional</option>
                              <option>Friendly</option>
                              <option>Motivational</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t flex justify-end pt-6">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
