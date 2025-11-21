-- Create table for client training session progress (separates template from completion data)
CREATE TABLE IF NOT EXISTS public.client_training_session_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  program_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  exercise_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  session_completed BOOLEAN DEFAULT FALSE,
  completed_by TEXT, -- 'client' or 'trainer'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, program_id, session_id)
);

-- Enable RLS
ALTER TABLE public.client_training_session_progress ENABLE ROW LEVEL SECURITY;

-- Clients can view their own progress
CREATE POLICY "Clients can view own progress"
  ON public.client_training_session_progress FOR SELECT
  USING (auth.uid() = client_id);

-- Clients can insert their own progress
CREATE POLICY "Clients can insert own progress"
  ON public.client_training_session_progress FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- Clients can update their own progress
CREATE POLICY "Clients can update own progress"
  ON public.client_training_session_progress FOR UPDATE
  USING (auth.uid() = client_id);

-- Trainers can view client progress for their clients
CREATE POLICY "Trainers can view client progress"
  ON public.client_training_session_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.trainer_client_relationships
      WHERE trainer_client_relationships.client_id = client_training_session_progress.client_id
      AND trainer_client_relationships.trainer_id = auth.uid()
      AND trainer_client_relationships.status = 'active'
    )
  );

-- Trainers can insert progress for their clients
CREATE POLICY "Trainers can insert client progress"
  ON public.client_training_session_progress FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.trainer_client_relationships
      WHERE trainer_client_relationships.client_id = client_training_session_progress.client_id
      AND trainer_client_relationships.trainer_id = auth.uid()
      AND trainer_client_relationships.status = 'active'
    )
  );

-- Trainers can update progress for their clients
CREATE POLICY "Trainers can update client progress"
  ON public.client_training_session_progress FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.trainer_client_relationships
      WHERE trainer_client_relationships.client_id = client_training_session_progress.client_id
      AND trainer_client_relationships.trainer_id = auth.uid()
      AND trainer_client_relationships.status = 'active'
    )
  );

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_session_progress_client ON public.client_training_session_progress(client_id);
CREATE INDEX IF NOT EXISTS idx_session_progress_program ON public.client_training_session_progress(program_id);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_session_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_session_progress_timestamp
  BEFORE UPDATE ON public.client_training_session_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_session_progress_updated_at();