
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Euro, ArrowRight } from "lucide-react";
import { ProgramSequencer } from "./ProgramSequencer";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Program {
  id: string;
  title: string;
  duration: number; // weeks
  price: number;
  sequenceOrder: number;
  trainingProgramData?: any;
}

interface PackageData {
  selectedPrograms: Program[];
  isSequential?: boolean;
  [key: string]: any;
}

interface ProgramsStepProps {
  data: PackageData;
  onChange: (updates: Partial<PackageData>) => void;
}

// Mock programs - in real app this would come from database
const availablePrograms: Program[] = [
  {
    id: "1",
    title: "Strength Building Program",
    duration: 8,
    price: 150,
    sequenceOrder: 0
  },
  {
    id: "2",
    title: "Weight Loss Intensive",
    duration: 12,
    price: 200,
    sequenceOrder: 0
  },
  {
    id: "3",
    title: "Beginner Fitness Foundation",
    duration: 6,
    price: 100,
    sequenceOrder: 0
  },
  {
    id: "4",
    title: "Advanced Muscle Building",
    duration: 10,
    price: 180,
    sequenceOrder: 0
  },
  {
    id: "5",
    title: "Functional Movement",
    duration: 4,
    price: 80,
    sequenceOrder: 0
  }
];

export function ProgramsStep({ data, onChange }: ProgramsStepProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrograms = availablePrograms.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProgram = (program: Program) => {
    const isSelected = data.selectedPrograms.some(p => p.id === program.id);
    
    if (isSelected) {
      const newPrograms = data.selectedPrograms.filter(p => p.id !== program.id);
      // Reorder sequence numbers
      const reorderedPrograms = newPrograms.map((p, idx) => ({
        ...p,
        sequenceOrder: idx + 1
      }));
      onChange({ selectedPrograms: reorderedPrograms });
    } else {
      // Add new program at the end of the sequence
      const newSequenceOrder = data.selectedPrograms.length + 1;
      const newProgram = { ...program, sequenceOrder: newSequenceOrder };
      const newPrograms = [...data.selectedPrograms, newProgram];
      onChange({ selectedPrograms: newPrograms });
    }
  };

  const handleReorder = (reorderedPrograms: Program[]) => {
    onChange({ selectedPrograms: reorderedPrograms });
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Select Training Programs</h3>
        <p className="text-sm text-muted-foreground">
          Add structured training programs to your package
        </p>
      </div>

      {data.selectedPrograms.length > 0 && (
        <div className="mb-4 space-y-4">
          {!data.isSequential ? (
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Selected Programs:</h4>
              <div className="flex flex-wrap gap-2">
                {data.selectedPrograms.map(program => (
                  <Badge key={program.id} variant="secondary" className="bg-green-100 text-green-800">
                    {program.title} ({program.duration} weeks - €{program.price})
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <ArrowRight className="h-5 w-5 text-blue-700" />
                <h4 className="font-medium text-blue-800">Program Sequence:</h4>
              </div>
              <Alert className="mb-3 bg-blue-50 border-blue-200">
                <AlertDescription className="text-sm text-blue-800">
                  Programs will unlock sequentially. The client must complete each program before the next one becomes available.
                </AlertDescription>
              </Alert>
              <ProgramSequencer 
                programs={data.selectedPrograms}
                onReorder={handleReorder}
              />
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4">
        {filteredPrograms.map((program) => {
          const isSelected = data.selectedPrograms.some(p => p.id === program.id);
          
          return (
            <Card 
              key={program.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => toggleProgram(program)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => {}} // Handled by card click
                    />
                    <div>
                      <CardTitle className="text-base">{program.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {program.duration} weeks program
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{program.duration} weeks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Euro className="h-4 w-4" />
                    <span>€{program.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {data.selectedPrograms.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No programs selected. Programs are optional.</p>
        </div>
      )}
    </div>
  );
}
