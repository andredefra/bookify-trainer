-- Add training_program_data column to client_packages table
ALTER TABLE client_packages 
ADD COLUMN training_program_data JSONB DEFAULT NULL;

COMMENT ON COLUMN client_packages.training_program_data IS 'Stores the complete training program data (sessions, exercises, etc.) for program_only and hybrid packages';