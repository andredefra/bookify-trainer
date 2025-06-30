
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainerData } from "../../data/trainerData";

interface AboutTabProps {
  trainer: TrainerData;
}

export function AboutTab({ trainer }: AboutTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About {trainer.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{trainer.bio}</p>
      </CardContent>
    </Card>
  );
}
