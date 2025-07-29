import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, UserPlus } from "lucide-react";

export function UserTrainers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Trainers</h1>
        <Button variant="outline" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite your personal trainer
        </Button>
      </div>

      <Tabs defaultValue="my-trainers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30 backdrop-blur-sm border border-border/50 p-1 rounded-xl h-12">
          <TabsTrigger 
            value="my-trainers" 
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all hover:bg-muted/50 font-medium"
          >
            My Trainers
          </TabsTrigger>
          <TabsTrigger 
            value="find-trainers"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all hover:bg-muted/50 font-medium"
          >
            Find Trainers
          </TabsTrigger>
          <TabsTrigger 
            value="followed"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all hover:bg-muted/50 font-medium"
          >
            Followed
          </TabsTrigger>
          <TabsTrigger 
            value="payments"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all hover:bg-muted/50 font-medium"
          >
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-trainers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your AI Trainer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-purple-500/10 p-6 backdrop-blur-sm">
                {/* Animated background elements */}
                <div className="absolute -top-4 -right-4 h-24 w-24 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full opacity-30 animate-pulse delay-1000"></div>
                
                <div className="relative flex items-start gap-6">
                  {/* Enhanced Avatar */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <Avatar className="relative h-20 w-20 border-3 border-white shadow-2xl">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xl font-bold">
                        🤖
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                          AI Trainer Pro
                        </h3>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 animate-pulse">
                          ✨ Always Online
                        </Badge>
                      </div>
                      <p className="text-muted-foreground font-medium">
                        Your intelligent fitness companion powered by advanced AI
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                        <div className="text-lg font-bold text-violet-600">98%</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                        <div className="text-lg font-bold text-blue-600">24/7</div>
                        <div className="text-xs text-muted-foreground">Available</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-bold text-yellow-600">5.0</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {['Strength Training', 'Cardio', 'Nutrition', 'Recovery'].map((specialty) => (
                        <Badge key={specialty} variant="outline" className="bg-white/30 border-violet-200 text-violet-700 hover:bg-violet-100 transition-colors">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      <MessageSquare className="h-4 w-4" />
                      Start Chat
                    </Button>
                    <Button variant="outline" size="sm" className="border-violet-200 text-violet-600 hover:bg-violet-50 transition-colors">
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="find-trainers" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-center">
                We're working on bringing you access to certified personal trainers. 
                Stay tuned for updates!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="followed" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Star className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-center">
                Follow your favorite trainers and get updates on their latest content.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-center">
                Manage your trainer payments and billing history here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}