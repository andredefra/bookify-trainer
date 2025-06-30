
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { TrainerData } from "../../data/trainerData";

interface ExperienceTabProps {
  trainer: TrainerData;
}

export function ExperienceTab({ trainer }: ExperienceTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Professional Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {trainer.professionalExp.map((exp, index) => (
          <div key={index} className="border-l-2 border-blue-200 pl-4">
            <h4 className="font-semibold text-lg">{exp.title}</h4>
            <p className="text-blue-600 font-medium">{exp.company}</p>
            <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
