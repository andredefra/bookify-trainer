
import { CheckCircle2, Users, Briefcase, Building2 } from "lucide-react";
import { Plan } from "./types";

export const plans: Plan[] = [
  {
    id: "standard",
    name: "Free",
    price: "€0",
    period: "per month",
    description: "Start your trainer journey at no cost. Perfect for beginners.",
    features: [
      "Personal Trainer Page",
      "Client Messaging",
      "Client Management",
      "Basic Scheduling"
    ],
    limitations: [],
    isPopular: false,
    icon: Briefcase
  },
  {
    id: "freemium",
    name: "Essential",
    price: "€9",
    period: "per month",
    description: "Unlock unlimited sessions and grow your client base.",
    features: [
      "Unlimited Sessions",
      "Personal Trainer Page",
      "Client Messaging",
      "Client Management",
      "Email Support"
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
    description: "Complete professional toolkit for serious trainers.",
    features: [
      "Everything in Essential",
      "Google Calendar Integration",
      "Digital & Cash Payments",
      "Priority Support",
      "Advanced Analytics",
      "Custom Training Programs",
      "Waitlist Management"
    ],
    limitations: [],
    isPopular: true,
    icon: CheckCircle2
  },
  {
    id: "gym",
    name: "Gym",
    price: "€59",
    period: "per month",
    description: "Enterprise solution for gyms with multiple trainers.",
    features: [
      "Unlimited Trainers",
      "Unlimited Clients",
      "Reduced Pro Pricing for Trainers (€9/month)",
      "Direct Chat with Clients",
      "Comprehensive Client Results",
      "Integrated with Gym Management Systems",
      "White Label Options"
    ],
    limitations: [],
    isPopular: false,
    transactionFeeNote: "(2% transaction fee applies to digital payments from platform trainers)",
    icon: Building2
  }
];
