
-- New field on mkt_content
ALTER TABLE public.mkt_content ADD COLUMN IF NOT EXISTS published_at timestamptz;

-- New fields on mkt_brand_docs
ALTER TABLE public.mkt_brand_docs ADD COLUMN IF NOT EXISTS doc_type text;
ALTER TABLE public.mkt_brand_docs ADD COLUMN IF NOT EXISTS recap text;
ALTER TABLE public.mkt_brand_docs ADD COLUMN IF NOT EXISTS processing_status text NOT NULL DEFAULT 'pending';
ALTER TABLE public.mkt_brand_docs ADD COLUMN IF NOT EXISTS processing_error text;
ALTER TABLE public.mkt_brand_docs ADD COLUMN IF NOT EXISTS processed_at timestamptz;

-- New fields on mkt_personas
ALTER TABLE public.mkt_personas ADD COLUMN IF NOT EXISTS is_ai_generated boolean NOT NULL DEFAULT false;
ALTER TABLE public.mkt_personas ADD COLUMN IF NOT EXISTS source_doc_id uuid REFERENCES public.mkt_brand_docs(id) ON DELETE SET NULL;
