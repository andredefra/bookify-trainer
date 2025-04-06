
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
      "Monday": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
      "Tuesday": ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
      "Wednesday": ["8:00 AM - 12:00 PM"],
      "Thursday": ["1:00 PM - 6:00 PM"],
      "Friday": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
      "Saturday": ["10:00 AM - 2:00 PM"],
      "Sunday": []
    },
    status: "online"
  },
  { 
    id: 2, 
    name: "Laura Bianchi",  
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    availability: {
      "Monday": ["8:00 AM - 11:00 AM", "1:00 PM - 3:00 PM"],
      "Tuesday": ["9:00 AM - 1:00 PM"],
      "Wednesday": ["2:00 PM - 6:00 PM"],
      "Thursday": ["9:00 AM - 11:00 AM", "1:00 PM - 4:00 PM"],
      "Friday": ["10:00 AM - 5:00 PM"],
      "Saturday": ["9:00 AM - 12:00 PM"],
      "Sunday": []
    },
    status: "away"
  },
  { 
    id: 3, 
    name: "Giovanni Verdi", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80",
    availability: {
      "Monday": ["9:00 AM - 12:00 PM"],
      "Tuesday": ["1:00 PM - 6:00 PM"],
      "Wednesday": [],
      "Thursday": ["10:00 AM - 2:00 PM"],
      "Friday": ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
      "Saturday": ["10:00 AM - 3:00 PM"],
      "Sunday": []
    },
    status: "offline"
  }
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AvailabilityList() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "away": return "bg-amber-500";
      default: return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-8">
      {trainers.map((trainer) => (
        <div key={trainer.id} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={trainer.image} alt={trainer.name} />
              <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{trainer.name}</h3>
              <div className="flex items-center">
                <Circle className={`h-2 w-2 ${getStatusColor(trainer.status)} mr-1`} />
                <span className="text-xs text-muted-foreground capitalize">{trainer.status}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {weekdays.map((day) => (
              <div key={day} className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium text-sm mb-2">{day}</h4>
                <div className="space-y-1">
                  {trainer.availability[day] && trainer.availability[day].length > 0 ? (
                    trainer.availability[day].map((time, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10 text-primary block w-full text-center my-1">
                        {time}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">Not available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
