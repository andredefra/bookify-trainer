import { supabase } from "@/integrations/supabase/client";

// Tables created by migration aren't in the generated Supabase types yet.
// Use the untyped surface for mkt_* until types regenerate.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sb: any = supabase;
