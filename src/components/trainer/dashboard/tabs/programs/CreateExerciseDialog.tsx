
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { generateEquipmentImages } from '@/data/exercises/equipmentImageMap';
import { toast } from 'sonner';

interface CreateExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (exercise: ExerciseData) => void;
}

export function CreateExerciseDialog({ open, onOpenChange, onSave }: CreateExerciseDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    muscleGroup: '',
    equipment: '',
    notes: '',
    videoUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      toast.error('Please fill in required fields');
      return;
    }

    const equipmentArray = formData.equipment.split(',').map(eq => eq.trim()).filter(eq => eq);
    const muscleGroupArray = formData.muscleGroup.split(',').map(mg => mg.trim()).filter(mg => mg);

    const newExercise: ExerciseData = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      category: formData.category,
      difficulty: formData.difficulty,
      muscleGroup: muscleGroupArray,
      equipment: equipmentArray,
      notes: formData.notes,
      videoUrl: formData.videoUrl || undefined,
      equipmentImages: generateEquipmentImages(equipmentArray),
      alternativeExercises: []
    };

    onSave(newExercise);
    setFormData({
      name: '',
      category: '',
      difficulty: 'beginner',
      muscleGroup: '',
      equipment: '',
      notes: '',
      videoUrl: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Exercise</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Exercise Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter exercise name"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chest">Chest</SelectItem>
                  <SelectItem value="back">Back</SelectItem>
                  <SelectItem value="legs">Legs</SelectItem>
                  <SelectItem value="shoulders">Shoulders</SelectItem>
                  <SelectItem value="arms">Arms</SelectItem>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="functional">Functional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setFormData(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={formData.videoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                placeholder="YouTube or video URL"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="muscleGroup">Muscle Groups (comma separated)</Label>
            <Input
              id="muscleGroup"
              value={formData.muscleGroup}
              onChange={(e) => setFormData(prev => ({ ...prev, muscleGroup: e.target.value }))}
              placeholder="chest, triceps, shoulders"
            />
          </div>

          <div>
            <Label htmlFor="equipment">Equipment (comma separated)</Label>
            <Input
              id="equipment"
              value={formData.equipment}
              onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
              placeholder="barbell, bench, dumbbells"
            />
          </div>

          <div>
            <Label htmlFor="notes">Exercise Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Instructions, tips, or notes about the exercise"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Exercise
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
