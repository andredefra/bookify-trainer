
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary';
import { toast } from 'sonner';

interface AddExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddExerciseDialog({ open, onOpenChange }: AddExerciseDialogProps) {
  const { addCustomExercise } = useExerciseLibrary();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: '',
    notes: '',
    videoUrl: '',
    muscleGroups: [] as string[],
    equipment: [] as string[],
  });
  
  const [newMuscleGroup, setNewMuscleGroup] = useState('');
  const [newEquipment, setNewEquipment] = useState('');

  const categories = [
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'legs', label: 'Legs' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'core', label: 'Core' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'stretching', label: 'Stretching' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const commonMuscleGroups = [
    'Pectorals', 'Latissimus Dorsi', 'Quadriceps', 'Hamstrings', 'Glutes',
    'Anterior Deltoids', 'Medial Deltoids', 'Posterior Deltoids', 'Biceps', 
    'Triceps', 'Rectus Abdominis', 'Obliques', 'Erector Spinae', 'Rhomboids',
    'Middle Trapezius', 'Calves', 'Hip Flexors'
  ];

  const commonEquipment = [
    'Bodyweight', 'Barbell', 'Dumbbells', 'Bench', 'Pull-up Bar', 
    'Cable Machine', 'Resistance Band', 'Medicine Ball', 'Kettlebell'
  ];

  const handleAddMuscleGroup = () => {
    if (newMuscleGroup && !formData.muscleGroups.includes(newMuscleGroup)) {
      setFormData(prev => ({
        ...prev,
        muscleGroups: [...prev.muscleGroups, newMuscleGroup]
      }));
      setNewMuscleGroup('');
    }
  };

  const handleAddEquipment = () => {
    if (newEquipment && !formData.equipment.includes(newEquipment)) {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, newEquipment]
      }));
      setNewEquipment('');
    }
  };

  const removeMuscleGroup = (muscle: string) => {
    setFormData(prev => ({
      ...prev,
      muscleGroups: prev.muscleGroups.filter(m => m !== muscle)
    }));
  };

  const removeEquipment = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter(e => e !== equipment)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.difficulty || !formData.notes) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.muscleGroups.length === 0) {
      toast.error('Please add at least one muscle group');
      return;
    }

    addCustomExercise({
      name: formData.name,
      category: formData.category as any,
      difficulty: formData.difficulty as any,
      notes: formData.notes,
      videoUrl: formData.videoUrl || undefined,
      muscleGroup: formData.muscleGroups,
      equipment: formData.equipment.length > 0 ? formData.equipment : ['Bodyweight'],
    });

    toast.success('Exercise added successfully!');
    
    // Reset form
    setFormData({
      name: '',
      category: '',
      difficulty: '',
      notes: '',
      videoUrl: '',
      muscleGroups: [],
      equipment: [],
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Exercise</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Exercise Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Custom Squat Variation"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="difficulty">Difficulty *</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(diff => (
                  <SelectItem key={diff.value} value={diff.value}>
                    {diff.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes/Instructions *</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Describe how to perform the exercise, position, movement, key points..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="videoUrl">Video URL (optional)</Label>
            <Input
              id="videoUrl"
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div>
            <Label>Muscle Groups *</Label>
            <div className="flex gap-2 mb-2">
              <Select value={newMuscleGroup} onValueChange={setNewMuscleGroup}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select muscle group" />
                </SelectTrigger>
                <SelectContent>
                  {commonMuscleGroups.map(muscle => (
                    <SelectItem key={muscle} value={muscle}>
                      {muscle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddMuscleGroup}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.muscleGroups.map(muscle => (
                <Badge key={muscle} variant="secondary" className="flex items-center gap-1">
                  {muscle}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeMuscleGroup(muscle)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Equipment</Label>
            <div className="flex gap-2 mb-2">
              <Select value={newEquipment} onValueChange={setNewEquipment}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  {commonEquipment.map(equip => (
                    <SelectItem key={equip} value={equip}>
                      {equip}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddEquipment}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.equipment.map(equip => (
                <Badge key={equip} variant="outline" className="flex items-center gap-1">
                  {equip}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeEquipment(equip)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Exercise
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
