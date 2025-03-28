
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
      const parsedTrainers = JSON.parse(storedFollowedTrainers);
      console.log("Loaded followed trainers from storage:", parsedTrainers);
      setFollowedTrainers(parsedTrainers);
    } else {
      // If no followed trainers in localStorage, automatically follow default trainers
      const trainerIds = defaultTrainers.map(trainer => trainer.id);
      console.log("Setting default followed trainers:", trainerIds);
      setFollowedTrainers(trainerIds);
      localStorage.setItem('followedTrainers', JSON.stringify(trainerIds));
    }
  }, [defaultTrainers]);

  // Save followed trainers to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('followedTrainers', JSON.stringify(followedTrainers));
    console.log("Saved followed trainers:", followedTrainers);
  }, [followedTrainers]);

  const handleFollowToggle = (trainerId: number, trainerName: string) => {
    if (followedTrainers.includes(trainerId)) {
      // Unfollow
      setFollowedTrainers(followedTrainers.filter(id => id !== trainerId));
      toast.success(`You have unfollowed ${trainerName}`);
    } else {
      // Follow
      setFollowedTrainers([...followedTrainers, trainerId]);
      toast.success(`You are now following ${trainerName}. You'll receive their programs and session invitations.`);
    }
  };

  return {
    followedTrainers,
    handleFollowToggle
  };
}
