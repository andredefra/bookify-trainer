
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CertificationsForm() {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="space-y-3">
        <div>
          <Label htmlFor="cert-title">Certification Title</Label>
          <Input id="cert-title" className="mt-1" placeholder="e.g. NASM Certified Personal Trainer" />
        </div>
        <div>
          <Label htmlFor="issuing-org">Issuing Organization</Label>
          <Input id="issuing-org" className="mt-1" placeholder="e.g. National Academy of Sports Medicine" />
        </div>
        <div>
          <Label htmlFor="issue-date">Issue Date</Label>
          <Input id="issue-date" type="date" className="mt-1" />
        </div>
        <Button variant="secondary" size="sm">Add Certification</Button>
      </div>
    </div>
  );
}
