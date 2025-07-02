
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { ExerciseLibraryList } from './ExerciseLibraryList';
import { CreateExerciseDialog } from './CreateExerciseDialog';
import { EditExerciseDialog } from './EditExerciseDialog';
import { ExerciseLibraryFilters } from './ExerciseLibraryFilters';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface ExerciseLibraryDialogContentProps {
  exercises: ExerciseData[];
  filteredExercises: ExerciseData[];
  paginatedExercises: ExerciseData[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  onCreateExercise: (exercise: ExerciseData) => void;
  onEditExercise: (id: string, updates: Partial<ExerciseData>) => void;
  onResetExercise: (id: string) => void;
  onDeleteExercise: (id: string) => void;
  onClose: () => void;
}

export function ExerciseLibraryDialogContent({
  exercises,
  filteredExercises,
  paginatedExercises,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  difficultyFilter,
  setDifficultyFilter,
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  onCreateExercise,
  onEditExercise,
  onResetExercise,
  onDeleteExercise,
  onClose,
}: ExerciseLibraryDialogContentProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseData | null>(null);

  const handleEditExercise = (exercise: ExerciseData) => {
    setExerciseToEdit(exercise);
    setShowEditForm(true);
  };

  const handleCreateExercise = () => {
    setShowCreateForm(true);
  };

  return (
    <>
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {/* Filters */}
        <ExerciseLibraryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          onCreateExercise={handleCreateExercise}
        />

        {/* Exercise List */}
        <div className="flex-1 overflow-hidden">
          <ExerciseLibraryList
            exercises={paginatedExercises}
            onEdit={handleEditExercise}
            onDelete={onDeleteExercise}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-between items-center border-t pt-3">
        <Badge variant="secondary" className="text-xs">
          Showing {paginatedExercises.length} of {totalItems} exercises (Page {currentPage} of {totalPages})
        </Badge>
        <Button onClick={onClose} size="sm">Close</Button>
      </div>

      <CreateExerciseDialog
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
        onSave={onCreateExercise}
      />

      {exerciseToEdit && (
        <EditExerciseDialog
          open={showEditForm}
          onOpenChange={setShowEditForm}
          exercise={exerciseToEdit}
          onSave={onEditExercise}
          onReset={onResetExercise}
        />
      )}
    </>
  );
}
