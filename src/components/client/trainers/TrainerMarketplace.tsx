
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { TrainerList } from "./TrainerList";
import { BookingDialog } from "./BookingDialog";
import { TrainerProfileDialog } from "./TrainerProfileDialog";
import { useTrainerMarketplace } from "./hooks/useTrainerMarketplace";
import { useFollowedTrainers } from "./hooks/useFollowedTrainers";
import { toast } from "@/hooks/use-toast";

interface TrainerMarketplaceProps {
  isMyTrainersView?: boolean;
  isGymFilterActive?: boolean;
  gymId?: string;
}

export function TrainerMarketplace({ 
  isMyTrainersView = false,
  isGymFilterActive = false,
  gymId
}: TrainerMarketplaceProps) {
  const navigate = useNavigate();
  const { followedTrainers, handleFollowToggle } = useFollowedTrainers();

  const {
    searchQuery,
    setSearchQuery,
    location,
    setLocation,
    trainers,
    showBookingDialog,
    setShowBookingDialog,
    selectedTrainer,
    handleBookSession,
    handleBookingSubmit
  } = useTrainerMarketplace(followedTrainers, isGymFilterActive, gymId);

  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<{ id: number; name: string } | null>(null);

  const handleViewProfile = (id: number, name: string) => {
    setSelectedProfile({ id, name });
    setShowProfileDialog(true);
  };

  const handleProfileBookSession = (trainerName: string) => {
    setShowProfileDialog(false);
    handleBookSession(trainerName);
  };

  const handleProfileSendMessage = (trainerName: string) => {
    setShowProfileDialog(false);
    navigate('/client-dashboard', { state: { activeTab: "messages" } });
    toast({
      title: "Opening Messages",
      description: `Opening chat with ${trainerName}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and filter */}
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={location}
        setLocation={setLocation}
      />
      
      {trainers.length === 0 ? (
        <div className="text-center py-10 bg-background rounded-md border">
          <p className="text-muted-foreground">No trainers match your search criteria or all trainers are already being followed.</p>
          <p className="text-sm mt-2">Try adjusting your filters or check your followed trainers.</p>
        </div>
      ) : (
        <TrainerList 
          trainers={trainers} 
          onBookSession={handleBookSession} 
          followedTrainers={followedTrainers}
          onFollowToggle={handleFollowToggle}
          isMyTrainersView={isMyTrainersView}
          onViewProfile={handleViewProfile}
        />
      )}
      
      {/* Session Booking Dialog */}
      <BookingDialog 
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        selectedTrainer={selectedTrainer}
        onSubmit={handleBookingSubmit}
        onCancel={() => setShowBookingDialog(false)}
      />

      {/* Profile Dialog */}
      {selectedProfile && (
        <TrainerProfileDialog
          open={showProfileDialog}
          onOpenChange={setShowProfileDialog}
          trainerId={selectedProfile.id}
          trainerName={selectedProfile.name}
          onBookSession={handleProfileBookSession}
          onSendMessage={handleProfileSendMessage}
        />
      )}
    </div>
  );
}
