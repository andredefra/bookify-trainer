
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Filter } from 'lucide-react';
import { ExerciseLibraryList } from './ExerciseLibraryList';
import { AddExerciseDialog } from './AddExerciseDialog';
import { useExerciseLibrary } from '@/hooks/useExerciseLibrary';

interface ExerciseLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExerciseLibraryDialog({ open, onOpenChange }: ExerciseLibraryDialogProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const {
    filteredExercises,
    customExercises,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    deleteCustomExercise,
    updateCustomExercise
  } = useExerciseLibrary();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'legs', label: 'Legs' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'core', label: 'Core' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'stretching', label: 'Stretching' }
  ];

  const allExercises = filteredExercises;
  const myExercises = customExercises.filter(exercise => {
    if (searchQuery) {
      return exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             exercise.muscleGroup.some(muscle => muscle.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedCategory !== 'all') {
      return exercise.category === selectedCategory;
    }
    return true;
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Exercise Library</span>
              <Button onClick={() => setShowAddDialog(true)} className="ml-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exercise Lists */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All Exercises ({allExercises.length})</TabsTrigger>
                <TabsTrigger value="custom">My Exercises ({myExercises.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <ExerciseLibraryList
                  exercises={allExercises}
                  onEdit={null} // Can't edit predefined exercises
                  onDelete={null} // Can't delete predefined exercises
                />
              </TabsContent>

              <TabsContent value="custom" className="mt-6">
                <ExerciseLibraryList
                  exercises={myExercises}
                  onEdit={updateCustomExercise}
                  onDelete={deleteCustomExercise}
                />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <AddExerciseDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </>
  );
}
