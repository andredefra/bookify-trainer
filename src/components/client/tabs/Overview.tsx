
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";

interface ProgressItem {
  goal: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
}

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
}

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
  read: boolean;
}

interface OverviewProps {
  progressData: ProgressItem[];
  upcomingSessions: SessionItem[];
  trainerMessages: MessageItem[];
}

export function Overview({ progressData, upcomingSessions, trainerMessages }: OverviewProps) {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
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
        <TrainerCard navigate={navigate} />
        <MessagesCard messages={trainerMessages} />
      </div>
    </div>
  );
}

function TrainerCard({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
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
  );
}

function MessagesCard({ messages }: { messages: MessageItem[] }) {
  return (
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
          {messages.map((message) => (
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
  );
}
