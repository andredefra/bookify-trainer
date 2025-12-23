import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, AlertCircle, CheckCircle, Users } from "lucide-react";
import { StudioShift, ShiftRequest } from "../data/studioAvailabilityData";

interface ShiftStatsCardsProps {
  shifts: StudioShift[];
  requests: ShiftRequest[];
}

export function ShiftStatsCards({ shifts, requests }: ShiftStatsCardsProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayShifts = shifts.filter(s => s.date === today);
  const weekShifts = shifts.filter(s => {
    const shiftDate = new Date(s.date);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return shiftDate >= now && shiftDate <= weekFromNow;
  });
  const pendingRequests = requests.filter(r => r.status === "pending");
  const confirmedShifts = shifts.filter(s => s.status === "confirmed");
  const uniqueTrainers = new Set(shifts.map(s => s.trainerId)).size;

  const stats = [
    {
      label: "Today's Shifts",
      value: todayShifts.length.toString(),
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "This Week",
      value: weekShifts.length.toString(),
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      label: "Pending Requests",
      value: pendingRequests.length.toString(),
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      label: "Confirmed",
      value: confirmedShifts.length.toString(),
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      label: "Active Trainers",
      value: uniqueTrainers.toString(),
      icon: Users,
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
