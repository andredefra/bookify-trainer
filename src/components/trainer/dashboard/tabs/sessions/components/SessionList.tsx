
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrainerSessionItem } from "@/types/sessions";
import { X, Edit } from "lucide-react";

interface SessionListProps {
  sessions: TrainerSessionItem[];
  onEditSession: (session: TrainerSessionItem) => void;
  onCancelSession: (session: TrainerSessionItem) => void;
}

export function SessionList({ sessions, onEditSession, onCancelSession }: SessionListProps) {
  // Add console logs to debug
  console.log("SessionList received sessions:", sessions);
  
  // Filter sessions for each tab
  const currentDate = new Date();
  const upcomingSessions = sessions.filter(session => {
    // Handle different date formats
    let sessionDate;
    
    if (typeof session.date === 'string') {
      const dateParts = session.date.split('/');
      if (dateParts.length === 3) {
        // MM/DD/YYYY format
        sessionDate = new Date(
          parseInt(dateParts[2]), 
          parseInt(dateParts[0]) - 1, 
          parseInt(dateParts[1])
        );
      } else {
        // Try direct parsing
        sessionDate = new Date(session.date);
      }
    } else if (session.date instanceof Date) {
      sessionDate = session.date;
    }
    
    return sessionDate >= currentDate;
  });
  
  console.log("Filtered upcoming sessions:", upcomingSessions);
  
  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="mb-6 grid grid-cols-3 w-full">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
        <TabsTrigger value="recurring">Recurring</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <div className="space-y-4">
          {upcomingSessions && upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <div key={session.id} className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <h3 className="font-medium line-clamp-1">{session.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {session.date} • {session.time}
                  </div>
                  <div className="flex flex-wrap mt-2 gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {session.paymentStatus?.paid || 0} paid
                    </Badge>
                    {(session.paymentStatus?.pending || 0) > 0 && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {session.paymentStatus?.pending || 0} pending
                      </Badge>
                    )}
                    {(session.waitingList || 0) > 0 && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {session.waitingList || 0} waiting
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm">
                    <span className="font-medium">{session.participants}/{session.maxParticipants}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-3"
                      onClick={() => onEditSession(session)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onCancelSession(session)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Cancel</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No upcoming sessions found. Create a new session to get started.
            </div>
          )}
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
  );
}
