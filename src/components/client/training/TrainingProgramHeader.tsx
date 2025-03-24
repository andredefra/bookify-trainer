
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Download } from "lucide-react";

interface TrainingProgramHeaderProps {
  title: string;
  week: string;
  trainerName: string;
}

export function TrainingProgramHeader({ title, week, trainerName }: TrainingProgramHeaderProps) {
  return (
    <CardHeader className="bg-primary/5 pb-4">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="flex items-center">
            <Dumbbell className="mr-2 h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>
            {week} • Created by {trainerName}
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </CardHeader>
  );
}
