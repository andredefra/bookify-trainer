
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

interface ProgramFormHeaderProps {
  clientName: string;
}

export function ProgramFormHeader({ clientName }: ProgramFormHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="flex items-center">
          <Dumbbell className="mr-2 h-5 w-5 text-primary" />
          Create Training Program
        </CardTitle>
        <CardDescription>
          Create and share a customized training program for {clientName}
        </CardDescription>
      </div>
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
        Premium Feature
      </Badge>
    </div>
  );
}
