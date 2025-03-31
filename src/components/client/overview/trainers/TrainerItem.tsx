
import React from "react";
import { TrainerAvatar } from "./TrainerAvatar";
import { TrainerInfo } from "./TrainerInfo";
import { TrainerActions } from "./TrainerActions";
import { TrainerMobileMenu } from "./TrainerMobileMenu";
import { useMediaQuery } from "@/hooks/use-mobile";

interface TrainerItemProps {
  name: string;
  specialty: string;
  image: string;
  onMessageClick: () => void;
  onPayClick: () => void;
  onBookClick: () => void;
}

export function TrainerItem({
  name,
  specialty,
  image,
  onMessageClick,
  onPayClick,
  onBookClick
}: TrainerItemProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  return (
    <div className="flex items-center gap-2">
      <TrainerAvatar src={image} alt={name} />
      <TrainerInfo name={name} specialty={specialty} />
      
      {isMobile ? (
        <TrainerMobileMenu
          trainerName={name}
          onMessageClick={onMessageClick}
          onPayClick={onPayClick}
          onBookClick={onBookClick}
        />
      ) : (
        <TrainerActions
          onMessageClick={onMessageClick}
          onPayClick={onPayClick}
          onBookClick={onBookClick}
        />
      )}
    </div>
  );
}
