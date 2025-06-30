
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, Users, Clock } from 'lucide-react';
import { ProgramProgress } from '@/hooks/useProgramAssignments';

interface ProgramExpirationAlertProps {
  expiringPrograms: ProgramProgress[];
  onViewDetails?: (programId: string) => void;
}

export function ProgramExpirationAlert({ 
  expiringPrograms, 
  onViewDetails 
}: ProgramExpirationAlertProps) {
  if (expiringPrograms.length === 0) return null;

  const expiredCount = expiringPrograms.filter(p => p.daysUntilExpiry < 0).length;
  const expiringCount = expiringPrograms.filter(p => p.daysUntilExpiry >= 0 && p.daysUntilExpiry <= 7).length;

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">
              Attenzione: Programmi in Scadenza
            </h3>
            
            <div className="space-y-2 mb-4">
              {expiredCount > 0 && (
                <div className="flex items-center gap-2 text-red-700">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    <strong>{expiredCount}</strong> {expiredCount === 1 ? 'programma scaduto' : 'programmi scaduti'}
                  </span>
                </div>
              )}
              
              {expiringCount > 0 && (
                <div className="flex items-center gap-2 text-orange-700">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    <strong>{expiringCount}</strong> {expiringCount === 1 ? 'programma in scadenza' : 'programmi in scadenza'} nei prossimi 7 giorni
                  </span>
                </div>
              )}
            </div>

            <div className="text-sm text-orange-800 mb-4">
              Contatta i tuoi clienti per rinnovare i programmi e mantenere alta la loro motivazione!
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="default">
                <Users className="h-4 w-4 mr-2" />
                Vedi Dettagli
              </Button>
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Pianifica Rinnovi
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
