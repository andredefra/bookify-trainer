
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function MyTrainerExplanation() {
  return (
    <div className="p-4 bg-muted rounded-lg">
      <h3 className="font-medium mb-2 text-sm">What makes a trainer "My Trainer"?</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        A trainer becomes <strong>"My Trainer"</strong> when they assign you a personalized program or package. 
        Simply following a trainer, participating in their group sessions, or being invited doesn't make them 
        your personal trainer. They only become your trainer when they send you a customized package or training program.
      </p>
    </div>
  );
}
