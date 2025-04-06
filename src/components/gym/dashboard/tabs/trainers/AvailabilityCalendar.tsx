
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample trainer data
const trainers = [
  { 
    id: 1, 
    name: "Marco Rossi", 
    image: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    availability: {
      "2025-04-06": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
      "2025-04-07": ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
      "2025-04-08": ["8:00 AM - 12:00 PM"],
      "2025-04-09": ["1:00 PM - 6:00 PM"],
      "2025-04-10": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
    },
    status: "online"
  },
  { 
    id: 2, 
    name: "Laura Bianchi",  
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    availability: {
      "2025-04-06": ["8:00 AM - 11:00 AM", "1:00 PM - 3:00 PM"],
      "2025-04-07": ["9:00 AM - 1:00 PM"],
      "2025-04-08": ["2:00 PM - 6:00 PM"],
      "2025-04-09": ["9:00 AM - 11:00 AM", "1:00 PM - 4:00 PM"],
      "2025-04-11": ["10:00 AM - 5:00 PM"],
    },
    status: "away"
  },
  { 
    id: 3, 
    name: "Giovanni Verdi", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    availability: {
      "2025-04-07": ["9:00 AM - 12:00 PM"],
      "2025-04-08": ["1:00 PM - 6:00 PM"],
      "2025-04-10": ["10:00 AM - 2:00 PM"],
      "2025-04-11": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
      "2025-04-12": ["10:00 AM - 3:00 PM"],
    },
    status: "offline"
  }
];

export function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : "";
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "away": return "bg-amber-500";
      default: return "bg-slate-400";
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border shadow p-3 pointer-events-auto"
          initialFocus
        />
      </div>
      <div className="md:col-span-2">
        <h3 className="font-medium mb-4">
          Trainers available on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h3>
        <div className="space-y-4">
          {trainers.filter(trainer => trainer.availability[formattedDate])
            .map(trainer => (
              <Card key={trainer.id} className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={trainer.image} alt={trainer.name} />
                    <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{trainer.name}</h4>
                      <div className="flex items-center">
                        <Circle className={`h-2 w-2 ${getStatusColor(trainer.status)} mr-1`} />
                        <span className="text-xs text-muted-foreground capitalize">{trainer.status}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {trainer.availability[formattedDate]?.map((timeSlot, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                          {timeSlot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          
          {trainers.filter(trainer => trainer.availability[formattedDate]).length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No trainers available on this date
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
