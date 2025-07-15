import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Clock, Users, MapPin, Calendar } from "lucide-react";

interface GymActivity {
  id: string;
  name: string;
  type: string;
  schedule: string;
  duration: string;
  capacity: number;
  location: string;
  instructor?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

interface GymActivitiesCardProps {
  gymId?: string;
}

export function GymActivitiesCard({ gymId }: GymActivitiesCardProps) {
  console.log('🔍 GymActivitiesCard START - gymId:', gymId);
  
  // Demo activities data
  const activities: GymActivity[] = [
    {
      id: '1',
      name: 'Morning Yoga Flow',
      type: 'Yoga',
      schedule: 'Mon, Wed, Fri - 7:00 AM',
      duration: '60 min',
      capacity: 20,
      location: 'Studio A',
      instructor: 'Elena Rossi',
      difficulty: 'beginner',
      description: 'Gentle morning yoga to start your day with energy and mindfulness'
    },
    {
      id: '2',
      name: 'HIIT Bootcamp',
      type: 'HIIT',
      schedule: 'Tue, Thu - 6:00 PM',
      duration: '45 min',
      capacity: 15,
      location: 'Main Gym',
      instructor: 'Marco Bianchi',
      difficulty: 'advanced',
      description: 'High-intensity workout for maximum calorie burn and muscle building'
    },
    {
      id: '3',
      name: 'Pilates Core',
      type: 'Pilates',
      schedule: 'Wed, Sat - 10:00 AM',
      duration: '50 min',
      capacity: 12,
      location: 'Studio B',
      instructor: 'Sofia Verdi',
      difficulty: 'intermediate',
      description: 'Strengthen your core and improve flexibility with precise movements'
    },
    {
      id: '4',
      name: 'Swimming Lessons',
      type: 'Swimming',
      schedule: 'Daily - 8:00 AM, 2:00 PM',
      duration: '45 min',
      capacity: 8,
      location: 'Pool',
      instructor: 'Luca Rosso',
      difficulty: 'beginner',
      description: 'Learn proper swimming techniques or improve your stroke'
    },
    {
      id: '5',
      name: 'Strength Training',
      type: 'Weight Training',
      schedule: 'Mon-Fri - Open Access',
      duration: 'Flexible',
      capacity: 25,
      location: 'Weight Room',
      difficulty: 'intermediate',
      description: 'Fully equipped weight room with free weights and machines'
    },
    {
      id: '6',
      name: 'Zumba Dance',
      type: 'Dance',
      schedule: 'Tue, Thu - 7:30 PM',
      duration: '55 min',
      capacity: 25,
      location: 'Studio A',
      instructor: 'Carmen Lopez',
      difficulty: 'beginner',
      description: 'Fun, energetic dance workout that feels more like a party'
    }
  ];

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Yoga': 'bg-purple-100 text-purple-800',
      'HIIT': 'bg-red-100 text-red-800',
      'Pilates': 'bg-pink-100 text-pink-800',
      'Swimming': 'bg-blue-100 text-blue-800',
      'Weight Training': 'bg-orange-100 text-orange-800',
      'Dance': 'bg-emerald-100 text-emerald-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Gym Services & Classes
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Explore our group classes, facilities, and additional services
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {activities.map((activity) => (
            <div key={activity.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{activity.name}</h4>
                    <Badge variant="secondary" className={getTypeColor(activity.type)}>
                      {activity.type}
                    </Badge>
                    <Badge variant="secondary" className={getDifficultyColor(activity.difficulty)}>
                      {activity.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {activity.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {activity.schedule}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Max {activity.capacity} people
                    </div>
                  </div>
                  
                  {activity.instructor && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Instructor: {activity.instructor}
                    </p>
                  )}
                </div>
                
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <p>These are ongoing services and classes available at your gym</p>
            <div className="flex gap-2 justify-center mt-3">
              <Button variant="outline" size="sm">
                View Schedule
              </Button>
              <Button variant="outline" size="sm">
                Contact Reception
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}