
import { useState } from 'react';
import { ExerciseData, Mechanics, ForceType } from '@/data/exercises/types';
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
  equipmentFilter?: string;
  setEquipmentFilter?: (equipment: string) => void;
  mechanicsFilter?: 'all' | Mechanics;
  setMechanicsFilter?: (mechanics: 'all' | Mechanics) => void;
  forceTypeFilter?: 'all' | ForceType;
  setForceTypeFilter?: (forceType: 'all' | ForceType) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  onCreateExercise: (exercise: ExerciseData) => void;
  onEditExercise: (id: string, updates: Partial<ExerciseData>) => void;
  onResetExercise: (id: string) => void;
  onDeleteExercise: (id: string) => void;
  onCopyExercise?: (exercise: ExerciseData) => void;
  onClose: () => void;
  selectionMode?: boolean;
  onExerciseSelect?: (exercise: ExerciseData) => void;
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
  equipmentFilter,
  setEquipmentFilter,
  mechanicsFilter,
  setMechanicsFilter,
  forceTypeFilter,
  setForceTypeFilter,
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  onCreateExercise,
  onEditExercise,
  onResetExercise,
  onDeleteExercise,
  onCopyExercise,
  selectionMode = false,
  onExerciseSelect,
}: ExerciseLibraryDialogContentProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseData | null>(null);
  const isMobile = useIsMobile();

  console.log('ExerciseLibraryDialogContent - Mobile:', isMobile);
  console.log('ExerciseLibraryDialogContent - Paginated exercises:', paginatedExercises.length);
  console.log('ExerciseLibraryDialogContent - Selection mode:', selectionMode);

  const handleEditExercise = (exercise: ExerciseData) => {
    if (selectionMode && onExerciseSelect) {
      onExerciseSelect(exercise);
      return;
    }
    setExerciseToEdit(exercise);
    setShowEditForm(true);
  };

  const handleCreateExercise = () => {
    setShowCreateForm(true);
  };

  const handleExerciseSelection = (exercise: ExerciseData) => {
    if (selectionMode && onExerciseSelect) {
      onExerciseSelect(exercise);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col min-h-0 space-y-2">
        {/* Filters - More compact */}
        <div className="flex-shrink-0">
          <ExerciseLibraryFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            equipmentFilter={equipmentFilter}
            setEquipmentFilter={setEquipmentFilter}
            mechanicsFilter={mechanicsFilter}
            setMechanicsFilter={setMechanicsFilter}
            forceTypeFilter={forceTypeFilter}
            setForceTypeFilter={setForceTypeFilter}
            onCreateExercise={handleCreateExercise}
            hideCreateButton={selectionMode}
          />
        </div>

        {/* Exercise List - Takes most of the space */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ExerciseLibraryList
            exercises={paginatedExercises}
            onEdit={handleEditExercise}
            onDelete={onDeleteExercise}
            onCopy={onCopyExercise}
            selectionMode={selectionMode}
            onSelect={handleExerciseSelection}
          />
        </div>

        {/* Pagination - Compact at bottom */}
        {totalPages > 1 && (
          <div className="flex-shrink-0 flex justify-center py-1">
            <Pagination>
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                      h-8 px-2 text-xs`}
                  >
                    {isMobile ? '‹' : 'Previous'}
                  </PaginationPrevious>
                </PaginationItem>
                
                {/* Show only 3 page numbers on mobile, 5 on desktop */}
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
                        className="cursor-pointer h-8 w-8 text-xs"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                      h-8 px-2 text-xs`}
                  >
                    {isMobile ? '›' : 'Next'}
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Dialogs - Only show in management mode */}
      {!selectionMode && (
        <>
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
      )}
    </>
  );
}
