
-- =========================================================================
-- MCP connections (Composio etc.)
-- =========================================================================
CREATE TABLE public.mkt_mcp_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  email text,
  mcp_url text NOT NULL,
  oauth_tokens jsonb,
  client_registration jsonb,
  status text NOT NULL DEFAULT 'pending', -- pending | authenticating | ready | failed
  auth_url text,
  last_error text,
  last_check_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, email)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_mcp_connections TO authenticated;
GRANT ALL ON public.mkt_mcp_connections TO service_role;

ALTER TABLE public.mkt_mcp_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mkt admins manage mcp connections"
  ON public.mkt_mcp_connections FOR ALL
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

CREATE TRIGGER update_mkt_mcp_connections_updated_at
  BEFORE UPDATE ON public.mkt_mcp_connections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- Outreach lists
-- =========================================================================
CREATE TABLE public.mkt_outreach_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  instagram_target_page text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_outreach_lists TO authenticated;
GRANT ALL ON public.mkt_outreach_lists TO service_role;

ALTER TABLE public.mkt_outreach_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mkt admins manage outreach lists"
  ON public.mkt_outreach_lists FOR ALL
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

CREATE TRIGGER update_mkt_outreach_lists_updated_at
  BEFORE UPDATE ON public.mkt_outreach_lists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- Outreach contacts
-- =========================================================================
CREATE TABLE public.mkt_outreach_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id uuid NOT NULL REFERENCES public.mkt_outreach_lists(id) ON DELETE CASCADE,
  creator text,
  username text NOT NULL,
  followers integer,
  engagement numeric,
  er numeric,
  audience_city text,
  audience_age text,
  avg_reel_plays integer,
  avg_views integer,
  email text,
  gender text, -- m | f | unknown
  age_bucket text, -- 18-24 | 25-34 | 35-44 | 45+ | unknown
  is_milan boolean DEFAULT false,
  status text NOT NULL DEFAULT 'new', -- new | queued | contacted | replied | skipped | failed
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (list_id, username)
);

CREATE INDEX idx_mkt_outreach_contacts_list ON public.mkt_outreach_contacts(list_id);
CREATE INDEX idx_mkt_outreach_contacts_status ON public.mkt_outreach_contacts(status);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_outreach_contacts TO authenticated;
GRANT ALL ON public.mkt_outreach_contacts TO service_role;

ALTER TABLE public.mkt_outreach_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mkt admins manage outreach contacts"
  ON public.mkt_outreach_contacts FOR ALL
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

CREATE TRIGGER update_mkt_outreach_contacts_updated_at
  BEFORE UPDATE ON public.mkt_outreach_contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- DM presets
-- =========================================================================
CREATE TABLE public.mkt_dm_presets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  channel text NOT NULL DEFAULT 'dm', -- dm | comment
  gender text NOT NULL DEFAULT 'any', -- m | f | any
  city_filter text NOT NULL DEFAULT 'any', -- milan | non_milan | any
  age_bucket text NOT NULL DEFAULT 'any', -- 18-24 | 25-34 | 35-44 | 45+ | any
  body_template text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_dm_presets TO authenticated;
GRANT ALL ON public.mkt_dm_presets TO service_role;

ALTER TABLE public.mkt_dm_presets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mkt admins manage dm presets"
  ON public.mkt_dm_presets FOR ALL
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

CREATE TRIGGER update_mkt_dm_presets_updated_at
  BEFORE UPDATE ON public.mkt_dm_presets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed iniziale 4 preset DM + 2 commenti
INSERT INTO public.mkt_dm_presets (name, channel, gender, city_filter, age_bucket, body_template) VALUES
  ('DM Donna Milano', 'dm', 'f', 'milan', 'any',
   'Ciao {{creator}}! 👋 Ti seguo da un po'' e adoro i tuoi contenuti. Vivo anche io a Milano e sto lanciando un progetto fitness che credo possa interessarti — ti va se ti racconto due cose in DM?'),
  ('DM Uomo Milano', 'dm', 'm', 'milan', 'any',
   'Ehi {{creator}}, complimenti per i contenuti! Anch''io sono di Milano e sto sviluppando una piattaforma per personal trainer e creator del settore. Mi piacerebbe scambiare due idee, ti va?'),
  ('DM Donna non Milano', 'dm', 'f', 'non_milan', 'any',
   'Ciao {{creator}}! 👋 Ti seguo da un po'' e i tuoi contenuti mi piacciono davvero. Sto lanciando una piattaforma fitness e mi piacerebbe avere il tuo feedback — posso raccontarti due cose in privato?'),
  ('DM Uomo non Milano', 'dm', 'm', 'non_milan', 'any',
   'Ehi {{creator}}, complimenti per il tuo profilo! Sto sviluppando una piattaforma per creator del fitness e mi piacerebbe il tuo punto di vista. Ti va se ti scrivo due righe?'),
  ('Commento generico', 'comment', 'any', 'any', 'any',
   'Top come sempre 🔥 ti ho scritto in DM ✨'),
  ('Commento fitness', 'comment', 'any', 'any', 'any',
   'Contenuto pazzesco 💪 ti ho mandato un DM, dacci un''occhio quando puoi!');

-- =========================================================================
-- Outreach runs (campagne)
-- =========================================================================
CREATE TABLE public.mkt_outreach_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id uuid NOT NULL REFERENCES public.mkt_outreach_lists(id) ON DELETE CASCADE,
  mcp_connection_id uuid REFERENCES public.mkt_mcp_connections(id) ON DELETE SET NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'draft', -- draft | running | paused | done | failed
  config jsonb NOT NULL DEFAULT '{
    "step_delay_min_sec": 30,
    "step_delay_max_sec": 120,
    "contact_delay_min_sec": 120,
    "contact_delay_max_sec": 600,
    "daily_cap_dm": 30,
    "daily_cap_follow": 50,
    "comment_strategy": "latest_of_top_3",
    "dry_run": true,
    "steps": ["follow","dm","comment"]
  }'::jsonb,
  started_at timestamptz,
  finished_at timestamptz,
  last_tick_at timestamptz,
  stats jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_mkt_outreach_runs_status ON public.mkt_outreach_runs(status);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_outreach_runs TO authenticated;
GRANT ALL ON public.mkt_outreach_runs TO service_role;

ALTER TABLE public.mkt_outreach_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mkt admins manage outreach runs"
  ON public.mkt_outreach_runs FOR ALL
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

CREATE TRIGGER update_mkt_outreach_runs_updated_at
  BEFORE UPDATE ON public.mkt_outreach_runs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- Outreach actions (singole azioni schedulate)
-- =========================================================================
CREATE TABLE public.mkt_outreach_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid NOT NULL REFERENCES public.mkt_outreach_runs(id) ON DELETE CASCADE,
  contact_id uuid NOT NULL REFERENCES public.mkt_outreach_contacts(id) ON DELETE CASCADE,
  step text NOT NULL, -- follow | dm | comment
  step_order integer NOT NULL DEFAULT 0,
  preset_id uuid REFERENCES public.mkt_dm_presets(id) ON DELETE SET NULL,
  scheduled_for timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending', -- pending | done | failed | skipped
  payload jsonb,
  response jsonb,
  error text,
  executed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_mkt_outreach_actions_due ON public.mkt_outreach_actions(status, scheduled_for);
CREATE INDEX idx_mkt_outreach_actions_run ON public.mkt_outreach_actions(run_id);
CREATE INDEX idx_mkt_outreach_actions_contact ON public.mkt_outreach_actions(contact_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_outreach_actions TO authenticated;
GRANT ALL ON public.mkt_outreach_actions TO service_role;

ALTER TABLE public.mkt_outreach_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mkt admins manage outreach actions"
  ON public.mkt_outreach_actions FOR ALL
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

CREATE TRIGGER update_mkt_outreach_actions_updated_at
  BEFORE UPDATE ON public.mkt_outreach_actions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================================
-- Outreach replies
-- =========================================================================
CREATE TABLE public.mkt_outreach_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_id uuid REFERENCES public.mkt_outreach_actions(id) ON DELETE SET NULL,
  contact_id uuid NOT NULL REFERENCES public.mkt_outreach_contacts(id) ON DELETE CASCADE,
  channel text NOT NULL, -- dm | comment
  text text,
  sentiment text, -- positive | neutral | negative
  received_at timestamptz NOT NULL DEFAULT now(),
  raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_mkt_outreach_replies_contact ON public.mkt_outreach_replies(contact_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_outreach_replies TO authenticated;
GRANT ALL ON public.mkt_outreach_replies TO service_role;

ALTER TABLE public.mkt_outreach_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mkt admins manage outreach replies"
  ON public.mkt_outreach_replies FOR ALL
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());
