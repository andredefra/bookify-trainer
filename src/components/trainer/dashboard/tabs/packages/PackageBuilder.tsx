
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BasicInfoStep } from "./builder/BasicInfoStep";
import { SessionsStep } from "./builder/SessionsStep";
import { ProgramsStep } from "./builder/ProgramsStep";
import { AdditionalServicesStep } from "./builder/AdditionalServicesStep";
import { PricingStep } from "./builder/PricingStep";
import { PackageSummary } from "./builder/PackageSummary";

interface PackageData {
  // Basic Info
  title: string;
  description: string;
  objective: string;
  
  // Sessions
  sessions: {
    individual: { count: number; pricePerSession: number; };
    group: { count: number; pricePerSession: number; };
    online: { count: number; pricePerSession: number; };
  };
  
  // Programs
  selectedPrograms: Array<{
    id: string;
    title: string;
    duration: number; // weeks
    price: number;
  }>;
  
  // Additional Services
  additionalServices: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  
  // Pricing
  basePrice: number;
  discount: number;
  finalPrice: number;
  calculatedDuration: number; // weeks
}

interface PackageBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PackageData) => void;
  editData?: PackageData | null;
}

export function PackageBuilder({ open, onOpenChange, onSubmit, editData }: PackageBuilderProps) {
  const [currentStep, setCurrentStep] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  
  const [packageData, setPackageData] = useState<PackageData>({
    title: "",
    description: "",
    objective: "",
    sessions: {
      individual: { count: 0, pricePerSession: 50 },
      group: { count: 0, pricePerSession: 30 },
      online: { count: 0, pricePerSession: 35 }
    },
    selectedPrograms: [],
    additionalServices: [],
    basePrice: 0,
    discount: 0,
    finalPrice: 0,
    calculatedDuration: 0
  });

  // Calculate prices and duration whenever data changes
  useEffect(() => {
    const sessionsPrice = 
      (packageData.sessions.individual.count * packageData.sessions.individual.pricePerSession) +
      (packageData.sessions.group.count * packageData.sessions.group.pricePerSession) +
      (packageData.sessions.online.count * packageData.sessions.online.pricePerSession);
    
    const programsPrice = packageData.selectedPrograms.reduce((sum, program) => sum + program.price, 0);
    const servicesPrice = packageData.additionalServices.reduce((sum, service) => sum + service.price, 0);
    
    const basePrice = sessionsPrice + programsPrice + servicesPrice;
    const finalPrice = basePrice * (1 - packageData.discount / 100);
    
    // Calculate duration: max between sessions duration and programs duration
    const totalSessions = packageData.sessions.individual.count + packageData.sessions.group.count + packageData.sessions.online.count;
    const sessionsDuration = Math.ceil(totalSessions / 2); // assuming 2 sessions per week
    const programsDuration = Math.max(...packageData.selectedPrograms.map(p => p.duration), 0);
    const calculatedDuration = Math.max(sessionsDuration, programsDuration, 1);
    
    setPackageData(prev => ({
      ...prev,
      basePrice,
      finalPrice,
      calculatedDuration
    }));
  }, [packageData.sessions, packageData.selectedPrograms, packageData.additionalServices, packageData.discount]);

  // Initialize with edit data if provided
  useEffect(() => {
    if (editData && open) {
      setPackageData(editData);
    } else if (open) {
      // Reset to default when opening for new package
      setPackageData({
        title: "",
        description: "",
        objective: "",
        sessions: {
          individual: { count: 0, pricePerSession: 50 },
          group: { count: 0, pricePerSession: 30 },
          online: { count: 0, pricePerSession: 35 }
        },
        selectedPrograms: [],
        additionalServices: [],
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        calculatedDuration: 0
      });
      setCurrentStep("basic");
    }
  }, [editData, open]);

  const updatePackageData = (updates: Partial<PackageData>) => {
    setPackageData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    if (!packageData.title.trim()) {
      toast.error("Il titolo del package è obbligatorio");
      setCurrentStep("basic");
      return;
    }

    const totalComponents = 
      packageData.sessions.individual.count + 
      packageData.sessions.group.count + 
      packageData.sessions.online.count + 
      packageData.selectedPrograms.length;

    if (totalComponents === 0) {
      toast.error("Seleziona almeno una sessione o un programma");
      setCurrentStep("sessions");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(packageData);
      toast.success(editData ? "Package aggiornato con successo!" : "Package creato con successo!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Errore durante il salvataggio del package");
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = (step: string) => {
    switch (step) {
      case "basic":
        return packageData.title.trim().length > 0;
      case "sessions":
      case "programs":
      case "services":
        return true; // These are optional
      case "pricing":
        return packageData.basePrice > 0;
      default:
        return true;
    }
  };

  const getNextStep = (current: string) => {
    const steps = ["basic", "sessions", "programs", "services", "pricing"];
    const currentIndex = steps.indexOf(current);
    return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  };

  const getPrevStep = (current: string) => {
    const steps = ["basic", "sessions", "programs", "services", "pricing"];
    const currentIndex = steps.indexOf(current);
    return currentIndex > 0 ? steps[currentIndex - 1] : null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Modifica Package" : "Crea Nuovo Package"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={currentStep} onValueChange={setCurrentStep}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic" disabled={false}>Base</TabsTrigger>
                <TabsTrigger value="sessions" disabled={!isStepValid("basic")}>Sessioni</TabsTrigger>
                <TabsTrigger value="programs" disabled={!isStepValid("basic")}>Programmi</TabsTrigger>
                <TabsTrigger value="services" disabled={!isStepValid("basic")}>Servizi</TabsTrigger>
                <TabsTrigger value="pricing" disabled={!isStepValid("basic")}>Prezzo</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="basic" className="space-y-4">
                  <BasicInfoStep 
                    data={packageData} 
                    onChange={updatePackageData} 
                  />
                </TabsContent>

                <TabsContent value="sessions" className="space-y-4">
                  <SessionsStep 
                    data={packageData} 
                    onChange={updatePackageData} 
                  />
                </TabsContent>

                <TabsContent value="programs" className="space-y-4">
                  <ProgramsStep 
                    data={packageData} 
                    onChange={updatePackageData} 
                  />
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                  <AdditionalServicesStep 
                    data={packageData} 
                    onChange={updatePackageData} 
                  />
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                  <PricingStep 
                    data={packageData} 
                    onChange={updatePackageData} 
                  />
                </TabsContent>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const prevStep = getPrevStep(currentStep);
                    if (prevStep) setCurrentStep(prevStep);
                  }}
                  disabled={!getPrevStep(currentStep)}
                >
                  Indietro
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Annulla
                  </Button>

                  {currentStep === "pricing" ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading || !isStepValid(currentStep)}
                    >
                      {isLoading ? "Salvando..." : editData ? "Aggiorna Package" : "Crea Package"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        const nextStep = getNextStep(currentStep);
                        if (nextStep) setCurrentStep(nextStep);
                      }}
                      disabled={!isStepValid(currentStep) || !getNextStep(currentStep)}
                    >
                      Avanti
                    </Button>
                  )}
                </div>
              </div>
            </Tabs>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <PackageSummary data={packageData} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
