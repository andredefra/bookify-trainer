
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { ClientProfile } from "@/components/ClientProfile";
import { ClientProfileTabContent } from "./ClientProfileTabs/ClientProfileTabContent";
import { ProfileDialogFooter } from "./ClientProfileTabs/ProfileDialogFooter";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useClientRoster } from "@/context/ClientRosterContext";
import { toast } from "sonner";

// Mock client details for demonstration
const mockClientDetails = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  since: "March 2023",
  gymStudio: "FitLife Gym — Milan",
  sessions: 12,
  goals: ["Lose 5kg", "Run 10K", "Strength Training"],
  lastActivity: "Yesterday",
  upcomingSessions: ["Personal Training - Tomorrow at 10:00 AM"],
  weight: "65kg",
  height: "168cm",
  bodyFat: "24%",
  notes: "Prefers morning sessions. Has a previous knee injury to be mindful of.",
  allergies: "Lactose, tree nuts (almonds, walnuts)",
  healthConditions: "Mild hypertension (under treatment). Occasional lower back pain.",
  physicalLimitations: "Previous right knee sprain — avoid maximal jumps and deep loaded squats.",
  medicalCertificate: {
    fileName: "Certificato_Medico_Sportivo_2024.pdf",
    expiryDate: "2026-07-19",
    sizeKB: 348,
  },
  fitnessGoals: ["Weight loss", "Muscle tone", "Cardiovascular health"],
  experienceLevel: "Intermediate",
  preferredWorkoutTime: "Early morning (6–9 AM)",
};

interface ClientProfileDialogProps {
  client: {
    id: number;
    name: string;
    sessions: number;
    lastSession: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMessage?: (clientName: string) => void;
  onScheduleSession?: (clientName: string) => void;
  onScheduleEvent?: (clientName: string) => void;
  initialTab?: string;
}

export function ClientProfileDialog({ client, open, onOpenChange, onMessage, onScheduleSession, onScheduleEvent, initialTab }: ClientProfileDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { removeClient } = useClientRoster();

  if (!client) return null;

  const handleConfirmRemove = () => {
    removeClient({
      id: client.id,
      name: client.name,
      email: mockClientDetails.email,
      clientSince: mockClientDetails.since,
    });
    setConfirmOpen(false);
    onOpenChange(false);
    toast.success(`${client.name} moved to CRM as Terminated`);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-5xl p-4 md:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-2 md:mb-4">
          <DialogTitle className="text-lg md:text-xl">Client Profile</DialogTitle>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search client information..." 
              className="w-full pl-9 bg-muted/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {/* Client profile summary - shows at the top on mobile */}
          <div className="md:hidden">
            <ClientProfile 
              name={client.name}
              email={mockClientDetails.email}
              since={mockClientDetails.since}
              sessions={client.sessions}
              gymStudio={mockClientDetails.gymStudio}
              onRemove={() => setConfirmOpen(true)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Left sidebar with client profile summary - hidden on mobile as it's moved to the top */}
            <div className="hidden md:block">
              <ClientProfile 
                name={client.name}
                email={mockClientDetails.email}
                since={mockClientDetails.since}
                sessions={client.sessions}
                gymStudio={mockClientDetails.gymStudio}
                onRemove={() => setConfirmOpen(true)}
              />
            </div>
            
            {/* Main content area */}
            <div className="md:col-span-2">
              <ClientProfileTabContent 
                client={client}
                mockClientDetails={mockClientDetails}
                searchQuery={searchQuery}
                initialTab={initialTab}
              />
            </div>
          </div>
        </div>
        
        <ProfileDialogFooter 
          onClose={() => onOpenChange(false)}
          onMessage={() => onMessage?.(client.name)}
          onScheduleSession={() => onScheduleSession?.(client.name)}
          onScheduleEvent={() => onScheduleEvent?.(client.name)}
        />
      </DialogContent>
    </Dialog>

    <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove {client.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            They will be removed from your Clients list and moved to your CRM pipeline as <strong>Terminated</strong>.
            Their sales history stays intact and you can always reactivate them from the CRM.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Remove Client
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
