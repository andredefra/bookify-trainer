import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, CheckCircle } from "lucide-react";
import { TrainerPerformance } from "@/hooks/useGymReviews";

interface TrainerPerformanceCardProps {
  performance: TrainerPerformance[];
}

export function TrainerPerformanceCard({ performance }: TrainerPerformanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Trainer Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performance.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No trainer performance data available
            </p>
          ) : (
            performance.map((trainer) => (
              <div key={trainer.trainer_id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{trainer.trainer_name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span>{trainer.average_rating || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{trainer.total_reviews} reviews</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>{trainer.verified_reviews} verified</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={trainer.average_rating >= 4.5 ? "default" : trainer.average_rating >= 4.0 ? "secondary" : "outline"}>
                    {trainer.average_rating >= 4.5 ? "Excellent" : trainer.average_rating >= 4.0 ? "Good" : "Needs Improvement"}
                  </Badge>
                  {trainer.recent_reviews > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {trainer.recent_reviews} this week
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}