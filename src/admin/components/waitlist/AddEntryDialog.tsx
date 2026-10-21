import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { it } from "../../i18n/it";
import { DuplicateWaitlistEmailError, isValidEmail, useAddWaitlistEntry } from "../../hooks/useWaitlist";

const t = it.waitlist;

export default function AddEntryDialog({ audience }: { audience: "user" | "trainer" }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("it");
  const [consent, setConsent] = useState(false);
  const [notes, setNotes] = useState("");
  const [trains, setTrains] = useState<"alone" | "with_pt">("alone");
  const add = useAddWaitlistEntry(audience);

  const reset = () => {
    setName(""); setEmail(""); setPhone(""); setCity("");
    setLanguage("it"); setConsent(false); setNotes(""); setTrains("alone");
  };

  const onSubmit = () => {
    if (!name.trim() || !isValidEmail(email)) {
      toast.error(t.addInvalid);
      return;
    }
    add.mutate(
      {
        full_name: name.trim(),
        email,
        phone: phone.trim() || null,
        city: city.trim() || null,
        language,
        marketing_consent: consent,
        notes: notes.trim() || null,
        trains_with_pt: audience === "user" ? trains : null,
      },
      {
        onSuccess: () => {
          toast.success(t.added);
          setOpen(false);
          reset();
        },
        onError: (e) =>
          e instanceof DuplicateWaitlistEmailError ? toast.error(t.duplicateEmail) : toast.error(t.addError),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="h-4 w-4 mr-2" />
          {t.add}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t.addTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">{t.fields.name} *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">{t.fields.email} *</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">{t.fields.phone}</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">{t.fields.city}</label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">{t.fields.language}</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="in">IN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {audience === "user" && (
              <div>
                <label className="text-sm font-medium">{t.fields.trains}</label>
                <Select value={trains} onValueChange={(v) => setTrains(v as "alone" | "with_pt")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alone">{t.alone}</SelectItem>
                    <SelectItem value="with_pt">{t.withPt}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} />
            {t.fields.consent}
          </label>
          <div>
            <label className="text-sm font-medium">{t.fields.notes}</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={() => setOpen(false)}>{it.common.cancel}</Button>
            <Button onClick={onSubmit} disabled={add.isPending}>
              {add.isPending ? it.common.loading : it.common.save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
