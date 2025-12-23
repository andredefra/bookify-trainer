import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { ClientReview } from "../data/trainerPerformanceData";
import { format } from "date-fns";

interface TrainerReviewsListProps {
  reviews: ClientReview[];
  selectedTrainer: string;
}

export function TrainerReviewsList({ reviews, selectedTrainer }: TrainerReviewsListProps) {
  const filteredReviews = selectedTrainer === "all" 
    ? reviews 
    : reviews.filter(r => r.trainerId === selectedTrainer);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? "text-amber-400 fill-amber-400" 
                : "text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Client Reviews</span>
          <Badge variant="secondary">{filteredReviews.length} reviews</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="p-4 rounded-lg border bg-muted/20">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {review.clientName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.clientName}</p>
                  <p className="text-sm text-muted-foreground">
                    reviewed <span className="font-medium text-foreground">{review.trainerName}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                {renderStars(review.rating)}
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(review.date), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            
            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-muted-foreground text-sm mb-3">{review.comment}</p>
            
            {/* Category ratings */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {Object.entries(review.categories).map(([category, rating]) => (
                <div key={category} className="text-center p-2 bg-background rounded">
                  <p className="text-xs text-muted-foreground capitalize">{category}</p>
                  <p className="font-medium">{rating}/5</p>
                </div>
              ))}
            </div>
            
            {review.response && (
              <div className="mt-3 p-3 bg-primary/5 rounded-lg border-l-2 border-primary">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  Trainer Response
                </p>
                <p className="text-sm">{review.response}</p>
              </div>
            )}
            
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <ThumbsUp className="h-4 w-4" />
              <span>{review.helpful} found this helpful</span>
            </div>
          </div>
        ))}
        
        {filteredReviews.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No reviews found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
