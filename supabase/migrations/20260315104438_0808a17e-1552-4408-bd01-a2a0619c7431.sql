-- Allow clients to insert session bookings for their own packages
CREATE POLICY "Clients can create session bookings for their packages"
ON public.package_session_bookings
FOR INSERT
TO authenticated
WITH CHECK (client_id = auth.uid());

-- Also allow clients to propose times (update from available to proposed)
DROP POLICY IF EXISTS "Clients can update session bookings for confirmation" ON public.package_session_bookings;
CREATE POLICY "Clients can update their session bookings"
ON public.package_session_bookings
FOR UPDATE
TO authenticated
USING (client_id = auth.uid())
WITH CHECK (client_id = auth.uid());