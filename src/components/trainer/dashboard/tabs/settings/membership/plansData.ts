
import { CheckCircle2, Users } from "lucide-react";
import { Plan } from "./types";

export const plans: Plan[] = [
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
  }
];
