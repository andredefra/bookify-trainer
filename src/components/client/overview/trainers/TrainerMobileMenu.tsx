
import React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TrainerMobileMenuProps {
  trainerName: string;
  onMessageClick: () => void;
  onPayClick: () => void;
  onBookClick: () => void;
}

export function TrainerMobileMenu({ 
  trainerName, 
  onMessageClick, 
  onPayClick, 
  onBookClick 
}: TrainerMobileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onMessageClick}>
          Message
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPayClick}>
          Pay
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onBookClick}>
          Book Session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
