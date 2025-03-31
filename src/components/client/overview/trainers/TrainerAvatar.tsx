
import React from "react";

interface TrainerAvatarProps {
  src: string;
  alt: string;
}

export function TrainerAvatar({ src, alt }: TrainerAvatarProps) {
  return (
    <div className="h-10 w-10 rounded-full overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
}
