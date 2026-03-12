
import { useState } from "react";
import { ReviewStats } from "./reviews/components/ReviewStats";
import { ReviewCard } from "./reviews/components/ReviewCard";
import { ReviewsFilter } from "./reviews/components/ReviewsFilter";
import { ModificationRequestDialog } from "./reviews/components/ModificationRequestDialog";
import { useReviews } from "./reviews/hooks/useReviews";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function ReviewsTab() {
  const { 
    reviews, 
    stats, 
    filter, 
    setFilter, 
    requestModification
  } = useReviews();

  const [modificationDialog, setModificationDialog] = useState<{
    open: boolean;
    reviewId: string;
    clientName: string;
  }>({
    open: false,
    reviewId: '',
    clientName: ''
  });

  const handleRequestModification = (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId);
    if (review) {
      setModificationDialog({
        open: true,
        reviewId,
        clientName: review.clientName
      });
    }
  };

  const handleFilterChange = (updates: Partial<typeof filter>) => {
    setFilter(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Client Reviews</h1>
          <p className="text-muted-foreground">
            Manage your client reviews and request modifications if needed
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Statistics */}
      <ReviewStats stats={stats} />

      {/* Filters */}
      <ReviewsFilter filter={filter} onFilterChange={handleFilterChange} />

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p className="text-lg mb-2">No reviews found</p>
              <p className="text-sm">
                {filter.search || filter.rating !== 'all' || filter.status !== 'all'
                  ? 'Try adjusting your search filters'
                  : 'Your client reviews will appear here'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onRequestModification={handleRequestModification}
                onHideReview={hideReview}
                onUnhideReview={unhideReview}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modification Request Dialog */}
      <ModificationRequestDialog
        open={modificationDialog.open}
        onOpenChange={(open) => setModificationDialog(prev => ({ ...prev, open }))}
        reviewId={modificationDialog.reviewId}
        clientName={modificationDialog.clientName}
        onSubmit={requestModification}
      />
    </div>
  );
}
