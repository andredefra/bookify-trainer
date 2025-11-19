import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Crown, Sparkles, Zap } from "lucide-react";
import { useClientSubscription } from "@/hooks/useClientSubscription";
import { toast } from "sonner";

interface ClientUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientUpgradeDialog({ open, onOpenChange }: ClientUpgradeDialogProps) {
  const { upgradeToProViaMock } = useClientSubscription();
  
  const handleUpgrade = async () => {
    await upgradeToProViaMock();
    toast.success('Upgraded to Pro! 🎉');
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-amber-500" />
            Upgrade to Pro
          </DialogTitle>
          <DialogDescription>
            Unlock unlimited AI coaching and advanced features
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="text-4xl font-bold">€14.99</div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">What you get:</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Unlimited AI Workout Coach</p>
                  <p className="text-sm text-muted-foreground">
                    Ask questions, get tips, and receive personalized advice during every workout
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">AI Form Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Upload videos/photos for instant form feedback with Vision AI
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Exercise Demonstrations</p>
                  <p className="text-sm text-muted-foreground">
                    AI-generated images showing correct equipment setup and angles
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Priority Support</p>
                  <p className="text-sm text-muted-foreground">
                    Faster responses and dedicated assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              size="lg"
            >
              <Crown className="mr-2 h-5 w-5" />
              Upgrade to Pro Now
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Cancel anytime. No long-term commitment.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
