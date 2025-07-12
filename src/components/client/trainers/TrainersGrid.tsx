
import { useState } from "react";
import { TrainerCard } from "./TrainerCard";
import { ReviewDialog } from "./ReviewDialog";
import { TrainerProfileDialog } from "./TrainerProfileDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  status?: "online" | "in-session" | "offline";
  hourlyRate?: number;
  nextAvailability?: string;
  location?: string;
  plan?: string;
}

interface TrainersGridProps {
  trainers: Trainer[];
  onPayClick: (trainer: string, amount: number, trainerPlan?: string) => void;
  followedTrainers: number[];
  onFollowToggle: (id: number, name: string) => void;
}

export function TrainersGrid({ 
  trainers, 
  onPayClick, 
  followedTrainers, 
  onFollowToggle 
}: TrainersGridProps) {
  const navigate = useNavigate();
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{id: number, name: string} | null>(null);

  const handleViewProfile = (id: number, name: string) => {
    setSelectedTrainer({ id, name });
    setShowProfileDialog(true);
  };

  const handleLeaveReview = (id: number, name: string) => {
    setSelectedTrainer({ id, name });
    setShowReviewDialog(true);
  };

  const handleBookSession = (trainerName: string) => {
    setShowProfileDialog(false);
    // Navigate to sessions tab to book
    navigate('/client-dashboard', { 
      state: { 
        activeTab: "sessions"
      } 
    });
    toast({
      title: "Booking Session",
      description: `Redirecting to book a session with ${trainerName}`,
    });
  };

  const handleSendMessage = (trainerName: string) => {
    setShowProfileDialog(false);
    // Navigate to messages tab
    navigate('/client-dashboard', { 
      state: { 
        activeTab: "messages"
      } 
    });
    toast({
      title: "Opening Messages",
      description: `Opening chat with ${trainerName}`,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            id={trainer.id}
            name={trainer.name}
            specialty={trainer.specialty}
            rating={trainer.rating}
            reviews={trainer.reviews}
            image={trainer.image}
            status={trainer.status}
            hourlyRate={trainer.hourlyRate}
            nextAvailability={trainer.nextAvailability}
            location={trainer.location}
            plan={trainer.plan}
            onPayClick={onPayClick}
            isFollowing={followedTrainers.includes(trainer.id)}
            onFollowToggle={onFollowToggle}
            onViewProfile={handleViewProfile}
            onLeaveReview={handleLeaveReview}
          />
        ))}
      </div>

      {/* Review Dialog */}
      {selectedTrainer && (
        <ReviewDialog
          open={showReviewDialog}
          onOpenChange={setShowReviewDialog}
          trainerId={selectedTrainer.id}
          trainerName={selectedTrainer.name}
        />
      )}

      {/* Profile Dialog */}
      {selectedTrainer && (
        <TrainerProfileDialog
          open={showProfileDialog}
          onOpenChange={setShowProfileDialog}
          trainerId={selectedTrainer.id}
          trainerName={selectedTrainer.name}
          onBookSession={handleBookSession}
          onSendMessage={handleSendMessage}
        />
      )}
    </>
  );
}
