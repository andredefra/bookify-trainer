import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { type TrainerOption, type ClientOption } from "@/hooks/gym/useGymTrainerAssignments";

const formSchema = z.object({
  trainerId: z.string().min(1, "Seleziona un trainer"),
  clientId: z.string().min(1, "Seleziona un cliente"),
  assignmentType: z.enum(["standard", "premium", "trial"]),
  notes: z.string().optional(),
});

const statusColors = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-gray-500"
};

interface CreateAssignmentDialogProps {
  availableTrainers: TrainerOption[];
  availableClients: ClientOption[];
  onCreateAssignment: (trainerId: string, clientId: string, assignmentType: 'standard' | 'premium' | 'trial', notes?: string) => Promise<void>;
}

export function CreateAssignmentDialog({ 
  availableTrainers, 
  availableClients, 
  onCreateAssignment 
}: CreateAssignmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainerId: "",
      clientId: "",
      assignmentType: "standard",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await onCreateAssignment(
        values.trainerId,
        values.clientId,
        values.assignmentType,
        values.notes
      );
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedTrainer = availableTrainers.find(t => t.id === form.watch("trainerId"));
  const selectedClient = availableClients.find(c => c.id === form.watch("clientId"));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Assegna Trainer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assegna Personal Trainer</DialogTitle>
          <DialogDescription>
            Assegna un personal trainer a un cliente della palestra
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Trainer Selection */}
            <FormField
              control={form.control}
              name="trainerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Personal Trainer
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona un trainer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableTrainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id}>
                          <div className="flex items-center gap-3 w-full">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {trainer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{trainer.name}</span>
                                <div className={`w-2 h-2 rounded-full ${statusColors[trainer.status]}`} />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {trainer.activeClients} clienti attivi
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTrainer && (
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {selectedTrainer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedTrainer.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedTrainer.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {selectedTrainer.activeClients} clienti attivi
                            </Badge>
                            <Badge variant={selectedTrainer.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                              {selectedTrainer.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client Selection */}
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Cliente
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona un cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          <div className="flex items-center gap-3 w-full">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {client.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{client.name}</span>
                                <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                                  {client.status}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {client.email}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedClient && (
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {selectedClient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedClient.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                          <Badge variant={selectedClient.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {selectedClient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assignment Type */}
            <FormField
              control={form.control}
              name="assignmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo di Assegnazione</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="trial">Trial - Periodo di prova</SelectItem>
                      <SelectItem value="standard">Standard - Servizio base</SelectItem>
                      <SelectItem value="premium">Premium - Servizio completo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Seleziona il tipo di servizio per questa assegnazione
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (opzionali)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Aggiungi note o istruzioni specifiche..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Note che saranno visibili sia al trainer che al cliente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Annulla
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Assegnazione..." : "Crea Assegnazione"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}