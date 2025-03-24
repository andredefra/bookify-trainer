
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, MessageSquare, Settings, Clock, CheckCircle2, PlusCircle, LineChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ClientProfile } from "@/components/ClientProfile";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{name?: string, email: string, type: string, plan?: string} | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data
  const upcomingSessions = [
    { id: 1, name: "Morning HIIT", trainer: "Alex Thompson", time: "09:00 - 10:00", date: "Today", status: "confirmed" },
    { id: 2, name: "Personal Training", trainer: "Sarah Johnson", time: "13:00 - 14:00", date: "Tomorrow", status: "pending" },
    { id: 3, name: "Yoga Basics", trainer: "Michael Chen", time: "17:30 - 18:30", date: "Thursday", status: "confirmed" },
  ];
  
  const trainerMessages = [
    { id: 1, from: "Sarah Johnson", preview: "Great job in our last session! I've adjusted your program for next week.", time: "10 min ago", read: false },
    { id: 2, from: "Alex Thompson", preview: "Here's the nutrition plan we discussed. Let me know if you have questions.", time: "Yesterday", read: true },
  ];
  
  const progressData = [
    { goal: "Weight goal", current: 68, target: 65, unit: "kg", progress: 75 },
    { goal: "Weekly workouts", current: 3, target: 4, unit: "sessions", progress: 75 },
    { goal: "Daily steps", current: 8500, target: 10000, unit: "steps", progress: 85 },
  ];

  const goals = ["Weight loss", "Muscle tone", "Flexibility"];

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
                  Client
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
          <p className="text-muted-foreground">Track your progress and manage your fitness journey.</p>
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
                    <LineChart className="w-5 h-5 mr-3" />
                    <span>Overview</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("sessions")}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "sessions" ? "bg-primary/5 text-primary" : ""}`}
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>Sessions</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("trainers")}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "trainers" ? "bg-primary/5 text-primary" : ""}`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>My Trainers</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("messages")}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "messages" ? "bg-primary/5 text-primary" : ""}`}
                  >
                    <MessageSquare className="w-5 h-5 mr-3" />
                    <span>Messages</span>
                    {trainerMessages.filter(m => !m.read).length > 0 && (
                      <Badge className="ml-auto">{trainerMessages.filter(m => !m.read).length}</Badge>
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
            
            {/* Client Profile Card */}
            <div className="mt-6">
              <ClientProfile 
                name={user.name || "Demo Client"}
                email={user.email}
                since="March 2023"
                sessions={24}
                goals={goals}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Progress Section */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Fitness Progress</CardTitle>
                      <CardDescription>Track your journey toward your goals</CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Goal
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {progressData.map((item) => (
                        <div key={item.goal} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.goal}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.current} / {item.target} {item.unit}
                            </span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Sessions */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Upcoming Sessions</CardTitle>
                      <CardDescription>Your scheduled training sessions</CardDescription>
                    </div>
                    <Button 
                      onClick={() => navigate('/find-trainer')}
                      className="flex items-center"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Book Session
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium">{session.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              With {session.trainer} • {session.date} • {session.time}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {session.status === 'confirmed' ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Confirmed
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Pending
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm" className="ml-2">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Trainers */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>My Trainers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                            SJ
                          </div>
                          <div>
                            <div className="font-medium">Sarah Johnson</div>
                            <div className="text-xs text-muted-foreground">Personal Trainer</div>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            Message
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                            AT
                          </div>
                          <div>
                            <div className="font-medium">Alex Thompson</div>
                            <div className="text-xs text-muted-foreground">HIIT Specialist</div>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t flex justify-center py-4">
                      <Button 
                        variant="link" 
                        onClick={() => navigate('/find-trainer')}
                      >
                        Find more trainers
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Messages */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Messages</CardTitle>
                        <Button variant="ghost" size="sm" className="text-primary">
                          View all
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {trainerMessages.map((message) => (
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
                      <CardDescription>View and manage your scheduled sessions</CardDescription>
                    </div>
                    <Button 
                      className="flex items-center"
                      onClick={() => navigate('/find-trainer')}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Book New Session
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-6">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="past">Past Sessions</TabsTrigger>
                      <TabsTrigger value="recurring">Recurring</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                      <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h3 className="font-medium">{session.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                With {session.trainer} • {session.date} • {session.time}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {session.status === 'confirmed' ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Confirmed
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  Pending
                                </Badge>
                              )}
                              <Button variant="outline" size="sm">
                                Reschedule
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
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium">Strength Training</h3>
                            <div className="text-sm text-muted-foreground">
                              With Sarah Johnson • Last week • 15:00 - 16:00
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              Completed
                            </Badge>
                            <Button variant="outline" size="sm">
                              Rate Session
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium">Cardio Kickboxing</h3>
                            <div className="text-sm text-muted-foreground">
                              With Alex Thompson • 2 weeks ago • 10:00 - 11:00
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              Completed
                            </Badge>
                            <Button variant="outline" size="sm">
                              View Summary
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="recurring">
                      <div className="text-center py-8 text-muted-foreground">
                        No recurring sessions scheduled yet
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeTab === "trainers" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>My Trainers</CardTitle>
                      <CardDescription>Your personal training team</CardDescription>
                    </div>
                    <Button 
                      className="flex items-center"
                      onClick={() => navigate('/find-trainer')}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Find New Trainer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-medium">
                          SJ
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">Sarah Johnson</h3>
                        <p className="text-sm text-muted-foreground">Personal Trainer</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span className="ml-1 text-sm font-medium">4.9</span>
                          <span className="ml-1 text-xs text-muted-foreground">(48 reviews)</span>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" onClick={() => navigate('/trainer/1')}>View Profile</Button>
                          <Button variant="outline" size="sm">Message</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-medium">
                          AT
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">Alex Thompson</h3>
                        <p className="text-sm text-muted-foreground">HIIT Specialist</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span className="ml-1 text-sm font-medium">4.7</span>
                          <span className="ml-1 text-xs text-muted-foreground">(32 reviews)</span>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" onClick={() => navigate('/trainer/2')}>View Profile</Button>
                          <Button variant="outline" size="sm">Message</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Communicate with your trainers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trainerMessages.map((message) => (
                      <div key={message.id} className={`border rounded-lg p-4 ${!message.read ? 'bg-primary/5 border-primary/20' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                              {message.from.charAt(0)}
                            </div>
                            <h3 className="font-medium">{message.from}</h3>
                          </div>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm mb-3">{message.preview}</p>
                        <div className="flex space-x-2">
                          <Button size="sm">Reply</Button>
                          {!message.read && (
                            <Button variant="outline" size="sm">Mark as Read</Button>
                          )}
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
                      <h3 className="text-lg font-medium">Profile Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">Your Name</label>
                            <input 
                              type="text" 
                              defaultValue={user.name || "Demo Client"} 
                              className="w-full mt-1 px-3 py-2 border border-border rounded-md" 
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <input 
                              type="email" 
                              defaultValue={user.email} 
                              className="w-full mt-1 px-3 py-2 border border-border rounded-md" 
                              disabled 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Fitness Goals</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">Current Goals</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {goals.map((goal) => (
                                <Badge key={goal} variant="secondary">
                                  {goal}
                                  <button className="ml-1 text-muted-foreground hover:text-foreground">×</button>
                                </Badge>
                              ))}
                              <Badge variant="outline" className="cursor-pointer">
                                + Add Goal
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Notification Preferences</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Session Reminders</span>
                            <div className="relative inline-block w-10 h-5 rounded-full bg-primary">
                              <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Trainer Messages</span>
                            <div className="relative inline-block w-10 h-5 rounded-full bg-primary">
                              <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Progress Updates</span>
                            <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300">
                              <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white"></div>
                            </div>
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

export default ClientDashboard;
