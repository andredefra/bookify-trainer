
import { Crown, Shield } from "lucide-react";
import { Plan } from "./types";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Basic features for individual trainers",
    features: [
      "Up to 5 clients",
      "Basic workout templates",
      "Session scheduling",
      "Basic analytics"
    ],
    limitations: [
      "No custom branding",
      "Limited program creation",
      "No payment processing"
    ],
    isPopular: false,
    icon: Shield
  },
  {
    id: "pro",
    name: "Pro",
    price: "€29",
    period: "per month",
    description: "Advanced features for growing trainers",
    features: [
      "Unlimited clients",
      "Advanced program builder",
      "Client performance tracking",
      "Payment processing",
      "Marketing tools",
      "Email notifications"
    ],
    limitations: [],
    isPopular: true,
    icon: Crown
  },
  {
    id: "business",
    name: "Business",
    price: "€79",
    period: "per month",
    description: "Complete solution for training businesses",
    features: [
      "Multiple trainer accounts",
      "Team management",
      "Custom branding",
      "Advanced analytics",
      "API access",
      "Priority support",
      "Client app white-labeling"
    ],
    limitations: [],
    isPopular: false,
    icon: Shield
  }
];
