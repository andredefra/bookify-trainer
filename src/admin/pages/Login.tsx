import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { sb } from "../lib/sb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data: admin } = await sb
        .from("mkt_admins")
        .select("id")
        .ilike("email", data.user?.email ?? "")
        .maybeSingle();
      if (!admin) {
        await supabase.auth.signOut();
        throw new Error("Accesso riservato. La tua email non è autorizzata.");
      }
      toast.success("Benvenuto!");
      navigate("/admin", { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Errore di accesso";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-sm bg-card border rounded-xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">MyPersonal</p>
          <h1 className="text-xl font-semibold mt-1">Admin · Marketing</h1>
          <p className="text-xs text-muted-foreground mt-2">Accesso riservato al team interno.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Accesso..." : "Accedi"}
          </Button>
        </form>
      </div>
    </div>
  );
}
