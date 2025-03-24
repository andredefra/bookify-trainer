
import { SessionItem, SessionStatus } from "@/types/sessions";

// Available trainers for booking
export const availableTrainers = [
  { id: 1, name: "Sarah Johnson", speciality: "Personal Trainer" },
  { id: 2, name: "Alex Thompson", speciality: "HIIT Specialist" },
];

// Available public sessions
export const availableSessions: SessionItem[] = [
  { 
    id: 101, 
    name: "HIIT Morning Workout", 
    trainer: "Sarah Johnson", 
    time: "08:00 - 09:00", 
    date: "Monday, July 3", 
    status: "available" as SessionStatus, 
    price: 25,
    attendees: 8,
    maxAttendees: 15,
    description: "Start your day with a high-intensity interval training session designed to boost your metabolism and energy levels."
  },
  { 
    id: 102, 
    name: "Yoga for Beginners", 
    trainer: "Alex Thompson", 
    time: "18:00 - 19:00", 
    date: "Tuesday, July 4", 
    status: "available" as SessionStatus, 
    price: 20,
    attendees: 12,
    maxAttendees: 20,
    description: "A gentle introduction to yoga fundamentals, focusing on proper alignment and breathing techniques."
  },
  { 
    id: 103, 
    name: "Core Strength", 
    trainer: "Sarah Johnson", 
    time: "17:00 - 18:00", 
    date: "Wednesday, July 5", 
    status: "available" as SessionStatus, 
    price: 30,
    attendees: 5,
    maxAttendees: 12,
    description: "Focus on building core strength and stability with a series of targeted exercises for your abdominals, lower back, and pelvis."
  }
];

// Featured session
export const featuredSession: SessionItem = { 
  id: 999, 
  name: "HIIT Workout (Featured)",
  trainer: "Sarah Johnson", 
  time: "10:00 - 11:00", 
  date: "Tomorrow", 
  status: "available" as SessionStatus, 
  price: 35,
  attendees: 12,
  maxAttendees: 20,
  description: "A premium high-intensity interval training session with one of our top trainers. This session is designed for all fitness levels with modifications provided."
};

// Past sessions
export const pastSessions = [
  {
    id: 201,
    name: "Strength Training",
    trainer: "Sarah Johnson",
    time: "15:00 - 16:00",
    date: "Last week"
  },
  {
    id: 202,
    name: "Cardio Kickboxing",
    trainer: "Alex Thompson",
    time: "10:00 - 11:00",
    date: "2 weeks ago"
  }
];
