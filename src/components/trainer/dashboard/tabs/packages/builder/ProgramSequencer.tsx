import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Program {
  id: string;
  title: string;
  duration: number;
  sequenceOrder: number;
}

interface ProgramSequencerProps {
  programs: Program[];
  onReorder: (programs: Program[]) => void;
}

interface DraggableProgramProps {
  program: Program;
  index: number;
  moveProgram: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableProgram({ program, index, moveProgram }: DraggableProgramProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'program',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'program',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveProgram(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-2 cursor-move hover:shadow-md transition-shadow">
        <CardContent className="p-3 flex items-center gap-3">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-semibold">
            {program.sequenceOrder}
          </Badge>
          <div className="flex-1">
            <p className="font-medium">{program.title}</p>
            <p className="text-xs text-muted-foreground">{program.duration} weeks</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProgramSequencer({ programs, onReorder }: ProgramSequencerProps) {
  const moveProgram = (dragIndex: number, hoverIndex: number) => {
    const newPrograms = [...programs];
    const [removed] = newPrograms.splice(dragIndex, 1);
    newPrograms.splice(hoverIndex, 0, removed);
    
    // Update sequence orders
    const reorderedPrograms = newPrograms.map((prog, idx) => ({
      ...prog,
      sequenceOrder: idx + 1
    }));
    
    onReorder(reorderedPrograms);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    moveProgram(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index === programs.length - 1) return;
    moveProgram(index, index + 1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <GripVertical className="h-4 w-4" />
          <span>Drag to reorder or use arrows</span>
        </div>
        {programs.map((program, index) => (
          <div key={program.id} className="flex items-center gap-2">
            <div className="flex-1">
              <DraggableProgram 
                program={program} 
                index={index} 
                moveProgram={moveProgram}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => moveUp(index)}
                disabled={index === 0}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => moveDown(index)}
                disabled={index === programs.length - 1}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DndProvider>
  );
}
