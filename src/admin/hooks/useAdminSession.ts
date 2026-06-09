import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sb } from "../lib/sb";

export interface AdminSession {
  loading: boolean;
  email: string | null;
  isAdmin: boolean;
  userId: string | null;
}

export function useAdminSession(): AdminSession {
  const [state, setState] = useState<AdminSession>({
    loading: true,
    email: null,
    isAdmin: false,
    userId: null,
  });

  useEffect(() => {
    let cancelled = false;

    const refresh = async (email: string | null, userId: string | null) => {
      if (!email) {
        if (!cancelled) setState({ loading: false, email: null, isAdmin: false, userId: null });
        return;
      }
      const { data } = await sb
        .from("mkt_admins")
        .select("id")
        .ilike("email", email)
        .maybeSingle();
      if (!cancelled) {
        setState({ loading: false, email, isAdmin: !!data, userId });
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user;
      refresh(u?.email ?? null, u?.id ?? null);
    });

    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      refresh(u?.email ?? null, u?.id ?? null);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
