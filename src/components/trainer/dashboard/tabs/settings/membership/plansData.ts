
import { CheckCircle2, Users } from "lucide-react";
import { Plan } from "./types";

export const plans: Plan[] = [
  {
    id: "freemium",
    name: "Freemium",
    price: "€0",
    period: "per month",
    description: "Free tier with basic features. Includes 5% transaction fee.",
    features: [
      "Unlimited Sessions",
      "Google Calendar Integration",
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
    description: "Premium features for serious trainers. Lower transaction fee (2.5%).",
    features: [
      "Everything in Freemium",
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
