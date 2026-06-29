import { useEffect, useState } from "react";
import { useTrainerGymAffiliations, type GymInfo } from "@/hooks/useTrainerGymAffiliations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Building2,
  Search,
  Star,
  CheckCircle,
  ShieldCheck,
  ShieldAlert,
  Plus,
  Copy,
  Link2,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  createInvite,
  buildOnboardingUrl,
  getInvitesForTrainer,
  deleteInvite,
  type MockGymInvite,
} from "@/utils/mockGymInvites";


interface MyGymsSectionProps {
  trainerId?: string;
}

type DialogStep = "search" | "confirm-existing" | "manual-form" | "manual-confirm" | "invite-link";

interface LocalManualAffiliation {
  id: string;
  token: string;
  name: string;
  kind: "gym" | "studio";
  street: string;
  city?: string;
  vat?: string;
  status: "pending" | "verified";
  isPrimary?: boolean;
  createdAt: string;
}

const LOCAL_AFFILIATIONS_KEY = "mock-trainer-manual-affiliations";

function loadLocalAffiliations(trainerId?: string): LocalManualAffiliation[] {
  try {
    const raw = localStorage.getItem(LOCAL_AFFILIATIONS_KEY);
    const all = raw ? (JSON.parse(raw) as Record<string, LocalManualAffiliation[]>) : {};
    return all[trainerId || "_anon"] || [];
  } catch {
    return [];
  }
}

function saveLocalAffiliations(trainerId: string | undefined, list: LocalManualAffiliation[]) {
  try {
    const raw = localStorage.getItem(LOCAL_AFFILIATIONS_KEY);
    const all = raw ? (JSON.parse(raw) as Record<string, LocalManualAffiliation[]>) : {};
    all[trainerId || "_anon"] = list;
    localStorage.setItem(LOCAL_AFFILIATIONS_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

export function MyGymsSection({ trainerId }: MyGymsSectionProps) {
  const { searchGyms } = useTrainerGymAffiliations(trainerId);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<DialogStep>("search");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GymInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGym, setSelectedGym] = useState<GymInfo | null>(null);

  // Manual form state
  const [manualName, setManualName] = useState("");
  const [manualKind, setManualKind] = useState<"gym" | "studio">("gym");
  const [manualStreet, setManualStreet] = useState("");
  const [manualCity, setManualCity] = useState("");
  const [manualVat, setManualVat] = useState("");
  const [manualNotes, setManualNotes] = useState("");

  // Invite link state
  const [generatedInvite, setGeneratedInvite] = useState<MockGymInvite | null>(null);

  // Affiliations
  const [manualAffiliations, setManualAffiliations] = useState<LocalManualAffiliation[]>([]);
  const [verifiedAffiliations, setVerifiedAffiliations] = useState<
    { id: string; gym: GymInfo; isPrimary: boolean }[]
  >([]);

  const refreshManualAffiliations = () => {
    const localList = loadLocalAffiliations(trainerId);
    // Sync status from invites
    const invites = getInvitesForTrainer(trainerId);
    const updated = localList.map((a) => {
      const invite = invites.find((i) => i.token === a.token);
      return invite ? { ...a, status: invite.status } : a;
    });
    if (JSON.stringify(updated) !== JSON.stringify(localList)) {
      saveLocalAffiliations(trainerId, updated);
    }
    setManualAffiliations(updated);
  };

  useEffect(() => {
    refreshManualAffiliations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainerId]);

  const resetDialog = () => {
    setStep("search");
    setSearchQuery("");
    setSearchResults([]);
    setSelectedGym(null);
    setManualName("");
    setManualKind("gym");
    setManualStreet("");
    setManualCity("");
    setManualNotes("");
    setGeneratedInvite(null);
  };

  const openDialog = () => {
    resetDialog();
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setTimeout(resetDialog, 200);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchGyms(searchQuery);
      setSearchResults(results);
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmExisting = () => {
    if (!selectedGym) return;
    setVerifiedAffiliations((prev) => {
      if (prev.some((a) => a.gym.id === selectedGym.id)) return prev;
      return [
        ...prev,
        {
          id: selectedGym.id,
          gym: selectedGym,
          isPrimary: prev.length === 0,
        },
      ];
    });
    toast.success(`${selectedGym.name} added to your affiliations`);
    closeDialog();
  };

  const handleGenerateInvite = () => {
    if (!manualName.trim() || !manualStreet.trim()) {
      toast.error("Please fill name and address");
      return;
    }
    const invite = createInvite({
      name: manualName.trim(),
      kind: manualKind,
      street: manualStreet.trim(),
      city: manualCity.trim() || undefined,
      notes: manualNotes.trim() || undefined,
      trainerId,
    });
    setGeneratedInvite(invite);

    const newAffiliation: LocalManualAffiliation = {
      id: invite.token,
      token: invite.token,
      name: invite.name,
      kind: invite.kind,
      street: invite.street,
      city: invite.city,
      status: "pending",
      createdAt: invite.createdAt,
      isPrimary:
        manualAffiliations.length === 0 && verifiedAffiliations.length === 0,
    };
    const next = [newAffiliation, ...manualAffiliations];
    saveLocalAffiliations(trainerId, next);
    setManualAffiliations(next);
    setStep("invite-link");
  };

  const copyInviteLink = (token: string) => {
    const url = buildOnboardingUrl(token);
    navigator.clipboard?.writeText(url);
    toast.success("Invite link copied to clipboard");
  };

  const setPrimaryManual = (id: string) => {
    const next = manualAffiliations.map((a) => ({ ...a, isPrimary: a.id === id }));
    saveLocalAffiliations(trainerId, next);
    setManualAffiliations(next);
    setVerifiedAffiliations((prev) => prev.map((a) => ({ ...a, isPrimary: false })));
    toast.success("Primary affiliation updated");
  };

  const setPrimaryVerified = (id: string) => {
    setVerifiedAffiliations((prev) => prev.map((a) => ({ ...a, isPrimary: a.id === id })));
    const next = manualAffiliations.map((a) => ({ ...a, isPrimary: false }));
    saveLocalAffiliations(trainerId, next);
    setManualAffiliations(next);
    toast.success("Primary affiliation updated");
  };

  // Remove confirmation state
  const [removeTarget, setRemoveTarget] = useState<
    | { kind: "manual"; id: string; name: string }
    | { kind: "verified"; id: string; name: string }
    | null
  >(null);

  const confirmRemove = () => {
    if (!removeTarget) return;
    if (removeTarget.kind === "manual") {
      const target = manualAffiliations.find((a) => a.id === removeTarget.id);
      const next = manualAffiliations.filter((a) => a.id !== removeTarget.id);
      if (target?.isPrimary && next.length > 0 && !verifiedAffiliations.some((v) => v.isPrimary)) {
        next[0] = { ...next[0], isPrimary: true };
      }
      saveLocalAffiliations(trainerId, next);
      setManualAffiliations(next);
      if (target?.token) deleteInvite(target.token);
    } else {
      const target = verifiedAffiliations.find((a) => a.id === removeTarget.id);
      const next = verifiedAffiliations.filter((a) => a.id !== removeTarget.id);
      if (target?.isPrimary && next.length > 0) {
        next[0] = { ...next[0], isPrimary: true };
      } else if (target?.isPrimary && next.length === 0 && manualAffiliations.length > 0) {
        const m = manualAffiliations.map((a, i) => ({ ...a, isPrimary: i === 0 }));
        saveLocalAffiliations(trainerId, m);
        setManualAffiliations(m);
      }
      setVerifiedAffiliations(next);
    }
    toast.success(`${removeTarget.name} removed`);
    setRemoveTarget(null);
  };

  const hasAffiliations = manualAffiliations.length + verifiedAffiliations.length > 0;


  // --- Dialog body renderer ---
  const renderDialogBody = () => {
    if (step === "search") {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="gym-search">Search by name or address</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="gym-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. FitLife Gym or 123 Main St"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2">
              <Label>Results</Label>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {searchResults.map((gym) => (
                  <Card
                    key={gym.id}
                    className={`cursor-pointer transition-colors ${
                      selectedGym?.id === gym.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedGym(gym)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        {gym.logo_url ? (
                          <img
                            src={gym.logo_url}
                            alt={gym.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <Building2 className="w-10 h-10 p-2 bg-muted rounded-lg text-muted-foreground" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="font-medium truncate">{gym.name}</div>
                            <Badge variant="outline" className="text-[10px] gap-1 border-green-200 text-green-700">
                              <ShieldCheck className="w-3 h-3" /> Verified
                            </Badge>
                          </div>
                          {gym.location && (
                            <div className="text-sm text-muted-foreground truncate">
                              {gym.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {selectedGym && (
                <Button className="w-full" onClick={() => setStep("confirm-existing")}>
                  Continue with {selectedGym.name}
                </Button>
              )}
            </div>
          )}

          {searchResults.length === 0 && searchQuery && !isSearching && (
            <p className="text-sm text-muted-foreground">
              No results yet. Search above or add it manually below.
            </p>
          )}

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Can't find your gym or studio?
            </p>
            <Button variant="outline" className="w-full" onClick={() => setStep("manual-form")}>
              <Plus className="w-4 h-4 mr-2" />
              Add it manually
            </Button>
          </div>
        </div>
      );
    }

    if (step === "confirm-existing" && selectedGym) {
      return (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {selectedGym.logo_url ? (
                  <img
                    src={selectedGym.logo_url}
                    alt={selectedGym.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <Building2 className="w-12 h-12 p-2 bg-muted rounded-lg text-muted-foreground" />
                )}
                <div>
                  <div className="font-semibold">{selectedGym.name}</div>
                  {selectedGym.location && (
                    <div className="text-sm text-muted-foreground">{selectedGym.location}</div>
                  )}
                  <Badge variant="outline" className="mt-1 text-[10px] gap-1 border-green-200 text-green-700">
                    <ShieldCheck className="w-3 h-3" /> Verified entity
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground">
            This is a verified gym already on the platform. Confirm to add it to your affiliations.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStep("search")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button onClick={handleConfirmExisting}>
              <CheckCircle className="w-4 h-4 mr-2" /> Confirm affiliation
            </Button>
          </DialogFooter>
        </div>
      );
    }

    if (step === "manual-form") {
      return (
        <div className="space-y-4">
          <div>
            <Label>Type</Label>
            <RadioGroup
              value={manualKind}
              onValueChange={(v) => setManualKind(v as "gym" | "studio")}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem id="kind-gym" value="gym" />
                <Label htmlFor="kind-gym" className="font-normal">Gym</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="kind-studio" value="studio" />
                <Label htmlFor="kind-studio" className="font-normal">Studio</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="m-name">Name *</Label>
            <Input
              id="m-name"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="e.g. FitLife Gym"
            />
          </div>
          <div>
            <Label htmlFor="m-street">Street / Address *</Label>
            <Input
              id="m-street"
              value={manualStreet}
              onChange={(e) => setManualStreet(e.target.value)}
              placeholder="e.g. 123 Main Street"
            />
          </div>
          <div>
            <Label htmlFor="m-city">City (optional)</Label>
            <Input
              id="m-city"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              placeholder="e.g. Milan"
            />
          </div>
          <div>
            <Label htmlFor="m-notes">Notes (optional)</Label>
            <Textarea
              id="m-notes"
              value={manualNotes}
              onChange={(e) => setManualNotes(e.target.value)}
              rows={2}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStep("search")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button
              onClick={() => {
                if (!manualName.trim() || !manualStreet.trim()) {
                  toast.error("Please fill name and address");
                  return;
                }
                setStep("manual-confirm");
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </div>
      );
    }

    if (step === "manual-confirm") {
      return (
        <div className="space-y-4">
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold mb-1">
                  You are adding an unverified {manualKind}.
                </div>
                <p>
                  This {manualKind} will appear as <strong>Unverified</strong> until they
                  claim and verify their entity. Invite the {manualKind} to the platform so
                  they can verify and gain credibility and trust with clients.
                </p>
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="p-4 space-y-1 text-sm">
              <div><strong>Name:</strong> {manualName}</div>
              <div><strong>Type:</strong> {manualKind === "gym" ? "Gym" : "Studio"}</div>
              <div><strong>Address:</strong> {manualStreet}{manualCity ? `, ${manualCity}` : ""}</div>
            </CardContent>
          </Card>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStep("manual-form")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button onClick={handleGenerateInvite}>
              Confirm & generate invite link
            </Button>
          </DialogFooter>
        </div>
      );
    }

    if (step === "invite-link" && generatedInvite) {
      const url = buildOnboardingUrl(generatedInvite.token);
      return (
        <div className="space-y-4">
          <div className="rounded-md border bg-muted/40 p-4 text-sm">
            <div className="flex items-start gap-2">
              <Link2 className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <div className="font-semibold mb-1">Invite link ready</div>
                <p className="text-muted-foreground">
                  Share this unique link with <strong>{generatedInvite.name}</strong>. When they
                  open it they can confirm the entity details, upload verification documents,
                  and create their account on the platform.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input readOnly value={url} className="font-mono text-xs" />
            <Button onClick={() => copyInviteLink(generatedInvite.token)}>
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={closeDialog}>Done</Button>
          </DialogFooter>
        </div>
      );
    }

    return null;
  };

  const dialogTitleByStep: Record<DialogStep, string> = {
    search: "Add your gym or studio",
    "confirm-existing": "Confirm affiliation",
    "manual-form": "Add gym or studio manually",
    "manual-confirm": "Review & confirm",
    "invite-link": "Share invite link",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Studio or Gym</h2>
          <p className="text-muted-foreground">
            Manage the gyms and studios where you train or work
          </p>
        </div>
        {hasAffiliations && (
          <Button onClick={openDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Add your gym or studio
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {!hasAffiliations && (
          <Card>
            <CardContent className="p-6 text-center">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No gym or studio yet</h3>
              <p className="text-muted-foreground mb-4">
                Add the gym or studio where you train or work. If it isn't on the platform yet,
                you can add it manually and invite them to verify the entity.
              </p>
              <Button className="w-full" onClick={openDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add your gym or studio
              </Button>
            </CardContent>
          </Card>
        )}

        {verifiedAffiliations.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {a.gym.logo_url ? (
                    <img
                      src={a.gym.logo_url}
                      alt={a.gym.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 p-3 bg-muted rounded-lg text-muted-foreground" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium">{a.gym.name}</h3>
                      <Badge className="text-[10px] gap-1 bg-green-100 text-green-800 border-green-200">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </Badge>
                      {a.isPrimary && (
                        <Badge className="text-[10px] gap-1 bg-primary/10 text-primary border-primary/20">
                          <Star className="w-3 h-3 fill-primary" /> Primary
                        </Badge>
                      )}
                    </div>
                    {a.gym.location && (
                      <p className="text-sm text-muted-foreground">{a.gym.location}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!a.isPrimary && (
                    <Button size="sm" variant="outline" onClick={() => setPrimaryVerified(a.id)}>
                      Set as Primary
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() =>
                      setRemoveTarget({ kind: "verified", id: a.id, name: a.gym.name })
                    }
                    aria-label={`Remove ${a.gym.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

              </div>
            </CardContent>
          </Card>
        ))}

        {manualAffiliations.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Building2 className="w-12 h-12 p-3 bg-muted rounded-lg text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium">{a.name}</h3>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {a.kind}
                      </Badge>
                      {a.status === "verified" ? (
                        <Badge className="text-[10px] gap-1 bg-green-100 text-green-800 border-green-200">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge className="text-[10px] gap-1 bg-amber-100 text-amber-800 border-amber-200">
                          <ShieldAlert className="w-3 h-3" /> Unverified
                        </Badge>
                      )}
                      {a.isPrimary && (
                        <Badge className="text-[10px] gap-1 bg-primary/10 text-primary border-primary/20">
                          <Star className="w-3 h-3 fill-primary" /> Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {a.street}{a.city ? `, ${a.city}` : ""}
                    </p>
                    {a.status === "pending" && (
                      <p className="text-xs text-amber-700 mt-1">
                        Waiting for {a.kind} to verify the entity via your invite link.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {a.status === "pending" && (
                    <Button size="sm" variant="outline" onClick={() => copyInviteLink(a.token)}>
                      <Copy className="w-4 h-4 mr-2" /> Copy invite link
                    </Button>
                  )}
                  {!a.isPrimary && (
                    <Button size="sm" variant="outline" onClick={() => setPrimaryManual(a.id)}>
                      Set as Primary
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() =>
                      setRemoveTarget({ kind: "manual", id: a.id, name: a.name })
                    }
                    aria-label={`Remove ${a.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : closeDialog())}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{dialogTitleByStep[step]}</DialogTitle>
            <DialogDescription className="sr-only">
              Add or invite a gym or studio.
            </DialogDescription>
          </DialogHeader>
          {renderDialogBody()}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!removeTarget} onOpenChange={(o) => !o && setRemoveTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove affiliation?</AlertDialogTitle>
            <AlertDialogDescription>
              {removeTarget
                ? `Remove ${removeTarget.name} from your affiliations? This cannot be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
