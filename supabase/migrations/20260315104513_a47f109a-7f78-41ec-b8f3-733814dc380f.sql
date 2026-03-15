-- Update client policies to also allow demo client ID
DROP POLICY IF EXISTS "Clients can view their session bookings" ON public.package_session_bookings;
CREATE POLICY "Clients can view their session bookings"
ON public.package_session_bookings
FOR SELECT
TO authenticated
USING (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002'::uuid);

DROP POLICY IF EXISTS "Clients can create session bookings for their packages" ON public.package_session_bookings;
CREATE POLICY "Clients can create session bookings for their packages"
ON public.package_session_bookings
FOR INSERT
TO authenticated
WITH CHECK (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002'::uuid);

DROP POLICY IF EXISTS "Clients can update their session bookings" ON public.package_session_bookings;
CREATE POLICY "Clients can update their session bookings"
ON public.package_session_bookings
FOR UPDATE
TO authenticated
USING (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002'::uuid)
WITH CHECK (client_id = auth.uid() OR client_id = '00000000-0000-0000-0000-000000000002'::uuid);