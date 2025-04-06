
import { Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Member } from "./types";
import { getMembershipColor, getPlatformStatusColor, getPlatformStatusText } from "./utils";

interface MembersTableViewProps {
  members: Member[];
  sendInviteEmail: (email: string) => void;
}

export function MembersTableView({ members, sendInviteEmail }: MembersTableViewProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Membership</TableHead>
            <TableHead>Platform Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map(member => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{member.name}</span>
                </div>
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getMembershipColor(member.membershipType)}>
                  {member.membershipType}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getPlatformStatusColor(member.platformActive)}>
                  {getPlatformStatusText(member.platformActive)}
                </Badge>
              </TableCell>
              <TableCell>{member.joinDate}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {!member.platformActive && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => sendInviteEmail(member.email)}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Invite
                    </Button>
                  )}
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
