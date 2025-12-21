import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Users, Calendar } from "lucide-react";

export function ProgramsTab() {
  const programs = [
    { 
      id: 1, 
      name: "12-Week Transformation", 
      description: "Complete body transformation program",
      clients: 8,
      weeks: 12,
      status: "active"
    },
    { 
      id: 2, 
      name: "Beginner Strength", 
      description: "Foundation strength building",
      clients: 5,
      weeks: 8,
      status: "active"
    },
    { 
      id: 3, 
      name: "HIIT Intensive", 
      description: "High intensity interval training",
      clients: 12,
      weeks: 6,
      status: "active"
    },
    { 
      id: 4, 
      name: "Yoga & Flexibility", 
      description: "Improve flexibility and mindfulness",
      clients: 6,
      weeks: 8,
      status: "draft"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Training Programs</h1>
          <p className="text-muted-foreground">Create and manage training programs for your clients</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Program
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => (
          <Card key={program.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{program.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{program.clients} clients</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{program.weeks} weeks</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={program.status === "active" ? "default" : "secondary"}>
                  {program.status}
                </Badge>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
