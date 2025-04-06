
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, MessageSquare, UserCheck, LineChart, Dumbbell, Timer
} from "lucide-react";

interface MemberDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: any | null;
}

export function MemberDetailsDialog({ open, onOpenChange, member }: MemberDetailsDialogProps) {
  if (!member) return null;
  
  const getPlatformStatusColor = (active: boolean) => {
    return active 
      ? "bg-green-50 text-green-700 border-green-200" 
      : "bg-red-50 text-red-700 border-red-200";
  };
  
  const attendanceData = [
    { month: "Gen", attendance: 12 },
    { month: "Feb", attendance: 10 },
    { month: "Mar", attendance: 15 },
    { month: "Apr", attendance: 8 },
    { month: "Mag", attendance: 14 },
    { month: "Giu", attendance: 12 }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{member.name}</DialogTitle>
              <div className="flex items-center flex-wrap gap-2 mt-2">
                <Badge variant="outline" className={getPlatformStatusColor(member.platformActive)}>
                  {member.platformActive ? "Attivo sulla piattaforma" : "Non attivo sulla piattaforma"}
                </Badge>
                {!member.platformActive && (
                  <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Invia Invito</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Informazioni</TabsTrigger>
            <TabsTrigger value="activity">Attività</TabsTrigger>
            <TabsTrigger value="payments">Pagamenti</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Dettagli Personali</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{member.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefono</p>
                    <p>+39 XXX XXX XXXX</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data di iscrizione</p>
                    <p>{member.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo abbonamento</p>
                    <p>{member.membershipType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ultima attività</p>
                    <p>{member.lastActive}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sessioni completate</p>
                    <p>{member.trainingSessions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Trainer assegnati</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-2 border rounded-md">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Marco Tosi</p>
                    <p className="text-sm text-muted-foreground">Personal Trainer</p>
                  </div>
                  <Button size="sm" variant="ghost" className="ml-auto">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Contatta</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Modifica</Button>
              <Button>
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>Messaggio</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                    <span>Sessioni questo mese</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">8</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Timer className="w-4 h-4 mr-1 text-amber-600" />
                    <span>Media presenza</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">58 min</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Dumbbell className="w-4 h-4 mr-1 text-green-600" />
                    <span>Attività preferita</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Fitness</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Presenze recenti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center p-2 border rounded-md">
                      <div>
                        <p className="font-medium">Allenamento Fitness</p>
                        <p className="text-sm text-muted-foreground">{`${i} giugno 2023, 18:00 - 19:00`}</p>
                      </div>
                      <Badge variant="outline">Completato</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Informazioni sull'abbonamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo abbonamento</p>
                      <p className="font-medium">{member.membershipType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stato</p>
                      <p>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Attivo
                        </Badge>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data inizio</p>
                      <p>15 Gennaio 2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prossimo rinnovo</p>
                      <p>15 Luglio 2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pagamenti recenti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-2 border rounded-md">
                      <div>
                        <p className="font-medium">Abbonamento {member.membershipType}</p>
                        <p className="text-sm text-muted-foreground">{`15 ${i === 1 ? 'Maggio' : i === 2 ? 'Aprile' : 'Marzo'} 2023`}</p>
                      </div>
                      <p className="font-medium">€49.99</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
