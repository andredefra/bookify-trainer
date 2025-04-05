
import { CheckCircle2, Users, Briefcase, Building } from "lucide-react";
import { Plan } from "./types";

export const plans: Plan[] = [
  {
    id: "standard",
    name: "Standard",
    price: "€5",
    period: "per month",
    description: "Essential features for beginners without sessions.",
    features: [
      "Personal Trainer Page",
      "Client Messaging",
      "Client Management"
    ],
    limitations: [],
    isPopular: false,
    icon: Briefcase
  },
  {
    id: "freemium",
    name: "Basic",
    price: "€9",
    period: "per month",
    description: "Basic tier with essential features for new trainers.",
    features: [
      "Unlimited Sessions",
      "Personal Trainer Page",
      "Client Messaging",
      "Client Management"
    ],
    limitations: [],
    isPopular: false,
    icon: Users
  },
  {
    id: "pro",
    name: "Pro",
    price: "€29",
    period: "per month",
    description: "Premium features for serious trainers.",
    features: [
      "Everything in Basic",
      "Google Calendar Integration",
      "Digital & Cash Payments",
      "Priority Support",
      "Advanced Analytics",
      "Custom Training Programs"
    ],
    limitations: [],
    isPopular: true,
    icon: CheckCircle2
  },
  {
    id: "gym-trainer",
    name: "Gym Trainer",
    price: "€9",
    period: "per month",
    description: "Special rate for trainers working with partner gyms.",
    features: [
      "Everything in Pro Plan",
      "Gym Branding",
      "Access to Gym Client Base",
      "Direct Client Messaging"
    ],
    limitations: [
      "Only for trainers affiliated with partner gyms",
      "2% transaction fee"
    ],
    isPopular: false,
    icon: Users
  },
  {
    id: "gym",
    name: "Gym",
    price: "€59",
    period: "per month",
    description: "Complete solution for fitness facilities.",
    features: [
      "White Label Platform",
      "Unlimited Trainers",
      "Unlimited Clients",
      "Branded Trainer Pages",
      "Direct Client Communication",
      "Access to Analytics Dashboard",
      "CRM Integration"
    ],
    limitations: [],
    isPopular: false,
    icon: Building
  }
];
