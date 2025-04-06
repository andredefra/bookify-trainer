
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SettingsFooterProps {
  onSave: () => void;
}

export function SettingsFooter({ onSave }: SettingsFooterProps) {
  return (
    <div className="mt-8 pt-4 border-t">
      <Button onClick={onSave}>Save Changes</Button>
    </div>
  );
}
