
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Flame, Target, Activity, ArrowRight } from "lucide-react";

export function QuickAnalyticsCard() {
  const navigate = useNavigate();

  const analyticsData = [
    {
      label: "Workouts This Month",
      value: "12",
      change: "+3 vs last month",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Calories Burned",
      value: "8,450",
      change: "+12%",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Goals Completed",
      value: "3/5",
      change: "60%",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Avg. Performance",
      value: "87%",
      change: "+5% improvement",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Quick Analytics</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary gap-1"
            onClick={() =>
              navigate("/client-dashboard", {
                state: { activeTab: "analytics" },
              })
            }
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {analyticsData.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
            >
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground truncate">
                  {item.label}
                </p>
                <p className="text-lg font-semibold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.change}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
