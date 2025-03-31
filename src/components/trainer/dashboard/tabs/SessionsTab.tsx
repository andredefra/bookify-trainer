
import { useState, useEffect } from "react";
import { TrainerSessionItem } from "@/types/sessions";
import { SessionsTabContent } from "./sessions/SessionsTabContent";

interface SessionsTabProps {
  upcomingSessions?: TrainerSessionItem[];
}

export function SessionsTab({ upcomingSessions = [] }: SessionsTabProps) {
  // Generate mock data if no sessions provided
  const [mockSessions, setMockSessions] = useState<TrainerSessionItem[]>([]);
  
  useEffect(() => {
    if (upcomingSessions && upcomingSessions.length > 0) {
      console.log("Using provided upcoming sessions:", upcomingSessions);
    } else {
      console.log("No upcoming sessions provided, generating mock data");
      // Create some sample sessions if none provided
      setMockSessions([
        {
          id: 1,
          name: "Morning HIIT",
          date: "05/15/2023", // Use a consistent date format MM/DD/YYYY
          time: "07:30 AM",
          participants: 5,
          maxParticipants: 12,
          description: "High-intensity interval training for all levels",
          waitingList: 0,
          paymentStatus: {
            paid: 3,
            pending: 2,
            total: 5
          }
        },
        {
          id: 2,
          name: "Afternoon Strength",
          date: "05/15/2023", // Use a consistent date format MM/DD/YYYY
          time: "04:00 PM",
          participants: 8,
          maxParticipants: 10,
          description: "Weight training focusing on major muscle groups",
          waitingList: 1,
          paymentStatus: {
            paid: 6,
            pending: 2,
            total: 8
          }
        },
        {
          id: 3,
          name: "Evening Yoga",
          date: "05/16/2023", // Tomorrow with consistent format MM/DD/YYYY
          time: "06:30 PM",
          participants: 7,
          maxParticipants: 15,
          description: "Relaxing yoga session to end your day",
          waitingList: 0,
          paymentStatus: {
            paid: 5,
            pending: 2,
            total: 7
          }
        },
        {
          id: 4,
          name: "Current Day Session",
          date: new Date().toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}), // Today's date
          time: "12:00 PM",
          participants: 4,
          maxParticipants: 10,
          description: "Session on current day for testing calendar view",
          waitingList: 0,
          paymentStatus: {
            paid: 3,
            pending: 1,
            total: 4
          }
        }
      ]);
    }
  }, [upcomingSessions]);
  
  // Use provided sessions or fallback to mock data
  const sessionsToDisplay = upcomingSessions && upcomingSessions.length > 0 ? upcomingSessions : mockSessions;
  
  console.log("Sessions to display in SessionsTab:", sessionsToDisplay);
  
  return <SessionsTabContent upcomingSessions={sessionsToDisplay} />;
}
