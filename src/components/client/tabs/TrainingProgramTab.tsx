import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrainingProgramCard } from "@/components/client/training/TrainingProgramCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample training program data
const sampleProgram = {
  id: "prog-1",
  title: "Strength & Conditioning",
  week: "May 20 - May 26",
  trainerName: "Sarah Johnson",
  days: [
    {
      id: "day-1",
      day: "Monday",
      completed: true,
      exercises: [
        {
          id: "ex-1",
          name: "Barbell Squat",
          sets: 4,
          reps: "8-10",
          weight: 75,
          notes: "Focus on depth and keep your chest up"
        },
        {
          id: "ex-2",
          name: "Romanian Deadlift",
          sets: 3,
          reps: "10-12",
          weight: 65,
          notes: "Keep a slight bend in your knees"
        },
        {
          id: "ex-3",
          name: "Walking Lunges",
          sets: 3,
          reps: "12 per leg",
          weight: 10
        }
      ]
    },
    {
      id: "day-2",
      day: "Tuesday",
      completed: true,
      exercises: [
        {
          id: "ex-4",
          name: "Bench Press",
          sets: 4,
          reps: "8",
          weight: 60,
          notes: "Keep shoulders retracted"
        },
        {
          id: "ex-5",
          name: "Seated Cable Rows",
          sets: 3,
          reps: "12",
          weight: 50
        },
        {
          id: "ex-6",
          name: "Dumbbell Lateral Raises",
          sets: 3,
          reps: "15",
          weight: 7.5
        }
      ]
    },
    {
      id: "day-3",
      day: "Wednesday",
      completed: false,
      exercises: [
        {
          id: "ex-7",
          name: "Rest Day",
          sets: 0,
          reps: "",
          notes: "Stay active with light walking or stretching"
        }
      ]
    },
    {
      id: "day-4",
      day: "Thursday",
      completed: false,
      exercises: [
        {
          id: "ex-8",
          name: "Pull-ups",
          sets: 4,
          reps: "6-8",
          notes: "Use assistance band if needed"
        },
        {
          id: "ex-9",
          name: "Barbell Overhead Press",
          sets: 3,
          reps: "8-10",
          weight: 40
        },
        {
          id: "ex-10",
          name: "Face Pulls",
          sets: 3,
          reps: "15",
          weight: 25,
          notes: "Focus on external rotation"
        }
      ]
    },
    {
      id: "day-5",
      day: "Friday",
      completed: false,
      exercises: [
        {
          id: "ex-11",
          name: "Deadlift",
          sets: 4,
          reps: "6",
          weight: 85,
          notes: "Focus on form over weight"
        },
        {
          id: "ex-12",
          name: "Leg Press",
          sets: 3,
          reps: "12",
          weight: 120
        },
        {
          id: "ex-13",
          name: "Calf Raises",
          sets: 4,
          reps: "20",
          weight: 40
        }
      ]
    },
    {
      id: "day-6",
      day: "Saturday",
      completed: false,
      exercises: [
        {
          id: "ex-14",
          name: "HIIT Cardio",
          sets: 10,
          reps: "30s work / 30s rest",
          notes: "Choose from: sprints, burpees, mountain climbers, jumping jacks"
        }
      ]
    },
    {
      id: "day-7",
      day: "Sunday",
      completed: false,
      exercises: [
        {
          id: "ex-15",
          name: "Active Recovery",
          sets: 1,
          reps: "30-45 min",
          notes: "Light walking, swimming, or yoga"
        }
      ]
    }
  ]
};

const prevProgram = {
  id: "prog-2",
  title: "Foundation Building",
  week: "May 13 - May 19",
  trainerName: "Sarah Johnson",
  days: [
    {
      id: "day-1-prev",
      day: "Monday",
      completed: true,
      exercises: [
        {
          id: "ex-1-prev",
          name: "Bodyweight Squats",
          sets: 3,
          reps: "15",
          notes: "Focus on form"
        },
        {
          id: "ex-2-prev",
          name: "Push-ups",
          sets: 3,
          reps: "10-12",
          notes: "Knee push-ups if needed"
        }
      ]
    },
    {
      id: "day-2-prev",
      day: "Tuesday",
      completed: true,
      exercises: [
        {
          id: "ex-4-prev",
          name: "Treadmill Walking",
          sets: 1,
          reps: "30 min",
          notes: "Moderate pace"
        }
      ]
    },
    // Other days would follow the same pattern
    {
      id: "day-3-prev",
      day: "Wednesday",
      completed: true,
      exercises: [
        {
          id: "ex-7-prev",
          name: "Rest Day",
          sets: 0,
          reps: "",
          notes: "Stay active with light walking or stretching"
        }
      ]
    },
    {
      id: "day-4-prev",
      day: "Thursday",
      completed: true,
      exercises: []
    },
    {
      id: "day-5-prev",
      day: "Friday",
      completed: true,
      exercises: []
    },
    {
      id: "day-6-prev",
      day: "Saturday",
      completed: true,
      exercises: []
    },
    {
      id: "day-7-prev",
      day: "Sunday",
      completed: true,
      exercises: []
    }
  ]
};

export function TrainingProgramTab() {
  const [activeProgram, setActiveProgram] = useState("current");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>
            View and track your personalized training programs from your trainers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current" onValueChange={setActiveProgram}>
            <TabsList className="mb-6">
              <TabsTrigger value="current">Current Program</TabsTrigger>
              <TabsTrigger value="previous">Previous Programs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <TrainingProgramCard program={sampleProgram} />
            </TabsContent>
            
            <TabsContent value="previous">
              <div className="space-y-6">
                <TrainingProgramCard program={prevProgram} />
                <div className="text-center mt-4">
                  <Button variant="outline">View All Previous Programs</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
