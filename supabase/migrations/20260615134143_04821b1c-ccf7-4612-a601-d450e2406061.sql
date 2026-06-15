
DROP POLICY IF EXISTS "mkt admins read brand docs" ON storage.objects;
CREATE POLICY "mkt admins read brand docs"
ON storage.objects FOR SELECT
USING (bucket_id = 'mkt-brand-docs' AND public.is_mkt_admin());

DROP POLICY IF EXISTS "mkt admins write brand docs" ON storage.objects;
CREATE POLICY "mkt admins write brand docs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'mkt-brand-docs' AND public.is_mkt_admin());

DROP POLICY IF EXISTS "mkt admins update brand docs" ON storage.objects;
CREATE POLICY "mkt admins update brand docs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'mkt-brand-docs' AND public.is_mkt_admin());

DROP POLICY IF EXISTS "mkt admins delete brand docs" ON storage.objects;
CREATE POLICY "mkt admins delete brand docs"
ON storage.objects FOR DELETE
USING (bucket_id = 'mkt-brand-docs' AND public.is_mkt_admin());

DROP POLICY IF EXISTS "mkt admins read assets" ON storage.objects;
CREATE POLICY "mkt admins read assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'mkt-assets' AND public.is_mkt_admin());

DROP POLICY IF EXISTS "mkt admins write assets" ON storage.objects;
CREATE POLICY "mkt admins write assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'mkt-assets' AND public.is_mkt_admin());

DROP POLICY IF EXISTS "mkt admins update assets" ON storage.objects;
CREATE POLICY "mkt admins update assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'mkt-assets' AND public.is_mkt_admin());

DROP POLICY IF EXISTS "mkt admins delete assets" ON storage.objects;
CREATE POLICY "mkt admins delete assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'mkt-assets' AND public.is_mkt_admin());
