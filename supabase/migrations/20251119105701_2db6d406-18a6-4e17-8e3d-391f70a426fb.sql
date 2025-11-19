-- Add is_public column to client_packages table
ALTER TABLE client_packages 
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

COMMENT ON COLUMN client_packages.is_public IS 
'If true, the package is visible to the trainer''s clients. If false, it must be manually assigned.';

-- Update existing packages to be public (for backwards compatibility)
UPDATE client_packages SET is_public = true WHERE is_active = true;

-- Update RLS policy to allow clients to view only public packages from their trainers
DROP POLICY IF EXISTS "Clients can view active packages" ON client_packages;

CREATE POLICY "Clients can view public packages from their trainers"
ON client_packages FOR SELECT
USING (
  is_active = true 
  AND is_public = true 
  AND trainer_id IN (
    SELECT trainer_id 
    FROM trainer_client_relationships 
    WHERE client_id = auth.uid() AND status = 'active'
  )
);