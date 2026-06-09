
-- Plan months table
CREATE TABLE public.mkt_plan_months (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month_index INTEGER NOT NULL,
  label TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (month_index)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_plan_months TO authenticated;
GRANT ALL ON public.mkt_plan_months TO service_role;

ALTER TABLE public.mkt_plan_months ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage plan months" ON public.mkt_plan_months
  FOR ALL TO authenticated
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

CREATE TRIGGER trg_mkt_plan_months_updated
  BEFORE UPDATE ON public.mkt_plan_months
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Extend mkt_content
ALTER TABLE public.mkt_content
  ADD COLUMN IF NOT EXISTS plan_month_id UUID REFERENCES public.mkt_plan_months(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS sequence_number INTEGER,
  ADD COLUMN IF NOT EXISTS social_channel TEXT DEFAULT 'Instagram',
  ADD COLUMN IF NOT EXISTS objective TEXT,
  ADD COLUMN IF NOT EXISTS situation TEXT,
  ADD COLUMN IF NOT EXISTS content_type TEXT;

CREATE INDEX IF NOT EXISTS idx_mkt_content_plan_month ON public.mkt_content(plan_month_id, sequence_number);
