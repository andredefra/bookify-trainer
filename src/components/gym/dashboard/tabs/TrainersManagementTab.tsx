import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Users, BarChart3, Copy, Link2, Check } from "lucide-react";
import { toast } from "sonner";
import { TrainersList } from "./trainers/TrainersList";
import { TrainerAssignmentsList } from "./trainer-assignments/TrainerAssignmentsList";
import { CreateAssignmentDialog } from "./trainer-assignments/CreateAssignmentDialog";
import { useGymTrainerAssignments } from "@/hooks/gym/useGymTrainerAssignments";

interface TrainersManagementTabProps {
  isInvited?: boolean;
  onMessageTrainer?: (trainerId: string) => void;
}

export function TrainersManagementTab({ isInvited = false, onMessageTrainer }: TrainersManagementTabProps) {
  const [activeTab, setActiveTab] = useState("trainers");
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const {
    assignments,
    availableTrainers,
    availableClients,
    loading,
    createAssignment,
    updateAssignmentStatus,
  } = useGymTrainerAssignments();

  const inviteLink = useMemo(() => {
    const demoUser = JSON.parse(localStorage.getItem("demo-user") || "{}");
    const gymId = demoUser.id || demoUser.email || "your-gym";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/register?gym=${encodeURIComponent(gymId)}&role=trainer`;
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Invite link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  if (isInvited) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Trainers</h1>
          <p className="text-muted-foreground">Your personal trainers at this gym</p>
        </div>

        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Link2 className="h-5 w-5 text-primary" />
              Invite a trainer
            </CardTitle>
            <CardDescription>
              Share this link so trainers can register under your gym.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input readOnly value={inviteLink} className="font-mono text-xs sm:text-sm" />
              <Button onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy link"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search trainers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <TrainersList isInvited search={search} onMessage={onMessageTrainer} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Trainer Management</h1>
        <p className="text-muted-foreground">Manage your personal trainers and their assignments</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search trainers..."
            className="pl-9 w-full h-11"
          />
        </div>

        <div className="flex flex-col gap-3">
          <CreateAssignmentDialog
            availableTrainers={availableTrainers}
            availableClients={availableClients}
            onCreateAssignment={createAssignment}
          />
          <Button variant="outline" className="w-full h-11">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Trainer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Trainers</CardTitle>
          <CardDescription>View and manage your personal trainers and their assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full grid grid-cols-3 h-12">
              <TabsTrigger value="trainers" className="flex items-center gap-1 text-xs sm:text-sm">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Trainers</span>
                <span className="sm:hidden">Team</span>
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex items-center gap-1 text-xs sm:text-sm">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Assignments</span>
                <span className="sm:hidden">Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-1 text-xs sm:text-sm">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Performance</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trainers">
              <TrainersList />
            </TabsContent>

            <TabsContent value="assignments">
              {loading ? (
                <div className="text-center py-8">Loading assignments...</div>
              ) : (
                <TrainerAssignmentsList
                  assignments={assignments}
                  onUpdateStatus={updateAssignmentStatus}
                />
              )}
            </TabsContent>

            <TabsContent value="performance">
              <div className="text-center py-8 text-muted-foreground">
                Performance analytics coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
