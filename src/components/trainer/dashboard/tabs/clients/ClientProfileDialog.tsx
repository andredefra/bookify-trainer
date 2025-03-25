
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  User, 
  Target, 
  BarChart3, 
  Dumbbell, 
  MessageSquare 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClientProfile } from "@/components/ClientProfile";

// Mock client details for demonstration
const mockClientDetails = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  since: "March 2023",
  sessions: 12,
  goals: ["Lose 5kg", "Run 10K", "Strength Training"],
  lastActivity: "Yesterday",
  upcomingSessions: ["Personal Training - Tomorrow at 10:00 AM"],
  weight: "65kg",
  height: "168cm",
  bodyFat: "24%",
  notes: "Prefers morning sessions. Has a previous knee injury to be mindful of."
};

interface ClientProfileDialogProps {
  client: {
    id: number;
    name: string;
    sessions: number;
    lastSession: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientProfileDialog({ client, open, onOpenChange }: ClientProfileDialogProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!client) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Client Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar with client profile summary */}
          <div>
            <ClientProfile 
              name={client.name}
              email={mockClientDetails.email}
              since={mockClientDetails.since}
              sessions={client.sessions}
              goals={mockClientDetails.goals}
            />
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-sm font-medium">Client Summary</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Last activity: {mockClientDetails.lastActivity}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Dumbbell className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Total sessions: {client.sessions}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mt-2">Upcoming Sessions</h3>
                    {mockClientDetails.upcomingSessions.map((session, i) => (
                      <div key={i} className="text-sm p-2 bg-primary/5 rounded">
                        {session}
                      </div>
                    ))}
                    
                    <h3 className="text-sm font-medium mt-2">Basic Measurements</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-gray-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Weight</div>
                        <div className="font-medium">{mockClientDetails.weight}</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Height</div>
                        <div className="font-medium">{mockClientDetails.height}</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Body Fat</div>
                        <div className="font-medium">{mockClientDetails.bodyFat}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="goals">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Active Goals</h3>
                      <Button size="sm" variant="outline">Add Goal</Button>
                    </div>
                    
                    {mockClientDetails.goals.map((goal, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">{goal}</div>
                          <div className="text-xs text-muted-foreground">Target date: Aug 30, 2023</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            In progress
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Completed Goals</h3>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">Attend 10 sessions</div>
                          <div className="text-xs text-muted-foreground">Completed on Jul 15, 2023</div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="metrics">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">Body Metrics</h3>
                      <Button size="sm" variant="outline">Record New</Button>
                    </div>
                    
                    <div className="h-48 flex items-center justify-center border rounded bg-gray-50">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                        <p>Metrics chart would display here</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Recent Measurements</h4>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="font-medium">Date</div>
                        <div className="font-medium">Weight</div>
                        <div className="font-medium">Body Fat</div>
                        <div className="font-medium">Muscle Mass</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm bg-gray-50 p-2 rounded">
                        <div>Jul 28, 2023</div>
                        <div>65kg</div>
                        <div>24%</div>
                        <div>46kg</div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm bg-gray-50 p-2 rounded">
                        <div>Jul 14, 2023</div>
                        <div>66kg</div>
                        <div>25%</div>
                        <div>45.5kg</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="programs">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">Assigned Programs</h3>
                      <Button size="sm" variant="outline">Assign New</Button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Strength & Conditioning</h4>
                          <p className="text-xs text-muted-foreground">Assigned on Jul 10, 2023</p>
                        </div>
                        <Badge variant="secondary">Current</Badge>
                      </div>
                      <div className="mt-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span>Progress:</span>
                          <span>Week 3 of 8</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="ghost" size="sm">Track Progress</Button>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mt-4 mb-2">Previous Programs</h3>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-medium">Flexibility & Recovery</h4>
                      <div className="text-xs text-muted-foreground">Completed on Jun 15, 2023</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">Client Notes</h3>
                      <Button size="sm" variant="outline">Add Note</Button>
                    </div>
                    
                    <div className="p-4 border rounded mb-4">
                      <textarea 
                        className="w-full h-24 text-sm resize-none focus:outline-none" 
                        placeholder="Add notes about this client..."
                        defaultValue={mockClientDetails.notes}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">Session Notes - Jul 24, 2023</h4>
                          <span className="text-xs text-muted-foreground">3 days ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Client reported feeling stronger during squat exercises. Increased weight by 5kg.
                        </p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">Session Notes - Jul 17, 2023</h4>
                          <span className="text-xs text-muted-foreground">10 days ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Focused on form for deadlifts. Client needs to work on keeping back straight.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
