import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { ratingDistribution } from "../data/trainerPerformanceData";

export function RatingDistributionChart() {
  const total = ratingDistribution.reduce((sum, r) => sum + r.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ratingDistribution.map((item) => (
          <div key={item.rating} className="flex items-center gap-4">
            <div className="flex items-center gap-1 w-12">
              <span className="font-medium">{item.rating}</span>
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            </div>
            <div className="flex-1">
              <Progress value={item.percentage} className="h-3" />
            </div>
            <div className="w-16 text-right text-sm text-muted-foreground">
              {item.count} ({item.percentage}%)
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t mt-4">
          <p className="text-sm text-muted-foreground">
            Based on {total} total reviews
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
