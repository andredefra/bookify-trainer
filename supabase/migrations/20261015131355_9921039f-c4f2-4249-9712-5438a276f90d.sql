CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  phone text,
  city text,
  country text,
  audience text NOT NULL DEFAULT 'user' CHECK (audience IN ('user','trainer')),
  trains_with_pt text CHECK (trains_with_pt IN ('alone','with_pt')),
  language text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  marketing_consent boolean NOT NULL DEFAULT false,
  consent_at timestamptz,
  status text NOT NULL DEFAULT 'pending'
);

CREATE OR REPLACE FUNCTION public.waitlist_normalize_email()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.email := lower(trim(NEW.email));
  RETURN NEW;
END; $$;

CREATE TRIGGER waitlist_normalize_email_trg
BEFORE INSERT OR UPDATE ON public.waitlist
FOR EACH ROW EXECUTE FUNCTION public.waitlist_normalize_email();

GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT SELECT ON public.waitlist TO authenticated;
GRANT ALL ON public.waitlist TO service_role;

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can join waitlist" ON public.waitlist
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Marketing admins can read waitlist" ON public.waitlist
  FOR SELECT TO authenticated USING (public.is_mkt_admin());