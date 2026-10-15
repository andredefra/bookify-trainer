CREATE TABLE public.mkt_crm_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text, phone text, city text, instagram_handle text,
  persona text CHECK (persona IN ('giulia','matteo','lorenzo')),
  source text NOT NULL DEFAULT 'other' CHECK (source IN ('dm','waitlist','outreach','referral','other')),
  stage text NOT NULL DEFAULT 'nuovo' CHECK (stage IN ('nuovo','contattato','in_conversazione','demo_fatta','contratto_inviato','firmato','perso')),
  value_eur numeric,
  next_step text, next_step_date date,
  lost_reason text, notes text,
  waitlist_id uuid REFERENCES public.waitlist(id) ON DELETE SET NULL,
  sort_order numeric NOT NULL DEFAULT 0
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_crm_opportunities TO authenticated;
GRANT ALL ON public.mkt_crm_opportunities TO service_role;
ALTER TABLE public.mkt_crm_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mkt admins manage crm opportunities" ON public.mkt_crm_opportunities
  FOR ALL TO authenticated USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());
CREATE TRIGGER update_mkt_crm_opportunities_updated_at BEFORE UPDATE ON public.mkt_crm_opportunities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX mkt_crm_opportunities_stage_idx ON public.mkt_crm_opportunities(stage, sort_order);

CREATE TABLE public.mkt_crm_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  opportunity_id uuid REFERENCES public.mkt_crm_opportunities(id) ON DELETE SET NULL,
  seat_number integer NOT NULL UNIQUE CHECK (seat_number BETWEEN 1 AND 250),
  tier integer GENERATED ALWAYS AS (CASE WHEN seat_number <= 25 THEN 1 WHEN seat_number <= 50 THEN 2 ELSE 3 END) STORED,
  price_eur numeric GENERATED ALWAYS AS (CASE WHEN seat_number <= 25 THEN 250 WHEN seat_number <= 50 THEN 300 ELSE 350 END) STORED,
  full_name text NOT NULL,
  email text, phone text, city text,
  contract_status text NOT NULL DEFAULT 'inviato' CHECK (contract_status IN ('inviato','firmato','in_attesa_pagamento','pagato','decaduto')),
  signed_at date, payment_due_at date, paid_at date,
  penalty_card text NOT NULL DEFAULT 'nessuno' CHECK (penalty_card IN ('nessuno','giallo','arancione','rosso','nero')),
  penalty_month integer,
  platform_user_id text, platform_url text,
  notes text
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_crm_members TO authenticated;
GRANT ALL ON public.mkt_crm_members TO service_role;
ALTER TABLE public.mkt_crm_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mkt admins manage crm members" ON public.mkt_crm_members
  FOR ALL TO authenticated USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());
CREATE TRIGGER update_mkt_crm_members_updated_at BEFORE UPDATE ON public.mkt_crm_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();