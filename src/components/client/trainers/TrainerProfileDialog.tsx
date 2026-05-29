
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trainerData } from "./data/trainerData";
import { TrainerHeroSection } from "./profile/TrainerHeroSection";
import { TrainerHeaderInfo } from "./profile/TrainerHeaderInfo";
import { TrainerStatsCards } from "./profile/TrainerStatsCards";
import { TrainerSpecialties } from "./profile/TrainerSpecialties";
import { AboutTab } from "./profile/tabs/AboutTab";
import { ExperienceTab } from "./profile/tabs/ExperienceTab";
import { EducationTab } from "./profile/tabs/EducationTab";
import { ReviewsTab } from "./profile/tabs/ReviewsTab";
import { AvailabilityTab } from "./profile/tabs/AvailabilityTab";

interface TrainerProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainerId: number;
  trainerName: string;
  /** @deprecated kept for legacy callers; booking is now handled inside the dialog */
  onBookSession?: (trainerName: string) => void;
  /** @deprecated kept for legacy callers; messaging is now handled inside the dialog */
  onSendMessage?: (trainerName: string) => void;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string;
  clientName: string;
}

export function TrainerProfileDialog({
  open,
  onOpenChange,
  trainerId,
  trainerName,
}: TrainerProfileDialogProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  const trainer = trainerData[trainerId as keyof typeof trainerData];

  useEffect(() => {
    // Load reviews from localStorage
    const existingReviews = JSON.parse(localStorage.getItem('trainer-reviews') || '{}');
    setReviews(existingReviews[trainerId] || []);
  }, [trainerId, open]);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : trainer?.rating || 0;

  if (!trainer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Trainer Profile</DialogTitle>
        </DialogHeader>
        
        <TrainerHeroSection trainer={trainer} />

        <div className="px-8 pt-20 pb-8">
          <TrainerHeaderInfo 
            trainer={trainer}
            trainerId={trainerId}
            averageRating={averageRating}
          />

          <TrainerStatsCards trainer={trainer} />
          
          <TrainerSpecialties trainer={trainer} />

          {/* Tabs Section */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="availability">Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <AboutTab trainer={trainer} />
            </TabsContent>
            
            <TabsContent value="experience" className="mt-6">
              <ExperienceTab trainer={trainer} />
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <EducationTab trainer={trainer} />
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <ReviewsTab reviews={reviews} averageRating={averageRating} />
            </TabsContent>
            
            <TabsContent value="availability" className="mt-6">
              <AvailabilityTab trainer={trainer} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
