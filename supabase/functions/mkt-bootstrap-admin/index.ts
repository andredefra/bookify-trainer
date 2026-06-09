// Idempotent bootstrap for the marketing admin user.
// Creates (or repairs) the hardcoded admin auth user using the service role key.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_EMAIL = "andrea.mypersonal.fit@gmail.com";
const ADMIN_PASSWORD = "@Tr3ggy@";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Try to find existing user by listing (admin API has no get-by-email).
    let userId: string | null = null;
    let page = 1;
    while (page < 20) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage: 200,
      });
      if (error) throw error;
      const found = data.users.find(
        (u) => (u.email ?? "").toLowerCase() === ADMIN_EMAIL,
      );
      if (found) {
        userId = found.id;
        break;
      }
      if (data.users.length < 200) break;
      page += 1;
    }

    let action: "created" | "updated";
    if (!userId) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
      if (error) throw error;
      userId = data.user!.id;
      action = "created";
    } else {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
      if (error) throw error;
      action = "updated";
    }

    // Ensure allowlist row.
    await supabase
      .from("mkt_admins")
      .upsert({ email: ADMIN_EMAIL }, { onConflict: "email" });

    return new Response(
      JSON.stringify({ ok: true, userId, action }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ ok: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
