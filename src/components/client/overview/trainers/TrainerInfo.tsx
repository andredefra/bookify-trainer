
import React from "react";

interface TrainerInfoProps {
  name: string;
  specialty: string;
}

export function TrainerInfo({ name, specialty }: TrainerInfoProps) {
  return (
    <div className="flex-1 min-w-0">
      <div className="font-medium truncate">{name}</div>
      <div className="text-xs text-muted-foreground">{specialty}</div>
    </div>
  );
}
