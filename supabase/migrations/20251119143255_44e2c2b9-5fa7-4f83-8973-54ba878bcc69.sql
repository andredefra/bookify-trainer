-- Reset all sessions to uncompleted for Nutrition + Training Combo package
-- This ensures newly purchased packages start from session 1 with 0 progress

UPDATE client_packages
SET training_program_data = (
  SELECT jsonb_set(
    training_program_data,
    '{sessions}',
    (
      SELECT jsonb_agg(
        session 
        - 'completedDate'
        || jsonb_build_object('completed', false)
        || jsonb_build_object(
          'exercises',
          (
            SELECT jsonb_agg(
              exercise 
              || jsonb_build_object(
                'setsData',
                COALESCE(
                  (
                    SELECT jsonb_agg(
                      set_data - 'actualReps' - 'completed'
                    )
                    FROM jsonb_array_elements(exercise->'setsData') as set_data
                  ),
                  '[]'::jsonb
                )
              )
            )
            FROM jsonb_array_elements(session->'exercises') as exercise
          )
        )
      )
      FROM jsonb_array_elements(training_program_data->'sessions') as session
    )
  )
)
WHERE id = 'aaaa0002-0000-0000-0000-000000000002'
  AND title = 'Nutrition + Training Combo';