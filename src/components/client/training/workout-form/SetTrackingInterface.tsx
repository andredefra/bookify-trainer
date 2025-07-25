import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, CheckCircle, Circle, Plus, Minus } from "lucide-react";
import { SetLogData } from "./types";

interface SetTrackingInterfaceProps {
  sets: SetLogData[];
  onSetsChange: (sets: SetLogData[]) => void;
  targetSets: number;
  targetReps: number;
  targetWeight: number;
}

export function SetTrackingInterface({ 
  sets, 
  onSetsChange, 
  targetSets, 
  targetReps, 
  targetWeight 
}: SetTrackingInterfaceProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const updateSet = (setIndex: number, field: keyof SetLogData, value: any) => {
    const updatedSets = [...sets];
    if (updatedSets[setIndex]) {
      updatedSets[setIndex] = { ...updatedSets[setIndex], [field]: value };
      onSetsChange(updatedSets);
    }
  };

  const toggleSetCompletion = (setIndex: number) => {
    updateSet(setIndex, "completed", !sets[setIndex]?.completed);
  };

  const addSet = () => {
    const newSet: SetLogData = {
      setNumber: sets.length + 1,
      targetReps: targetReps,
      weight: targetWeight,
      completed: false
    };
    onSetsChange([...sets, newSet]);
  };

  const removeSet = () => {
    if (sets.length > 1) {
      onSetsChange(sets.slice(0, -1));
    }
  };

  const addNotesToSet = (setIndex: number, notes: string) => {
    updateSet(setIndex, "notes", notes);
  };

  const completedSets = sets.filter(set => set.completed).length;

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <CardTitle className="text-base flex items-center gap-2">
                Set Tracking
                <span className="text-sm font-normal text-muted-foreground">
                  ({completedSets}/{sets.length} completed)
                </span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSet();
                  }}
                  disabled={sets.length <= 1}
                  className="h-7 w-7 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    addSet();
                  }}
                  className="h-7 w-7 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>
          </CollapsibleTrigger>
        </Collapsible>
      </CardHeader>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {sets.map((set, index) => (
                <SetRow
                  key={set.setNumber}
                  set={set}
                  index={index}
                  onUpdate={updateSet}
                  onToggleCompletion={toggleSetCompletion}
                  onAddNotes={addNotesToSet}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

interface SetRowProps {
  set: SetLogData;
  index: number;
  onUpdate: (setIndex: number, field: keyof SetLogData, value: any) => void;
  onToggleCompletion: (setIndex: number) => void;
  onAddNotes: (setIndex: number, notes: string) => void;
}

function SetRow({ set, index, onUpdate, onToggleCompletion, onAddNotes }: SetRowProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(set.notes || "");

  const saveNotes = () => {
    onAddNotes(index, tempNotes);
    setShowNotes(false);
  };

  return (
    <div className={`border rounded-lg p-3 ${set.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3 mb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onToggleCompletion(index)}
          className={`h-8 w-8 p-0 ${set.completed ? 'text-green-600' : 'text-gray-400'}`}
        >
          {set.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
        </Button>
        
        <div className="font-medium">Set {set.setNumber}</div>
        
        <div className="text-sm text-muted-foreground">
          {set.targetReps || 8}-{(set.targetReps || 8) + 2}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-2">
        <div>
          <Label className="text-xs">Weight (kg)</Label>
          <Input
            type="number"
            value={set.weight || ''}
            onChange={(e) => onUpdate(index, "weight", parseFloat(e.target.value) || 0)}
            placeholder="0"
            step="0.5"
            className="h-8"
          />
        </div>
        
        <div>
          <Label className="text-xs">Reps</Label>
          <Input
            type="number"
            value={set.actualReps || ''}
            onChange={(e) => onUpdate(index, "actualReps", parseInt(e.target.value) || 0)}
            placeholder={set.targetReps?.toString() || "8"}
            className="h-8"
          />
        </div>
        
        <div>
          <Label className="text-xs">Rest (s)</Label>
          <Input
            type="number"
            value={set.restTime || ''}
            onChange={(e) => onUpdate(index, "restTime", parseInt(e.target.value) || 0)}
            placeholder="60"
            className="h-8"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setShowNotes(!showNotes);
            if (!showNotes) setTempNotes(set.notes || "");
          }}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          {set.notes ? "Edit notes" : "Add notes"}
        </Button>
      </div>

      {showNotes && (
        <div className="mt-2 space-y-2">
          <Textarea
            value={tempNotes}
            onChange={(e) => setTempNotes(e.target.value)}
            placeholder="Add notes for this set..."
            className="h-16 text-xs"
          />
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={saveNotes}>
              Save
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              onClick={() => setShowNotes(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}