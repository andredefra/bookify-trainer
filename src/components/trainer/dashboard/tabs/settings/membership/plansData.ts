
import { CheckCircle2, Users } from "lucide-react";
import { Plan } from "./types";

export const plans: Plan[] = [
  {
    id: "freemium",
    name: "Freemium",
    price: "€0",
    period: "per month",
    description: "Free tier with basic features",
    features: [
      "Unlimited Sessions",
      "Google Calendar Integration",
      "Personal Trainer Page",
      "Client Messaging",
      "Client Management"
    ],
    limitations: [
      "5% transaction fee"
    ],
    isPopular: false,
    icon: Users
  },
  {
    id: "pro",
    name: "Pro",
    price: "€29",
    period: "per month",
    description: "Premium features for serious trainers",
    features: [
      "Everything in Freemium",
      "Lower Transaction Fee (2.5%)",
      "Payment Integration",
      "Priority Support",
      "Advanced Analytics",
      "Waitlist Management",
      "Custom Training Programs",
      "Fitness Progress Tracking"
    ],
    limitations: [],
    isPopular: true,
    icon: CheckCircle2
  }
];
