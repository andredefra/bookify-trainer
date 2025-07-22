import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, User, CheckCircle } from "lucide-react";
import { GymReview } from "@/hooks/useGymReviews";
import { formatDistanceToNow } from "date-fns";

interface RecentReviewsCardProps {
  reviews: GymReview[];
}

export function RecentReviewsCard({ reviews }: RecentReviewsCardProps) {
  const recentReviews = reviews.slice(0, 6); // Show last 6 reviews

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Recent Reviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentReviews.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No recent reviews available
            </p>
          ) : (
            recentReviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      {review.is_verified && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{review.client_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {review.trainer_name}
                  </Badge>
                </div>
                
                {review.comment && (
                  <p className="text-sm text-foreground mt-2 italic">
                    "{review.comment}"
                  </p>
                )}
                
                {review.session_date && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Session: {new Date(review.session_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}