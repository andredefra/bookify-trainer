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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-trainers">My Trainers</TabsTrigger>
          <TabsTrigger value="find-trainers">Find Trainers</TabsTrigger>
          <TabsTrigger value="followed">Followed</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="my-trainers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your AI Trainer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-white text-lg font-bold">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Trainer.ai</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your personal AI fitness coach
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Online 24/7
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">5.0</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Specialties:</span>
                      <p>Personalized Training, Nutrition, Goal Setting</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Experience:</span>
                      <p>Advanced AI Coach with extensive fitness knowledge</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Chat Now
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
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