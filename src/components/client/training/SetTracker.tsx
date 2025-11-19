import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Circle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SetData } from '@/data/training/types';

interface SetTrackerProps {
  setData: SetData;
  suggestedWeight: number;
  onUpdate: (data: Partial<SetData>) => void;
  previousPerformance?: { weight: number; reps: number } | null;
  showProgress?: boolean;
  disabled?: boolean;
}

export function SetTracker({ 
  setData, 
  suggestedWeight, 
  onUpdate, 
  previousPerformance,
  showProgress = false,
  disabled = false
}: SetTrackerProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(setData.notes || '');

  const handleWeightChange = (value: string) => {
    const weight = parseFloat(value);
    if (!isNaN(weight)) {
      onUpdate({ weight });
    }
  };

  const handleRepsChange = (value: string) => {
    const reps = parseInt(value);
    if (!isNaN(reps)) {
      onUpdate({ actualReps: reps });
    }
  };

  const toggleCompleted = () => {
    onUpdate({ completed: !setData.completed });
  };

  const saveNotes = () => {
    onUpdate({ notes: tempNotes });
    setShowNotes(false);
  };

  const getProgressIndicator = () => {
    if (!previousPerformance || !setData.weight) return null;
    
    const weightDiff = setData.weight - previousPerformance.weight;
    if (weightDiff > 0) {
      return <TrendingUp className="h-3 w-3 text-green-600" />;
    } else if (weightDiff < 0) {
      return <TrendingDown className="h-3 w-3 text-red-500" />;
    }
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <div className={`space-y-3 p-3 bg-muted/30 rounded-lg border ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCompleted}
            className="h-8 w-8 p-0"
            disabled={disabled}
          >
            {setData.completed ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          <span className="text-sm font-medium">Set {setData.setNumber}</span>
          <Badge variant="outline" className="text-xs">
            {setData.targetReps}
          </Badge>
        </div>
        
        {showProgress && getProgressIndicator() && (
          <div className="flex items-center gap-1">
            {getProgressIndicator()}
            <span className="text-xs text-muted-foreground">
              vs last: {previousPerformance?.weight}kg × {previousPerformance?.reps}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Weight (kg)</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              step="0.5"
              placeholder={suggestedWeight.toString()}
              value={setData.weight || ''}
              onChange={(e) => handleWeightChange(e.target.value)}
              className="h-8 text-sm"
              disabled={disabled}
            />
            {suggestedWeight && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdate({ weight: suggestedWeight })}
                className="h-8 px-2 text-xs"
                disabled={disabled}
              >
                Use {suggestedWeight}kg
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Reps</label>
          <Input
            type="number"
            placeholder={setData.targetReps}
            value={setData.actualReps || ''}
            onChange={(e) => handleRepsChange(e.target.value)}
            className="h-8 text-sm"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!showNotes ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(true)}
            className="h-7 px-2 text-xs text-muted-foreground"
            disabled={disabled}
          >
            {setData.notes ? 'Edit notes' : 'Add notes'}
          </Button>
        ) : (
          <div className="flex-1 space-y-2">
            <Textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              placeholder="Add notes for this set..."
              rows={2}
              className="text-sm"
              disabled={disabled}
            />
            <div className="flex gap-2">
              <Button onClick={saveNotes} size="sm" variant="outline" disabled={disabled}>
                Save
              </Button>
              <Button onClick={() => setShowNotes(false)} size="sm" variant="ghost" disabled={disabled}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {setData.notes && !showNotes && (
        <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
          <strong>Notes:</strong> {setData.notes}
        </div>
      )}
    </div>
  );
}