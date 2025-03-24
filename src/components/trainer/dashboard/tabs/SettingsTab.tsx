
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface SettingsTabProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
  } | null;
}

export function SettingsTab({ user }: SettingsTabProps) {
  if (!user) return null;
  
  const [selectedTab, setSelectedTab] = useState("profile");
  
  // Week days
  const weekdays = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  
  // Time slots for availability
  const timeSlots = [
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your profile and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Trainer Profile</h3>
                <p className="text-sm text-muted-foreground">This information will be displayed on your public profile page.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" defaultValue={user.name || "Demo Trainer"} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea id="bio" className="w-full mt-1 px-3 py-2 border border-border rounded-md h-24" placeholder="Tell clients about yourself and your training approach..." />
                    </div>
                    <div>
                      <Label htmlFor="specializations">Specializations</Label>
                      <Input id="specializations" className="mt-1" placeholder="e.g. HIIT, Yoga, Strength Training" />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input id="experience" type="number" className="mt-1" defaultValue="5" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Certifications</h3>
                <p className="text-sm text-muted-foreground">Add your professional certifications to build client trust.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cert-title">Certification Title</Label>
                      <Input id="cert-title" className="mt-1" placeholder="e.g. NASM Certified Personal Trainer" />
                    </div>
                    <div>
                      <Label htmlFor="issuing-org">Issuing Organization</Label>
                      <Input id="issuing-org" className="mt-1" placeholder="e.g. National Academy of Sports Medicine" />
                    </div>
                    <div>
                      <Label htmlFor="issue-date">Issue Date</Label>
                      <Input id="issue-date" type="date" className="mt-1" />
                    </div>
                    <Button variant="secondary" size="sm">Add Certification</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">AI Assistant Settings</h3>
                <p className="text-sm text-muted-foreground">Configure how your AI assistant interacts with clients.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-ai">Enable AI Assistant</Label>
                      <Switch id="enable-ai" />
                    </div>
                    <div>
                      <Label htmlFor="ai-style">AI Response Style</Label>
                      <Select>
                        <SelectTrigger id="ai-style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="motivational">Motivational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="availability">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Set Your Availability</h3>
                <p className="text-sm text-muted-foreground">Define when you're available for client sessions.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    {weekdays.map((day) => (
                      <div key={day} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox id={`enable-${day.toLowerCase()}`} />
                          <Label htmlFor={`enable-${day.toLowerCase()}`}>{day}</Label>
                        </div>
                        
                        <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`${day.toLowerCase()}-start`}>Start Time</Label>
                            <Select disabled={day === "Sunday"}>
                              <SelectTrigger id={`${day.toLowerCase()}-start`}>
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.slice(0, -1).map((time) => (
                                  <SelectItem key={`${day}-${time}-start`} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor={`${day.toLowerCase()}-end`}>End Time</Label>
                            <Select disabled={day === "Sunday"}>
                              <SelectTrigger id={`${day.toLowerCase()}-end`}>
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.slice(1).map((time) => (
                                  <SelectItem key={`${day}-${time}-end`} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {/* Break time - only show if day is enabled */}
                        {day !== "Sunday" && (
                          <div className="ml-6 mt-2">
                            <div className="flex items-center space-x-2 my-2">
                              <Checkbox id={`break-${day.toLowerCase()}`} />
                              <Label htmlFor={`break-${day.toLowerCase()}`}>Add Break</Label>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`${day.toLowerCase()}-break-start`}>Break Start</Label>
                                <Select disabled>
                                  <SelectTrigger id={`${day.toLowerCase()}-break-start`}>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={`${day}-${time}-break-start`} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label htmlFor={`${day.toLowerCase()}-break-end`}>Break End</Label>
                                <Select disabled>
                                  <SelectTrigger id={`${day.toLowerCase()}-break-end`}>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={`${day}-${time}-break-end`} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Session Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="session-duration">Default Session Duration</Label>
                        <Select>
                          <SelectTrigger id="session-duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="booking-buffer">Buffer Between Sessions</Label>
                        <Select>
                          <SelectTrigger id="booking-buffer">
                            <SelectValue placeholder="Select buffer time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No buffer</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Calendar Integration</h3>
                <p className="text-sm text-muted-foreground">Sync with external calendars to prevent double bookings.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-sm text-green-700 font-medium flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Google Calendar integration will be available in the full version
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Fitness App Integrations</h3>
                <p className="text-sm text-muted-foreground">Connect with fitness tracking apps to monitor client progress.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
                            <path d="M12 17L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="12" cy="8" r="1" fill="currentColor" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Google Fit</h4>
                          <p className="text-xs text-muted-foreground">Connect to access client activity data</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z" fill="currentColor" />
                            <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z" fill="currentColor" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Apple Health</h4>
                          <p className="text-xs text-muted-foreground">Connect to access client health data</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Strava</h4>
                          <p className="text-xs text-muted-foreground">Connect to track client's runs and rides</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Payment Integration</h3>
                <p className="text-sm text-muted-foreground">Connect payment providers to get paid automatically.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 12H20M16 8L20 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Stripe</h4>
                        <p className="text-xs text-muted-foreground">Connect to accept payments from clients</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="billing">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{user.plan || "Demo Plan"}</h4>
                      <p className="text-xs text-muted-foreground">Your current plan features and limitations</p>
                    </div>
                    <Button variant="outline" size="sm">Upgrade</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Billing Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input id="card-name" className="mt-1" placeholder="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" className="mt-1" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" className="mt-1" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" className="mt-1" placeholder="•••" />
                      </div>
                    </div>
                    <Button className="mt-2">Save Payment Method</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t flex justify-end pt-6">
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
