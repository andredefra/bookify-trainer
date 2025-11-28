
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
    mode: "video",
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
    mode: "in-person",
    address: "123 Wellness Street, Downtown Fitness Center, New York, NY 10001",
    locationNotes: "Enter through the main entrance and go to Studio B on the second floor. Please arrive 10 minutes early for check-in.",
    latitude: 40.7589,
    longitude: -73.9851,
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
    mode: "in-person",
    address: "456 Fitness Avenue, PowerGym, Brooklyn, NY 11201",
    locationNotes: "Use the side entrance after 5 PM. The session will be held in the functional training area.",
    latitude: 40.6892,
    longitude: -73.9442,
    description: "Focus on building core strength and stability with a series of targeted exercises for your abdominals, lower back, and pelvis."
  }
];

// Featured session
export const featuredSession: SessionItem = { 
  id: 999, 
  name: "HIIT Workout",
  trainer: "Sarah Johnson", 
  time: "10:00 - 11:00", 
  date: "Tomorrow", 
  status: "available" as SessionStatus, 
  price: 35,
  attendees: 12,
  maxAttendees: 20,
  mode: "in-person",
  address: "789 Elite Fitness Boulevard, Premium Gym, Manhattan, NY 10016",
  locationNotes: "Premium studio on the 3rd floor. Complimentary towels and water provided.",
  latitude: 40.7505,
  longitude: -73.9934,
  description: "A premium high-intensity interval training session with one of our top trainers. This session is designed for all fitness levels with modifications provided."
};

// Invited sessions from trainer
export const invitedSessions: SessionItem[] = [
  {
    id: 301,
    name: "Private Strength Assessment",
    trainer: "Sarah Johnson",
    time: "14:00 - 15:30",
    date: "Friday, July 7",
    status: "pending" as SessionStatus,
    price: 75,
    mode: "in-person",
    address: "789 Elite Fitness Boulevard, Premium Gym, Manhattan, NY 10016",
    locationNotes: "Private training room on the 2nd floor. Please bring your workout gear and water bottle.",
    latitude: 40.7505,
    longitude: -73.9934,
    description: "A comprehensive one-on-one strength assessment session to evaluate your current fitness level and design a personalized training program.",
    isInvited: true,
    inviteStatus: 'pending',
    paymentRequired: true,
    paymentStatus: 'pending',
    inviteMessage: "Hi! I'd love to do a comprehensive strength assessment with you. This will help me create a personalized training plan that matches your goals perfectly. Looking forward to working together! 💪",
    trainerPlan: 'pro'
  }
];

// Past sessions
export const pastSessions: SessionItem[] = [
  {
    id: 201,
    name: "Strength Training",
    trainer: "Sarah Johnson",
    time: "15:00 - 16:00",
    date: "Last week",
    status: "completed" as SessionStatus,
    mode: "in-person",
    address: "321 Strong Street, Iron Gym, Queens, NY 11375"
  },
  {
    id: 202,
    name: "Cardio Kickboxing",
    trainer: "Alex Thompson",
    time: "10:00 - 11:00",
    date: "2 weeks ago",
    status: "completed" as SessionStatus,
    mode: "video"
  }
];
