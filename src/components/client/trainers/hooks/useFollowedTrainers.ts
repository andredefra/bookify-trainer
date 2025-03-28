
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface Trainer {
  id: number;
  name: string;
}

export function useFollowedTrainers(defaultTrainers: Array<{ id: number }> = []) {
  const [followedTrainers, setFollowedTrainers] = useState<number[]>([]);
  
  // Load followed trainers from localStorage on component mount
  useEffect(() => {
    const storedFollowedTrainers = localStorage.getItem('followedTrainers');
    
    if (storedFollowedTrainers) {
      try {
        const parsedTrainers = JSON.parse(storedFollowedTrainers);
        console.log("Loaded followedTrainers from localStorage:", parsedTrainers);
        
        // Ensure it's an array before setting state
        if (Array.isArray(parsedTrainers)) {
          setFollowedTrainers(parsedTrainers);
        } else {
          console.error("Stored followedTrainers is not an array:", parsedTrainers);
          // Initialize with default trainers if stored data is invalid
          initializeWithDefaultTrainers();
        }
      } catch (error) {
        console.error("Error parsing followedTrainers from localStorage:", error);
        // Initialize with default trainers on parse error
        initializeWithDefaultTrainers();
      }
    } else {
      // Initialize with default trainers if nothing in localStorage
      initializeWithDefaultTrainers();
    }
  }, []);
  
  const initializeWithDefaultTrainers = () => {
    console.log("Initializing with default trainers:", defaultTrainers);
    const trainerIds = defaultTrainers.map(trainer => trainer.id);
    setFollowedTrainers(trainerIds);
    localStorage.setItem('followedTrainers', JSON.stringify(trainerIds));
  };

  // Save followed trainers to localStorage whenever it changes
  useEffect(() => {
    if (followedTrainers.length > 0) {
      console.log("Saving followedTrainers to localStorage:", followedTrainers);
      localStorage.setItem('followedTrainers', JSON.stringify(followedTrainers));
    }
  }, [followedTrainers]);

  const handleFollowToggle = (trainerId: number, trainerName: string) => {
    console.log(`Toggle follow for trainer ${trainerName} with ID ${trainerId}`);
    console.log("Current followedTrainers:", followedTrainers);
    
    if (followedTrainers.includes(trainerId)) {
      // Unfollow
      const newFollowedTrainers = followedTrainers.filter(id => id !== trainerId);
      console.log("New followedTrainers after unfollow:", newFollowedTrainers);
      setFollowedTrainers(newFollowedTrainers);
      toast({
        title: "Trainer Unfollowed",
        description: `You have unfollowed ${trainerName}`,
        variant: "default",
      });
    } else {
      // Follow
      const newFollowedTrainers = [...followedTrainers, trainerId];
      console.log("New followedTrainers after follow:", newFollowedTrainers);
      setFollowedTrainers(newFollowedTrainers);
      toast({
        title: "Trainer Followed",
        description: `You are now following ${trainerName}. You'll receive their programs and session invitations.`,
        variant: "default",
      });
    }
  };

  return {
    followedTrainers,
    handleFollowToggle
  };
}
