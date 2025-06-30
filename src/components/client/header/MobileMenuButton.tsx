
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
  onClick?: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="mr-2">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}
