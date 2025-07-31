import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, User, Crown, MessageCircle, UserPlus, CreditCard } from "lucide-react";

interface TrainerStatusCardProps {
  hasHumanTrainer: boolean;
  hasPersonalAIAccess: boolean;
  isEarlyAdopter: boolean;
  earlyAdopterNumber?: number;
  onRequestNewProgram: () => void;
  onInviteTrainer: () => void;
  onUpgradeSubscription: () => void;
}

export function TrainerStatusCard({
  hasHumanTrainer,
  hasPersonalAIAccess,
  isEarlyAdopter,
  earlyAdopterNumber,
  onRequestNewProgram,
  onInviteTrainer,
  onUpgradeSubscription
}: TrainerStatusCardProps) {
  const renderTrainerInfo = () => {
    if (hasHumanTrainer) {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium">Human Trainer Assigned</p>
            <p className="text-sm text-muted-foreground">Personal coaching available</p>
          </div>
          <Badge className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Active
          </Badge>
        </div>
      );
    }

    if (hasPersonalAIAccess) {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium flex items-center gap-2">
              Personal AI Trainer
              {isEarlyAdopter && (
                <Crown className="h-4 w-4 text-yellow-500" />
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              {isEarlyAdopter 
                ? `Early Adopter #${earlyAdopterNumber}` 
                : 'Premium AI coaching'}
            </p>
          </div>
          <Badge className="ml-auto bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900 dark:to-pink-900 dark:text-purple-300">
            Available
          </Badge>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <p className="font-medium text-muted-foreground">No Trainer Assigned</p>
          <p className="text-sm text-muted-foreground">Get coaching to access training programs</p>
        </div>
        <Badge variant="outline" className="ml-auto">
          Inactive
        </Badge>
      </div>
    );
  };

  const renderActionButton = () => {
    if (hasHumanTrainer || hasPersonalAIAccess) {
      return (
        <Button onClick={onRequestNewProgram} className="w-full">
          <MessageCircle className="h-4 w-4 mr-2" />
          Request New Program
        </Button>
      );
    }

    return (
      <div className="space-y-3">
        <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
            Attualmente non hai un personal trainer assegnato e non stai pagando l'abbonamento per il tuo Personal AI.
          </p>
          <div className="space-y-2">
            <Button onClick={onInviteTrainer} variant="outline" className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Invita un Trainer Umano
            </Button>
            <Button onClick={onUpgradeSubscription} className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Upgrade per Personal AI
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Training Support</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderTrainerInfo()}
        {renderActionButton()}
      </CardContent>
    </Card>
  );
}