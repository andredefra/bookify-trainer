import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, Users, Award } from "lucide-react";
import { useGymReviews } from "@/hooks/useGymReviews";
import { TrainerPerformanceCard } from "./performance/TrainerPerformanceCard";
import { RecentReviewsCard } from "./performance/RecentReviewsCard";

export function PerformanceTab() {
  const { stats, trainerPerformance, reviews, loading } = useGymReviews();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Performance & Reviews</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading performance data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Performance & Reviews</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              from {stats.totalReviews} reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Trainer
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topTrainer.rating}</div>
            <p className="text-xs text-muted-foreground">
              {stats.topTrainer.name}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Client Satisfaction
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clientSatisfaction}%</div>
            <p className="text-xs text-muted-foreground">
              4+ star ratings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Reviews
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeReviews}</div>
            <p className="text-xs text-muted-foreground">
              this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TrainerPerformanceCard performance={trainerPerformance} />
        <RecentReviewsCard reviews={reviews} />
      </div>
    </div>
  );
}