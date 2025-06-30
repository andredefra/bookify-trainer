
import { Card } from "@/components/ui/card";
import { Users, Target, TrendingUp, Award } from "lucide-react";
import { TrainerData } from "../data/trainerData";

interface TrainerStatsCardsProps {
  trainer: TrainerData;
}

export function TrainerStatsCards({ trainer }: TrainerStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 text-center">
        <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
        <div className="text-lg font-bold">{trainer.stats.clientsHelped}</div>
        <div className="text-xs text-gray-500">Clients Helped</div>
      </Card>
      <Card className="p-4 text-center">
        <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
        <div className="text-lg font-bold">{trainer.stats.successRate}</div>
        <div className="text-xs text-gray-500">Success Rate</div>
      </Card>
      <Card className="p-4 text-center">
        <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
        <div className="text-lg font-bold">{trainer.stats.avgResult}</div>
        <div className="text-xs text-gray-500">Avg. Results</div>
      </Card>
      <Card className="p-4 text-center">
        <Award className="h-6 w-6 mx-auto mb-2 text-amber-600" />
        <div className="text-lg font-bold">{trainer.stats.specializations}</div>
        <div className="text-xs text-gray-500">Specializations</div>
      </Card>
    </div>
  );
}
