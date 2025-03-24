
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";
import { Send } from "lucide-react";

interface ProgramFormFooterProps {
  clientName: string;
}

export function ProgramFormFooter({ clientName }: ProgramFormFooterProps) {
  return (
    <>
      <FormDescription>
        This program will be shared with {clientName} and they'll be able to log their workouts.
      </FormDescription>
      <Button type="submit" className="gap-1">
        <Send className="h-4 w-4 mr-1" />
        Send Program
      </Button>
    </>
  );
}
