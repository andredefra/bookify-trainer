import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, ShieldCheck, Upload, X, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  getInviteByToken,
  updateInvite,
  type MockGymInvite,
} from "@/utils/mockGymInvites";
import { isValidPartitaIVA } from "@/utils/validatePartitaIVA";

const accountSchema = z
  .object({
    email: z.string().trim().email("Invalid email").max(255),
    password: z.string().min(6, "Password must be at least 6 characters").max(100),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export default function GymOnboarding() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const initialInvite = useMemo(
    () => (token ? getInviteByToken(token) : undefined),
    [token]
  );
  const [invite, setInvite] = useState<MockGymInvite | undefined>(initialInvite);

  const [name, setName] = useState(initialInvite?.name || "");
  const [kind, setKind] = useState<"gym" | "studio">(initialInvite?.kind || "gym");
  const [street, setStreet] = useState(initialInvite?.street || "");
  const [city, setCity] = useState(initialInvite?.city || "");
  const [vat, setVat] = useState(initialInvite?.vat || "");
  const [vatConfirmed, setVatConfirmed] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (token) setInvite(getInviteByToken(token));
  }, [token]);

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <h1 className="text-xl font-semibold mb-2">Invalid or expired link</h1>
            <p className="text-muted-foreground text-sm">
              This onboarding link is no longer valid. Please ask the trainer who invited you
              to generate a new one.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (invite.status === "verified") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <ShieldCheck className="w-12 h-12 mx-auto text-green-600 mb-3" />
            <h1 className="text-xl font-semibold mb-2">Already verified</h1>
            <p className="text-muted-foreground text-sm mb-4">
              <strong>{invite.name}</strong> has already been onboarded. Log in to manage it.
            </p>
            <Button onClick={() => navigate("/login")}>Go to login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    const next = [...files];
    Array.from(selected).forEach((f) => next.push(f));
    setFiles(next.slice(0, 10));
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !street.trim()) {
      toast.error("Please fill the entity name and address");
      return;
    }
    const parsed = accountSchema.safeParse({ email, password, confirm });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Invalid input");
      return;
    }

    setSubmitting(true);
    try {
      updateInvite(invite.token, {
        name: name.trim(),
        kind,
        street: street.trim(),
        city: city.trim() || undefined,
        status: "verified",
        verifiedAt: new Date().toISOString(),
        gymEmail: email.trim().toLowerCase(),
        documents: files.map((f) => f.name),
      });

      const demoUser = {
        type: "gym",
        source: "invited",
        email: email.trim().toLowerCase(),
        name: name.trim(),
        gymName: name.trim(),
        id: invite.token,
      };
      localStorage.setItem("demo-user", JSON.stringify(demoUser));

      toast.success("Onboarding complete! Welcome to the platform.");
      navigate("/gym-dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Onboarding · {invite.name}</title>
      </Helmet>
      <div className="min-h-screen bg-muted/30 py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <Badge className="mb-2">Invited by a trainer</Badge>
            <h1 className="text-2xl md:text-3xl font-bold">
              Verify and onboard <span className="text-primary">{invite.name}</span>
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Confirm the entity details, upload documents to verify your {invite.kind}, and
              create your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">1. Confirm entity details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="o-name">Name</Label>
                    <Input id="o-name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="o-kind">Type</Label>
                    <select
                      id="o-kind"
                      value={kind}
                      onChange={(e) => setKind(e.target.value as "gym" | "studio")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="gym">Gym</option>
                      <option value="studio">Studio</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="o-street">Street / Address</Label>
                    <Input
                      id="o-street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="o-city">City</Label>
                    <Input id="o-city" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">2. Verification documents (optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Upload business registration, licenses or any document that helps us verify
                  your {invite.kind}. Files are listed below and used to confirm verification.
                </p>
                <label className="flex items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  <div className="text-center text-sm text-muted-foreground">
                    <Upload className="w-6 h-6 mx-auto mb-1" />
                    Click to select files (PDF or images)
                  </div>
                </label>
                {files.length > 0 && (
                  <div className="space-y-1">
                    {files.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm border rounded-md px-3 py-2 bg-background"
                      >
                        <span className="truncate">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">3. Create your account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="o-email">Email</Label>
                  <Input
                    id="o-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="o-password">Password</Label>
                    <Input
                      id="o-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="o-confirm">Confirm password</Label>
                    <Input
                      id="o-confirm"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Completing..." : (
                <>
                  Complete onboarding <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
