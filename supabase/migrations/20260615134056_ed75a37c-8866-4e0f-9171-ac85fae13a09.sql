
-- Rename mkt_plan_months → mkt_plan_phases with column renames
ALTER TABLE public.mkt_plan_months RENAME TO mkt_plan_phases;
ALTER TABLE public.mkt_plan_phases RENAME COLUMN month_index TO phase_index;
ALTER TABLE public.mkt_plan_phases ALTER COLUMN start_date DROP NOT NULL;
ALTER TABLE public.mkt_plan_phases ALTER COLUMN end_date DROP NOT NULL;
ALTER TABLE public.mkt_plan_phases ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.mkt_plan_phases ADD COLUMN IF NOT EXISTS target_post_count integer;

-- Rename FK column on mkt_content
ALTER TABLE public.mkt_content RENAME COLUMN plan_month_id TO plan_phase_id;
