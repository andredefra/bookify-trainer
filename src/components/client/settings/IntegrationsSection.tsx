
import { FitnessAppIntegration } from "@/components/client/settings/fitness-integrations/FitnessAppIntegration";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Globe, Database, Shield } from "lucide-react";

interface IntegrationsSectionProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    plan?: string; 
  };
}

export function IntegrationsSection({ user }: IntegrationsSectionProps) {
  return (
    <div className="space-y-6">
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Integrazioni App Fitness
          </CardTitle>
          <CardDescription>
            Connetti le tue app di fitness preferite per sincronizzare i dati di attività e salute
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FitnessAppIntegration user={user} />
        </CardContent>
      </Card>
      
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Servizi di terze parti
          </CardTitle>
          <CardDescription>
            Connettiti ad altri servizi che ti aiutano nel tuo percorso di fitness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">App Meditazione</h4>
                <p className="text-sm text-muted-foreground">Connetti per tracciare le sessioni di mindfulness</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connetti</Button>
          </div>
          
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Database className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Tracker Nutrizione</h4>
                <p className="text-sm text-muted-foreground">Sincronizza i tuoi dati alimentari</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connetti</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mt-4">
        <div className="flex gap-3">
          <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-700 mb-1">Informazioni sulla privacy</h3>
            <p className="text-sm text-amber-600">
              I tuoi dati vengono condivisi solo con le app che scegli di connettere. Puoi disconnettere qualsiasi app in qualsiasi momento per interrompere la condivisione dei dati.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
