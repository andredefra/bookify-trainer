
import { CheckCircle2, Users, Briefcase, Building2 } from "lucide-react";
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
    id: "gym",
    name: "Gym",
    price: "€59",
    period: "per month",
    description: "Complete solution for gyms with multiple trainers.",
    features: [
      "Unlimited Trainers",
      "Unlimited Clients",
      "Reduced Pro Pricing for Trainers (€9/month)",
      "Direct Chat with Clients",
      "Comprehensive Client Results",
      "Integrated with Gym Management Systems"
    ],
    limitations: [],
    isPopular: false,
    transactionFeeNote: "(2% transaction fee applies to digital payments from platform trainers)",
    icon: Building2
  }
];
