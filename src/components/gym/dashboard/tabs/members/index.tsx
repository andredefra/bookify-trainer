
import { useState } from "react";
import { MembersHeader } from "./MembersHeader";
import { MembersTableView } from "./MembersTableView";
import { MembersCardView } from "./MembersCardView";
import { ViewToggle } from "./ViewToggle";
import { ViewMode } from "./types";
import { sampleMembers } from "./utils";
import { toast } from "sonner";

export function MembersTab() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const members = sampleMembers;

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
