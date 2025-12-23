import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare, Users, TrendingUp, Clock } from "lucide-react";
import { TrainerPerformance, ClientReview } from "../data/trainerPerformanceData";

interface PerformanceStatsCardsProps {
  trainers: TrainerPerformance[];
  reviews: ClientReview[];
}

export function PerformanceStatsCards({ trainers, reviews }: PerformanceStatsCardsProps) {
  const avgRating = trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length;
  const totalReviews = trainers.reduce((sum, t) => sum + t.totalReviews, 0);
  const totalActiveClients = trainers.reduce((sum, t) => sum + t.activeClients, 0);
  const avgRetention = trainers.reduce((sum, t) => sum + t.retentionRate, 0) / trainers.length;
  const totalSessions = trainers.reduce((sum, t) => sum + t.sessionsCompleted, 0);

  const stats = [
    {
      label: "Average Rating",
      value: avgRating.toFixed(1),
      subtitle: "/5.0",
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      label: "Total Reviews",
      value: totalReviews.toString(),
      subtitle: "from clients",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Active Clients",
      value: totalActiveClients.toString(),
      subtitle: "across all trainers",
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      label: "Avg Retention",
      value: `${avgRetention.toFixed(0)}%`,
      subtitle: "client retention",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      label: "Sessions Completed",
      value: totalSessions.toLocaleString(),
      subtitle: "all time",
      icon: Clock,
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold">{stat.value}</span>
                  {stat.subtitle && (
                    <span className="text-xs text-muted-foreground">{stat.subtitle}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
