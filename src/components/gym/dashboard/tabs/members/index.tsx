
import { useState } from "react";
import { MembersHeader } from "./MembersHeader";
import { MembersTableView } from "./MembersTableView";
import { MembersCardView } from "./MembersCardView";
import { ViewToggle } from "./ViewToggle";
import { ViewMode, Member } from "./types";
import { useGymMembers } from "@/hooks/gym/useGymMembers";
import { GymMember } from "@/types/gym/members";
import { toast } from "sonner";

export function MembersTab() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const { members: gymMembers, loading } = useGymMembers();

  // Convert GymMember to Member interface
  const members: Member[] = gymMembers.map((gymMember: GymMember, index: number) => ({
    id: index + 1, // Use index since Member expects number ID
    name: gymMember.name,
    email: gymMember.email,
    membershipType: gymMember.membershipType,
    status: gymMember.status,
    platformActive: gymMember.currentPackages.length > 0,
    lastPlatformLogin: gymMember.lastActivityDate || gymMember.joinDate,
    joinDate: new Date(gymMember.joinDate).toLocaleDateString(),
    trainingSessions: gymMember.totalSessions,
    lastActive: new Date(gymMember.lastActivityDate || gymMember.joinDate).toLocaleDateString(),
    image: gymMember.avatar || ""
  }));

  const sendInviteEmail = (email: string) => {
    // This would typically integrate with your email system
    console.log(`Sending platform invitation to ${email}`);
    // Show a toast notification
    toast.success(`Invitation sent to ${email}`);
  };

  return (
    <div className="space-y-8">
      <MembersHeader />
      
      <div className="bg-white rounded-md border shadow-sm">
        <ViewToggle 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          memberCount={members.length} 
        />
        
        {viewMode === "table" ? (
          <MembersTableView members={members} sendInviteEmail={sendInviteEmail} />
        ) : (
          <MembersCardView members={members} sendInviteEmail={sendInviteEmail} />
        )}
      </div>
    </div>
  );
}
