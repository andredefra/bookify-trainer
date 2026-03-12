
import { CheckCircle2, Users, Briefcase, Building2 } from "lucide-react";
import { Plan } from "./types";

export const plans: Plan[] = [
  {
    id: "standard",
    name: "Basic",
    price: "€1.99",
    period: "per month",
    description: "FREE for first 100 users. Start your trainer journey.",
    features: [
      "Personal Trainer Page",
      "Unlimited Clients",
      "Basic Calendar Management",
      "Unlimited Messaging",
      "Basic CRM & Lead Management",
      "Reviews Management"
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
    name: "Studio",
    price: "€89",
    period: "per month",
    description: "Complete solution for personal trainer studios and small gyms.",
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
