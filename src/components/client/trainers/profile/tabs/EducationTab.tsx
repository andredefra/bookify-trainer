
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Award } from "lucide-react";
import { TrainerData } from "../../data/trainerData";

interface EducationTabProps {
  trainer: TrainerData;
}

export function EducationTab({ trainer }: EducationTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Education & Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium text-lg mb-2">Education</h4>
          <p className="text-gray-700">{trainer.education}</p>
        </div>
        <Separator />
        <div>
          <h4 className="font-medium text-lg mb-3">Certifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {trainer.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Award className="h-4 w-4 text-amber-600" />
                <span className="font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
