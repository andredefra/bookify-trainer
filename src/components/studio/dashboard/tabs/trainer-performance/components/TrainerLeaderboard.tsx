import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, Clock } from "lucide-react";
import { TrainerPerformance } from "../data/trainerPerformanceData";

interface TrainerLeaderboardProps {
  trainers: TrainerPerformance[];
}

export function TrainerLeaderboard({ trainers }: TrainerLeaderboardProps) {
  const sortedTrainers = [...trainers].sort((a, b) => b.rating - a.rating);
  
  const getMedalEmoji = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trainer Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedTrainers.map((trainer, index) => (
          <div 
            key={trainer.id}
            className={`flex items-center gap-4 p-4 rounded-lg border ${
              index === 0 ? "bg-amber-50 border-amber-200" : "bg-muted/30"
            }`}
          >
            <div className="text-2xl w-8 text-center">
              {getMedalEmoji(index) || (
                <span className="text-muted-foreground text-lg">{index + 1}</span>
              )}
            </div>
            
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {trainer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{trainer.name}</h4>
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 font-medium">{trainer.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {trainer.specialties.slice(0, 2).map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="hidden md:grid grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Reviews</p>
                <p className="font-semibold">{trainer.totalReviews}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clients</p>
                <p className="font-semibold">{trainer.activeClients}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="font-semibold text-emerald-600">€{trainer.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Retention</p>
                <p className="font-semibold text-blue-600">{trainer.retentionRate}%</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
