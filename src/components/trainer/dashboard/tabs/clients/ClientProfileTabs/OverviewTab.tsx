import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle, FileText, Target, Clock, Download, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { ClientSummary } from "./overview/ClientSummary";
import { UpcomingSessions } from "./overview/UpcomingSessions";
import { BasicMeasurements } from "./overview/BasicMeasurements";

interface MedicalCertificate {
  fileName: string;
  expiryDate: string; // ISO
  sizeKB?: number;
}

interface OverviewTabProps {
  mockClientDetails: {
    lastActivity: string;
    upcomingSessions: string[];
    weight: string;
    height: string;
    bodyFat: string;
    allergies?: string;
    healthConditions?: string;
    physicalLimitations?: string;
    medicalCertificate?: MedicalCertificate;
    fitnessGoals?: string[];
    experienceLevel?: string;
    preferredWorkoutTime?: string;
  };
  clientSessions: number;
  searchQuery?: string;
}

function getCertificateStatus(expiryDate: string) {
  const now = new Date();
  const exp = new Date(expiryDate);
  const days = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 0) return { label: "Scaduto", variant: "destructive" as const, days };
  if (days <= 30) return { label: `In scadenza tra ${days}g`, variant: "warning" as const, days };
  return { label: "Valido", variant: "success" as const, days };
}

export function OverviewTab({ mockClientDetails, clientSessions, searchQuery = "" }: OverviewTabProps) {
  const {
    allergies,
    healthConditions,
    physicalLimitations,
    medicalCertificate,
    fitnessGoals,
    experienceLevel,
    preferredWorkoutTime,
  } = mockClientDetails;

  const certStatus = medicalCertificate ? getCertificateStatus(medicalCertificate.expiryDate) : null;
  const statusClasses =
    certStatus?.variant === "destructive"
      ? "bg-red-100 text-red-700 border-red-200"
      : certStatus?.variant === "warning"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-green-100 text-green-700 border-green-200";

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <ClientSummary
          lastActivity={mockClientDetails.lastActivity}
          totalSessions={clientSessions}
          searchQuery={searchQuery}
        />

        <UpcomingSessions
          sessions={mockClientDetails.upcomingSessions}
          searchQuery={searchQuery}
        />

        <BasicMeasurements
          weight={mockClientDetails.weight}
          height={mockClientDetails.height}
          bodyFat={mockClientDetails.bodyFat}
          searchQuery={searchQuery}
        />

        {/* Health & Medical Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <h3 className="font-semibold text-sm">Health & Medical Info</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground mb-1">Food Allergies & Intolerances</p>
              <p className="text-sm">{allergies || "—"}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground mb-1">Health Conditions</p>
              <p className="text-sm">{healthConditions || "—"}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 md:col-span-2">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                <p className="text-xs text-muted-foreground">Physical Limitations & Injuries</p>
              </div>
              <p className="text-sm">{physicalLimitations || "—"}</p>
            </div>
          </div>

          {medicalCertificate && (
            <div className="rounded-lg border bg-background p-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-4 w-4 text-red-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{medicalCertificate.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      Scade il {new Date(medicalCertificate.expiryDate).toLocaleDateString("it-IT")}
                      {medicalCertificate.sizeKB ? ` · ${medicalCertificate.sizeKB} KB` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {certStatus && (
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusClasses}`}>
                      {certStatus.label}
                    </span>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.info("Download del certificato — demo")}
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fitness Preferences */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">Fitness Preferences</h3>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground mb-2">Fitness Goals</p>
            {fitnessGoals && fitnessGoals.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {fitnessGoals.map((g) => (
                  <Badge key={g} variant="secondary">{g}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm">—</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border bg-muted/30 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Experience Level</p>
              </div>
              <p className="text-sm">{experienceLevel || "—"}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Preferred Workout Time</p>
              </div>
              <p className="text-sm">{preferredWorkoutTime || "—"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
