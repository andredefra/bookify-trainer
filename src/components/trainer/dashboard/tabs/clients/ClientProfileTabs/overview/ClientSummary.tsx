
import { HighlightText } from "../shared/HighlightText";

interface ClientSummaryProps {
  lastActivity: string;
  totalSessions: number;
  searchQuery?: string;
}

export function ClientSummary({ lastActivity, totalSessions, searchQuery = "" }: ClientSummaryProps) {
  return (
    <div>
      <h3 className="text-sm font-medium">Activity Summary</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="p-2 bg-gray-50 rounded">
          <div className="text-xs text-muted-foreground">Last Activity</div>
          <div className="font-medium">
            <HighlightText text={lastActivity} highlight={searchQuery} />
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <div className="text-xs text-muted-foreground">Total Sessions</div>
          <div className="font-medium">{totalSessions}</div>
        </div>
      </div>
    </div>
  );
}
