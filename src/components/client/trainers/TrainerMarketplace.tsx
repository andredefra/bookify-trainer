
import { SearchBar } from "./SearchBar";
import { TrainerList } from "./TrainerList";
import { BookingDialog } from "./BookingDialog";
import { useTrainerMarketplace } from "./hooks/useTrainerMarketplace";
import { useFollowedTrainers } from "./hooks/useFollowedTrainers";

interface TrainerMarketplaceProps {
  isMyTrainersView?: boolean;
}

export function TrainerMarketplace({ isMyTrainersView = false }: TrainerMarketplaceProps) {
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
  } = useTrainerMarketplace(followedTrainers);
  
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
        /* Trainer cards */
        <TrainerList 
          trainers={trainers} 
          onBookSession={handleBookSession} 
          followedTrainers={followedTrainers}
          onFollowToggle={handleFollowToggle}
          isMyTrainersView={isMyTrainersView}
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
    </div>
  );
}
