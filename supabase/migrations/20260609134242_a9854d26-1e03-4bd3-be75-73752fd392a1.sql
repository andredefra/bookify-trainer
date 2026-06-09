
-- mkt_admins first (referenced by is_mkt_admin)
CREATE TABLE public.mkt_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_admins TO authenticated;
GRANT ALL ON public.mkt_admins TO service_role;
ALTER TABLE public.mkt_admins ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_mkt_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.mkt_admins
    WHERE lower(email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
  );
$$;

CREATE POLICY "mkt admins read own row" ON public.mkt_admins FOR SELECT TO authenticated
  USING (lower(email) = lower(coalesce((auth.jwt() ->> 'email'), '')) OR public.is_mkt_admin());
CREATE POLICY "mkt admins manage admins" ON public.mkt_admins FOR ALL TO authenticated
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

-- mkt_personas
CREATE TABLE public.mkt_personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age_range text,
  description text,
  pain text,
  solution text,
  copy_focus text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_personas TO authenticated;
GRANT ALL ON public.mkt_personas TO service_role;
ALTER TABLE public.mkt_personas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mkt admin all personas" ON public.mkt_personas FOR ALL TO authenticated
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

-- mkt_content
CREATE TABLE public.mkt_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scheduled_date date,
  scheduled_time time,
  persona_id uuid REFERENCES public.mkt_personas(id) ON DELETE SET NULL,
  funnel_stage text,
  content_format text,
  hook text,
  post_copy text,
  cta text,
  media_prompt text,
  media_url text,
  status text NOT NULL DEFAULT 'Draft',
  published_link text,
  views integer,
  dms_received integer,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_content TO authenticated;
GRANT ALL ON public.mkt_content TO service_role;
ALTER TABLE public.mkt_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mkt admin all content" ON public.mkt_content FOR ALL TO authenticated
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());
CREATE TRIGGER trg_mkt_content_updated_at BEFORE UPDATE ON public.mkt_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- mkt_generations
CREATE TABLE public.mkt_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid NOT NULL REFERENCES public.mkt_content(id) ON DELETE CASCADE,
  gen_type text NOT NULL,
  output text NOT NULL,
  is_selected boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_generations TO authenticated;
GRANT ALL ON public.mkt_generations TO service_role;
ALTER TABLE public.mkt_generations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mkt admin all generations" ON public.mkt_generations FOR ALL TO authenticated
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

-- mkt_brand_docs
CREATE TABLE public.mkt_brand_docs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  doc_type text,
  content text,
  file_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_brand_docs TO authenticated;
GRANT ALL ON public.mkt_brand_docs TO service_role;
ALTER TABLE public.mkt_brand_docs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mkt admin all brand docs" ON public.mkt_brand_docs FOR ALL TO authenticated
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

-- mkt_brand_assets
CREATE TABLE public.mkt_brand_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  asset_type text,
  file_url text,
  hex text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_brand_assets TO authenticated;
GRANT ALL ON public.mkt_brand_assets TO service_role;
ALTER TABLE public.mkt_brand_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mkt admin all brand assets" ON public.mkt_brand_assets FOR ALL TO authenticated
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

-- mkt_connectors
CREATE TABLE public.mkt_connectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connector_name text NOT NULL,
  status text NOT NULL DEFAULT 'not_configured',
  config jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mkt_connectors TO authenticated;
GRANT ALL ON public.mkt_connectors TO service_role;
ALTER TABLE public.mkt_connectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mkt admin all connectors" ON public.mkt_connectors FOR ALL TO authenticated
  USING (public.is_mkt_admin()) WITH CHECK (public.is_mkt_admin());

-- Seeds
INSERT INTO public.mkt_admins(email) VALUES ('andrea.mypersonal.fit@gmail.com') ON CONFLICT (email) DO NOTHING;

INSERT INTO public.mkt_personas(name, age_range, description, pain, solution, copy_focus) VALUES
  ('Giulia', '25-35', 'Personal trainer indipendente, lavora in palestre miste.', 'Gestione clienti via WhatsApp ed Excel, caos amministrativo.', 'MyPersonal centralizza clienti, programmi e pagamenti.', 'Tono pratico, focus su organizzazione.'),
  ('Matteo', '28-38', 'PT con studio privato, ambizioso e digitale.', 'Vuole scalare ma perde tempo in admin e fatturazione.', 'Automazioni, pacchetti e pagamenti integrati.', 'Tono ambizioso, business-oriented, ROI.'),
  ('Lorenzo', '30-45', 'PT senior in palestra grande, vecchia scuola.', 'Scettico verso il digitale, agenda cartacea.', 'UX semplice tipo agenda, zero attrito.', 'Tono rassicurante, esempi concreti, niente tecnicismi.'),
  ('Luca', '22-30', 'Junior PT freelance, social-first.', 'Pochi clienti, fatica a vendere pacchetti.', 'Profilo pubblico, lead da Instagram, pacchetti smart.', 'Tono energico, growth, content marketing.'),
  ('Andrea', '30-40', 'PT online + in presenza, ibrido.', 'Sincronizzare clienti online e offline.', 'Programmi, check-in e chat in una sola app.', 'Tono tech, efficienza, hybrid coaching.'),
  ('Marco', '35-50', 'Titolare di studio PT con 2-3 collaboratori.', 'Gestione team, turni e fatturazione complessa.', 'Modulo Studio con multi-trainer e analytics.', 'Tono gestionale, leadership, numeri.');

INSERT INTO public.mkt_connectors(connector_name, status, notes) VALUES
  ('Lovable AI', 'active', 'Usato per la generazione di copy. Chiave gestita nei secrets di Supabase.'),
  ('Google Calendar', 'active', 'Integrazione link-based (template URL), nessuna OAuth in v1.'),
  ('Image Generation', 'coming_soon', 'Generazione immagini AI in arrivo (v2).'),
  ('Higgsfield Video', 'coming_soon', 'Generazione video AI in arrivo (v2).');

-- Storage policies for mkt buckets (buckets must be created in the Storage dashboard)
CREATE POLICY "mkt admin read mkt buckets" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id IN ('mkt-media','mkt-assets','mkt-brand-docs') AND public.is_mkt_admin());
CREATE POLICY "mkt admin insert mkt buckets" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('mkt-media','mkt-assets','mkt-brand-docs') AND public.is_mkt_admin());
CREATE POLICY "mkt admin update mkt buckets" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('mkt-media','mkt-assets','mkt-brand-docs') AND public.is_mkt_admin());
CREATE POLICY "mkt admin delete mkt buckets" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('mkt-media','mkt-assets','mkt-brand-docs') AND public.is_mkt_admin());
