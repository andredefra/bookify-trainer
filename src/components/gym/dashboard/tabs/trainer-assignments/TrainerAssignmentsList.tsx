import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, MessageSquare, MoreHorizontal, User, UserCheck } from "lucide-react";
import { useGymTrainerAssignments, type GymTrainerAssignment } from "@/hooks/gym/useGymTrainerAssignments";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
};

const typeColors = {
  premium: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  standard: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  trial: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
};

interface TrainerAssignmentsListProps {
  assignments: GymTrainerAssignment[];
  onUpdateStatus: (assignmentId: string, status: 'active' | 'inactive' | 'pending') => void;
}

export function TrainerAssignmentsList({ assignments, onUpdateStatus }: TrainerAssignmentsListProps) {
  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Assegnazione #{assignment.id.slice(-6)}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={statusColors[assignment.status]}>
                  {assignment.status}
                </Badge>
                <Badge className={typeColors[assignment.assignment_type]}>
                  {assignment.assignment_type}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trainer Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserCheck className="h-4 w-4" />
                  Personal Trainer
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {assignment.trainer_name?.split(' ').map(n => n[0]).join('') || 'PT'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{assignment.trainer_name}</p>
                    <p className="text-sm text-muted-foreground">ID: {assignment.trainer_id.slice(-8)}</p>
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  Cliente
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {assignment.client_name?.split(' ').map(n => n[0]).join('') || 'CL'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{assignment.client_name}</p>
                    <p className="text-sm text-muted-foreground">ID: {assignment.client_id.slice(-8)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Details */}
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <CalendarDays className="h-4 w-4" />
                    Data Assegnazione
                  </div>
                  <p className="text-sm">
                    {new Date(assignment.assigned_at).toLocaleDateString('it-IT', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    Status
                  </div>
                  <Select
                    value={assignment.status}
                    onValueChange={(value: 'active' | 'inactive' | 'pending') => 
                      onUpdateStatus(assignment.id, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Attivo</SelectItem>
                      <SelectItem value="pending">In Attesa</SelectItem>
                      <SelectItem value="inactive">Inattivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {assignment.notes && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MessageSquare className="h-4 w-4" />
                    Note
                  </div>
                  <p className="text-sm bg-muted p-3 rounded-md">{assignment.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-4 pt-4 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Visualizza Dettagli
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Invia Messaggio
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Rimuovi Assegnazione
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}