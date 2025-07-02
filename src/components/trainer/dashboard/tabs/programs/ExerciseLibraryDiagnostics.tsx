
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { exerciseDatabase } from '@/data/exercises/exerciseDatabase';
import { toast } from 'sonner';

interface ExerciseLibraryDiagnosticsProps {
  onRefresh: () => void;
}

export function ExerciseLibraryDiagnostics({ onRefresh }: ExerciseLibraryDiagnosticsProps) {
  const checkLocalStorage = () => {
    const customExercises = localStorage.getItem('trainer_custom_exercises');
    const exerciseModifications = localStorage.getItem('trainer_exercise_modifications');
    const deletedExercises = localStorage.getItem('trainer_deleted_exercises');
    
    const customCount = customExercises ? JSON.parse(customExercises).length : 0;
    const modificationsCount = exerciseModifications ? Object.keys(JSON.parse(exerciseModifications)).length : 0;
    const deletedCount = deletedExercises ? JSON.parse(deletedExercises).length : 0;
    
    return {
      customCount,
      modificationsCount,
      deletedCount,
      totalDatabaseExercises: exerciseDatabase.length,
      expectedTotal: exerciseDatabase.length + customCount - deletedCount
    };
  };

  const clearLocalStorage = () => {
    const confirmation = window.confirm(
      'This will clear all custom exercises, modifications, and deleted exercises. Are you sure?'
    );
    
    if (confirmation) {
      localStorage.removeItem('trainer_custom_exercises');
      localStorage.removeItem('trainer_exercise_modifications');
      localStorage.removeItem('trainer_deleted_exercises');
      
      toast.success('Local storage cleared successfully!');
      onRefresh();
    }
  };

  const resetDeletedExercises = () => {
    const confirmation = window.confirm(
      'This will restore all deleted exercises. Are you sure?'
    );
    
    if (confirmation) {
      localStorage.removeItem('trainer_deleted_exercises');
      toast.success('Deleted exercises restored!');
      onRefresh();
    }
  };

  const stats = checkLocalStorage();

  return (
    <Card className="mb-4 border-orange-200 bg-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-orange-700">
          <AlertTriangle className="h-4 w-4" />
          Exercise Library Diagnostics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex flex-col items-center p-2 bg-white rounded border">
            <span className="text-xs text-gray-600">Database</span>
            <span className="font-bold text-lg">{stats.totalDatabaseExercises}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded border">
            <span className="text-xs text-gray-600">Custom</span>
            <span className="font-bold text-lg text-blue-600">+{stats.customCount}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded border">
            <span className="text-xs text-gray-600">Modified</span>
            <span className="font-bold text-lg text-yellow-600">{stats.modificationsCount}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded border">
            <span className="text-xs text-gray-600">Deleted</span>
            <span className="font-bold text-lg text-red-600">-{stats.deletedCount}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-white rounded border">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm">Expected Total: <strong>{stats.expectedTotal}</strong></span>
          </div>
          <Badge variant="secondary">
            Database: {stats.totalDatabaseExercises} exercises
          </Badge>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button onClick={onRefresh} size="sm" variant="outline">
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
          <Button onClick={resetDeletedExercises} size="sm" variant="outline">
            Restore Deleted
          </Button>
          <Button onClick={clearLocalStorage} size="sm" variant="destructive">
            Clear All Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
