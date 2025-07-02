
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';
import { ExerciseLibraryList } from './ExerciseLibraryList';
import { AddExerciseDialog } from './AddExerciseDialog';
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
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const handleEditExercise = (exercise: ExerciseData) => {
    setExerciseToEdit(exercise);
    setShowEditForm(true);
  };

  const handleCreateExercise = () => {
    setShowCreateForm(true);
  };

  return (
    <>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Filters */}
        <div className="flex-shrink-0 mb-2 sm:mb-4">
          <ExerciseLibraryFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            onCreateExercise={handleCreateExercise}
          />
        </div>

        {/* Exercise List */}
        <div className="flex-1 min-h-0">
          <ExerciseLibraryList
            exercises={paginatedExercises}
            onEdit={handleEditExercise}
            onDelete={onDeleteExercise}
          />
        </div>

        {/* Mobile-optimized Pagination */}
        {totalPages > 1 && (
          <div className="flex-shrink-0 mt-2 sm:mt-4 flex justify-center">
            <Pagination>
              <PaginationContent className={isMobile ? "gap-1" : "gap-2"}>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} ${
                      isMobile ? 'h-8 px-2 text-xs' : ''
                    }`}
                  >
                    {isMobile ? 'Prev' : 'Previous'}
                  </PaginationPrevious>
                </PaginationItem>
                
                {/* Show only 3 pages on mobile, 5 on desktop */}
                {Array.from({ length: Math.min(isMobile ? 3 : 5, totalPages) }, (_, i) => {
                  let pageNum;
                  const maxVisible = isMobile ? 3 : 5;
                  
                  if (totalPages <= maxVisible) {
                    pageNum = i + 1;
                  } else if (currentPage <= Math.ceil(maxVisible / 2)) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - Math.floor(maxVisible / 2)) {
                    pageNum = totalPages - maxVisible + 1 + i;
                  } else {
                    pageNum = currentPage - Math.floor(maxVisible / 2) + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                        className={`cursor-pointer ${
                          isMobile ? 'h-8 w-8 text-xs' : ''
                        }`}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} ${
                      isMobile ? 'h-8 px-2 text-xs' : ''
                    }`}
                  >
                    {isMobile ? 'Next' : 'Next'}
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 mt-2 sm:mt-3 flex justify-between items-center border-t pt-2 sm:pt-3">
        <Badge variant="secondary" className={isMobile ? "text-xs px-1 py-0" : "text-xs"}>
          {paginatedExercises.length} of {totalItems} filtered ({exercises.length} total)
        </Badge>
        <Button onClick={onClose} size="sm" className={isMobile ? "h-7 px-2 text-xs" : ""}>
          Close
        </Button>
      </div>

      <AddExerciseDialog
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
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
