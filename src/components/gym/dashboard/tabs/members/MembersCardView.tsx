
import { Mail, UserPlus, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Member } from "./types";
import { getStatusColor, getMembershipColor, getPlatformStatusColor, getPlatformStatusText } from "./utils";
import { useState } from "react";
import { AssignTrainerDialog } from "./AssignTrainerDialog";

interface MembersCardViewProps {
  members: Member[];
  sendInviteEmail: (email: string) => void;
}

export function MembersCardView({ members }: MembersCardViewProps) {
  const [isAssignTrainerOpen, setIsAssignTrainerOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleAssignTrainer = (member: Member) => {
    setSelectedMember(member);
    setIsAssignTrainerOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {members.map(member => (
          <Card key={member.id} className="overflow-hidden border shadow-sm">
            <CardContent className="p-0">
              <div className="flex flex-col p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className={getMembershipColor(member.membershipType)}>
                    {member.membershipType}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                  <Badge variant="outline" className={getPlatformStatusColor(member.platformActive)}>
                    {getPlatformStatusText(member.platformActive)}
                  </Badge>
                </div>
                
                <div className="text-sm space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>{member.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sessions:</span>
                    <span>{member.trainingSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last active:</span>
                    <span>{member.lastActive}</span>
                  </div>
                  {member.platformActive && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last platform login:</span>
                      <span>{member.lastPlatformLogin}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {member.platformActive ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAssignTrainer(member)}
                      className="flex-1"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Assign Trainer
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">Profile</Button>
                  <Button size="sm" className="flex-1">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMember && (
        <AssignTrainerDialog
          open={isAssignTrainerOpen}
          onOpenChange={setIsAssignTrainerOpen}
          member={selectedMember}
        />
      )}
    </>
  );
}
