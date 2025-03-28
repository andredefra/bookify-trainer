
import { SearchBar } from "./SearchBar";
import { TrainerList } from "./TrainerList";
import { BookingDialog } from "./BookingDialog";
import { useTrainerMarketplace } from "./hooks/useTrainerMarketplace";

export function TrainerMarketplace() {
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
  } = useTrainerMarketplace();
  
  return (
    <div className="space-y-6">
      {/* Search and filter */}
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={location}
        setLocation={setLocation}
      />
      
      {/* Trainer cards */}
      <TrainerList 
        trainers={trainers} 
        onBookSession={handleBookSession} 
      />
      
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
